import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Clock3, Flame, Beef, Wheat, Droplets, ArrowRight } from 'lucide-react';

import HistorySearch from '../../components/history/HistorySearch';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryDateGroup from '../../components/history/HistoryDateGroup';
import Pagination from '../../components/history/Pagination';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { MealFormModal } from '../../components/meals/MealFormModal';
import { DeleteConfirmDialog } from '../../components/meals/DeleteConfirmDialog';
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

  // CRUD modal states
  const [editMeal, setEditMeal] = useState(null);
  const [deleteMealTarget, setDeleteMealTarget] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
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
    <div className="rounded-3xl border border-borderPrimary bg-card p-10 text-center">
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

  const renderPredictCard = (log) => {
    const n = log.nutrition || {};
    const tn = log.totalNutrition || n;

    return (
      <motion.div
        key={log.id}
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2 }}
        className="rounded-3xl border border-borderPrimary bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
      >
        <div className="flex items-start gap-4">
          {log.imageUrl && (
            <img
              src={log.imageUrl}
              alt={log.foodName}
              className="h-16 w-16 rounded-2xl object-cover shrink-0 border border-borderPrimary"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide bg-blue-500/10 text-blue-600 border border-blue-500/25">
                Scan AI
              </span>
              <span className="text-xs text-textMuted flex items-center gap-1 ml-auto">
                <Clock3 size={12} />
                {new Date(log.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-textPrimary capitalize truncate">
              {log.foodName?.replace(/_/g, ' ')}
            </h3>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { icon: Flame, label: 'Kalori', value: tn.calorie || n.calorie, unit: 'kcal', color: 'text-amber-500' },
            { icon: Beef, label: 'Protein', value: tn.protein || n.protein, unit: 'g', color: 'text-emerald-500' },
            { icon: Wheat, label: 'Karbo', value: tn.carbohydrate || n.carbohydrate, unit: 'g', color: 'text-indigo-500' },
            { icon: Droplets, label: 'Lemak', value: tn.fat || n.fat, unit: 'g', color: 'text-rose-500' },
          ].map(({ icon: Icon, label, value, unit, color }) => (
            <div key={label} className="flex flex-col items-center gap-0.5 rounded-xl bg-background/60 py-2 px-1 text-center border border-borderPrimary/50">
              <Icon size={14} className={color} />
              <p className="text-[0.6rem] font-medium uppercase tracking-wide text-textMuted">{label}</p>
              <p className="text-sm font-bold text-textPrimary leading-tight">
                {typeof value === 'number' ? (value % 1 === 0 ? value : value.toFixed(1)) : '0'}
                <span className="text-[0.6rem] font-normal text-textMuted">{unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <button
            onClick={() => {
              // Open Add Meal Modal with prefilled predict data
              setAddFromPredict(log);
            }}
            className="w-full flex items-center justify-center gap-1.5 rounded-2xl bg-primary/10 text-primary px-4 py-2.5 text-sm font-semibold transition-all hover:bg-primary hover:text-white"
          >
            Tambah ke Jurnal <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    );
  };

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
      return (
        <>
          <AnimatePresence mode="popLayout" className="space-y-4">
            {logs.map((log) => renderPredictCard(log))}
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

    // Meal history
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
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-textPrimary">Riwayat</h1>
          <p className="mt-1.5 text-sm text-textSecondary">Tinjau daftar makananmu, rincian nutrisi, dan analisis AI.</p>
        </div>
        {activeCategory === 'meal' && (
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-all duration-150 shrink-0"
          >
            <Plus size={16} /> Tambah
          </button>
        )}
      </header>

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

      {/* Modals */}
      <MealDetailsModal meal={selectedMeal} open={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} />

      <MealFormModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleCRUDSuccess}
      />

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
