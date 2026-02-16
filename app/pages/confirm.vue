<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const user = useSupabaseUser();
const router = useRouter();

watch(
  user,
  (newUser) => {
    if (newUser) {
      router.push("/");
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <UCard class="w-full max-w-sm py-10">
      <div class="text-center space-y-4">
        <UIcon
          name="i-heroicons-arrow-path"
          class="w-12 h-12 text-primary animate-spin mx-auto"
        />
        <div>
          <h3 class="font-medium text-lg">Đang xác thực...</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Vui lòng đợi trong giây lát
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
