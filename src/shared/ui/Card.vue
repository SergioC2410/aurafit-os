<template>
    <section :class="cn('bg-surface rounded-2xl border border-white/5 overflow-hidden', $attrs.class ?? '')">
        <slot />
    </section>
</template>

<script setup lang="ts">
import { cn } from '../utils/cn'
</script>