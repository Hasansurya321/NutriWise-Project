/**
 * Group raw API meal objects by their createdAt date.
 * Returns array of { date: string, rawDate: string, meals: Meal[] }
 * where each Meal is a raw API meal object.
 */
export function groupMealsByDate(meals) {
  if (!Array.isArray(meals)) return [];

  const groups = {};

  meals.forEach((meal) => {
    if (!meal?.createdAt) return;
    const date = new Date(meal.createdAt);
    const dateKey = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (!groups[dateKey]) {
      groups[dateKey] = { date: dateKey, rawDate: meal.createdAt, meals: [] };
    }
    groups[dateKey].meals.push(meal);
  });

  return Object.values(groups).sort(
    (a, b) => new Date(b.rawDate) - new Date(a.rawDate)
  );
}
