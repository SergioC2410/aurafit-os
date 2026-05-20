/**
 * src/core/db/database.ts
 * * Motor relacional central (Dexie).
 * La estrategia de indexación (&id) asegura unicidad. Los índices compuestos
 * como [exerciseId+timestamp] están diseñados para permitir consultas de series de tiempo
 * (ej. progresión de 1RM a lo largo del tiempo) en una sola pasada de lectura, 
 * evitando operaciones de filtrado costosas en la capa de vista.
 */

import Dexie, { type Table } from 'dexie';
import type { 
  UserProfile, 
  ExerciseDictionary, 
  WorkoutLog, 
  NutritionDiary, 
  MobilityAudit 
} from './types';

export class AuraFitDatabase extends Dexie {
  userProfiles!: Table<UserProfile, string>;
  exercises!: Table<ExerciseDictionary, string>;
  workoutLogs!: Table<WorkoutLog, string>;
  nutritionDiaries!: Table<NutritionDiary, string>;
  mobilityAudits!: Table<MobilityAudit, string>;

  constructor() {
    super('AuraFitOS_CoreDB');
    
    this.version(1).stores({
      userProfiles: '&id',
      exercises: '&id, category, primaryMuscleGroup',
      workoutLogs: '&id, timestamp, exerciseId, [exerciseId+timestamp]',
      nutritionDiaries: '&id, timestamp',
      mobilityAudits: '&id, timestamp, joint'
    });
  }
}

export const db = new AuraFitDatabase();