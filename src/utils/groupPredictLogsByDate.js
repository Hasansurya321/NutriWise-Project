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
      dateLabel = 'Hari ini';
    } else if (logDateOnly.getTime() === yesterday.getTime()) {
      dateLabel = 'Kemarin';
    } else {
      dateLabel = logDate.toLocaleDateString('id-ID', {
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
      type: 'Makanan Terpindai',
      totalCalories: Math.round(log.totalNutrition?.calorie || log.nutrition?.calorie || log.calories || 0),
      macros: {
        protein: Math.round(log.totalNutrition?.protein || log.nutrition?.protein || log.protein || 0),
        carbs: Math.round(log.totalNutrition?.carbohydrate || log.nutrition?.carbohydrate || log.carbohydrates || 0),
        fat: Math.round(log.totalNutrition?.fat || log.nutrition?.fat || log.fat || 0),
      },
      items: [
        {
          id: log.id,
          name: log.foodName || log.name || 'Makanan Diprediksi',
          protein: Math.round(log.totalNutrition?.protein || log.nutrition?.protein || log.protein || 0),
          carbs: Math.round(log.totalNutrition?.carbohydrate || log.nutrition?.carbohydrate || log.carbohydrates || 0),
          fats: Math.round(log.totalNutrition?.fat || log.nutrition?.fat || log.fat || 0),
          calories: Math.round(log.totalNutrition?.calorie || log.nutrition?.calorie || log.calories || 0),
          iconName: 'Apple',
          img_url: log.imageUrl || 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80',
          confidenceScore: log.confidenceScore || log.confidence || 0,
          portion: log.portion || 1,
        }
      ],
      aiInsight: 'Dipindai dengan AI',
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
