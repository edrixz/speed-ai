<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const user = useSupabaseUser();
const router = useRouter();

// Theo dõi user, nếu đã có session thì đá về trang chủ
watch(
  user,
  () => {
    if (user.value) {
      router.push("/");
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"
      ></div>
      <p class="text-slate-500">Đang xác thực...</p>
    </div>
  </div>
</template>
