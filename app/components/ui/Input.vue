<script setup lang="ts">
import { useVModel } from "@vueuse/core";

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
  <div class="w-full space-y-1">
    <label v-if="label" class="text-sm font-medium text-slate-700 block">
      {{ label }}
    </label>
    <input
      v-model="value"
      :type="type || 'text'"
      :class="
        cn(
          'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'border-red-500 focus-visible:ring-red-500',
        )
      "
      :placeholder="placeholder"
    />
    <p v-if="error" class="text-xs text-red-500 font-medium animate-pulse">
      {{ error }}
    </p>
  </div>
</template>
