<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { cn } from "~/utils/cn";

const props = defineProps<{
  modelValue?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  label?: string;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);
const value = useVModel(props, "modelValue", emit);
</script>

<template>
  <div class="w-full space-y-2">
    <label v-if="label" class="text-sm font-medium text-foreground block">
      {{ label }}
    </label>
    <input
      v-model="value"
      :type="type || 'text'"
      :class="
        cn(
          'flex h-12 w-full rounded-lg border-none bg-input px-4 py-2 text-base text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'ring-2 ring-destructive ring-offset-2'
        )
      "
      :placeholder="placeholder"
    />
    <p v-if="error" class="text-xs text-destructive font-medium animate-pulse">
      {{ error }}
    </p>
  </div>
</template>
