import { MOCK_CONFIG } from '../../config/mockConfig.js';

export function normalizeEmail(email) {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export function isSeededMockAccount(email) {
  return normalizeEmail(email) === MOCK_CONFIG.seedEmail;
}

export function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

export function didDataChange(before, after) {
  return JSON.stringify(before) !== JSON.stringify(after);
}

function normalizeIconFields(item, fallbackIconName = null) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return item;
  }

  const next = { ...item };

  if (typeof next.iconName !== 'string') {
    if (typeof next.icon === 'string') {
      next.iconName = next.icon;
    } else if (fallbackIconName) {
      next.iconName = fallbackIconName;
    }
  }

  if (Object.prototype.hasOwnProperty.call(next, 'icon')) {
    delete next.icon;
  }

  return next;
}

const statIconFallbacks = {
  Calories: 'Flame',
  Protein: 'Drumstick',
  Carbs: 'Wheat',
  Fats: 'EggFried',
  Hydration: 'Droplets',
  Fiber: 'Salad',
};

const insightIconFallbacks = {
  success: 'CheckCircle2',
  warning: 'AlertTriangle',
  info: 'Sparkles',
  danger: 'CircleAlert',
  default: 'Sparkles',
};

const mealIconFallbacks = {
  'Greek yogurt bowl': 'Apple',
  'Chicken quinoa salad': 'Salad',
  'Creamy pumpkin soup': 'Soup',
  'Turkey sandwich': 'Sandwich',
  Lunch: 'Salad',
  Breakfast: 'Apple',
  Dinner: 'Salad',
};

const foodIconFallbacks = {
  Banana: 'Banana',
  'Brown Rice Bowl': 'Wheat',
  'Caesar Salad': 'Salad',
  'Grilled Chicken': 'Drumstick',
  'Oatmeal Bowl': 'Wheat',
};

function normalizeArray(value, normalizer) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item) => item && typeof item === 'object').map(normalizer);
}

export function normalizeDashboardStats(value) {
  return normalizeArray(value, (item) => normalizeIconFields(item, statIconFallbacks[item.title] || 'Flame'));
}

export function normalizeAiInsights(value) {
  return normalizeArray(value, (item) => normalizeIconFields(item, insightIconFallbacks[item.variant] || insightIconFallbacks.default));
}

export function normalizeRecentMeals(value) {
  return normalizeArray(value, (item) => normalizeIconFields(item, mealIconFallbacks[item.name] || mealIconFallbacks[item.type] || 'Apple'));
}

export function normalizeMealHistory(value) {
  return normalizeArray(value, (day) => ({
    ...day,
    meals: normalizeArray(day.meals, (meal) => ({
      ...normalizeIconFields(meal, mealIconFallbacks[meal.type] || 'Salad'),
      ingredients: Array.isArray(meal.ingredients) ? meal.ingredients : [],
      items: normalizeArray(meal.items, (item) => normalizeIconFields(item, foodIconFallbacks[item.name] || 'Apple')),
    })),
  }));
}

export function normalizeArrayOrEmpty(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeObjectOrNull(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
}

