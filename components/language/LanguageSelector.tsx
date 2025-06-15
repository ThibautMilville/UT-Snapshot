import { RefObject } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "@/lib/motion"

import { Button } from "@/components/ui/button"
import { useTranslation } from "@/contexts/TranslationContext"
import { Language } from "@/types/translations.types"
import { getFlag, getSelectorFlag } from "@/lib/utils/flags"

interface LanguageSelectorProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  currentLang: Language
  handleLanguageChange: (lang: Language) => void
  getCurrentFlag: () => JSX.Element
  langMenuRef: RefObject<HTMLDivElement | null>
}

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
]

export function LanguageSelector({
  isOpen,
  setIsOpen,
  currentLang,
  handleLanguageChange,
  getCurrentFlag,
  langMenuRef
}: LanguageSelectorProps) {
  const { t } = useTranslation()

  return (
    <div className="relative" ref={langMenuRef}>
      <Button
        variant="ghost"
        size="sm"
        className="h-11 px-3 rounded-full hover:bg-white/10 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getCurrentFlag()}
        <ChevronDown className={`h-4 w-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50"
          >
            <div className="p-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentLang === lang.code
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'hover:bg-white/10 text-white'
                  }`}
                >
                  {getSelectorFlag(lang.code)}
                  <span className="text-sm font-medium">{lang.name}</span>
                  {currentLang === lang.code && (
                    <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 