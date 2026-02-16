<script setup lang="ts">
definePageMeta({ layout: "auth" });

const client = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();

const state = reactive({ email: "", password: "" });
const loading = ref(false);

const handleLogin = async () => {
  if (!state.email || !state.password) return;
  loading.value = true;

  const { error } = await client.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  });

  loading.value = false;

  if (error) {
    toast.add({
      title: "Lỗi",
      description: error.message,
      color: "error",
      icon: "i-heroicons-exclamation-circle",
    });
  }
};

watch(
  user,
  (u) => {
    if (u) navigateTo("/");
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-xl font-bold text-center">WaveSpeed AI</h1>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-1">
          <label class="text-sm font-medium">Email</label>
          <UInput
            v-model="state.email"
            icon="i-heroicons-envelope"
            placeholder="admin@example.com"
            class="w-full"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Mật khẩu</label>
          <UInput
            v-model="state.password"
            type="password"
            icon="i-heroicons-lock-closed"
            class="w-full"
          />
        </div>

        <UButton
          type="submit"
          block
          :loading="loading"
          color="primary"
          size="lg"
        >
          Đăng nhập
        </UButton>
      </form>

      <template #footer>
        <div class="text-center text-sm text-gray-500">
          Chưa có tài khoản?
          <NuxtLink to="/register" class="text-primary hover:underline"
            >Đăng ký</NuxtLink
          >
        </div>
      </template>
    </UCard>
  </div>
</template>
