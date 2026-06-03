import { useState, useEffect, useCallback, useMemo } from 'react';
import { mealAPI } from '../services/api';
import { groupMealsByDate } from '../utils/groupMealsByDate';

export function useMealHistory() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Fetch up to 100 meals to allow robust client-side filtering and local timezone handling
      const response = await mealAPI.getMeals(1, 100, 'all');
      const data = response?.data;
      const mealsData = data?.meals || [];
      setMeals(mealsData);
    } catch (err) {
      console.error('Failed to load meal history:', err);
      setError('Gagal memuat riwayat makanan');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, search]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const reload = () => loadMeals(page, activeFilter);

  const deleteMeal = async (mealId) => {
    await mealAPI.deleteMeal(mealId);
    // Optimistic remove from local state
    setMeals((prev) => prev.filter((m) => m.id !== mealId));
  };

  const filteredGroups = useMemo(() => {
    let result = meals;

    // 1. Apply time filter using local timezone
    if (activeFilter !== 'all') {
      const now = new Date();
      if (activeFilter === 'today') {
        const todayStr = now.toLocaleDateString('en-CA');
        result = result.filter(m => new Date(m.createdAt).toLocaleDateString('en-CA') === todayStr);
      } else if (activeFilter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        result = result.filter(m => new Date(m.createdAt) >= oneWeekAgo);
      } else if (activeFilter === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        result = result.filter(m => new Date(m.createdAt) >= oneMonthAgo);
      }
    }

    // 2. Apply search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((m) => m.foodName?.toLowerCase().includes(q));
    }

    // 3. Client-side Pagination (15 items per page)
    const totalItems = result.length;
    const computedTotalPages = Math.ceil(totalItems / 15) || 1;
    setTotalPages(computedTotalPages);

    // Apply pagination slice
    const paginatedResult = result.slice((page - 1) * 15, page * 15);

    return groupMealsByDate(paginatedResult);
  }, [meals, search, activeFilter, page]);

  return {
    search,
    setSearch,
    activeFilter,
    setActiveFilter: handleFilterChange,
    filteredGroups,
    isLoading,
    page,
    totalPages,
    handlePageChange,
    error,
    reload,
    deleteMeal,
  };
}
