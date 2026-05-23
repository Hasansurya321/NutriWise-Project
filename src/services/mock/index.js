/**
 * Mock Services Barrel Export
 *
 * Central export point for all mock services and utilities.
 * Simplifies imports throughout the application.
 */

export { default as mockAuthService } from './mockAuthService.js';
export { default as mockMealHistoryService } from './mockMealHistoryService.js';
export { default as mockNutritionService } from './mockNutritionService.js';
export { default as mockProfileService } from './mockProfileService.js';
export { default as mockAnalyticsService } from './mockAnalyticsService.js';

// Re-export initializer and debug utilities
export { initializeMockDataForUser, getMockDataStatus } from './mockDataInitializer.js';

// Re-export seed data for reference (mainly for testing/debugging)
export * from './mockSeedData.js';
