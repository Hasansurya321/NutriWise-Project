export function groupPredictLogsByDate(logs = []) {
  if (!Array.isArray(logs)) return [];

  const grouped = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  logs.forEach((log) => {
    const logDate = new Date(log.created_at || log.createdAt || Date.now());
    const logDateOnly = new Date(logDate);
    logDateOnly.setHours(0, 0, 0, 0);

    let dateLabel = '';
    if (logDateOnly.getTime() === today.getTime()) {
      dateLabel = 'Today';
    } else if (logDateOnly.getTime() === yesterday.getTime()) {
      dateLabel = 'Yesterday';
    } else {
      dateLabel = logDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }

    const timeStr = logDate.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const mealItem = {
      id: log.id,
      time: timeStr,
      type: 'Scanned Food', // Fallback type
      totalCalories: Math.round(log.calorie || log.calories || 0),
      macros: {
        protein: Math.round(log.protein || 0),
        carbs: Math.round(log.carbohydrate || log.carbohydrates || 0),
        fat: Math.round(log.fat || 0),
      },
      items: [
        {
          id: log.id,
          name: log.food_name || log.name || 'Predicted Food',
          protein: Math.round(log.protein || 0),
          carbs: Math.round(log.carbohydrate || log.carbohydrates || 0),
          fats: Math.round(log.fat || 0),
          calories: Math.round(log.calorie || log.calories || 0),
          iconName: 'Apple',
          img_url: log.image_url || log.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
        }
      ],
      aiInsight: 'Predicted via AI Scan',
    };

    if (!grouped[dateLabel]) {
      grouped[dateLabel] = {
        dateLabel,
        rawDate: logDateOnly,
        meals: []
      };
    }
    grouped[dateLabel].meals.push(mealItem);
  });

  return Object.values(grouped).map((group) => ({
    date: group.dateLabel,
    rawDate: group.rawDate,
    meals: group.meals.sort((a, b) => {
      return 0;
    }),
  })).sort((a, b) => b.rawDate - a.rawDate);
}
