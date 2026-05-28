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
    error
  } = useMealHistory();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary">Meal History</h1>
        <p className="text-sm text-textSecondary">Review your logged meals, nutrition breakdown, and AI insights.</p>
      </header>

      <div className="space-y-4">
        <HistorySearch value={search} onChange={(event) => setSearch(event.target.value)} />
        <HistoryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="space-y-8">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-textSecondary">
            Loading meal history...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-danger/30 bg-danger/10 p-10 text-center">
            <p className="text-base font-medium text-danger">Error Loading Data</p>
            <p className="mt-2 text-sm text-textSecondary">{error}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredGroups.map((group) => (
              <motion.div
                key={group.id}
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
            <p className="text-base font-medium text-textPrimary">No meals found</p>
            <p className="mt-2 text-sm text-textSecondary">Try another keyword or filter range.</p>
          </div>
        )}
      </div>

      <MealDetailsModal meal={selectedMeal} open={Boolean(selectedMeal)} onClose={() => setSelectedMeal(null)} />
    </div>
  );
}
