<script setup lang="ts">
// Set auth layout
definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const router = useRouter();

// Form state
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
    errorMsg.value = "Vui lòng nhập đầy đủ thông tin.";
    return;
  }
  if (form.password !== form.confirmPassword) {
    errorMsg.value = "Mật khẩu xác nhận không khớp.";
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
    errorMsg.value = error.message || "Đăng ký thất bại.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-background px-4">
    <div class="w-full max-w-sm space-y-8">
      <!-- Header -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold tracking-tight text-foreground">
          Đăng ký tài khoản
        </h1>
        <p class="text-sm text-muted-foreground">
          Tạo tài khoản mới để sử dụng SPEED AI
        </p>
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <UiInput
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Nhập email của bạn"
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

        <!-- Error and Success Messages -->
        <div
          v-if="errorMsg"
          class="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm text-destructive"
        >
          {{ errorMsg }}
        </div>
        <div v-if="successMsg" class="p-3 rounded-md bg-green-900 border-green-800 text-sm text-green-400">
          {{ successMsg }}
        </div>

        <!-- Submit Button -->
        <UiButton type="submit" :loading="loading" class="w-full">
          Đăng ký
        </UiButton>
      </form>

      <!-- Login Link -->
      <div class="text-center text-sm">
        <span class="text-muted-foreground">Đã có tài khoản? </span>
        <NuxtLink
          to="/login"
          class="font-medium text-primary hover:text-primary/90"
        >
        Đăng nhập ngay
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
