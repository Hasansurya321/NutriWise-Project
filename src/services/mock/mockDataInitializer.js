/**
 * Mock Data Initializer
 *
 * Seeds and normalizes the temporary frontend development sandbox.
 * Only the configured demo account receives dummy data.
 */

import { getScopedStorage, setScopedStorage } from '../../utils/scopedStorage.js';
import { seedDashboardStats, seedHealthNotification, seedAiInsights, seedMacroDistribution, seedWeeklyTrend, seedRecentMeals, seedMealHistory, seedProfileData } from './mockSeedData.js';
import {
  cloneJson,
  didDataChange,
  isSeededMockAccount,
  normalizeAiInsights,
  normalizeArrayOrEmpty,
  normalizeDashboardStats,
  normalizeEmail,
  normalizeMealHistory,
  normalizeObjectOrNull,
  normalizeRecentMeals,
} from './mockDataNormalization.js';

export function initializeMockDataForUser(email) {
  if (!email) {
    throw new Error('Email is required for mock data initialization');
  }

  const normalizedEmail = normalizeEmail(email);

  if (!isSeededMockAccount(normalizedEmail)) {
    console.log(`Mock data not seeded for ${normalizedEmail} (not the demo account). Starting with clean slate.`);
    return {
      isInitialized: true,
      email: normalizedEmail,
      categories: [],
      isFirstTime: true,
    };
  }

  const existingProfile = getScopedStorage(normalizedEmail, 'profile');
  const isFirstTime = !existingProfile;

  seedUserData(normalizedEmail);

  return {
    isInitialized: true,
    email: normalizedEmail,
    categories: ['profile', 'mealHistory', 'dashboardStats'],
    isFirstTime,
  };
}

function seedUserData(email) {
  seedCategory(email, 'profile', seedProfileData, normalizeObjectOrNull);
  seedCategory(email, 'mealHistory', seedMealHistory, normalizeMealHistory);
  seedCategory(email, 'dashboardStats', seedDashboardStats, normalizeDashboardStats);
  seedCategory(email, 'healthNotification', seedHealthNotification, normalizeObjectOrNull);
  seedCategory(email, 'aiInsights', seedAiInsights, normalizeAiInsights);
  seedCategory(email, 'macroDistribution', seedMacroDistribution, normalizeArrayOrEmpty);
  seedCategory(email, 'weeklyTrend', seedWeeklyTrend, normalizeArrayOrEmpty);
  seedCategory(email, 'recentMeals', seedRecentMeals, normalizeRecentMeals);
}

function seedCategory(email, category, seedValue, normalizer) {
  const storedValue = getScopedStorage(email, category);
  const nextValue = normalizer(storedValue || cloneJson(seedValue));

  if (!storedValue || didDataChange(storedValue, nextValue)) {
    setScopedStorage(email, category, nextValue);
  }
}

export function getMockDataStatus(email) {
  if (!email) {
    return null;
  }

  const normalizedEmail = normalizeEmail(email);
  const profile = isSeededMockAccount(normalizedEmail) ? getScopedStorage(normalizedEmail, 'profile') : null;
  const mealHistory = isSeededMockAccount(normalizedEmail) ? getScopedStorage(normalizedEmail, 'mealHistory') : null;

  return {
    email: normalizedEmail,
    isInitialized: Boolean(profile || mealHistory),
    isSeededAccount: isSeededMockAccount(normalizedEmail),
    categories: {
      hasProfile: Boolean(profile),
      hasMealHistory: Boolean(mealHistory),
    },
  };
}

