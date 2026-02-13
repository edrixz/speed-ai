// app/composables/useGenerate.ts
import type { WaveSpeedModel } from "~/types/wavespeed";

export const useGenerate = () => {
  const route = useRoute();
  const router = useRouter();

  // 1. State
  const currentModel = ref<WaveSpeedModel | null>(null);
  const formData = ref<Record<string, any>>({}); // Chứa dữ liệu form động
  const isGenerating = ref(false);
  const result = ref<any>(null);
  const error = ref<string | null>(null);

  // 2. Lấy danh sách model (Tái sử dụng hook cũ để lấy từ cache)
  const { models } = useWaveSpeedModels();

  // 3. Khởi tạo dữ liệu khi vào trang
  const initModel = () => {
    const modelId = decodeURIComponent(route.params.id as string);

    // Tìm model trong danh sách đã tải
    const found = models.value.find((m) => m.model_id === modelId);

    if (found) {
      currentModel.value = found;
      initializeForm(found);
    } else {
      // Nếu chưa có data (reload trang), redirect về home hoặc fetch lại (ở đây chọn về home cho đơn giản)
      router.push("/");
    }
  };

  // 4. Logic tạo Form mặc định từ Schema
  const initializeForm = (model: WaveSpeedModel) => {
    const schema =
      model.api_schema?.api_schemas?.[0]?.request_schema?.properties || {};
    const initialData: Record<string, any> = {};

    for (const [key, config] of Object.entries(schema)) {
      if (config.default !== undefined) {
        initialData[key] = config.default;
      } else if (config.type === "integer" || config.type === "number") {
        initialData[key] = 0;
      } else if (config.type === "boolean") {
        initialData[key] = false;
      } else if (config.type === "array") {
        // 👇 UPDATE: Nếu là array (ví dụ: images), khởi tạo mảng có 1 phần tử rỗng để hiện input
        initialData[key] = [""];
      } else {
        initialData[key] = "";
      }
    }
    formData.value = initialData;
  };

  // 5. Action: Gửi lệnh Generate
  const generate = async () => {
    if (!currentModel.value) return;

    isGenerating.value = true;
    error.value = null;
    result.value = null;

    const apiInfo = currentModel.value.api_schema?.api_schemas?.[0];
    if (!apiInfo) {
      error.value = "Model này không có thông tin API hợp lệ.";
      isGenerating.value = false;
      return;
    }

    try {
      const response = await $fetch("/api/wavespeed/run", {
        method: "POST",
        body: {
          url: apiInfo.api_path,
          method: apiInfo.method,
          payload: formData.value,
        },
      });
      result.value = response;
    } catch (err: any) {
      error.value =
        err.data?.message || err.message || "Có lỗi xảy ra khi tạo.";
    } finally {
      isGenerating.value = false;
    }
  };

  return {
    currentModel,
    formData,
    isGenerating,
    result,
    error,
    initModel,
    generate,
  };
};
