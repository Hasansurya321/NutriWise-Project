import { useState, useEffect, useCallback } from 'react';
import { predictAPI } from '../services/api';

export function usePredictHistory() {
  const [predictLogs, setPredictLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const loadPredictLogs = useCallback(async (currentPage = 1, filter = 'all') => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await predictAPI.getPredictLogs(currentPage, 15, filter);
      const data = response?.data;
      setPredictLogs(data?.predictLogs || []);
      setTotalPages(data?.pagination?.totalPages || 1);
    } catch (err) {
      console.error('Failed to load predict history:', err);
      setError('Gagal memuat riwayat prediksi');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    loadPredictLogs(1, activeFilter);
  }, [activeFilter, loadPredictLogs]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    loadPredictLogs(newPage, activeFilter);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  return {
    predictLogs,
    isLoading,
    page,
    totalPages,
    handlePageChange,
    error,
    activeFilter,
    setActiveFilter: handleFilterChange,
  };
}
