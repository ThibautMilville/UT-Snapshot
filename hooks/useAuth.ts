'use client';

import { useAuth as useAuthContext } from '@/contexts/AuthContext';

// Re-export du contexte d'authentification existant avec une fonction requireAuth ajoutée
export function useAuth() {
  const authContext = useAuthContext();

  // Simplified requireAuth that doesn't redirect, just provides auth state
  const requireAuth = () => {
    // This function now just serves as a marker that auth is required
    // The components will handle showing appropriate UI based on isAuthenticated
  };

  return {
    ...authContext,
    user: authContext.walletAddress ? { address: authContext.walletAddress } : null,
    loading: authContext.isConnecting,
    requireAuth,
  };
} 