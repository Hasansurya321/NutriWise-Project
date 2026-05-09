export const mealHistory = [
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
            icon: '🍗',
            calories: 280,
            protein: 30,
            carbs: 0,
            fats: 14,
          },

          {
            id: 'food-2',
            name: 'Brown Rice Bowl',
            icon: '🍚',
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
            icon: '🥣',
            calories: 180,
            protein: 6,
            carbs: 32,
            fats: 3,
          },

          {
            id: 'food-4',
            name: 'Banana',
            icon: '🍌',
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
            icon: '🍗',
            calories: 280,
            protein: 35,
            carbs: 0,
            fats: 15,
          },

          {
            id: 'food-6',
            name: 'Caesar Salad',
            icon: '🥗',
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
