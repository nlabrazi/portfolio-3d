// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nlabrazi/nuxt-layer'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    health: {
      service: 'portfolio-3d',
    },
    public: {
      web3formsAccessKey: '',
      umami: {
        websiteId: '3da21a6b-3e88-4d47-b70a-5627fa5b282c',
        domains: 'nabster.dev',
      },
      site: {
        name: 'Nabil Labrazi',
        url: 'https://nabster.dev',
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    baseUrl: 'https://nabster.dev',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'fr',
        language: 'fr',
        name: 'Français',
        dir: 'ltr',
        file: 'fr.json',
      },
      {
        code: 'en',
        language: 'en',
        name: 'English',
        dir: 'ltr',
        file: 'en.json',
      },
      {
        code: 'ar',
        language: 'ar',
        name: 'العربية',
        dir: 'rtl',
        file: 'ar.json',
      },
    ],
  },
  nitro: {
    prerender: { routes: ['/', '/en/', '/ar/'] },
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/base.css',
    '~/assets/css/typography.css',
    '~/assets/css/layout.css',
    '~/assets/css/hero.css',
    '~/assets/css/cards.css',
    '~/assets/css/ui.css',
    '~/assets/css/nav.css',
    '~/assets/css/social.css',
    '~/assets/css/effects.css',
  ],
  app: {
    head: {
      script: [
        {
          src: '/runtime-config.js',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css',
        },
      ],
    },
  },
})
