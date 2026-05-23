/**
 * Mock Profile Service
 *
 * Manages user profile data with scoped localStorage persistence.
 * Profile updates are automatically saved and survive logout/re-login.
 */

import { getScopedStorage, setScopedStorage } from '../../utils/scopedStorage.js';
import { seedProfileData } from './mockSeedData.js';
import { cloneJson, isSeededMockAccount, normalizeObjectOrNull } from './mockDataNormalization.js';

const STORAGE_CATEGORY = 'profile';

export default {
  /**
   * Get full profile for a user
   * Returns scoped data or initializes from seed on first call
   * @param {string} email - User email
   * @returns {object} Profile data with { profile, healthData, nutritionGoals }
   */
  getProfile(email) {
    if (!email) {
      throw new Error('Email is required to get profile');
    }

    if (!isSeededMockAccount(email)) {
      return null;
    }

    let profile = getScopedStorage(email, STORAGE_CATEGORY);

    // First-time initialization from seed (only for seeded account)
    if (!profile) {
      profile = cloneJson(seedProfileData);
      setScopedStorage(email, STORAGE_CATEGORY, profile);
    }

    return normalizeObjectOrNull(profile);
  },

  /**
   * Update user profile
   * Merges updates into existing profile and persists to localStorage
   * @param {string} email - User email
   * @param {object} updates - Fields to update (e.g., { age: 32 })
   * @returns {object} Updated profile
   */
  updateProfile(email, updates) {
    if (!email || !updates) {
      throw new Error('Email and updates are required');
    }

    if (!isSeededMockAccount(email)) {
      return null;
    }

    let profile = this.getProfile(email);

    if (!profile) {
      // No existing profile, create new one
      profile = {
        profile: { email, ...updates },
        healthData: {},
        nutritionGoals: {},
      };
    } else {
      // Deep merge updates
      profile = JSON.parse(JSON.stringify(profile)); // Deep clone

      // Update nested properties
      if (updates.profile) {
        profile.profile = { ...profile.profile, ...updates.profile };
      }
      if (updates.healthData) {
        profile.healthData = { ...profile.healthData, ...updates.healthData };
      }
      if (updates.nutritionGoals) {
        profile.nutritionGoals = {
          ...profile.nutritionGoals,
          ...updates.nutritionGoals,
        };
      }

      // Update top-level properties directly
      Object.keys(updates).forEach((key) => {
        if (key !== 'profile' && key !== 'healthData' && key !== 'nutritionGoals') {
          profile[key] = updates[key];
        }
      });
    }

    setScopedStorage(email, STORAGE_CATEGORY, profile);
    return profile;
  },

  /**
   * Get basic profile info
   * @param {string} email - User email
   * @returns {object} Basic profile with { fullName, email, age, gender, initials }
   */
  getBasicProfile(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    const profile = this.getProfile(email);

    if (!profile || !profile.profile) {
      return null;
    }

    return {
      fullName: profile.profile.fullName,
      email: profile.profile.email,
      age: profile.profile.age,
      gender: profile.profile.gender,
      initials: profile.profile.initials,
    };
  },

  /**
   * Reset profile to seed data (developer utility)
   * @param {string} email - User email
   */
  resetProfile(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    if (!isSeededMockAccount(email)) {
      return;
    }

    const seedData = cloneJson(seedProfileData);
    setScopedStorage(email, STORAGE_CATEGORY, seedData);
    console.log(`Profile reset to seed data for ${email}`);
  },
};
