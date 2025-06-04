// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  routeRules: {
    '/backend/**': { ssr: false }, // Disable SSR for backend routes
    '/': { ssr: true }, // Enable SSR for the home page
  },
  css: [
    "@/assets/scss/style.scss"
  ],
  build: {
    transpile: [
      'vuetify',
    ]
  },
  vite: {
    ssr: {
      noExternal: [
        'vuetify',
      ]
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    [
      "@nuxtjs/robots",
      {
        UserAgent: '*',
        Disallow: '',
      }
    ],
  ],
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  runtimeConfig: {
    public: {
       strapi: {
         url: process.env.STRAPI_URL || "http://localhost:1337/api",
       },
       urlroot: process.env.STRAPI_URL_ROOT || "http://localhost:1337",
    }
  },
})
