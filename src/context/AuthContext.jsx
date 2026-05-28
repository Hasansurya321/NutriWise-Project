import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { authAPI, profileAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await profileAPI.getProfile();
        const userData = response?.data?.user || response?.data?.profile || response?.data || response;
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          throw new Error('No user data found');
        }
      } catch (error) {
        console.error('Failed to authenticate token:', error);
        localStorage.removeItem('accessToken');
        setUser(null);
        setIsAuthenticated(false);
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
    setIsLoading(true);
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
        const userData = profileResponse?.data?.user || profileResponse?.data?.profile || profileResponse?.data || profileResponse;
        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (profileError) {
        console.warn('Failed to load profile right after login:', profileError);
        setUser(null);
      }

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed, please check your credentials'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      await authAPI.register(userData);
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await authAPI.logout({ refreshToken });
      } catch (err) {
        console.error('Failed to call logout endpoint', err);
      }
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
