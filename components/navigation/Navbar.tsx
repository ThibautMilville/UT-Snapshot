"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "@/lib/motion"
import { Search, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "@/contexts/TranslationContext"
import { useClickOutside } from "@/hooks/useClickOutside"
import { NAV_ITEMS } from "@/lib/constants/navigation"
import { getFlag } from "@/lib/utils/flags"

import { NavItems } from "./NavItems"
import { UserMenu } from "./UserMenu"
import { LanguageSelector } from "../language/LanguageSelector"
import { MobileMenu } from "./MobileMenu"

export function Navbar() {
  const { isAuthenticated, isConnecting, connectWallet } = useAuth()
  const { currentLang, setCurrentLang, t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)

  useClickOutside(langMenuRef, () => setIsLangMenuOpen(false))

  const getCurrentFlag = () => getFlag(currentLang)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="w-full px-4 md:px-8 py-3">
        <div className="flex items-center w-full relative">
          {/* Logo à gauche */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Image
                  src="/logo-ut.png"
                  alt="UT-Snapshot"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain group-hover:drop-shadow-lg transition-all duration-300"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
              </div>
              <div className="hidden xl:block">
                <span className="text-lg font-bold text-white">
                  UT-Snapshot
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation au centre absolu */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
            <NavItems items={NAV_ITEMS} />
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Barre de recherche compacte */}
            <div className="hidden lg:block relative w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder={t('general.search')}
                className="pl-10 pr-4 h-10 text-sm bg-white/5 border-white/10 hover:border-purple-400/30 focus:border-purple-400/50 w-full text-white placeholder:text-gray-400 rounded-full transition-all duration-300"
              />
            </div>

            {/* Menu utilisateur ou bouton de connexion */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden md:flex">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 hover:scale-105"
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
              </div>
            )}

            {/* Sélecteur de langue */}
            <LanguageSelector
              isOpen={isLangMenuOpen}
              setIsOpen={setIsLangMenuOpen}
              currentLang={currentLang}
              handleLanguageChange={setCurrentLang}
              getCurrentFlag={getCurrentFlag}
              langMenuRef={langMenuRef}
            />

            {/* Menu mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-full hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={NAV_ITEMS}
        />
      </div>
    </nav>
  )
} 