<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const user = useSupabaseUser(); // 👇 Lấy user state

const form = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  if (!form.email || !form.password) {
    errorMsg.value = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    const { error } = await client.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) throw error;

    // 👇 LOGIC FIX: Theo dõi user state
    // Ngay khi user có dữ liệu -> Chuyển trang ngay lập tức
    const unwatch = watch(
      user,
      async (newUser) => {
        if (newUser) {
          unwatch(); // Hủy theo dõi để tránh memory leak
          await navigateTo("/");
        }
      },
      { immediate: true },
    );
  } catch (err: any) {
    errorMsg.value = err.message || "Đăng nhập thất bại";
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background px-8">
    <div class="w-full max-w-sm space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold tracking-[0.2rem] text-foreground">
          SPEED AI
        </h1>
        <p class="text-sm text-muted-foreground">
          Nhập thông tin để truy cập hệ thống
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UiInput v-model="form.email" label="Email" type="email" />
        <div>
          <UiInput v-model="form.password" label="Password" type="password" />
        </div>

        <div
          v-if="errorMsg"
          class="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm text-destructive"
        >
          {{ errorMsg }}
        </div>

        <UiButton type="submit" :loading="loading" class="w-full">
          Đăng nhập
        </UiButton>
      </form>

      <div class="text-center text-sm">
        <span class="text-muted-foreground">Chưa có tài khoản? </span>
        <NuxtLink
          to="/register"
          class="font-medium text-primary hover:text-primary/90"
        >
          Đăng ký miễn phí
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
