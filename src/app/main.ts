/**
 * src/app/main.ts
 * Archivo de arranque de Vue (Modificado para inicialización DB no bloqueante).
 */

import { createApp } from 'vue';
import App from '../App.vue';
import router from './router';
import { initializeDatabaseSeed } from '../core/db/seed';
import './style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

// Delegación de Tareas en Tiempo de Inactividad (Idle Time)
// Retrasamos el Seeding hasta que el Main Thread haya terminado de pintar la UI
// inicial, garantizando que el First Contentful Paint (FCP) sea instantáneo (<100ms).
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    initializeDatabaseSeed();
  });
} else {
  // Fallback para navegadores antiguos (Safari)
  setTimeout(initializeDatabaseSeed, 500);
}