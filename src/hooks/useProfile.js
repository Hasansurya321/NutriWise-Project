import { useState, useEffect, useCallback } from 'react';
import { profileAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function useProfile() {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await profileAPI.getProfile();
      const userData = response?.data?.user || response?.user || response;
      if (userData) {
        setProfile(userData);
        setUser(userData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat profil');
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await profileAPI.updateProfile(data);
      const updatedData = response?.data?.user || response?.user || response;
      if (updatedData) {
        setProfile(updatedData);
        setUser(updatedData);
      }
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Gagal menyimpan profil';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await profileAPI.createProfile(data);
      const createdData = response?.data?.user || response?.user || response;
      if (createdData) {
        setProfile(createdData);
        setUser(createdData);
      }
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || err.message || '';
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    createProfile,
    identityLockedFields: {
      fullName: true,
      email: true,
    },
  };
}
