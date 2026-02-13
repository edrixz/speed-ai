export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  // Danh sách các trang public không cần login
  const publicRoutes = ["/login", "/register", "/confirm"];

  // 1. Nếu chưa login mà cố vào trang private -> đá về login
  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo("/login");
  }

  // 2. Nếu đã login mà cố vào trang login -> đá về home
  if (user.value && publicRoutes.includes(to.path)) {
    return navigateTo("/");
  }
});
