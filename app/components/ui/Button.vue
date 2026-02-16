<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { cn } from "~/utils/cn";

defineProps<{
  loading?: boolean;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="loading"
    :class="
      cn(
        'inline-flex items-center justify-center rounded-lg text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-3',
        variant === 'outline'
          ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
          : 'bg-primary text-primary-foreground hover:bg-primary/90',
      )
    "
  >
    <Loader2 v-if="loading" class="mr-2 h-5 w-5 animate-spin" />
    <slot />
  </button>
</template>
