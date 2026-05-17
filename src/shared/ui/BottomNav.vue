<template>
    <nav
        class="fixed bottom-0 left-0 right-0 z-50 bg-surface-elevated/80 backdrop-blur-xl border-t border-white/5 pb-safe">
        <div class="flex items-center justify-around h-16 px-4 max-w-md mx-auto">
            <router-link to="/" class="nav-item" active-class="active">
                <HomeIcon class="w-6 h-6" />
            </router-link>
            <router-link to="/fuerza" class="nav-item" active-class="active">
                <DumbbellIcon class="w-6 h-6" />
            </router-link>
            <router-link to="/nutricion" class="nav-item" active-class="active">
                <AppleIcon class="w-6 h-6" />
            </router-link>
            <router-link to="/movilidad" class="nav-item" active-class="active">
                <ActivityIcon class="w-6 h-6" />
            </router-link>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { HomeIcon, DumbbellIcon, AppleIcon, ActivityIcon } from 'lucide-vue-next'
</script>

<style scoped>
/* Le indicamos a Tailwind v4 de dónde leer nuestras clases y variables OKLCH */
@reference "../../app/style.css";

.nav-item {
    @apply p-3 text-text-secondary rounded-2xl transition-all duration-300 active:scale-90;
}

.active {
    /* Separamos la geometría de la sombra del color para evitar colapsos del compilador */
    @apply text-primary bg-primary/10 shadow-[0_0_15px] shadow-primary/15;
}

/* view-transition-name aísla este elemento para que no parpadee al cambiar de página */
nav {
    view-transition-name: bottom-nav;
}
</style>