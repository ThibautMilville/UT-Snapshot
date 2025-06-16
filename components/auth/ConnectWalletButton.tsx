"use client"

import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useTranslation } from "@/contexts/TranslationContext"

interface ConnectWalletButtonProps {
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link"
}

export function ConnectWalletButton({ 
  className = "", 
  size = "default",
  variant = "default" 
}: ConnectWalletButtonProps) {
  const { connectWallet, isConnecting, isInstalled } = useAuth()
  const { t } = useTranslation()

  const handleConnect = async () => {
    if (!isInstalled) {
      window.open('https://chromewebstore.google.com/detail/ultra-wallet/kjjebdkfeagdoogagbhepmbimaphnfln?hl=en', '_blank')
      return
    }
    await connectWallet()
  }

  return (
    <div className="flex justify-center">
      <Button
        className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 flex items-center gap-2 hover:scale-105 ${className}`}
        onClick={handleConnect}
        disabled={isConnecting}
        size={size}
        variant={variant}
      >
        {isConnecting ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{t('wallet.connecting') || 'Connexion...'}</span>
          </>
        ) : !isInstalled ? (
          <>
            <Wallet className="w-4 h-4" />
            <span>{t('wallet.install') || 'Installer Ultra Wallet'}</span>
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            <span>{t('wallet.connect') || 'Connecter Wallet'}</span>
          </>
        )}
      </Button>
    </div>
  )
} 