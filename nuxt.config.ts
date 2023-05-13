export default defineNuxtConfig({
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
