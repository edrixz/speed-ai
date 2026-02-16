<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

const colorMode = useColorMode();

// Chỉ giữ lại 'light' và 'dark'
const modes = ["light", "dark"];

const toggleTheme = () => {
  const currentIndex = modes.indexOf(colorMode.preference);
  // Tính index tiếp theo, vòng lặp giữa light và dark
  const nextIndex = (currentIndex + 1) % modes.length;
  const nextMode = modes[nextIndex];

  if (nextMode) {
    colorMode.preference = nextMode;
  }
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md hover:bg-accent dark:hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
    title="Change Theme"
  >
    <ClientOnly>
      <!-- Chỉ hiển thị Sun hoặc Moon -->
      <Sun v-if="colorMode.value === 'light'" class="w-5 h-5" />
      <Moon v-else class="w-5 h-5" />

      <template #fallback>
        <div
          class="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
        />
      </template>
    </ClientOnly>
  </button>
</template>
