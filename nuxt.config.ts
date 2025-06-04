// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
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
    ]
  ],
  runtimeConfig: {
    public: {
       strapi: {
         url: process.env.STRAPI_URL || "http://localhost:1337/api",
       },
       urlroot: process.env.STRAPI_URL_ROOT || "http://localhost:1337",
    }
  },
})
