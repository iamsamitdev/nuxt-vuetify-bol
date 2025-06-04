import { defineStore } from "pinia"

export const useLocaleStore = defineStore("locale", {
  // State
  state: () => ({
    locale: "en",
  }),

  // use pinia-plugin-persistedstate to persist the store
  persist: {
    key: 'locale-store',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },

  // Actions
  actions: {
    // Set the locale
    setLocale(locale: string) {
      this.locale = locale
      // Update i18n locale on client side
      if (import.meta.client) {
        const nuxtApp = useNuxtApp()
        if (nuxtApp.$i18n) {
          nuxtApp.$i18n.setLocale(locale)
        }
      }
    },
  },
})