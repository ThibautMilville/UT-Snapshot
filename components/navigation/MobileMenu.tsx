import Link from "next/link"
import { motion, AnimatePresence } from "@/lib/motion"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "@/contexts/TranslationContext"
import { NAV_ITEMS } from "@/lib/constants/navigation"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: typeof NAV_ITEMS
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const { isAuthenticated, isConnecting, connectWallet } = useAuth()
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 border-t border-white/10 pt-4"
        >
          <div className="flex flex-col space-y-4">
            {/* Barre de recherche mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('general.search')}
                className="pl-10 pr-4 h-11 text-sm bg-white/5 border-white/10 hover:border-purple-400/30 focus:border-purple-400/50 w-full text-white placeholder:text-gray-400 rounded-full transition-all duration-300"
              />
            </div>

            {/* Navigation mobile */}
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 text-white">
                    {item.icon && <item.icon size={20} className="text-purple-400" />}
                    <span>{t(item.labelKey)}</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bouton de connexion mobile */}
            {!isAuthenticated && (
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3"
                onClick={connectWallet}
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('wallet.connecting')}</span>
                  </>
                ) : (
                  <span>{t('wallet.connect')}</span>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 