<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Speed AI` : "AI Hub";
  },
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
  ],
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
