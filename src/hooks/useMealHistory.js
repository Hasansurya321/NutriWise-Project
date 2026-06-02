import { useState, useEffect, useCallback } from 'react';
import { mealAPI } from '../services/api';
import { groupMealsByDate } from '../utils/groupMealsByDate';

export function useMealHistory() {
  const [meals, setMeals] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadMeals = useCallback(async (currentPage = 1, filter = 'all') => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await mealAPI.getMeals(currentPage, 15, filter);
      const data = response?.data;
      const mealsData = data || [];
      setMeals(mealsData);
      setFilteredGroups(groupMealsByDate(mealsData));
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error('Failed to load meal history:', err);
      setError('Gagal memuat riwayat makanan');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    loadMeals(1, activeFilter);
  }, [activeFilter, loadMeals]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    loadMeals(newPage, activeFilter);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

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
  };
}
