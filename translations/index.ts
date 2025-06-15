import fr from './fr'
import en from './en'
import de from './de'
import { TranslationKey } from '../types/translations.types'

export const translations: Record<'fr' | 'en' | 'de', Record<TranslationKey, string>> = {
  fr,
  en,
  de
}

export * from '../types/translations.types' 