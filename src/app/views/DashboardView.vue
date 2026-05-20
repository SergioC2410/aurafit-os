<template>
    <main class="min-h-screen bg-background text-text-primary p-6 selection:bg-primary selection:text-background">
        <header class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">AuraFit OS</h1>
                <p class="text-text-secondary text-sm font-medium mt-1">Ecosistema de Optimización Humana</p>
            </div>
            <Button variant="surface" size="icon" class="rounded-full">
                <UserIcon class="w-5 h-5 text-primary" />
            </Button>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[120px]">

            <Card
                class="p-5 row-span-2 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
                <h2 class="text-lg font-semibold text-text-secondary flex items-center gap-2">
                    <DumbbellIcon class="w-5 h-5" /> Fuerza Bruta
                </h2>
                <div>
                    <div class="text-4xl font-bold text-primary mb-3">12.5 <span
                            class="text-base text-text-secondary">Ton</span></div>
                    <Button class="w-full">Registrar Entrenamiento</Button>
                </div>
            </Card>

            <Card class="p-5 flex flex-col justify-between">
                <h2 class="text-sm font-semibold text-text-secondary flex items-center gap-2">
                    <AppleIcon class="w-4 h-4" /> Calorías Restantes
                </h2>
                <div class="text-2xl font-bold text-text-primary">1,420 <span class="text-xs text-primary">Kcal</span>
                </div>
            </Card>

            <Card class="p-5 flex items-center justify-center gap-4 !bg-surface-elevated !border-accent-streak/20">
                <div
                    class="h-10 w-10 rounded-full bg-accent-streak/20 flex items-center justify-center text-accent-streak">
                    <FlameIcon class="w-5 h-5" />
                </div>
                <span class="text-xl font-bold text-text-primary">Día 14</span>
            </Card>

            <Card class="p-5 md:col-span-2 flex flex-col justify-end">
                <h2 class="text-sm font-semibold text-text-secondary w-full flex justify-between items-center">
                    <span class="flex items-center gap-2">
                        <ActivityIcon class="w-4 h-4" /> Balance Articular
                    </span>
                    <span class="text-primary bg-primary/10 px-2 py-1 rounded-md">87% Ranked</span>
                </h2>
            </Card>

        </div>
    </main>
</template>

<script setup lang="ts">
import Button from '../../shared/ui/Button.vue'
import Card from '../../shared/ui/Card.vue'
import { DumbbellIcon, FlameIcon, AppleIcon, ActivityIcon, UserIcon } from 'lucide-vue-next'
</script>