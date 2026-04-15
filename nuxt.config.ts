// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  plugins: [{ src: "~/plugins/simpleanalytics.client.js", ssr: false }],
  css: [
    "~/assets/css/main.css",
    "~/assets/css/base.css",
    "~/assets/css/typography.css",
    "~/assets/css/layout.css",
    "~/assets/css/hero.css",
    "~/assets/css/cards.css",
    "~/assets/css/ui.css",
    "~/assets/css/nav.css",
    "~/assets/css/social.css",
    "~/assets/css/effects.css",
  ],
  app: {
    head: {
      script: [
        {
          src: "https://umami.nabster.dev/script.js",
          defer: true,
          "data-website-id": "689401ec-4af8-4f72-93ad-f82ed07d61e7",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
        },
      ],
    },
  },
  vite: {
    assetsInclude: ["**/*.mp4", "**/*.webm"],
  },
})
