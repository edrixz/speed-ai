<script setup lang="ts">
import { Moon, Sun, Monitor } from "lucide-vue-next";

const colorMode = useColorMode();

// Định nghĩa mảng string rõ ràng
const modes = ["light", "dark", "system"];

const toggleTheme = () => {
  // Tìm index hiện tại
  const currentIndex = modes.indexOf(colorMode.preference);

  // Fallback về 0 nếu không tìm thấy (tránh lỗi logic)
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  // Tính index tiếp theo
  const nextIndex = (safeCurrentIndex + 1) % modes.length;

  // Lấy giá trị mode tiếp theo
  const nextMode = modes[nextIndex];

  // Fix lỗi TS2322: Kiểm tra chắc chắn nextMode tồn tại rồi mới gán
  if (nextMode) {
    colorMode.preference = nextMode;
  }
};
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
    title="Change Theme"
  >
    <ClientOnly>
      <Sun v-if="colorMode.preference === 'light'" class="w-5 h-5" />
      <Moon v-else-if="colorMode.preference === 'dark'" class="w-5 h-5" />
      <Monitor v-else class="w-5 h-5" />

      <template #fallback>
        <div
          class="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
        />
      </template>
    </ClientOnly>
  </button>
</template>
