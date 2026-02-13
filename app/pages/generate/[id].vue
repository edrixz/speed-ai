<script setup lang="ts">
import {
  ArrowLeft,
  Zap,
  AlertCircle,
  CheckCircle2,
  Trash2,
  PlusCircle,
} from "lucide-vue-next";

// Sử dụng Composable
const {
  currentModel,
  formData,
  isGenerating,
  result,
  error,
  initModel,
  generate,
} = useGenerate();

// Khởi chạy khi mount
onMounted(() => {
  initModel();
});

// Helper: Lấy schema properties để render vòng lặp
const schemaProperties = computed(() => {
  return (
    currentModel.value?.api_schema?.api_schemas?.[0]?.request_schema
      ?.properties || {}
  );
});
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <NuxtLink
      to="/"
      class="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      <ArrowLeft class="w-4 h-4 mr-2" /> Quay lại thư viện
    </NuxtLink>

    <div v-if="currentModel" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1 space-y-6">
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ currentModel.name }}</h1>
          <p class="text-sm text-muted-foreground">
            {{ currentModel.description }}
          </p>
        </div>

        <form
          @submit.prevent="generate"
          class="space-y-4 bg-card p-6 rounded-xl border border-border shadow-sm"
        >
          <div
            v-for="(config, key) in schemaProperties"
            :key="key"
            class="space-y-1.5"
          >
            <div
              v-if="key !== 'enable_safety_checker'"
              class="space-y-1.5 mb-4"
            >
              <label
                class="text-sm font-medium flex items-center justify-between"
              >
                {{ key }}
                <span v-if="config.required" class="text-red-500 ml-1">*</span>
              </label>

              <div v-if="config.enum">
                <select
                  v-model="formData[key]"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option v-for="opt in config.enum" :key="opt" :value="opt">
                    {{ opt }}
                  </option>
                </select>
              </div>

              <div v-else-if="config.type === 'array'" class="space-y-2">
                <div
                  v-for="(item, index) in formData[key]"
                  :key="index"
                  class="flex gap-2"
                >
                  <input
                    type="text"
                    v-model="formData[key][index]"
                    placeholder="https://example.com/image.png"
                    class="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    v-if="formData[key].length > 1"
                    type="button"
                    @click="formData[key].splice(index, 1)"
                    class="p-2 text-destructive hover:bg-destructive/10 rounded-md"
                    title="Xóa ảnh này"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  @click="formData[key].push('')"
                  class="text-xs flex items-center text-primary hover:underline mt-1"
                >
                  <PlusCircle class="w-3 h-3 mr-1" /> Thêm ảnh khác
                </button>
              </div>

              <div
                v-else-if="config.type === 'boolean'"
                class="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  v-model="formData[key]"
                  class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span class="text-sm text-muted-foreground">Bật/Tắt</span>
              </div>

              <div
                v-else-if="
                  config.type === 'integer' || config.type === 'number'
                "
              >
                <input
                  type="number"
                  v-model.number="formData[key]"
                  :min="config.minimum"
                  :max="config.maximum"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div v-else-if="key.includes('prompt')">
                <textarea
                  v-model="formData[key]"
                  rows="3"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                ></textarea>
              </div>

              <div v-else>
                <input
                  type="text"
                  v-model="formData[key]"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <p
                v-if="config.description"
                class="text-[10px] text-muted-foreground"
              >
                {{ config.description }}
              </p>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isGenerating"
            class="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap v-if="!isGenerating" class="w-4 h-4 mr-2" />
            <Loader2 v-else class="w-4 h-4 mr-2 animate-spin" />
            {{ isGenerating ? "Đang xử lý..." : "Generate" }}
          </button>
        </form>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <h2 class="text-lg font-semibold">Kết quả</h2>

        <div
          class="min-h-[400px] rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center relative overflow-hidden"
        >
          <div
            v-if="!result && !isGenerating && !error"
            class="text-center text-muted-foreground"
          >
            <Zap class="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>Nhập thông tin và nhấn Generate</p>
          </div>

          <div
            v-if="isGenerating"
            class="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
          >
            <Loader2 class="w-10 h-10 animate-spin text-primary mb-4" />
            <p class="animate-pulse font-medium">AI đang suy nghĩ...</p>
          </div>

          <div v-if="error" class="p-6 text-center max-w-md">
            <AlertCircle class="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 class="font-bold text-red-500 mb-1">Thất bại</h3>
            <p class="text-sm text-muted-foreground">{{ error }}</p>
          </div>

          <div v-if="result" class="w-full h-full p-4 overflow-auto">
            <div
              class="bg-green-500/10 text-green-600 p-3 rounded-lg mb-4 flex items-center text-sm"
            >
              <CheckCircle2 class="w-4 h-4 mr-2" /> Generate thành công!
            </div>

            <pre
              class="text-xs font-mono bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto"
              >{{ result }}</pre
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
