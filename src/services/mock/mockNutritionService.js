/**
 * Mock Nutrition Service
 *
 * Manages dashboard nutrition data including stats, charts, and insights.
 * Data is scoped per user and persisted to localStorage.
 */

import { getScopedStorage, setScopedStorage } from '../../utils/scopedStorage.js';
import { seedDashboardStats, seedAiInsights, seedMacroDistribution, seedWeeklyTrend, seedRecentMeals, seedHealthNotification } from './mockSeedData.js';
import mockMealHistoryService from './mockMealHistoryService.js';
import {
  cloneJson,
  didDataChange,
  isSeededMockAccount,
  normalizeAiInsights,
  normalizeArrayOrEmpty,
  normalizeDashboardStats,
  normalizeObjectOrNull,
  normalizeRecentMeals,
} from './mockDataNormalization.js';

function getSeededCategory(email, category, seedValue, normalizer) {
  if (!isSeededMockAccount(email)) {
    return Array.isArray(seedValue) ? [] : null;
  }

  const storedValue = getScopedStorage(email, category);

  if (!storedValue) {
    const seededValue = normalizer(cloneJson(seedValue));
    setScopedStorage(email, category, seededValue);
    return seededValue;
  }

  const normalizedValue = normalizer(storedValue);
  if (didDataChange(storedValue, normalizedValue)) {
    setScopedStorage(email, category, normalizedValue);
  }

  return normalizedValue;
}

export default {
  /**
   * Get dashboard stats for a user
   * @param {string} email - User email
   * @returns {array} Stats cards
   */
  getDashboardStats(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    return getSeededCategory(email, 'dashboardStats', seedDashboardStats, normalizeDashboardStats);
  },

  /**
   * Get recent meals for a user
   * Pulls from actual meal history or seed data
   * @param {string} email - User email
   * @returns {array} Recent meals (up to 4)
   */
  getRecentMeals(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    // Try to get from meal history
    const mealHistory = mockMealHistoryService.getMealHistory(email);

    if (mealHistory && mealHistory.length > 0) {
      // Extract all meals from history
      const allMeals = [];
      mealHistory.forEach((day) => {
        day.meals.forEach((meal) => {
          allMeals.push(meal);
        });
      });

      // Sort by timestamp (most recent first) and return top 4
      return normalizeRecentMeals(allMeals.slice(0, 4));
    }

    return getSeededCategory(email, 'recentMeals', seedRecentMeals, normalizeRecentMeals);
  },

  /**
   * Get macro distribution for a user
   * Calculates from recent meals or returns seed data
   * @param {string} email - User email
   * @returns {array} Macro distribution data
   */
  getMacroDistribution(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    return getSeededCategory(email, 'macroDistribution', seedMacroDistribution, normalizeArrayOrEmpty);
  },

  /**
   * Get weekly calorie trend for a user
   * @param {string} email - User email
   * @returns {array} Weekly trend data
   */
  getWeeklyTrend(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    return getSeededCategory(email, 'weeklyTrend', seedWeeklyTrend, normalizeArrayOrEmpty);
  },

  /**
   * Get AI insights for a user
   * @param {string} email - User email
   * @returns {array} AI insight cards
   */
  getAiInsights(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    return getSeededCategory(email, 'aiInsights', seedAiInsights, normalizeAiInsights);
  },

  /**
   * Get health notification for a user
   * @param {string} email - User email
   * @returns {object} Health notification
   */
  getHealthNotification(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    return getSeededCategory(email, 'healthNotification', seedHealthNotification, normalizeObjectOrNull);
  },

  /**
   * Update dashboard stats (developer utility)
   * @param {string} email - User email
   * @param {array} updates - New stats data
   */
  updateDashboardStats(email, updates) {
    if (!email || !updates) {
      throw new Error('Email and updates are required');
    }

    if (!isSeededMockAccount(email)) {
      return;
    }

    setScopedStorage(email, 'dashboardStats', normalizeDashboardStats(updates));
  },
};
