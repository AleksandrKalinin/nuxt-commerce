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
    "@nuxtjs/google-fonts",
    [
      "@pinia/nuxt",
      {
        autoImports: [["defineStore", "definePiniaStore"]],
      },
    ],
  ],
  googleFonts: {
    families: {
      Raleway: [400, 500, 600, 700],
    },
  },
  routeRules: {
    "/emailbuilder/**": { ssr: false },
    "/admin/**": { ssr: false },
  },
});
