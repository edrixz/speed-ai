// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],
  // Cấu hình Color Mode
  colorMode: {
    classSuffix: "", // Tạo class 'dark' thay vì 'dark-mode' khớp với Tailwind
    preference: "dark", // Mặc định là Dark Mode
    fallback: "dark", // Fallback nếu không xác định được hệ thống
  },
  // Cấu hình Supabase Auth
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: undefined,
      exclude: ["/register", "/forgot-password"],
      cookieRedirect: false,
    },
    redirect: false,
  },
  // Runtime Config
  runtimeConfig: {
    wavespeedApiKey: process.env.WAVESPEED_API_KEY,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },
  css: ["~/assets/css/main.css"],
  // Tối ưu hóa SEO & Meta
  app: {
    head: {
      title: "WaveSpeed AI Hub",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "AI Generation Dashboard using WaveSpeed API",
        },
      ],
    },
  },
});
