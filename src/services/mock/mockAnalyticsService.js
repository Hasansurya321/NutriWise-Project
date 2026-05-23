/**
 * Mock Analytics Service
 *
 * Placeholder for future analytics integration.
 * Currently provides basic analytics data structure.
 */

import { getScopedStorage, setScopedStorage } from '../../utils/scopedStorage.js';
import { isSeededMockAccount, normalizeObjectOrNull } from './mockDataNormalization.js';

const STORAGE_CATEGORY = 'analytics';

export default {
  /**
   * Get analytics data for a user
   * @param {string} email - User email
   * @returns {object} Analytics data
   */
  getAnalyticsData(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    if (!isSeededMockAccount(email)) {
      return null;
    }

    let analyticsData = normalizeObjectOrNull(getScopedStorage(email, STORAGE_CATEGORY));

    // Initialize with default analytics structure on first call
    if (!analyticsData) {
      analyticsData = {
        sessionCount: 1,
        lastVisit: new Date().toISOString(),
        totalMealsLogged: 0,
        averageDailyCalories: 0,
        streakDays: 1,
      };
      setScopedStorage(email, STORAGE_CATEGORY, analyticsData);
    }

    return analyticsData;
  },

  /**
   * Update analytics data
   * @param {string} email - User email
   * @param {object} updates - Fields to update
   */
  updateAnalyticsData(email, updates) {
    if (!email || !updates) {
      throw new Error('Email and updates are required');
    }

    let analyticsData = this.getAnalyticsData(email);
    if (!analyticsData) {
      return null;
    }
    analyticsData = { ...analyticsData, ...updates };

    setScopedStorage(email, STORAGE_CATEGORY, analyticsData);
    return analyticsData;
  },

  /**
   * Track a user session
   * @param {string} email - User email
   */
  trackSession(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    const analytics = this.getAnalyticsData(email);
    if (!analytics) {
      return;
    }
    const updates = {
      sessionCount: (analytics.sessionCount || 0) + 1,
      lastVisit: new Date().toISOString(),
    };

    this.updateAnalyticsData(email, updates);
  },
};
