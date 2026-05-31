/**
 * Group meals array by date based on createdAt field.
 * Returns array of { date: string, meals: array }
 */
export function groupMealsByDate(meals) {
  const groups = {};

  meals.forEach((meal) => {
    const date = new Date(meal.createdAt);
    const dateKey = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (!groups[dateKey]) {
      groups[dateKey] = {
        date: dateKey,
        rawDate: meal.createdAt,
        meals: [],
      };
    }

    groups[dateKey].meals.push(meal);
  });

  return Object.values(groups);
}
