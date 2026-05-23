/**
 * Mock Meal History Service
 *
 * Manages user meal history with scoped localStorage persistence.
 * All operations are user-specific (scoped by email).
 */

import { getScopedStorage, setScopedStorage } from '../../utils/scopedStorage.js';
import { seedMealHistory } from './mockSeedData.js';
import { cloneJson, didDataChange, isSeededMockAccount, normalizeMealHistory } from './mockDataNormalization.js';

const STORAGE_CATEGORY = 'mealHistory';

export default {
  /**
   * Get meal history for a user
   * Returns scoped data or initializes from seed on first call
   * @param {string} email - User email
   * @returns {array} Array of daily meal records
   */
  getMealHistory(email) {
    if (!email) {
      throw new Error('Email is required to get meal history');
    }

    if (!isSeededMockAccount(email)) {
      return [];
    }

    const history = getScopedStorage(email, STORAGE_CATEGORY);

    // First-time initialization from seed (only for seeded account)
    if (!history) {
      const seededHistory = normalizeMealHistory(cloneJson(seedMealHistory));
      setScopedStorage(email, STORAGE_CATEGORY, seededHistory);
      return seededHistory;
    }

    const normalizedHistory = normalizeMealHistory(history);
    if (didDataChange(history, normalizedHistory)) {
      setScopedStorage(email, STORAGE_CATEGORY, normalizedHistory);
    }

    return normalizedHistory;
  },

  /**
   * Add a new meal to the history
   * @param {string} email - User email
   * @param {object} mealEntry - Meal entry with { date, type, time, totalCalories, macros, items, ingredients, aiInsight }
   * @returns {object} Updated meal history
   */
  addMeal(email, mealEntry) {
    if (!email || !mealEntry) {
      throw new Error('Email and meal entry are required');
    }

    let history = this.getMealHistory(email);
    history = JSON.parse(JSON.stringify(history)); // Deep clone to avoid mutations

    // Find or create day record
    let dayRecord = history.find((day) => day.date === mealEntry.date);

    if (!dayRecord) {
      dayRecord = {
        id: `day-${Date.now()}`,
        date: mealEntry.date,
        meals: [],
      };
      history.push(dayRecord);
    }

    // Add meal with unique ID
    const newMeal = {
      ...mealEntry,
      id: mealEntry.id || `meal-${Date.now()}`,
    };

    dayRecord.meals.push(newMeal);

    // Persist to localStorage
    setScopedStorage(email, STORAGE_CATEGORY, normalizeMealHistory(history));

    return normalizeMealHistory(history);
  },

  /**
   * Update an existing meal
   * @param {string} email - User email
   * @param {string} mealId - Meal ID to update
   * @param {object} updates - Fields to update
   * @returns {object} Updated meal history
   */
  updateMeal(email, mealId, updates) {
    if (!email || !mealId || !updates) {
      throw new Error('Email, meal ID, and updates are required');
    }

    let history = this.getMealHistory(email);
    history = JSON.parse(JSON.stringify(history)); // Deep clone

    let found = false;
    history.forEach((day) => {
      const meal = day.meals.find((m) => m.id === mealId);
      if (meal) {
        Object.assign(meal, updates);
        found = true;
      }
    });

    if (!found) {
      console.warn(`Meal with ID ${mealId} not found`);
      return history;
    }

    const normalizedHistory = normalizeMealHistory(history);
    setScopedStorage(email, STORAGE_CATEGORY, normalizedHistory);
    return normalizedHistory;
  },

  /**
   * Delete a meal from history
   * @param {string} email - User email
   * @param {string} mealId - Meal ID to delete
   * @returns {object} Updated meal history
   */
  deleteMeal(email, mealId) {
    if (!email || !mealId) {
      throw new Error('Email and meal ID are required');
    }

    let history = this.getMealHistory(email);
    history = JSON.parse(JSON.stringify(history)); // Deep clone

    history.forEach((day) => {
      day.meals = day.meals.filter((m) => m.id !== mealId);
    });

    // Remove empty day records
    history = history.filter((day) => day.meals.length > 0);

    const normalizedHistory = normalizeMealHistory(history);
    setScopedStorage(email, STORAGE_CATEGORY, normalizedHistory);
    return normalizedHistory;
  },

  /**
   * Clear all meal history for a user
   * Developer utility - manual reset only
   * @param {string} email - User email
   */
  clearMealHistory(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    setScopedStorage(email, STORAGE_CATEGORY, []);
    console.log(`Cleared meal history for ${email}`);
  },
};
