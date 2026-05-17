import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/fuerza', name: 'strength', component: () => import('../domains/strength/views/StrengthView.vue') },
    { path: '/nutricion', name: 'nutrition', component: () => import('../domains/nutrition/views/NutritionView.vue') },
    { path: '/movilidad', name: 'mobility', component: () => import('../domains/mobility/views/MobilityView.vue') }
  ]
})

// Orquestador de View Transitions API nativa
router.beforeResolve(async (to, from) => {
  if (to.path === from.path) return
  
  // Si el navegador no soporta View Transitions (o tiene animaciones reducidas), navega normal
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || prefersReducedMotion) return

  // Pausamos la resolución del router hasta que la GPU capture la pantalla
  return new Promise<void>((resolve) => {
    document.startViewTransition(() => {
      resolve() // Desbloquea la navegación, Vue actualiza el DOM y la GPU hace el fundido
    })
  })
})

export default router