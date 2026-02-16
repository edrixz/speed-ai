// app/stores/wavespeed.ts
import { defineStore } from "pinia";
import type { WaveSpeedResponse, WaveSpeedModel } from "~/types/wavespeed";

export const useWaveSpeedStore = defineStore("wavespeed", () => {
  // 1. STATE
  const models = ref<WaveSpeedModel[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lastUpdated = ref<number | null>(null);

  // 2. ACTIONS
  const fetchModels = async (forceUpdate = false) => {
    // Nếu đã có data và không yêu cầu force update -> Không làm gì cả (Dùng cache RAM)
    if (models.value.length > 0 && !forceUpdate) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<WaveSpeedResponse<WaveSpeedModel[]>>(
        "/api/wavespeed/models",
      );

      if (response?.data) {
        models.value = response.data;
        lastUpdated.value = Date.now();
      }
    } catch (err: any) {
      console.error("Pinia fetch error:", err);
      error.value = err.message || "Không thể tải danh sách models";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    models,
    isLoading,
    error,
    lastUpdated,
    fetchModels,
  };
});
