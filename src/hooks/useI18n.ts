import zhTranslation from '@/utils/locales/zh.json'
import enTranslation from '@/utils/locales/en.json'
import { useLanguageStore } from '@/stores/useLanguage'

export default function useI18n() {
  const { lang } = useLanguageStore()
  const locales = lang === 'en' ? enTranslation : zhTranslation

  return name => {
    return locales[name]
  }
}
