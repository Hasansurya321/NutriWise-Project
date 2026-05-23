/**
 * Centralized Mock Seed Data
 *
 * All initial mock/dummy data for development is stored here.
 * This file serves as the single source of truth for seed data.
 *
 * When refactoring to use a real backend:
 * 1. Replace mock service implementations in src/services/mock/
 * 2. Remove this file and src/services/mock/ entirely
 * 3. UI components require ZERO changes (they call the same service functions)
 */

// ============================================================================
// DASHBOARD DATA
// ============================================================================

export const seedDashboardStats = [
  {
    title: 'Calories',
    value: '1450',
    target: '2000 kcal',
    progress: 72.5,
    meta: '72.5% of daily goal',
    iconName: 'Flame',
    color: 'green',
  },
  {
    title: 'Protein',
    value: '96g',
    target: '140g',
    progress: 68.6,
    meta: 'Protein intake is on track',
    iconName: 'Drumstick',
    color: 'blue',
  },
  {
    title: 'Carbs',
    value: '182g',
    target: '260g',
    progress: 70,
    meta: 'Balanced carbohydrate intake',
    iconName: 'Wheat',
    color: 'orange',
  },
  {
    title: 'Fats',
    value: '62g',
    target: '80g',
    progress: 77.5,
    meta: 'Within healthy range',
    iconName: 'EggFried',
    color: 'warning',
  },
];

export const seedHealthNotification = {
  title: 'Health status',
  label: 'Watch',
  variant: 'warning',
  message: "You're close to your calorie target, but protein is still slightly below the ideal range for today.",
  meta: 'Updated a few minutes ago',
};

export const seedAiInsights = [
  {
    id: 'ai-success-1',
    variant: 'success',
    title: 'Great progress today',
    message: 'Calories are within a healthy range and meal timing looks consistent.',
    meta: 'Keep this routine for the next meal window.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'ai-warning-1',
    variant: 'warning',
    title: 'Protein intake is below target',
    message: 'Add a lean protein snack or increase portion size at dinner to close the gap.',
    meta: 'Focus area: post-lunch and dinner balance.',
    iconName: 'AlertTriangle',
  },
  {
    id: 'ai-info-1',
    variant: 'info',
    title: 'Hydration trend is stable',
    message: 'Water intake is consistent across the day, which supports recovery and focus.',
    meta: 'Hydration goal is on track.',
    iconName: 'Sparkles',
  },
  {
    id: 'ai-danger-1',
    variant: 'danger',
    title: 'Late-night snacking spike detected',
    message: 'Try moving your last snack earlier to avoid extra calories before sleep.',
    meta: 'This pattern is worth monitoring tomorrow.',
    iconName: 'CircleAlert',
  },
];

export const seedMacroDistribution = [
  {
    name: 'Protein',
    value: 65,
    percentage: 32,
    color: '#5DDB8A',
  },
  {
    name: 'Carbs',
    value: 180,
    percentage: 48,
    color: '#7BE495',
  },
  {
    name: 'Fats',
    value: 45,
    percentage: 20,
    color: '#A7F3D0',
  },
];

export const seedWeeklyTrend = [
  {
    day: 'Mon',
    calories: 1800,
  },
  {
    day: 'Tue',
    calories: 2200,
  },
  {
    day: 'Wed',
    calories: 2000,
  },
  {
    day: 'Thu',
    calories: 2250,
  },
  {
    day: 'Fri',
    calories: 1850,
  },
  {
    day: 'Sat',
    calories: 1450,
  },
  {
    day: 'Sun',
    calories: 2050,
  },
];

