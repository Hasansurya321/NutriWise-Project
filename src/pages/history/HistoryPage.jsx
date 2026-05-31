import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HistorySearch from '../../components/history/HistorySearch';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryDateGroup from '../../components/history/HistoryDateGroup';
import Pagination from '../../components/history/Pagination';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { useMealHistory } from '../../hooks/useMealHistory';
import { usePredictHistory } from '../../hooks/usePredictHistory';

const filterMap = {
  Semua: 'all',
  'Hari Ini': 'today',
  'Minggu Ini': 'week',
  'Bulan Ini': 'month',
};

const reverseFilterMap = {
  all: 'Semua',
  today: 'Hari Ini',
  week: 'Minggu Ini',
  month: 'Bulan Ini',
};

export default function HistoryPage() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [activeCategory, setActiveCategory] = useState('meal');

  const mealHistory = useMealHistory();
  const predictHistory = usePredictHistory();

  const activeData = activeCategory === 'meal' ? mealHistory : predictHistory;
  const activeFilterLabel = reverseFilterMap[activeData.activeFilter] || 'Semua';

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Reset filter ke "Semua" saat pindah tab
    const targetData = category === 'meal' ? mealHistory : predictHistory;
    targetData.setActiveFilter('all');
  };

  const handleFilterChange = (filterLabel) => {
    const filterValue = filterMap[filterLabel] || 'all';
    activeData.setActiveFilter(filterValue);
  };

  const renderEmptyState = () => {
    if (activeCategory === 'meal') {
      return (
        <div className="rounded-3xl border border-borderPrimary bg-card p-10 text-center">
          <p className="text-base font-medium text-textPrimary">Belum ada riwayat makanan.</p>
          <p className="mt-2 text-sm text-textSecondary">Makanan yang benar-benar Anda konsumsi akan muncul di sini.</p>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-borderPrimary bg-card p-10 text-center">
        <p className="text-base font-medium text-textPrimary">Belum ada riwayat prediksi.</p>
        <p className="mt-2 text-sm text-textSecondary">Hasil analisis makanan akan muncul di sini.</p>
      </div>
    );
  };

  const renderPredictCard = (log) => {
    const nutrition = log.nutrition || {};
    const totalNutrition = log.totalNutrition || {};
    const displayCalories = totalNutrition.calorie || nutrition.calorie || 0;
    const displayProtein = totalNutrition.protein || nutrition.protein || 0;
    const displayCarbs = totalNutrition.carbohydrate || nutrition.carbohydrate || 0;
    const displayFat = totalNutrition.fat || nutrition.fat || 0;

    return (
      <motion.div
        key={log.id}
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-borderPrimary bg-card p-6 shadow-lg transition-all duration-300 hover:border-primary/20 hover:shadow-2xl"
      >
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          {log.imageUrl && (
            <div className="shrink-0">
              <img
                src={log.imageUrl}
                alt={log.foodName}
                className="h-16 w-16 rounded-2xl object-cover border border-borderPrimary"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-textPrimary capitalize">{log.foodName?.replace(/_/g, ' ')}</h3>
            <p className="mt-1 text-sm text-textMuted">{new Date(log.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold text-primary">{Math.round(displayCalories)}</p>
            <p className="text-xs text-textMuted">kcal</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-surface2/50 p-3 text-center">
            <p className="text-xs text-textMuted">Protein</p>
            <p className="text-sm font-semibold text-textPrimary">{typeof displayProtein === 'number' ? displayProtein.toFixed(1) : displayProtein}g</p>
          </div>
          <div className="rounded-xl bg-surface2/50 p-3 text-center">
            <p className="text-xs text-textMuted">Karbohidrat</p>
            <p className="text-sm font-semibold text-textPrimary">{typeof displayCarbs === 'number' ? displayCarbs.toFixed(1) : displayCarbs}g</p>
          </div>
          <div className="rounded-xl bg-surface2/50 p-3 text-center">
            <p className="text-xs text-textMuted">Lemak</p>
            <p className="text-sm font-semibold text-textPrimary">{typeof displayFat === 'number' ? displayFat.toFixed(1) : displayFat}g</p>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderContent = () => {
    if (activeData.isLoading) {
      return <div className="flex h-32 items-center justify-center text-textSecondary">Memuat riwayat...</div>;
    }

    if (activeData.error) {
      return (
        <div className="rounded-3xl border border-danger/30 bg-danger/10 p-10 text-center">
          <p className="text-base font-medium text-danger">Gagal Memuat Data</p>
          <p className="mt-2 text-sm text-textSecondary">{activeData.error}</p>
        </div>
      );
    }

    // Predict History
    if (activeCategory === 'predict') {
      const logs = activeData.predictLogs || [];
      if (logs.length === 0) return renderEmptyState();

      return (
        <>
          <AnimatePresence mode="popLayout" className="space-y-4">
            {logs.map((log) => renderPredictCard(log))}
          </AnimatePresence>

          {!activeData.isLoading && !activeData.error && <Pagination currentPage={activeData.page} totalPages={activeData.totalPages} onPageChange={activeData.handlePageChange} />}
        </>
      );
    }

    // Meal History
    const groups = activeData.filteredGroups || [];
    if (groups.length === 0) return renderEmptyState();

    return (
      <>
        <AnimatePresence mode="popLayout">
          {groups.map((group) => (
            <motion.div key={group.date} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <HistoryDateGroup group={group} onViewDetails={setSelectedMeal} />
            </motion.div>
          ))}
        </AnimatePresence>

        {!activeData.isLoading && !activeData.error && <Pagination currentPage={activeData.page} totalPages={activeData.totalPages} onPageChange={activeData.handlePageChange} />}
      </>
    );
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary">Riwayat</h1>
        <p className="text-sm text-textSecondary">Tinjau daftar makananmu, rincian nutrisi, dan analisis AI.</p>
      </header>

      <div className="space-y-4">
        <HistorySearch value={activeData?.search} onChange={(e) => activeData?.setSearch?.(e.target.value)} />
        <HistoryFilters activeCategory={activeCategory} onCategoryChange={handleCategoryChange} activeFilter={activeFilterLabel} onFilterChange={handleFilterChange} />
      </div>

      <div className="space-y-8">{renderContent()}</div>

      <MealDetailsModal meal={selectedMeal} open={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} />
    </div>
  );
}
