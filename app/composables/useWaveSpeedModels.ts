// app/composables/useWaveSpeedModels.ts
import type { WaveSpeedResponse, WaveSpeedModel } from "~/types/wavespeed";

export const useWaveSpeedModels = () => {
  // 1. STATE: Quản lý bộ lọc
  const searchQuery = ref("");
  const selectedType = ref<string>("all");

  // 2. DATA: Fetch từ API
  // Lưu ý: useFetch trong composable nên dùng key để tránh conflict nếu gọi nhiều nơi
  const { data, status, error, refresh } = useFetch<
    WaveSpeedResponse<WaveSpeedModel[]>
  >("/api/wavespeed/models", {
    key: "wavespeed-models",
    lazy: true,
    server: false,
  });

  // 3. COMPUTED: Xử lý dữ liệu thô thành dữ liệu hiển thị

  // Lọc danh sách model dựa trên search và type
  const filteredModels = computed(() => {
    const models = data.value?.data || [];
    if (!Array.isArray(models)) return [];

    return models.filter((model) => {
      const searchLower = searchQuery.value.toLowerCase();
      // Tìm theo tên hoặc ID
      const nameMatch =
        model.name?.toLowerCase().includes(searchLower) ||
        model.model_id?.toLowerCase().includes(searchLower);

      // Tìm theo loại
      const typeMatch =
        selectedType.value === "all" || model.type === selectedType.value;

      return nameMatch && typeMatch;
    });
  });

  // Trích xuất danh sách các loại (Categories) để hiển thị dropdown
  const availableTypes = computed(() => {
    const models = data.value?.data || [];
    const types = new Set<string>(["all"]);
    models.forEach((m) => {
      if (m.type) types.add(m.type);
    });
    return Array.from(types).sort();
  });

  // 4. ACTIONS: Các hàm xử lý sự kiện

  // Wrapper cho hàm refresh để tránh lỗi Type Event ở Vue template
  const handleRefresh = async () => {
    await refresh();
  };

  const handleSelectModel = (model: WaveSpeedModel) => {
    console.log("Selected Model:", model);
    // Logic điều hướng sẽ nằm ở đây sau này
    // navigateTo(...)
    alert(`Đã chọn: ${model.name}`);
  };

  // 5. RETURN: Chỉ trả về những gì UI cần dùng
  return {
    // State (Read-only data hoặc Reactive refs)
    models: filteredModels,
    availableTypes,
    status,
    error,

    // V-Models (để bind vào input)
    searchQuery,
    selectedType,

    // Actions
    refresh: handleRefresh,
    selectModel: handleSelectModel,
  };
};
