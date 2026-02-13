<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const router = useRouter();

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});
const loading = ref(false);
const errorMsg = ref("");
const successMsg = ref("");

const handleRegister = async () => {
  if (!form.email || !form.password || !form.confirmPassword) {
    errorMsg.value = "Vui lòng nhập đầy đủ thông tin";
    return;
  }
  if (form.password !== form.confirmPassword) {
    errorMsg.value = "Mật khẩu xác nhận không khớp";
    return;
  }

  loading.value = true;
  errorMsg.value = "";
  successMsg.value = "";

  try {
    const { error } = await client.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        // Redirect về trang confirm sau khi click link trong email
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    });

    if (error) throw error;

    successMsg.value =
      "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.";
  } catch (error: any) {
    errorMsg.value = error.message || "Đăng ký thất bại";
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
          Đăng ký tài khoản
        </h1>
        <p class="text-sm text-slate-500">
          Tạo tài khoản mới để sử dụng SPEED AI
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <UiInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="name@example.com"
        />
        <UiInput
          v-model="form.password"
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
        />
        <UiInput
          v-model="form.confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••••"
        />

        <div
          v-if="errorMsg"
          class="p-3 rounded-md bg-red-50 border border-red-100 text-sm text-red-600"
        >
          {{ errorMsg }}
        </div>
        <div
          v-if="successMsg"
          class="p-3 rounded-md bg-green-50 border border-green-100 text-sm text-green-600"
        >
          {{ successMsg }}
        </div>

        <UiButton type="submit" :loading="loading" class="w-full"
          >Đăng ký</UiButton
        >
      </form>

      <div class="text-center text-sm">
        <span class="text-slate-500">Đã có tài khoản? </span>
        <NuxtLink
          to="/login"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng nhập ngay
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
