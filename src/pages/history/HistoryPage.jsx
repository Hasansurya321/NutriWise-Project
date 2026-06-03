import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Clock3, Flame, Beef, Wheat, Droplets, ArrowRight, Eye, CalendarDays } from 'lucide-react';

import HistorySearch from '../../components/history/HistorySearch';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryDateGroup from '../../components/history/HistoryDateGroup';
import Pagination from '../../components/history/Pagination';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { MealFormModal } from '../../components/meals/MealFormModal';
import { DeleteConfirmDialog } from '../../components/meals/DeleteConfirmDialog';
import { useMealHistory } from '../../hooks/useMealHistory';
import { usePredictHistory } from '../../hooks/usePredictHistory';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import PredictHistoryCard from '../../components/history/PredictHistoryCard';
import { PageHeader } from '../../components/layout/PageHeader';

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
  useDocumentTitle('Riwayat');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [activeCategory, setActiveCategory] = useState('meal');

  const [editMeal, setEditMeal] = useState(null);
  const [deleteMealTarget, setDeleteMealTarget] = useState(null);
  const [addFromPredict, setAddFromPredict] = useState(null);

  const mealHistory = useMealHistory();
  const predictHistory = usePredictHistory();

  const activeData = activeCategory === 'meal' ? mealHistory : predictHistory;
  const activeFilterLabel = reverseFilterMap[activeData.activeFilter] || 'Semua';

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const targetData = category === 'meal' ? mealHistory : predictHistory;
    targetData.setActiveFilter('all');
  };

  const handleFilterChange = (filterLabel) => {
    const filterValue = filterMap[filterLabel] || 'all';
    activeData.setActiveFilter(filterValue);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteMealTarget) return;
    await mealHistory.deleteMeal(deleteMealTarget.id);
    setDeleteMealTarget(null);
  };

  const handleCRUDSuccess = () => {
    mealHistory.reload();
    handleCategoryChange('meal');
  };

  const renderEmptyState = () => (
    <div className="roundeed-3xl border border-borderPrimary bg-card p-10 text-center">
      <p className="text-base font-medium text-textPrimary">
        {activeCategory === 'meal' ? 'Belum ada riwayat makanan.' : 'Belum ada riwayat prediksi.'}
      </p>
      <p className="mt-2 text-sm text-textSecondary">
        {activeCategory === 'meal'
          ? 'Makanan yang kamu catat akan muncul di sini.'
          : 'Hasil analisis makanan akan muncul di sini.'}
      </p>
    </div>
  );

  const renderContent = () => {
    if (activeData.isLoading) {
      return <div className="flex h-32 items-center justify-center text-textSecondary">Memuat riwayat…</div>;
    }

    if (activeData.error) {
      return (
        <div className="rounded-3xl border border-danger/30 bg-danger/10 p-10 text-center">
          <p className="text-base font-medium text-danger">Gagal Memuat Data</p>
          <p className="mt-2 text-sm text-textSecondary">{activeData.error}</p>
        </div>
      );
    }

    if (activeCategory === 'predict') {
      const logs = activeData.predictLogs || [];
      if (logs.length === 0) return renderEmptyState();

      const groupedLogsMap = logs.reduce((acc, log) => {
        const d = new Date(log.createdAt);
        d.setHours(0,0,0,0);
        let dateLabel = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const today = new Date(); today.setHours(0,0,0,0);
        const yesterday = new Date(today); yesterday.setDate(yesterday.getDate()-1);
        if(d.getTime() === today.getTime()) dateLabel = 'Hari Ini';
        else if(d.getTime() === yesterday.getTime()) dateLabel = 'Kemarin';

        if (!acc[dateLabel]) acc[dateLabel] = { date: dateLabel, rawDate: d, logs: [] };
        acc[dateLabel].logs.push(log);
        return acc;
      }, {});

      const groupedLogs = Object.values(groupedLogsMap).sort((a,b) => b.rawDate - a.rawDate);

      return (
        <>
          <AnimatePresence mode="popLayout" className="space-y-4">
            {groupedLogs.map(group => (
              <motion.div
                key={group.date}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 mb-8"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={18} className="text-primary shrink-0" />
                  <h2 className="text-xl font-semibold tracking-tight text-textPrimary">{group.date}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.logs.map(log => (
                    <PredictHistoryCard
                      key={log.id}
                      log={log}
                      onView={setSelectedMeal}
                      onAdd={setAddFromPredict}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {!activeData.isLoading && !activeData.error && (
            <Pagination
              currentPage={activeData.page}
              totalPages={activeData.totalPages}
              onPageChange={activeData.handlePageChange}
            />
          )}
        </>
      );
    }

    const groups = activeData.filteredGroups || [];
    if (groups.length === 0) return renderEmptyState();

    return (
      <>
        <AnimatePresence mode="popLayout">
          {groups.map((group) => (
            <motion.div
              key={group.date}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <HistoryDateGroup
                group={group}
                onEdit={(meal) => setEditMeal(meal)}
                onDelete={(meal) => setDeleteMealTarget(meal)}
                onViewDetails={(meal) => setSelectedMeal(meal)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {!activeData.isLoading && !activeData.error && (
          <Pagination
            currentPage={activeData.page}
            totalPages={activeData.totalPages}
            onPageChange={activeData.handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Riwayat"
        description="Riwayat pemindaian makanan dan asupan nutrisimu."
      />

      <div className="space-y-4">
        <HistorySearch value={activeData?.search} onChange={(e) => activeData?.setSearch?.(e.target.value)} />
        <HistoryFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          activeFilter={activeFilterLabel}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="space-y-8">{renderContent()}</div>

      <MealDetailsModal meal={selectedMeal} open={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} />

      <MealFormModal
        open={Boolean(addFromPredict)}
        initialData={addFromPredict}
        onClose={() => setAddFromPredict(null)}
        onSuccess={handleCRUDSuccess}
      />

      <MealFormModal
        open={Boolean(editMeal)}
        editMeal={editMeal}
        onClose={() => setEditMeal(null)}
        onSuccess={handleCRUDSuccess}
      />

      <DeleteConfirmDialog
        open={Boolean(deleteMealTarget)}
        mealName={deleteMealTarget?.foodName}
        onClose={() => setDeleteMealTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
