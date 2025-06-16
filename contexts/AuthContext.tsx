"use client"

import { createContext, useContext, ReactNode } from "react"
import { toast } from "sonner"
import { useUltraWallet } from "@/hooks/useUltraWallet"

interface AuthContextType {
  isAuthenticated: boolean
  isConnecting: boolean
  walletAddress: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  isInstalled: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Export AuthContext pour pouvoir l'importer dans d'autres fichiers
export { AuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    isInstalled,
    isConnected,
    isLoading,
    error,
    blockchainId,
    connect,
    disconnect,
  } = useUltraWallet()

  const connectWallet = async (): Promise<void> => {
    try {
      console.log('🔗 AuthContext: Starting wallet connection...')
      console.log('📱 Wallet installed:', isInstalled)
      console.log('🌐 Window.ultra available:', !!window.ultra)
      
      if (!isInstalled) {
        console.log('❌ Ultra Wallet not installed')
        toast.error("Extension not found", {
          description: "Please install the Ultra Wallet extension to continue.",
          action: {
            label: "Install Extension",
            onClick: () => window.open('https://chromewebstore.google.com/detail/ultra-wallet/kjjebdkfeagdoogagbhepmbimaphnfln?hl=en', '_blank')
          },
          duration: 5000,
        })
        return
      }

      console.log('🚀 Calling connect function...')
      const success = await connect().catch((err) => {
        console.error('Connect function error:', err)
        return false
      })
      
      console.log('✅ Connect result:', success)
      console.log('🆔 Blockchain ID:', blockchainId)
      
      if (success) {
        console.log('✅ AuthContext: Wallet connected successfully')
        toast.success("Wallet Connected", {
          description: `Successfully connected to account ${blockchainId}`,
          duration: 3000,
        })
      } else {
        console.warn('⚠️ AuthContext: Wallet connection failed')
        console.log('❌ Connection failed, error:', error)
        toast.error("Connection Failed", {
          description: error || "Failed to connect to wallet.",
          duration: 3000,
        })
      }
    } catch (err) {
      console.error('❌ AuthContext: Wallet connection error:', err)
      toast.error("Connection Error", {
        description: err instanceof Error ? err.message : "Failed to connect wallet",
        duration: 3000,
      })
    }
  }

  const disconnectWallet = async (): Promise<void> => {
    try {
      const success = await disconnect().catch((err) => {
        console.error('Disconnect function error:', err)
        return false
      })
      
      if (success) {
        toast.success("Wallet Disconnected", {
          description: "Your wallet has been successfully disconnected.",
          duration: 3000,
        })
      }
    } catch (err) {
      toast.error("Disconnection Error", {
        description: "Failed to disconnect wallet",
        duration: 3000,
      })
      console.error("Wallet disconnection error:", err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isConnected,
        isConnecting: isLoading,
        walletAddress: blockchainId,
        connectWallet,
        disconnectWallet,
        isInstalled,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 