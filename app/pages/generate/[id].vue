<script setup lang="ts">
const {
  currentModel,
  formData,
  isGenerating,
  result,
  error,
  initModel,
  generate,
} = useGenerate();
onMounted(initModel);

// Helper lấy schema
const schemaProperties = computed(() => {
  return (
    currentModel.value?.api_schema?.api_schemas?.[0]?.request_schema
      ?.properties || {}
  );
});
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <UButton to="/" icon="i-heroicons-arrow-left" variant="ghost" class="mb-4"
      >Quay lại</UButton
    >

    <div v-if="currentModel" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <UCard class="lg:col-span-1 h-fit">
        <template #header>
          <h2 class="font-bold text-lg">{{ currentModel.name }}</h2>
        </template>

        <form @submit.prevent="generate" class="space-y-4">
          <div v-for="(config, key) in schemaProperties" :key="key">
            <div v-if="key !== 'enable_safety_checker'">
              <UFormGroup :label="String(key)" :required="config.required">
                <USelect
                  v-if="config.enum"
                  v-model="formData[key]"
                  :options="config.enum"
                />

                <UToggle
                  v-else-if="config.type === 'boolean'"
                  v-model="formData[key]"
                />

                <UInput
                  v-else-if="
                    config.type === 'integer' || config.type === 'number'
                  "
                  type="number"
                  v-model.number="formData[key]"
                />

                <UTextarea
                  v-else-if="key.includes('prompt')"
                  v-model="formData[key]"
                  :rows="4"
                  autoresize
                />

                <div v-else-if="config.type === 'array'" class="space-y-2">
                  <div
                    v-for="(item, idx) in formData[key]"
                    :key="idx"
                    class="flex gap-2"
                  >
                    <UInput
                      v-model="formData[key][idx]"
                      class="w-full"
                      placeholder="URL ảnh..."
                    />
                    <UButton
                      v-if="formData[key].length > 1"
                      icon="i-heroicons-trash"
                      color="error"
                      variant="ghost"
                      @click="formData[key].splice(idx, 1)"
                    />
                  </div>
                  <UButton
                    size="xs"
                    variant="soft"
                    @click="formData[key].push('')"
                    >Thêm ảnh</UButton
                  >
                </div>

                <UInput v-else v-model="formData[key]" />
              </UFormGroup>
            </div>
          </div>

          <UButton type="submit" block :loading="isGenerating" size="lg">
            Generate
          </UButton>
        </form>
      </UCard>

      <div class="lg:col-span-2">
        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl min-h-125 flex items-center justify-center relative bg-gray-50 dark:bg-gray-800/50"
        >
          <div
            v-if="!result && !isGenerating"
            class="text-center text-gray-400"
          >
            <UIcon name="i-heroicons-sparkles" class="w-16 h-16 mb-2" />
            <p>Sẵn sàng sáng tạo!</p>
          </div>

          <div
            v-if="isGenerating"
            class="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex flex-col items-center justify-center z-10"
          >
            <UIcon
              name="i-heroicons-arrow-path"
              class="w-12 h-12 animate-spin text-primary-500"
            />
            <p class="mt-2 font-medium">AI đang vẽ...</p>
          </div>

          <div v-if="result" class="p-4 w-full h-full overflow-auto">
            <UAlert
              color="success"
              variant="soft"
              title="Thành công!"
              icon="i-heroicons-check-circle"
              class="mb-4"
            />
            <pre class="bg-gray-900 text-green-400 p-4 rounded text-xs">{{
              result
            }}</pre>
          </div>

          <div v-if="error" class="p-4 w-full">
            <UAlert
              color="error"
              variant="soft"
              title="Thất bại"
              :description="error"
              icon="i-heroicons-x-circle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
