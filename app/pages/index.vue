<script setup lang="ts">
import { Search, Loader2, Cpu, Sparkles, Filter } from "lucide-vue-next";

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
</script>

<template>
  <div class="space-y-8">
    <div
      class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6"
    >
      <div>
        <h1
          class="text-3xl font-bold tracking-tight flex items-center gap-3 mb-2"
        >
          <Cpu class="w-8 h-8 text-primary" />
          <span
            class="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            AI Model Library
          </span>
        </h1>
        <p class="text-muted-foreground">
          Khám phá kho model AI từ WaveSpeed API.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div class="relative flex-1 md:w-64">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm model..."
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div class="relative">
          <Filter
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
          <select
            v-model="selectedType"
            class="h-10 rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer w-full md:w-[180px] appearance-none"
          >
            <option v-for="t in availableTypes" :key="t" :value="t">
              {{ t === "all" ? "Tất cả loại" : t.toUpperCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div
      v-if="status === 'pending'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-56 rounded-xl bg-muted/50 border border-border animate-pulse"
      ></div>
    </div>

    <div
      v-else-if="status === 'error'"
      class="flex flex-col items-center justify-center py-12 text-destructive bg-destructive/5 rounded-xl border border-destructive/20"
    >
      <Loader2 class="w-8 h-8 animate-spin mb-4" />
      <p class="font-medium">Lỗi kết nối WaveSpeed API</p>
      <p class="text-sm opacity-80 mb-4">{{ error?.message }}</p>
      <button
        @click="refresh"
        class="px-4 py-2 bg-background border border-border rounded-md hover:bg-accent text-sm cursor-pointer"
      >
        Thử lại
      </button>
    </div>

    <div
      v-else-if="models.length === 0"
      class="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border"
    >
      <Sparkles
        class="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50"
      />
      <p class="text-muted-foreground">Không tìm thấy model nào phù hợp.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="model in models"
        :key="model.model_id"
        @click="selectModel(model)"
        class="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full hover:shadow-lg hover:shadow-primary/5"
      >
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-4">
            <span
              class="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
            >
              {{ model.type }}
            </span>
            <span
              class="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
            >
              ${{ model.base_price }}
            </span>
          </div>

          <h3
            class="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1"
          >
            {{ model.name }}
          </h3>

          <p class="text-sm text-muted-foreground line-clamp-3 mb-4">
            {{ model.description || "Chưa có mô tả." }}
          </p>
        </div>

        <div
          class="px-6 py-3 bg-muted/30 border-t border-border mt-auto flex items-center justify-between"
        >
          <code
            class="text-[10px] text-muted-foreground truncate max-w-[150px]"
            :title="model.model_id"
          >
            {{ model.model_id }}
          </code>
          <span
            class="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Chọn →
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
