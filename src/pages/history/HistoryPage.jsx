import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HistorySearch from '../../components/history/HistorySearch';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryDateGroup from '../../components/history/HistoryDateGroup';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { useMealHistory } from '../../hooks/useMealHistory';

export default function HistoryPage() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const {
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    filteredGroups,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    error
  } = useMealHistory();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary">Riwayat Makanan</h1>
        <p className="text-sm text-textSecondary">Tinjau daftar makananmu, rincian nutrisi, dan analisis AI.</p>
      </header>

      <div className="space-y-4">
        <HistorySearch value={search} onChange={(event) => setSearch(event.target.value)} />
        <HistoryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="space-y-8">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-textSecondary">
            Memuat riwayat makanan...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-danger/30 bg-danger/10 p-10 text-center">
            <p className="text-base font-medium text-danger">Gagal Memuat Data</p>
            <p className="mt-2 text-sm text-textSecondary">{error}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.date}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <HistoryDateGroup group={group} onViewDetails={setSelectedMeal} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {!isLoading && !error && filteredGroups.length === 0 && (
          <div className="rounded-3xl border border-borderPrimary bg-card p-10 text-center">
            <p className="text-base font-medium text-textPrimary">Tidak ada makanan ditemukan</p>
            <p className="mt-2 text-sm text-textSecondary">Coba kata kunci atau rentang filter lain.</p>
          </div>
        )}

        {!isLoading && !error && hasNextPage && (
          <div className="flex justify-center pt-4">
            <button
              onClick={fetchNextPage}
              disabled={isFetchingNextPage}
              className="
                rounded-full bg-primary/10 px-6 py-2.5 
                text-sm font-medium text-primary 
                transition-colors hover:bg-primary/20
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isFetchingNextPage ? 'Memuat lagi...' : 'Muat Lebih Banyak'}
            </button>
          </div>
        )}
      </div>

      <MealDetailsModal meal={selectedMeal} open={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} />
    </div>
  );
}
