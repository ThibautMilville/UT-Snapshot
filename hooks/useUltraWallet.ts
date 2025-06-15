import { useState, useEffect, useCallback } from 'react'
import {
  UltraWalletConnectionData,
  UltraWalletResponse,
  UltraWalletError,
  UltraWalletTransactionResponse,
  UltraWalletSignMessageResponse,
  UltraWalletPurchaseResponse,
  UltraWalletConnectOptions,
  UltraWalletSignOptions,
  TransactionObject
} from '../types/ultraWallet'

/**
 * Check if Ultra Wallet is installed
 * @returns boolean indicating if Ultra Wallet is installed
 */
export const isUltraWalletInstalled = (): boolean => {
  const installed = typeof window !== 'undefined' && 'ultra' in window;
  // Check Ultra Wallet installation
  return installed;
}

/**
 * Hook to detect Ultra Wallet installation
 * @returns boolean indicating if Ultra Wallet is installed
 */
export const useUltraWalletDetection = (): boolean => {
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  const [hasLogged, setHasLogged] = useState<boolean>(false)

  useEffect(() => {
    const checkWallet = () => {
      const installed = isUltraWalletInstalled();
      if (!hasLogged) {
        setHasLogged(true);
      }
      setIsInstalled(installed);
    }

    // Check immediately
    checkWallet()

    // Also check after window is fully loaded
    if (document.readyState !== 'complete') {
      window.addEventListener('load', checkWallet)
      return () => window.removeEventListener('load', checkWallet)
    }
  }, [hasLogged])

  return isInstalled
}

export const cleanWalletId = (walletId: string | null): string => {
  if (!walletId) return ''
  return walletId.split('@')[0]
}

/**
 * Hook to manage Ultra Wallet connection
 * @returns Object with wallet connection state and methods
 */
