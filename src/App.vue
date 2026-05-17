<template>
  <main class="min-h-screen bg-background text-text-primary p-6 selection:bg-primary selection:text-background">
    <header class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">AuraFit OS</h1>
        <p class="text-text-secondary text-sm font-medium mt-1">Ecosistema de Optimización Humana</p>
      </div>
      <div
        class="h-10 w-10 rounded-full bg-surface-elevated ring-1 ring-primary/20 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[120px]">

      <section
        class="bg-surface rounded-2xl p-5 border border-white/5 row-span-2 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
        <h2 class="text-lg font-semibold text-text-secondary">Fuerza Bruta</h2>
        <div class="text-4xl font-bold text-primary">12.5 <span class="text-base text-text-secondary">Ton</span></div>
      </section>

      <section class="bg-surface rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
        <h2 class="text-sm font-semibold text-text-secondary">Calorías Restantes</h2>
        <div class="text-2xl font-bold text-text-primary">1,420 <span class="text-xs text-primary">Kcal</span></div>
      </section>

      <section
        class="bg-surface rounded-2xl p-5 border border-accent-streak/20 shadow-[0_0_20px_rgba(var(--color-accent-streak),0.1)] flex items-center justify-center gap-3">
        <div class="h-8 w-8 rounded-full bg-accent-streak/20 flex items-center justify-center text-accent-streak">🔥
        </div>
        <span class="text-xl font-bold text-text-primary">Día 14</span>
      </section>

      <section class="bg-surface rounded-2xl p-5 border border-white/5 md:col-span-2 flex items-end">
        <h2 class="text-sm font-semibold text-text-secondary w-full flex justify-between">
          <span>Balance Articular</span>
          <span class="text-primary">87% Ranked</span>
        </h2>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
</script>