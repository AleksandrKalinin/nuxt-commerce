export default defineNuxtConfig({
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
    "@nuxtjs/tailwindcss",
    [
      "@pinia/nuxt",
      {
        autoImports: [["defineStore", "definePiniaStore"]],
      },
    ],
  ],
});
