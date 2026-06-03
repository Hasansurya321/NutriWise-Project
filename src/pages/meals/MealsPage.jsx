import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animation';
import MealsCalendar from '../../components/meals/MealsCalendar';
import MealsDayPanel from '../../components/meals/MealsDayPanel';
import MealRecommendations from '../../components/meals/MealRecommendations';
import { MealFormModal } from '../../components/meals/MealFormModal';
import { DeleteConfirmDialog } from '../../components/meals/DeleteConfirmDialog';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { useMealsCalendar } from '../../hooks/useMealsCalendar';
import { mealAPI } from '../../services/api';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useMealRecommendations } from '../../hooks/useMealRecommendations';
import { PageHeader } from '../../components/layout/PageHeader';

export default function MealsPage() {
  useDocumentTitle('Jurnal Makan');
  const [selectedDate, setSelectedDate] = useState(null);
  const { calendarEvents, mealsByDate, isLoading, error, reload } = useMealsCalendar();

  // CRUD state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editMeal, setEditMeal] = useState(null);
  const [viewMeal, setViewMeal] = useState(null);
  const [deleteMealTarget, setDeleteMealTarget] = useState(null);

  const selectedMeals = selectedDate ? (mealsByDate[selectedDate] || []) : [];

  const { recommendations, isLoading: loadingRecs } = useMealRecommendations(selectedDate, selectedMeals);
  function handleDateClick(dateStr) {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
    if (dateStr) {
      setTimeout(() => {
        document.getElementById('meals-day-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteMealTarget) return;
    await mealAPI.deleteMeal(deleteMealTarget.id);
    setDeleteMealTarget(null);
    reload();
  }

  function handleCRUDSuccess() {
    reload();
    setEditMeal(null);
    setAddModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <PageHeader
        title="Jurnal Makan"
        description="Klik tanggal untuk melihat detail makanan dan kandungan nutrisi harian."
      >
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-all duration-150 shrink-0"
        >
          <Plus size={16} /> Tambah Meal
        </button>
      </PageHeader>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-danger/25 bg-danger/8 px-5 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 gap-6 items-stretch xl:grid-cols-[1fr_380px]"
      >
        {/* Calendar column */}
        <div className="flex flex-col rounded-3xl border border-borderPrimary bg-card shadow-[0_4px_24px_rgba(15,23,42,0.06)] overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-textSecondary text-sm">
              <div className="w-9 h-9 rounded-full border-[3px] border-borderPrimary border-t-primary animate-spin" />
              <p>Memuat data makanan…</p>
            </div>
          ) : (
            <MealsCalendar
              events={calendarEvents}
              onDateClick={handleDateClick}
              selectedDate={selectedDate}
            />
          )}
        </div>

        <div id="meals-day-panel" className="flex flex-col rounded-3xl border border-borderPrimary bg-card shadow-[0_4px_24px_rgba(15,23,42,0.06)] overflow-hidden min-h-[420px]">
          <MealsDayPanel
            date={selectedDate}
            meals={selectedMeals}
            onClose={() => setSelectedDate(null)}
            onView={(meal) => setViewMeal(meal)}
            onEdit={(meal) => setEditMeal(meal)}
            onDelete={(meal) => setDeleteMealTarget(meal)}
          />
        </div>
      </motion.div>

      {/* Recommendations Section */}
      {(loadingRecs || recommendations) && (
        <MealRecommendations data={recommendations} isLoading={loadingRecs} />
      )}

      {/* CRUD Modals */}
      <MealFormModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
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

      <MealDetailsModal
        meal={viewMeal}
        open={Boolean(viewMeal)}
        onClose={() => setViewMeal(null)}
      />
    </div>
  );
}
