import { ReactElement, RefObject } from 'react'
import { Language } from './translations.types'

export interface LanguageSelectorProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  currentLang: Language
  handleLanguageChange: (lang: Language) => void
  getCurrentFlag: () => ReactElement
  langMenuRef: RefObject<HTMLDivElement>
}

export interface LanguageButtonProps {
  lang: Language
  isActive: boolean
  onClick: (lang: Language) => void
} 