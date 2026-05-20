/**
 * src/core/workers/worker.types.ts
 * Contratos de comunicación para el puente entre el Main Thread y el Web Worker.
 */

// Define las operaciones matemáticas que nuestro Worker sabe hacer.
export type MathOperation = 'CALCULATE_1RM' | 'CALCULATE_TOTAL_VOLUME';

// Estructura de los datos que el Main Thread le enviará al Worker
export interface WorkerPayload {
  operation: MathOperation;
  data: any; 
}

// Estructura de la respuesta que el Worker devolverá al Main Thread
export interface WorkerResponse {
  operation: MathOperation;
  result: number;
  error?: string;
}

// Interfaz específica para el cálculo de Fuerza
export interface OneRepMaxData {
  weightKg: number;
  reps: number;
}