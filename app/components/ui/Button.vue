<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";

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
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2',
        variant === 'outline'
          ? 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-900'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
      )
    "
  >
    <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>
