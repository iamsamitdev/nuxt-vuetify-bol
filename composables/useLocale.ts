import { useLocaleStore } from '@/stores/locale'

export const useLocale = () => {
  const { setLocale, locale: currentLocale } = useI18n()
  const localeStore = useLocaleStore()

  // Initialize locale from store on client side
  if (import.meta.client) {
    onMounted(() => {
      if (localeStore.locale && localeStore.locale !== currentLocale.value) {
        setLocale(localeStore.locale)
      }
    })
  }

  // Function to change language
  const changeLanguage = (lang: string) => {
    setLocale(lang)
    localeStore.setLocale(lang)
  }

  return {
    currentLocale: readonly(currentLocale),
    storeLocale: readonly(toRef(localeStore, 'locale')),
    changeLanguage
  }
}
