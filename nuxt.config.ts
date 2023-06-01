import { message } from "./utils/fetchAdress";

export default defineNuxtConfig({
  css: ["vue3-carousel/dist/carousel.css", "~/assets/main.css"],
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
      "nuxt-mail",
      {
        message: {
          to: "aleksandr_kalinin_1995@mail.ru",
        },
        smtp: {
          host: "smtp.gmail.com",
          port: 465,
          auth: {
            user: "1995kalininaleksandr@gmail.com",
            pass: "ltgreftivxgjqfqq",
          },
        },
      },
    ],
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
