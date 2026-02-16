// nuxt.config.ts
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/google-fonts",
  ],

  // Google Fonts
  googleFonts: {
    families: { Inter: [400, 500, 600, 700] },
    display: "swap",
  },

  // Supabase
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/register", "/forgot-password"],
      cookieRedirect: false,
    },
    redirect: false,
  },

  runtimeConfig: {
    wavespeedApiKey: process.env.WAVESPEED_API_KEY,
  },

  // App Config
  app: {
    head: {
      title: "Speed AI Hub",
      bodyAttrs: {
        // 👇 Xóa class 'bg-background' gây lỗi, dùng class chuẩn của Tailwind
        class:
          "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200 antialiased",
      },
    },
  },
});
