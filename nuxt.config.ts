export default defineNuxtConfig({
  css: ["vue3-carousel/dist/carousel.css"],
  runtimeConfig: {
    public: {
      supabaseUrl: "",
      supabaseKey: "",
    },
  },
  typescript: {
    strict: true,
  },
  components: [
    "~/components",
    {
      path: "~/components/base",
      global: true,
    },
  ],
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: [["defineStore", "definePiniaStore"]],
      },
    ],
  ],
});
