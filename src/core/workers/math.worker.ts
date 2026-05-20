/**
 * src/core/workers/math.worker.ts
 * Motor de cálculos matemáticos aislado del Main Thread.
 * Protege la recolección de basura (Garbage Collection) del hilo de renderizado.
 */

import type { WorkerPayload, WorkerResponse, OneRepMaxData } from './worker.types';

// Fórmulas matemáticas puras
const calculateBrzycki1RM = (weight: number, reps: number): number => {
  // Fórmula de Brzycki: 1RM = Peso * (36 / (37 - Repeticiones))
  // Solo es precisa hasta ~10 repeticiones, pero computacionalmente eficiente.
  if (reps === 1) return weight;
  return weight * (36 / (37 - reps));
};

const calculateVolume = (sets: { weightKg: number; reps: number }[]): number => {
  return sets.reduce((acc, set) => acc + (set.weightKg * set.reps), 0);
};

// Escuchador de eventos: La "puerta de entrada" del Worker
self.onmessage = (event: MessageEvent<WorkerPayload>) => {
  const { operation, data } = event.data;
  let response: WorkerResponse = { operation, result: 0 };

  try {
    // Enrutador de operaciones lógicas
    switch (operation) {
      case 'CALCULATE_1RM': {
        const { weightKg, reps } = data as OneRepMaxData;
        response.result = calculateBrzycki1RM(weightKg, reps);
        break;
      }
      case 'CALCULATE_TOTAL_VOLUME': {
        response.result = calculateVolume(data);
        break;
      }
      default:
        throw new Error('Operación matemática no soportada por el Worker.');
    }

    // Devuelve el resultado al hilo principal
    self.postMessage(response);

  } catch (error) {
    // Manejo de fallos sin colapsar el hilo principal
    response.error = error instanceof Error ? error.message : 'Unknown Worker Error';
    self.postMessage(response);
  }
};