export const useUltraWallet = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [rawBlockchainId, setRawBlockchainId] = useState<string | null>(null)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasAttemptedEagerConnect, setHasAttemptedEagerConnect] = useState<boolean>(false)
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false)

  const blockchainId = cleanWalletId(rawBlockchainId)

  const isInstalled = useUltraWalletDetection()

  // Handle wallet connection
  const connect = useCallback(
    async (options?: UltraWalletConnectOptions): Promise<boolean> => {
      if (!isInstalled || !window.ultra) {
        setError('Ultra Wallet is not installed')
        return false
      }

      setIsLoading(true)
      setError(null)
      setIsDisconnecting(false)

      try {
        console.log('🔗 Attempting to connect to Ultra Wallet...')
        const response = await window.ultra.connect(options)
        console.log('✅ Ultra Wallet response:', response)
        
        if (response && response.data && response.data.blockchainid) {
          setRawBlockchainId(response.data.blockchainid)
          setPublicKey(response.data.publicKey)
          setIsConnected(true)

          // Get chain ID after successful connection
          try {
            const chainResponse = await window.ultra.getChainId()
            setChainId(chainResponse.data)
          } catch (chainErr) {
            console.warn('Failed to get chain ID:', chainErr)
          }

          return true
        } else {
          console.warn('Invalid response from Ultra Wallet:', response)
          setError('Invalid response from Ultra Wallet')
          return false
        }
      } catch (err) {
        console.error('❌ Ultra Wallet connection error:', err)
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Failed to connect to Ultra Wallet')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled]
  )

  // Handle eager connection (connect without user prompt if already trusted)
  const eagerConnect = useCallback(async (): Promise<boolean> => {
    if (hasAttemptedEagerConnect) return false
    setHasAttemptedEagerConnect(true)

    // Only try to connect silently, don't show any notifications for this
    try {
      if (!isInstalled || !window.ultra) {
        return false
      }

      const response = await window.ultra.connect({ onlyIfTrusted: true })
      setRawBlockchainId(response.data.blockchainid)
      setPublicKey(response.data.publicKey)
      setIsConnected(true)
      setIsDisconnecting(false)

      // Get chain ID after successful connection
      try {
        const chainResponse = await window.ultra.getChainId()
        setChainId(chainResponse.data)
      } catch (chainErr) {
        console.error('Failed to get chain ID:', chainErr)
      }

      return true
    } catch {
      return false
    }
  }, [hasAttemptedEagerConnect, isInstalled])

  // Handle wallet disconnection
  const disconnect = useCallback(async (): Promise<boolean> => {
    if (!isInstalled || !window.ultra) {
      return false
    }
    setIsLoading(true)
    setError(null)
    setIsDisconnecting(true)

    try {
      // L'API Ultra Wallet disconnect() retourne Promise<void>
      // Elle ouvre automatiquement la fenêtre de déconnexion
      await window.ultra.disconnect()
      
      // Si on arrive ici, la déconnexion s'est bien passée
      // Nettoyer l'état local
      setIsConnected(false)
      setRawBlockchainId(null)
      setPublicKey(null)
      setChainId(null)
      
      // Délai court avant de permettre la reconnexion
      setTimeout(() => {
        setIsDisconnecting(false)
      }, 1000)
      
      return true
    } catch (err) {
      const ultraErr = err as UltraWalletError
      
      // Si l'utilisateur annule la déconnexion, c'est normal
      if (ultraErr.message?.includes('User rejected') || 
          ultraErr.message?.includes('cancelled') ||
          ultraErr.message?.includes('User denied') ||
          ultraErr.code === 4001) {
        setError(null)
        setTimeout(() => {
          setIsDisconnecting(false)
        }, 500)
        return false
      }
      
      // Pour les autres erreurs, afficher l'erreur mais nettoyer l'état
      setError(ultraErr.message || 'Failed to disconnect from Ultra Wallet')
      
      // En cas d'erreur inattendue, forcer la déconnexion locale
      setIsConnected(false)
      setRawBlockchainId(null)
      setPublicKey(null)
      setChainId(null)
      
      setTimeout(() => {
        setIsDisconnecting(false)
      }, 2000)
      
      return false
    } finally {
      setIsLoading(false)
    }
  }, [isInstalled])

  // Sign a transaction
  const signTransaction = useCallback(
    async (
      txObject: TransactionObject | TransactionObject[],
      options?: UltraWalletSignOptions
    ): Promise<UltraWalletResponse<UltraWalletTransactionResponse> | null> => {
      if (!isInstalled || !window.ultra || !isConnected) {
        setError('Wallet not connected')
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await window.ultra.signTransaction(txObject, options)
        return response
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Transaction signing failed')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled, isConnected]
  )

  // Sign a message
  const signMessage = useCallback(
    async (message: string): Promise<UltraWalletResponse<UltraWalletSignMessageResponse> | null> => {
      if (!isInstalled || !window.ultra || !isConnected) {
        setError('Wallet not connected')
        return null
      }

      // Ensure message has a proper prefix
      const formattedMessage =
        message.startsWith('0x') || message.startsWith('UOSx') || message.startsWith('message:')
          ? message
          : `message:${message}`

      setIsLoading(true)
      setError(null)

      try {
        const response = await window.ultra.signMessage(formattedMessage)
        return response
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Message signing failed')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled, isConnected]
  )

  // Purchase an item (Uniq Factory)
  const purchaseItem = useCallback(
    async (itemType: string, itemId: string): Promise<UltraWalletResponse<UltraWalletPurchaseResponse> | null> => {
      if (!isInstalled || !window.ultra || !isConnected) {
        setError('Wallet not connected')
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await window.ultra.purchaseItem(itemType, itemId)
        return response
      } catch (err) {
        const ultraErr = err as UltraWalletError
        setError(ultraErr.message || 'Purchase failed')
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [isInstalled, isConnected]
  )

  // Set up wallet event listeners and connection checker
  useEffect(() => {
    if (isInstalled && window.ultra?.on) {
      const handleDisconnect = () => {
        setIsConnected(false)
        setRawBlockchainId(null)
        setPublicKey(null)
        setChainId(null)
      }

      const handleConnect = (...args: unknown[]) => {
        const data = args[0] as UltraWalletConnectionData
        if (data && data.blockchainid) {
          setIsConnected(true)
          setRawBlockchainId(data.blockchainid)
          setPublicKey(data.publicKey)
          window.ultra
            ?.getChainId()
            .then(response => {
              setChainId(response.data)
            })
            .catch(console.error)
        }
      }

      // Vérifier périodiquement l'état de connexion
      const checkConnectionStatus = async () => {
        // Ne pas vérifier si on est en train de se déconnecter
        if (isDisconnecting) {
          return
        }
        
        try {
          if (!window.ultra) {
            return
          }
          
          const response = await window.ultra?.connect({ onlyIfTrusted: true })
          if (response?.data?.blockchainid && !isDisconnecting) {
            setIsConnected(true)
            setRawBlockchainId(response.data.blockchainid)
            setPublicKey(response.data.publicKey)
            try {
              const chainResponse = await window.ultra?.getChainId()
              if (chainResponse?.data) {
                setChainId(chainResponse.data)
              }
            } catch (chainErr) {
              // Silently fail for chain ID
              console.debug('Failed to get chain ID during status check:', chainErr)
            }
          }
        } catch (err) {
          // Si la connexion échoue, on considère que le wallet est déconnecté
          // Mais on ne log pas l'erreur car c'est normal si l'utilisateur n'est pas connecté
          if (isConnected && !isDisconnecting) {
            console.debug('Connection status check failed, disconnecting:', err)
            handleDisconnect()
          }
        }
      }

      // Vérifier immédiatement et toutes les 2 secondes
      checkConnectionStatus()
      const intervalId = setInterval(checkConnectionStatus, 2000)

      window.ultra.on('disconnect', handleDisconnect)
      window.ultra.on('connect', handleConnect)

      return () => {
        clearInterval(intervalId)
        window.ultra?.off('disconnect', handleDisconnect)
        window.ultra?.off('connect', handleConnect)
      }
    }
  }, [isInstalled, isConnected, isDisconnecting])

  // Try eager connection on initial load - but only once
  useEffect(() => {
    if (isInstalled && !isConnected && !hasAttemptedEagerConnect) {
      eagerConnect().catch(console.error)
    }
  }, [isInstalled, isConnected, eagerConnect, hasAttemptedEagerConnect])

  return {
    isInstalled,
    isConnected,
    isLoading,
    error,
    blockchainId,
    rawBlockchainId,
    publicKey,
    chainId,
    connect,
    eagerConnect,
    disconnect,
    signTransaction,
    signMessage,
    purchaseItem,
  }
}

// Helper function to create a token transfer transaction
export const createTransferTransaction = (
  from: string,
  to: string,
  quantity: string,
  memo: string = ''
): TransactionObject => {
  return {
    action: 'transfer',
    contract: 'eosio.token',
    data: {
      from,
      to,
      quantity,
      memo,
    },
  }
}

// Helper function to create a Uniq purchase transaction
export const createUniqPurchaseTransaction = (
  tokenId: number,
  buyer: string,
  receiver: string,
  maxPrice: string,
  memo: string = '',
  promoterId: string | null = null
): TransactionObject => {
  return {
    action: 'buy',
    contract: 'eosio.nft.ft',
    data: {
      buy: {
        token_id: tokenId,
        buyer,
        receiver,
        max_price: maxPrice,
        memo,
        promoter_id: promoterId,
      },
    },
  }
} 