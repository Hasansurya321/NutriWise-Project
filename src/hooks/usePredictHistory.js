import { useState, useEffect, useCallback, useMemo } from 'react';
import { predictAPI } from '../services/api';
import { useDebounce } from './useDebounce';

export function usePredictHistory() {
  const [predictLogs, setPredictLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const deletePredict = async (predictId) => {
    await predictAPI.deletePredictLog(predictId);
    // Optimistic remove from local state
    setPredictLogs((prev) => prev.filter((p) => p.id !== predictId));
  };

  const loadPredictLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Fetch up to 100 logs to allow robust client-side filtering
      const response = await predictAPI.getPredictLogs(1, 100, 'all');
      const data = response?.data;
      setPredictLogs(data?.predictLogs || []);
    } catch (err) {
      console.error('Failed to load predict history:', err);
      setError('Gagal memuat riwayat prediksi');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPredictLogs();
  }, [loadPredictLogs]);

  useEffect(() => {
    setPage(1);
  }, [activeFilter, debouncedSearch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const filteredLogs = useMemo(() => {
    let result = predictLogs;

    // 1. Apply time filter using local timezone
    if (activeFilter !== 'all') {
      const now = new Date();
      if (activeFilter === 'today') {
        const todayStr = now.toLocaleDateString('en-CA');
        result = result.filter((m) => new Date(m.createdAt).toLocaleDateString('en-CA') === todayStr);
      } else if (activeFilter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        result = result.filter((m) => new Date(m.createdAt) >= oneWeekAgo);
      } else if (activeFilter === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        result = result.filter((m) => new Date(m.createdAt) >= oneMonthAgo);
      }
    }

    // 2. Apply search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((m) => m.foodName?.toLowerCase().includes(q));
    }

    // 3. Client-side Pagination (15 items per page)
    const totalItems = result.length;
    const computedTotalPages = Math.ceil(totalItems / 15) || 1;
    setTotalPages(computedTotalPages);

    return result.slice((page - 1) * 15, page * 15);
  }, [predictLogs, debouncedSearch, activeFilter, page]);

  return {
    search,
    setSearch,
    predictLogs: filteredLogs,
    isLoading,
    page,
    totalPages,
    handlePageChange,
    error,
    activeFilter,
    setActiveFilter: handleFilterChange,
    deletePredict,
  };
}
