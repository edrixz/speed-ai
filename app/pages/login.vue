<script setup lang="ts">
// Layout auth (trống, không có sidebar/header)
definePageMeta({
  layout: "auth",
});

const supabase = useSupabaseClient();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});
const loading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  if (!form.email || !form.password) {
    errorMsg.value = "Vui lòng nhập email và mật khẩu";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) throw error;

    // Middleware sẽ tự redirect, nhưng ta push thủ công cho UX mượt hơn
    router.push("/");
  } catch (err: any) {
    errorMsg.value = err.message || "Đăng nhập thất bại";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div
      class="w-full max-w-sm space-y-6 bg-white p-8 rounded-xl shadow-lg border border-slate-100"
    >
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">
          SPEED AI
        </h1>
        <p class="text-sm text-slate-500">
          Nhập thông tin để truy cập hệ thống
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <UiInput v-model="form.email" label="Email" type="email" />
        <UiInput v-model="form.password" label="Mật khẩu" type="password" />

        <div
          v-if="errorMsg"
          class="p-3 rounded-md bg-red-50 border border-red-100 text-sm text-red-600"
        >
          {{ errorMsg }}
        </div>

        <UiButton type="submit" :loading="loading" class="w-full">
          Đăng nhập
        </UiButton>
      </form>

      <div class="text-center text-sm">
        <span class="text-slate-500">Chưa có tài khoản? </span>
        <NuxtLink
          to="/register"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng ký miễn phí
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