export const seedRecentMeals = [
  {
    id: 1,
    name: 'Greek yogurt bowl',
    calories: 420,
    confidence: 96,
    timestamp: '12 mins ago',
    iconName: 'Apple',
  },
  {
    id: 2,
    name: 'Chicken quinoa salad',
    calories: 560,
    confidence: 92,
    timestamp: '45 mins ago',
    iconName: 'Salad',
  },
  {
    id: 3,
    name: 'Creamy pumpkin soup',
    calories: 320,
    confidence: 78,
    timestamp: '2 hours ago',
    iconName: 'Soup',
  },
  {
    id: 4,
    name: 'Turkey sandwich',
    calories: 480,
    confidence: 67,
    timestamp: '3 hours ago',
    iconName: 'Sandwich',
  },
];

// ============================================================================
// MEAL HISTORY DATA
// ============================================================================

export const seedMealHistory = [
  {
    id: 'day-1',
    date: 'Monday, May 4, 2026',
    meals: [
      {
        id: 'meal-1',
        type: 'Lunch',
        time: '12:30 PM',
        totalCalories: 520,

        macros: {
          protein: 32,
          carbs: 48,
          fats: 18,
        },

        aiInsight: 'Balanced lunch with strong protein intake and moderate carbohydrates for sustained daytime energy.',

        ingredients: ['Grilled chicken', 'Brown rice', 'Avocado', 'Mixed vegetables'],

        items: [
          {
            id: 'food-1',
            name: 'Grilled Chicken',
            iconName: 'Drumstick',
            calories: 280,
            protein: 30,
            carbs: 0,
            fats: 14,
          },

          {
            id: 'food-2',
            name: 'Brown Rice Bowl',
            iconName: 'Wheat',
            calories: 240,
            protein: 2,
            carbs: 48,
            fats: 4,
          },
        ],
      },

      {
        id: 'meal-2',
        type: 'Breakfast',
        time: '8:15 AM',
        totalCalories: 285,

        macros: {
          protein: 7,
          carbs: 59,
          fats: 3,
        },

        aiInsight: 'High carbohydrate breakfast that provides fast morning energy with light fat intake.',

        ingredients: ['Oats', 'Milk', 'Banana', 'Honey'],

        items: [
          {
            id: 'food-3',
            name: 'Oatmeal Bowl',
            iconName: 'Wheat',
            calories: 180,
            protein: 6,
            carbs: 32,
            fats: 3,
          },

          {
            id: 'food-4',
            name: 'Banana',
            iconName: 'Banana',
            calories: 105,
            protein: 1,
            carbs: 27,
            fats: 0,
          },
        ],
      },
    ],
  },

  {
    id: 'day-2',
    date: 'Tuesday, May 5, 2026',

    meals: [
      {
        id: 'meal-3',
        type: 'Dinner',
        time: '7:00 PM',
        totalCalories: 460,

        macros: {
          protein: 43,
          carbs: 12,
          fats: 27,
        },

        aiInsight: 'Protein-dense dinner supporting muscle recovery with relatively low carbohydrate intake.',

        ingredients: ['Chicken breast', 'Lettuce', 'Parmesan cheese', 'Caesar dressing'],

        items: [
          {
            id: 'food-5',
            name: 'Grilled Chicken',
            iconName: 'Drumstick',
            calories: 280,
            protein: 35,
            carbs: 0,
            fats: 15,
          },

          {
            id: 'food-6',
            name: 'Caesar Salad',
            iconName: 'Salad',
            calories: 180,
            protein: 8,
            carbs: 12,
            fats: 12,
          },
        ],
      },
    ],
  },
];

// ============================================================================
// PROFILE DATA
// ============================================================================

export const seedProfileData = {
  profile: {
    fullName: 'Hasan Suryadharma',
    email: 'hasansuryadharma@example.com',
    age: 31,
    gender: 'Male',
    initials: 'HS',
    memberSince: 'Mar 2025',
    totalScans: 268,
    healthScore: 86,
  },

  healthData: {
    height: 178,
    weight: 76,
    activityLevel: 'Active (exercise 4-6 days/week)',
  },

  nutritionGoals: {
    calories: 2350,
    protein: 145,
    carbs: 285,
    fats: 72,
    macroDistribution: {
      protein: 25,
      carbs: 49,
      fats: 26,
    },
  },
};

