<script setup lang="ts">
const {
  models,
  availableTypes,
  status,
  error,
  searchQuery,
  selectedType,
  refresh,
  selectModel,
} = useWaveSpeedModels();
const isLoading = computed(() => !!status.value);
</script>

<template>
  <div class="space-y-6">
    <div
      class="flex flex-col md:flex-row justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6"
    >
      <div>
        <h1 class="text-3xl font-bold text-primary flex items-center gap-2">
          <UIcon name="i-heroicons-cpu-chip" class="w-8 h-8" /> AI Library
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Kho models AI từ WaveSpeed.
        </p>
      </div>

      <div class="flex gap-2 items-center">
        <UButton
          icon="i-heroicons-arrow-path"
          color="neutral"
          variant="ghost"
          :loading="isLoading"
          @click="refresh"
        />
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Tìm kiếm..."
          class="w-full md:w-64"
        />
        <USelect
          v-model="selectedType"
          :items="['all', ...availableTypes]"
          class="w-40"
        />
      </div>
    </div>

    <div
      v-if="isLoading && models.length === 0"
      class="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <UCard v-for="i in 6" :key="i">
        <div class="space-y-2">
          <USkeleton class="h-4 w-62.5" />
          <USkeleton class="h-4 w-50" />
        </div>
      </UCard>
    </div>

    <div
      v-else-if="models.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <UCard
        v-for="model in models"
        :key="model.model_id"
        class="cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
        @click="selectModel(model)"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <UBadge color="neutral" variant="subtle">{{ model.type }}</UBadge>
            <UBadge color="success" variant="subtle"
              >${{ model.base_price }}</UBadge
            >
          </div>
        </template>
        <h3 class="font-bold text-lg mb-2 truncate">{{ model.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
          {{ model.description || "Chưa có mô tả" }}
        </p>
      </UCard>
    </div>

    <div v-else class="text-center py-20 text-gray-500">
      Không tìm thấy model nào.
    </div>
  </div>
</template>
