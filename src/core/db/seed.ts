/**
 * src/core/db/seed.ts
 * * Motor de Siembra Idempotente (Data Seeding).
 * Inyecta el catálogo base de ejercicios y datos de prueba.
 * Garantiza que la ejecución múltiple no duplique registros.
 */

import { db } from './database';
import type { UserProfile, ExerciseDictionary, WorkoutLog } from './types';

// Generamos UUIDs estáticos para el seed, así podemos relacionar los entrenamientos
// con los ejercicios de forma determinista.
const EXERCISE_IDS = {
  SQUAT: crypto.randomUUID(),
  BENCH_PRESS: crypto.randomUUID(),
  DEADLIFT: crypto.randomUUID(),
  MOBILITY_HIPS: crypto.randomUUID(),
};

export async function initializeDatabaseSeed(): Promise<void> {
  try {
    // 1. Verificación de Idempotencia: ¿Ya existe el catálogo?
    // Usamos count() que es una operación O(1) en IndexedDB, no carga los datos en memoria.
    const exerciseCount = await db.exercises.count();
    
    if (exerciseCount > 0) {
      console.info('[AuraFit DB]: Motor relacional previamente hidratado. Omitiendo Seeding.');
      return;
    }

    console.info('[AuraFit DB]: Ejecutando protocolo de Siembra Inicial...');

    // 2. Transacción Atómica (All-or-Nothing)
    // Si algo falla a mitad de la inyección, Dexie revertirá (rollback) todos los cambios,
    // evitando un estado de base de datos corrupto o a medias.
    await db.transaction('rw', db.userProfiles, db.exercises, db.workoutLogs, async () => {
      
      // -- A. Perfil de Usuario Base --
      const initialProfile: UserProfile = {
        id: crypto.randomUUID(),
        heightCm: 175,
        weightKg: 75.5,
        targetTDEE: 2400,
        activeStreakDays: 1,
        lastActiveDate: Date.now()
      };
      await db.userProfiles.add(initialProfile);

      // -- B. Catálogo Maestro de Ejercicios --
      const initialExercises: ExerciseDictionary[] = [
        {
          id: EXERCISE_IDS.SQUAT,
          name: 'Sentadilla Libre (Barbell Squat)',
          category: 'strength',
          primaryMuscleGroup: 'Quadriceps',
          estimated1RM: 100 // kg
        },
        {
          id: EXERCISE_IDS.BENCH_PRESS,
          name: 'Press de Banca Plano',
          category: 'strength',
          primaryMuscleGroup: 'Chest',
          estimated1RM: 80
        },
        {
          id: EXERCISE_IDS.DEADLIFT,
          name: 'Peso Muerto Convencional',
          category: 'strength',
          primaryMuscleGroup: 'Hamstrings',
          estimated1RM: 120
        },
        {
          id: EXERCISE_IDS.MOBILITY_HIPS,
          name: 'Apertura de Cadera (90/90)',
          category: 'mobility',
          primaryMuscleGroup: 'Hips',
          estimated1RM: 0
        }
      ];
      await db.exercises.bulkAdd(initialExercises);

      // -- C. Entrenamientos Históricos (Mocks) --
      const yesterday = Date.now() - (24 * 60 * 60 * 1000);
      
      const mockWorkouts: WorkoutLog[] = [
        {
          id: crypto.randomUUID(),
          timestamp: yesterday,
          exerciseId: EXERCISE_IDS.BENCH_PRESS,
          sets: [
            { weightKg: 60, reps: 10, rpe: 7 },
            { weightKg: 65, reps: 8, rpe: 8 },
            { weightKg: 70, reps: 5, rpe: 9 } // El Worker calculará el volumen sobre esto luego
          ],
          totalVolume: (60*10) + (65*8) + (70*5)
        }
      ];
      await db.workoutLogs.bulkAdd(mockWorkouts);
    });

    console.info('[AuraFit DB]: Siembra Inicial completada con éxito.');

  } catch (error) {
    console.error('[AuraFit DB]: Fallo crítico durante el Seeding.', error);
    throw error;
  }
}