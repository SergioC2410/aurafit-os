<template>
  <div class="app-layout min-h-screen bg-background text-text-primary pb-20">
    <router-view />
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from './shared/ui/BottomNav.vue'
</script>