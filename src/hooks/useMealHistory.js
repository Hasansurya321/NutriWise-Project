import { useState, useEffect, useMemo } from 'react';
import { predictAPI } from '../services/api';
import { groupPredictLogsByDate } from '../utils/groupPredictLogsByDate';

const filterByRange = (group, activeFilter) => {
  if (activeFilter === 'All') return true;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const groupDate = new Date(group.rawDate);
  
  if (activeFilter === 'Today') {
    return groupDate.getTime() === today.getTime();
  }
  
  if (activeFilter === 'This Week') {
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return groupDate >= oneWeekAgo;
  }
  
  if (activeFilter === 'This Month') {
    return groupDate.getMonth() === today.getMonth() && groupDate.getFullYear() === today.getFullYear();
  }
  
  return true;
};

export function useMealHistory() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [mealHistory, setMealHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMealHistory = async () => {
      setIsLoading(true);
      try {
        const response = await predictAPI.getPredictLogs();
        const logs = response?.data?.predictLogs || [];
        const history = groupPredictLogsByDate(logs);
        setMealHistory(history);
      } catch (err) {
        console.error('Failed to load meal history:', err);
        setError('Failed to load meal history');
      } finally {
        setIsLoading(false);
      }
    };

    loadMealHistory();
  }, []);

  const filteredGroups = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mealHistory
      .filter((group) => filterByRange(group, activeFilter))
      .map((group) => {
        if (!keyword) return group;

        const meals = group.meals.filter((meal) => {
          const mealMeta = `${meal.type} ${meal.time} ${meal.aiInsight}`.toLowerCase();
          const ingredientMatch = meal.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(keyword)
          );
          const itemMatch = meal.items?.some((item) =>
            item.name.toLowerCase().includes(keyword)
          );

          return mealMeta.includes(keyword) || ingredientMatch || itemMatch;
        });

        return {
          ...group,
          meals,
        };
      })
      .filter((group) => group.meals.length > 0);
  }, [search, activeFilter, mealHistory]);

  return {
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    filteredGroups,
    isLoading,
    error
  };
}
