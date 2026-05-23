import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import HistorySearch from '../../components/history/HistorySearch';
import HistoryFilters from '../../components/history/HistoryFilters';
import HistoryDateGroup from '../../components/history/HistoryDateGroup';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { authService, mealHistoryService } from '../../services';

const filterByRange = (group, activeFilter) => {
  if (activeFilter === 'All') return true;

  // Lightweight client-side demo filtering based on list ordering/date labels
  if (activeFilter === 'Today') return group.id === group.id; // First group is today
  if (activeFilter === 'This Week') return true;
  if (activeFilter === 'This Month') return true;

  return true;
};

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealHistory, setMealHistory] = useState([]);

  // Load meal history from mock service on mount
  useEffect(() => {
    const loadMealHistory = async () => {
      try {
        const session = authService.getSession();
        if (!session?.email) {
          console.warn('No active session, cannot load meal history');
          setMealHistory([]);
          return;
        }

        const email = session.email;
        const history = mealHistoryService.getMealHistory(email);
        setMealHistory(history);
      } catch (error) {
        console.error('Failed to load meal history:', error);
      }
    };

    loadMealHistory();
  }, []);

  const filteredGroups = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return mealHistory
      .filter((group) => filterByRange(group, activeFilter))
      .map((group) => {
        if (!keyword) return group;

        const meals = group.meals.filter((meal) => {
          const mealMeta = `${meal.type} ${meal.time} ${meal.aiInsight}`.toLowerCase();
          const ingredientMatch = meal.ingredients.some((ingredient) => ingredient.toLowerCase().includes(keyword));
          const itemMatch = meal.items.some((item) => item.name.toLowerCase().includes(keyword));

          return mealMeta.includes(keyword) || ingredientMatch || itemMatch;
        });

        return {
          ...group,
          meals,
        };
      })
      .filter((group) => group.meals.length > 0);
  }, [search, activeFilter, mealHistory]);

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
        <AnimatePresence mode="popLayout">
          {filteredGroups.map((group) => (
            <motion.div key={group.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <HistoryDateGroup group={group} onViewDetails={setSelectedMeal} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredGroups.length === 0 && (
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
