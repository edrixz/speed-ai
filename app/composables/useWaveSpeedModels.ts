// app/composables/useWaveSpeedModels.ts
import { useWaveSpeedStore } from "~/stores/wavespeed";
import type { WaveSpeedModel } from "~/types/wavespeed";

export const useWaveSpeedModels = () => {
  // Kết nối Store
  const store = useWaveSpeedStore();

  // State Local (chỉ dùng cho UI lọc)
  const searchQuery = ref("");
  const selectedType = ref<string>("all");

  // 1. INIT: Gọi store fetch khi component mount
  // Store sẽ tự quyết định có fetch thật hay không (dựa vào data length)
  store.fetchModels();

  // 2. COMPUTED: Lọc data từ STORE
  const filteredModels = computed(() => {
    const models = store.models || [];
    if (!Array.isArray(models)) return [];

    return models.filter((model) => {
      const searchLower = searchQuery.value.toLowerCase();
      const nameMatch =
        model.name?.toLowerCase().includes(searchLower) ||
        model.model_id?.toLowerCase().includes(searchLower);

      const typeMatch =
        selectedType.value === "all" || model.type === selectedType.value;

      return nameMatch && typeMatch;
    });
  });

  // Lấy danh sách loại (Types) từ Store
  const availableTypes = computed(() => {
    const models = store.models || [];
    const types = new Set<string>(["all"]);
    models.forEach((m) => {
      if (m.type) types.add(m.type);
    });
    return Array.from(types).sort();
  });

  // 3. ACTIONS
  // Hàm này dùng cho nút "Refresh" thủ công
  const handleRefresh = async () => {
    await store.fetchModels(true); // true = Force Update
  };

  const handleSelectModel = (model: WaveSpeedModel) => {
    return navigateTo(`/generate/${encodeURIComponent(model.model_id)}`);
  };

  return {
    // Trả về data đã lọc
    models: filteredModels,
    availableTypes,

    // Map các state từ store ra ngoài để UI dùng
    status: computed(() => store.isLoading),
    error: computed(() => store.error),

    // Local state
    searchQuery,
    selectedType,

    // Actions
    refresh: handleRefresh,
    selectModel: handleSelectModel,
  };
};
