<template>
    <button :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')" v-bind="$attrs">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
    // Clases base: Flexbox, centrado, tipografía y Maximalismo Táctil (transition & active:scale)
    'inline-flex items-center justify-center rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] active:transition-none',
    {
        variants: {
            variant: {
                default: 'bg-primary text-background hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--color-primary),0.2)]',
                surface: 'bg-surface-elevated text-text-primary hover:bg-surface-elevated/80 border border-white/5',
                ghost: 'hover:bg-white/5 hover:text-text-primary text-text-secondary',
                streak: 'bg-accent-streak/10 text-accent-streak hover:bg-accent-streak/20 border border-accent-streak/20',
            },
            size: {
                default: 'h-11 px-5 py-2',
                sm: 'h-9 rounded-lg px-3',
                lg: 'h-14 rounded-2xl px-8 text-base',
                icon: 'h-11 w-11',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

type ButtonProps = VariantProps<typeof buttonVariants>

defineProps<{
    variant?: ButtonProps['variant']
    size?: ButtonProps['size']
}>()
</script>