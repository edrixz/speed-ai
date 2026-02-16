<script setup lang="ts">
import type { AuthError } from "@supabase/supabase-js";

definePageMeta({
  layout: "auth",
});

const client = useSupabaseClient();
const toast = useToast();

const form = reactive({
  email: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);

const handleRegister = async () => {
  if (!form.email || !form.password || !form.confirmPassword) {
    toast.add({
      title: "Lỗi",
      description: "Vui lòng nhập đầy đủ thông tin.",
      color: "error",
    });
    return;
  }
  if (form.password !== form.confirmPassword) {
    toast.add({
      title: "Lỗi",
      description: "Mật khẩu xác nhận không khớp.",
      color: "error",
    });
    return;
  }

  loading.value = true;

  try {
    const { error } = await client.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    });

    if (error) throw error; // Supabase trả về AuthError

    toast.add({
      title: "Thành công",
      description: "Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.",
      color: "success",
      icon: "i-heroicons-check-circle",
    });
  } catch (error: unknown) {
    // Xử lý type safe cho error
    let message = "Đăng ký thất bại";

    // Kiểm tra nếu là AuthError của Supabase
    if (error && typeof error === "object" && "message" in error) {
      message = (error as AuthError).message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.add({ title: "Lỗi", description: message, color: "error" });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <UCard class="w-full max-w-sm">
      <template #header>
        <div class="text-center">
          <h1 class="text-xl font-bold">Đăng ký tài khoản</h1>
          <p class="text-sm text-gray-500 mt-1">Tạo tài khoản Speed AI mới</p>
        </div>
      </template>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="space-y-1">
          <label class="text-sm font-medium">Email</label>
          <UInput
            v-model="form.email"
            type="email"
            icon="i-heroicons-envelope"
            placeholder="name@example.com"
            class="w-full"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Mật khẩu</label>
          <UInput
            v-model="form.password"
            type="password"
            icon="i-heroicons-lock-closed"
            placeholder="••••••••"
            class="w-full"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Xác nhận mật khẩu</label>
          <UInput
            v-model="form.confirmPassword"
            type="password"
            icon="i-heroicons-lock-closed"
            placeholder="••••••••"
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
          Đăng ký
        </UButton>
      </form>

      <template #footer>
        <div class="text-center text-sm text-gray-500">
          Đã có tài khoản?
          <NuxtLink
            to="/login"
            class="text-primary hover:underline font-medium"
          >
            Đăng nhập ngay
          </NuxtLink>
        </div>
      </template>
    </UCard>
  </div>
</template>
