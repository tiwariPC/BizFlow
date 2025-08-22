import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';

interface AccessTokenData {
  id: string;
  modules: string[];
  permissions: any;
  expiresAt: string;
  usageCount: number;
  maxUsage: number | null;
}

interface UseAccessTokenReturn {
  hasAccess: (module: string) => boolean;
  validateToken: (token: string, module: string) => Promise<boolean>;
  clearAccess: () => void;
  activeTokens: AccessTokenData[];
  isLoading: boolean;
}

export function useAccessToken(): UseAccessTokenReturn {
  const [activeTokens, setActiveTokens] = useState<AccessTokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = authService.getUser();

  // Load active tokens from localStorage on mount
  useEffect(() => {
    const savedTokens = localStorage.getItem('bizflow_access_tokens');
    if (savedTokens) {
      try {
        const tokens = JSON.parse(savedTokens);
        // Filter out expired tokens
        const validTokens = tokens.filter((token: AccessTokenData) => 
          new Date(token.expiresAt) > new Date()
        );
        setActiveTokens(validTokens);
        
        // Update localStorage with only valid tokens
        if (validTokens.length !== tokens.length) {
          localStorage.setItem('bizflow_access_tokens', JSON.stringify(validTokens));
        }
      } catch (error) {
        console.error('Error loading access tokens:', error);
        localStorage.removeItem('bizflow_access_tokens');
      }
    }
  }, []);

  const hasAccess = useCallback((module: string): boolean => {
    // Tier 1 and Tier 2 users have access to all modules
    if (user && (user.tier === 'tier1' || user.tier === 'tier2')) {
      return true;
    }

    // Check if user has an active token for this module
    return activeTokens.some(token => 
      token.modules.includes(module) && 
      new Date(token.expiresAt) > new Date()
    );
  }, [user, activeTokens]);

  const validateToken = useCallback(async (token: string, module: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/access-tokens/validate', {
        token: token.trim(),
        module,
      });

      const data = await response.json();

      if (data.success) {
        const newToken = data.accessToken;
        
        // Add to active tokens
        setActiveTokens(prev => {
          const updated = [...prev, newToken];
          localStorage.setItem('bizflow_access_tokens', JSON.stringify(updated));
          return updated;
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error validating access token:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAccess = useCallback(() => {
    setActiveTokens([]);
    localStorage.removeItem('bizflow_access_tokens');
  }, []);

  return {
    hasAccess,
    validateToken,
    clearAccess,
    activeTokens,
    isLoading,
  };
}
