import en from "@/locales/en.json";
import th from "@/locales/th.json";
import la from "@/locales/la.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: {
    en,
    th,
    la
  },
  defaultLocale: "en",
  vueI18n: {
    fallbackLocale: "en",
  },
  detectBrowserLanguage: {
    useCookie: true,
  },
}))