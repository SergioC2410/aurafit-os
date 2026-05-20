/**
 * src/core/db/types.ts
 * * Contratos de Dominio para el motor relacional Offline-First.
 * El uso sistemático de marcas de tiempo numéricas (Epoch) en lugar de objetos Date
 * elimina la sobrecarga de instanciación del motor V8 durante la serialización/deserialización
 * masiva en IndexedDB, protegiendo los 60 FPS durante la hidratación de datos.
 */

export type UUID = string;
export type EpochTimeStamp = number;

export interface UserProfile {
  id: UUID;
  heightCm: number;
  weightKg: number;
  targetTDEE: number;
  activeStreakDays: number;
  lastActiveDate: EpochTimeStamp;
}

export interface ExerciseDictionary {
  id: UUID;
  name: string;
  category: 'strength' | 'hypertrophy' | 'mobility';
  primaryMuscleGroup: string;
  estimated1RM: number; 
}

export interface WorkoutSet {
  reps: number;
  weightKg: number;
  rpe: number; 
}

export interface WorkoutLog {
  id: UUID;
  timestamp: EpochTimeStamp;
  exerciseId: UUID;
  sets: WorkoutSet[];
  totalVolume: number; 
}

export interface NutritionDiary {
  id: UUID;
  timestamp: EpochTimeStamp;
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface MobilityAudit {
  id: UUID;
  timestamp: EpochTimeStamp;
  joint: 'ankle' | 'hip' | 'shoulder' | 'thoracic';
  symmetryScore: number; 
}