import { Language } from "@/types/translations.types"

export const FLAGS = {
  en: (
    <svg className='w-10 h-7' viewBox='0 0 36 24'>
      <rect width='36' height='24' fill='#012169' />
      <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
      <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
      <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
    </svg>
  ),
  fr: (
    <svg className='w-10 h-7' viewBox='0 0 36 24'>
      <rect width='36' height='24' fill='#ED2939' />
      <rect width='12' height='24' fill='#002395' />
      <rect x='12' width='12' height='24' fill='#fff' />
    </svg>
  ),
  de: (
    <svg className='w-10 h-7' viewBox='0 0 36 24'>
      <rect width='36' height='8' fill='#000' />
      <rect y='8' width='36' height='8' fill='#DD0000' />
      <rect y='16' width='36' height='8' fill='#FFCE00' />
    </svg>
  ),
} as const

// Drapeaux plus petits pour le sélecteur
export const SELECTOR_FLAGS = {
  en: (
    <svg className='w-6 h-4' viewBox='0 0 36 24'>
      <rect width='36' height='24' fill='#012169' />
      <path d='M0,0 L36,24 M36,0 L0,24' stroke='#fff' strokeWidth='2.4' />
      <path d='M18,0 L18,24 M0,12 L36,12' stroke='#fff' strokeWidth='4' />
      <path d='M18,0 L18,24 M0,12 L36,12' stroke='#C8102E' strokeWidth='2.4' />
    </svg>
  ),
  fr: (
    <svg className='w-6 h-4' viewBox='0 0 36 24'>
      <rect width='36' height='24' fill='#ED2939' />
      <rect width='12' height='24' fill='#002395' />
      <rect x='12' width='12' height='24' fill='#fff' />
    </svg>
  ),
  de: (
    <svg className='w-6 h-4' viewBox='0 0 36 24'>
      <rect width='36' height='8' fill='#000' />
      <rect y='8' width='36' height='8' fill='#DD0000' />
      <rect y='16' width='36' height='8' fill='#FFCE00' />
    </svg>
  ),
} as const

export const getFlag = (lang: Language) => FLAGS[lang]
export const getSelectorFlag = (lang: Language) => SELECTOR_FLAGS[lang] 