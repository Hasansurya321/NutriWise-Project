import { useState, useEffect } from 'react';
import { mealAPI } from '../services/api';

export function useMealRecommendations(selectedDate, selectedMeals) {
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate || !selectedMeals || selectedMeals.length === 0) {
      setRecommendations(null);
      return;
    }

    const recentMeal = selectedMeals.reduce((latest, current) => {
      if (!latest) return current;
      return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
    }, null);

    const recentMealCalorie = recentMeal?.totalNutrition?.calorie || recentMeal?.nutrition?.calorie || 0;

    const dayTotalCalorie = Math.round(
      selectedMeals.reduce((sum, m) => sum + (m.totalNutrition?.calorie || m.nutrition?.calorie || 0), 0)
    );

    const CACHE_KEY = `nutriwise_recs_${selectedDate}`;
    const cachedStr = localStorage.getItem(CACHE_KEY);
    
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        if (cached.recentMealId === recentMeal.id && cached.dayTotalCalorie === dayTotalCalorie) {
          setRecommendations(cached.data);
          return;
        }
      } catch (e) {
        // ignore parse error
      }
    }

    const fetchRecs = async () => {
      setIsLoading(true);
      try {
        const res = await mealAPI.getRecommendations(recentMealCalorie);
        setRecommendations(res.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          recentMealId: recentMeal.id,
          dayTotalCalorie,
          data: res.data
        }));
      } catch (err) {
        console.error("Gagal memuat rekomendasi:", err);
        setRecommendations(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecs();
  }, [selectedDate, selectedMeals]);

  return { recommendations, isLoading };
}
