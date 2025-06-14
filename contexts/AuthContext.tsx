"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "sonner"

interface UltraWalletResponse {
  status: 'success' | 'error';
  data: {
    blockchainid: string;
    // Ajoutez d'autres propriétés si nécessaire
  };
}

interface AuthContextType {
  isAuthenticated: boolean
  isConnecting: boolean
  walletAddress: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
}

declare global {
  interface Window {
    ultra?: {
      connect: () => Promise<UltraWalletResponse>;
      disconnect: () => Promise<void>;
    };
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      setIsConnecting(true)

      if (!window.ultra) {
        toast.error("Extension not found", {
          description: "Please install the Ultra Wallet extension to continue.",
          action: {
            label: "Install Extension",
            onClick: () => window.open('https://chromewebstore.google.com/detail/ultra-wallet/kjjebdkfeagdoogagbhepmbimaphnfln?hl=en%20(', '_blank')
          },
          duration: 5000,
        })
        return
      }

      const result = await window.ultra.connect()
      
      if (result.status === 'success' && result.data) {
        setIsAuthenticated(true)
        setWalletAddress(result.data.blockchainid)
        toast.success("Wallet Connected", {
          description: `Successfully connected to account ${result.data.blockchainid}`,
          duration: 3000,
        })
      } else {
        toast.error("Connection Failed", {
          description: "No account found in your wallet.",
          duration: 3000,
        })
      }
    } catch (err) {
      toast.error("Connection Error", {
        description: err instanceof Error ? err.message : "Failed to connect wallet",
        duration: 3000,
      })
      console.error("Wallet connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      if (window.ultra) {
        await window.ultra.disconnect()
        setIsAuthenticated(false)
        setWalletAddress(null)
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

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ultra) {
        try {
          const result = await window.ultra.connect()
          if (result.status === 'success' && result.data) {
            setIsAuthenticated(true)
            setWalletAddress(result.data.blockchainid)
          }
        } catch (err) {
          console.error("Failed to check wallet connection:", err)
        }
      }
    }

    checkConnection()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isConnecting,
        walletAddress,
        connectWallet,
        disconnectWallet,
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