"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { translations, Language, TranslationKey } from '../translations'

interface TranslationContextType {
  currentLang: Language
  setCurrentLang: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, any>) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const getInitialLanguage = (pathname?: string): Language => {
  // En mode SSR, utiliser la langue de l'URL si disponible
  if (pathname) {
    const urlLang = pathname.split('/')[1];
    if (urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') {
      return urlLang as Language;
    }
  }
  
  // Côté client uniquement
  if (typeof window !== 'undefined') {
    // Essayer d'abord de récupérer la langue depuis l'URL
    const urlLang = window.location.pathname.split('/')[1];
    if (urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') {
      return urlLang as Language;
    }
    
    // Ensuite le localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en' || savedLang === 'de')) {
      return savedLang;
    }
    
    // Enfin la langue du navigateur
    const lang = navigator.language.toLowerCase().split('-')[0]
    if (lang === 'fr' || lang === 'en' || lang === 'de') {
      return lang as Language
    }
  }
  
  return 'fr' // Langue par défaut
}

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return getInitialLanguage(pathname)
  })
  
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydratation côté client
  useEffect(() => {
    setIsHydrated(true)
    
    // Synchroniser avec l'URL côté client après hydratation
    if (typeof window !== 'undefined') {
      const urlLang = window.location.pathname.split('/')[1];
      if ((urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') && urlLang !== currentLang) {
        setCurrentLang(urlLang as Language);
      }
    }
  }, [])

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('language', currentLang)
    }
  }, [currentLang, isHydrated])

  // Écouter les changements d'URL pour mettre à jour la langue
  useEffect(() => {
    const handleLocationChange = () => {
      const urlLang = window.location.pathname.split('/')[1];
      if ((urlLang === 'fr' || urlLang === 'en' || urlLang === 'de') && urlLang !== currentLang) {
        setCurrentLang(urlLang as Language);
      }
    };

    // Écouter les changements de navigation
    window.addEventListener('popstate', handleLocationChange);
    
    // Vérifier immédiatement
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [currentLang])

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang)
    
    if (typeof window !== 'undefined') {
      // Rediriger vers la nouvelle URL avec la langue
      const currentPath = pathname
      const pathWithoutLang = currentPath.replace(/^\/(fr|en|de)/, '') || '/'
      const newPath = `/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`
      
      // Utiliser window.location pour éviter les problèmes de routing
      window.location.href = newPath
    }
  }

  const t = (key: TranslationKey, params?: Record<string, any>): string => {
    const translation = translations[currentLang][key]
    if (typeof translation === 'string' && params) {
      return translation.replace(/\{(\w+)\}/g, (_, key) => {
        return params[key]?.toString() || `{${key}}`
      })
    }
    return translation
  }

  return (
    <TranslationContext.Provider value={{ currentLang, setCurrentLang: handleLanguageChange, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
} 