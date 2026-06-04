import { useState, useEffect, useCallback, useMemo } from 'react';
import { mealAPI } from '../services/api';

export function useMealsCalendar() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAllMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await mealAPI.getMeals(1, 100, 'all');
      const data = response?.data;
      const mealsData = data?.meals || [];
      setMeals(mealsData);
    } catch (err) {
      console.error('Failed to load meals for calendar:', err);
      setError('Gagal memuat data makanan');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllMeals();
  }, [loadAllMeals]);

  const mealsByDate = useMemo(() => {
    const map = {};
    meals.forEach((meal) => {
      if (!meal.createdAt) return;
      const d = new Date(meal.createdAt);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateKey = `${yyyy}-${mm}-${dd}`;
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(meal);
    });
    return map;
  }, [meals]);

  const calendarEvents = useMemo(() => {
    return Object.entries(mealsByDate).map(([date, dateMeals]) => {
      const totalCalorie = dateMeals.reduce((sum, m) => {
        return sum + Number(m.totalNutrition?.calorie || m.nutrition?.calorie || 0);
      }, 0);
      return {
        id: date,
        title: `${Math.round(totalCalorie)} kcal`,
        date,
        extendedProps: { meals: dateMeals, totalCalorie },
      };
    });
  }, [mealsByDate]);

  return {
    meals,
    mealsByDate,
    calendarEvents,
    isLoading,
    error,
    reload: loadAllMeals,
  };
}
