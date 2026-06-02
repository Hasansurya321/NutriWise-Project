import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { authAPI, profileAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(true); // default true, set false only when API returns null/404
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        setHasProfile(false);
        return;
      }

      try {
        const response = await profileAPI.getProfile();
        const userData = response?.data?.user || response?.user || response;
        if (userData && Object.keys(userData).length > 0) {
          setUser(userData);
          setIsAuthenticated(true);
          setHasProfile(true);
        } else {
          setHasProfile(false);
          setIsAuthenticated(true); // token valid, tapi belum punya profile
        }
      } catch (error) {
        // Jika 404, berarti profile belum ada (first login)
        if (error.response?.status === 404) {
          setHasProfile(false);
          setIsAuthenticated(true); // token valid, tapi profile belum ada
        } else {
          localStorage.removeItem('accessToken');
          setUser(null);
          setIsAuthenticated(false);
          setHasProfile(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const handleForceLogout = () => {
      logout();
    };

    window.addEventListener('auth:logout', handleForceLogout);
    return () => {
      window.removeEventListener('auth:logout', handleForceLogout);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });

      // Store token
      const token = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      if (token) {
        localStorage.setItem('accessToken', token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Fetch Profile Data after login
      try {
        const profileResponse = await profileAPI.getProfile();
        const userData = profileResponse?.data?.user || profileResponse?.user || profileResponse;
        if (userData && Object.keys(userData).length > 0) {
          setUser(userData);
          setHasProfile(true);
        } else {
          setUser(null);
          setHasProfile(false);
        }
      } catch (profileError) {
        // If 404, profile doesn't exist yet (first login)
        if (profileError.response?.status === 404) {
          setHasProfile(false);
        }
        setUser(null);
      }

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed, please check your credentials',
      };
    }
  };

  const register = async (userData) => {
    try {
      await authAPI.register(userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    } 
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await authAPI.logout({ refreshToken });
      } catch (err) {}
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
    setHasProfile(false);
  };

  // Update hasProfile when setUser is called externally (e.g. from onboarding)
  const handleSetUser = useCallback((userData) => {
    setUser(userData);
    if (userData && Object.keys(userData).length > 0) {
      setHasProfile(true);
    }
  }, []);

  return <AuthContext.Provider value={{ user, isAuthenticated, isLoading, hasProfile, login, register, logout, setUser: handleSetUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
