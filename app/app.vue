<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Speed AI` : "AI Hub";
  },
});
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground transition-colors duration-300"
  >
    <NuxtLoadingIndicator color="#4f46e5" :height="3" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
