/**
 * src/core/composables/useDatabase.ts
 * * Fachada Reactiva (Facade Pattern) para el motor Dexie y Web Workers.
 * Aísla la complejidad asíncrona y la delegación de hilos del sistema de componentes de Vue.
 */

import { shallowRef, ref } from 'vue';
import { db } from '../db/database';
import type { WorkoutLog } from '../db/types';
import MathWorker from '../workers/math.worker?worker';
import type { WorkerPayload, WorkerResponse, MathOperation } from '../workers/worker.types';

// 1. Instancia Singleton del Worker
// Mantenemos un único Worker vivo durante todo el ciclo de vida de la PWA. 
// Destruir y recrear Workers consume ciclos de CPU innecesarios.
const workerInstance = new MathWorker();

export function useDatabase() {
  // 2. Gestión de Memoria Estricta: shallowRef vs ref
  // Para listas grandes de la base de datos, usamos shallowRef. Esto evita que Vue 
  // convierta recursivamente cada propiedad de cada objeto en un Proxy reactivo, 
  // ahorrando megabytes de RAM y previniendo caídas de cuadros (Frame Drops).
  const workoutLogs = shallowRef<WorkoutLog[]>([]);
  const isProcessing = ref<boolean>(false);
  const error = ref<string | null>(null);

  /**
   * Promisifica la comunicación con el Web Worker.
   * Transforma un sistema basado en eventos (callbacks) en un flujo lineal asíncrono (async/await).
   */
  const executeMathOperation = <T>(operation: MathOperation, data: T): Promise<number> => {
    return new Promise((resolve, reject) => {
      const messageHandler = (event: MessageEvent<WorkerResponse>) => {
        // Filtramos para asegurar que la respuesta corresponde a nuestra petición
        if (event.data.operation === operation) {
          // Limpiamos el listener inmediatamente para evitar fugas de memoria (Memory Leaks)
          workerInstance.removeEventListener('message', messageHandler);
          
          if (event.data.error) {
            reject(new Error(event.data.error));
          } else {
            resolve(event.data.result);
          }
        }
      };

      workerInstance.addEventListener('message', messageHandler);
      workerInstance.postMessage({ operation, data } as WorkerPayload);
    });
  };

  /**
   * Orquestador Transaccional: Calcula el volumen asíncronamente y guarda en DB.
   */
  const saveWorkoutLog = async (log: WorkoutLog) => {
    isProcessing.value = true;
    error.value = null;

    try {
      // 1. Delegamos el cálculo pesado al Worker (El hilo principal sigue libre)
      const totalVolume = await executeMathOperation('CALCULATE_TOTAL_VOLUME', log.sets);
      
      // Mutamos el objeto con el resultado matemático exacto
      const enrichedLog = { ...log, totalVolume };

      // 2. Persistimos en la base de datos local (Dexie)
      await db.workoutLogs.add(enrichedLog);
      
      // 3. Actualizamos el estado reactivo empujando el nuevo registro al inicio
      // Al reasignar .value, shallowRef notifica a la UI que debe re-renderizar.
      workoutLogs.value = [enrichedLog, ...workoutLogs.value];
      
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Fallo crítico al guardar el entrenamiento';
      console.error('[AuraFit DB]:', err);
    } finally {
      isProcessing.value = false;
    }
  };

  /**
   * Hidratación de la Interfaz desde IndexedDB
   */
  const fetchWorkoutLogs = async () => {
    isProcessing.value = true;
    try {
      // Usamos los índices que configuramos en la Fase 1 para evitar un Table Scan completo
      const logs = await db.workoutLogs.orderBy('timestamp').reverse().toArray();
      workoutLogs.value = logs;
    } catch (err) {
      error.value = 'No se pudo leer el historial de la base de datos local.';
    } finally {
      isProcessing.value = false;
    }
  };

  // Exponemos la API pública del Composable
  return {
    workoutLogs,
    isProcessing,
    error,
    saveWorkoutLog,
    fetchWorkoutLogs,
    executeMathOperation
  };
}