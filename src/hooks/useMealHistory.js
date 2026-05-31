import { useState, useEffect, useMemo, useCallback } from 'react';
import { predictAPI } from '../services/api';
import { groupPredictLogsByDate } from '../utils/groupPredictLogsByDate';

const filterByRange = (group, activeFilter) => {
  if (activeFilter === 'All') return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const groupDate = new Date(group.rawDate);
  groupDate.setHours(0, 0, 0, 0);

  if (activeFilter === 'Today') {
    return groupDate.getTime() === today.getTime();
  }

  if (activeFilter === 'Yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return groupDate.getTime() === yesterday.getTime();
  }

  if (activeFilter === 'This Week') {
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return groupDate >= oneWeekAgo && groupDate <= today;
  }

  if (activeFilter === 'This Month') {
    return groupDate.getMonth() === today.getMonth() && groupDate.getFullYear() === today.getFullYear();
  }

  return true;
};

export function useMealHistory() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [rawLogs, setRawLogs] = useState([]);
  const [mealHistory, setMealHistory] = useState([]);
  
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMealHistory = useCallback(async (currentPage = 1, append = false) => {
    try {
      if (append) setIsFetchingNextPage(true);
      else setIsLoading(true);
      
      const response = await predictAPI.getPredictLogs(currentPage, 10);
      const logs = response?.data?.predictLogs || [];
      const pagination = response?.data?.pagination;
      
      setRawLogs(prev => {
        const newLogs = append ? [...prev, ...logs] : logs;
        setMealHistory(groupPredictLogsByDate(newLogs));
        return newLogs;
      });
      
      if (pagination) {
        setHasNextPage(pagination.hasNextPage);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      console.error('Failed to load meal history:', err);
      setError('Failed to load meal history');
    } finally {
      setIsLoading(false);
      setIsFetchingNextPage(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    loadMealHistory(1, false);
  }, [loadMealHistory]);

  const fetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMealHistory(nextPage, true);
    }
  };

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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  };
}
