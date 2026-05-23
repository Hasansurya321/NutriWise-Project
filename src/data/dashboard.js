export const statsCards = [
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

export const healthStatusNotification = {
  title: 'Health status',
  label: 'Watch',
  variant: 'warning',
  message: "You're close to your calorie target, but protein is still slightly below the ideal range for today.",
  meta: 'Updated a few minutes ago',
};

export const aiAssistantInsights = [
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

export const macroDistributionData = [
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

export const weeklyCalorieTrendData = [
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

export const recentMeals = [
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

export const macroData = macroDistributionData;

export const weeklyNutritionData = weeklyCalorieTrendData;

export const aiInsights = aiAssistantInsights.map((item) => item.message);

export const kpiCards = [
  {
    title: 'Daily Calories',
    value: '1,860',
    target: '2,100 kcal',
    progress: 88,
    change: '+12%',
    direction: 'up',
    iconName: 'Flame',
  },
  {
    title: 'Protein',
    value: '118g',
    target: '140g',
    progress: 84,
    change: '+8%',
    direction: 'up',
    iconName: 'Drumstick',
  },
  {
    title: 'Hydration',
    value: '2.1L',
    target: '3.0L',
    progress: 70,
    change: '+4%',
    direction: 'up',
    iconName: 'Droplets',
  },
  {
    title: 'Fiber',
    value: '24g',
    target: '30g',
    progress: 80,
    change: '-2%',
    direction: 'down',
    iconName: 'Salad',
  },
];

export const macroSummary = {
  title: 'Macro distribution',
  subtitle: 'Daily macronutrient balance overview',
};

export const weeklyTrendSummary = {
  title: 'Weekly calorie trend',
  subtitle: 'Track calorie fluctuations throughout the week',
};

export const featureHighlights = [
  {
    title: 'Nutrition guidance',
    description: 'AI checks meals against daily targets.',
    iconName: 'BrainCircuit',
  },
  {
    title: 'Smart tracking',
    description: 'Calories, protein, water, and fiber in one view.',
    iconName: 'Sparkles',
  },
];
