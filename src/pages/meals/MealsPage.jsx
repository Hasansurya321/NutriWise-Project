import { useState } from 'react';
import { Plus } from 'lucide-react';
import MealsCalendar from '../../components/meals/MealsCalendar';
import MealsDayPanel from '../../components/meals/MealsDayPanel';
import { MealFormModal } from '../../components/meals/MealFormModal';
import { DeleteConfirmDialog } from '../../components/meals/DeleteConfirmDialog';
import { MealDetailsModal } from '../../components/history/MealDetailsModal';
import { useMealsCalendar } from '../../hooks/useMealsCalendar';
import { mealAPI } from '../../services/api';

export default function MealsPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { calendarEvents, mealsByDate, isLoading, error, reload } = useMealsCalendar();

  // CRUD state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editMeal, setEditMeal] = useState(null);
  const [viewMeal, setViewMeal] = useState(null);
  const [deleteMealTarget, setDeleteMealTarget] = useState(null);

  const selectedMeals = selectedDate ? (mealsByDate[selectedDate] || []) : [];

  function handleDateClick(dateStr) {
    setSelectedDate((prev) => (prev === dateStr ? null : dateStr));
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
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-textPrimary">Jurnal Makan</h1>
          <p className="mt-1.5 text-sm text-textSecondary">
            Klik tanggal untuk melihat detail makanan dan kandungan nutrisi harian.
          </p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-all duration-150 shrink-0"
        >
          <Plus size={16} /> Tambah Meal
        </button>
      </header>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-danger/25 bg-danger/8 px-5 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 items-start xl:grid-cols-[1fr_380px]">
        {/* Calendar column */}
        <div className="rounded-3xl border border-borderPrimary bg-card shadow-[0_4px_24px_rgba(15,23,42,0.06)] overflow-hidden">
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

        {/* Detail panel column */}
        <div className="rounded-3xl border border-borderPrimary bg-card shadow-[0_4px_24px_rgba(15,23,42,0.06)] overflow-hidden min-h-[420px] flex flex-col">
          <MealsDayPanel
            date={selectedDate}
            meals={selectedMeals}
            onClose={() => setSelectedDate(null)}
            onView={(meal) => setViewMeal(meal)}
            onEdit={(meal) => setEditMeal(meal)}
            onDelete={(meal) => setDeleteMealTarget(meal)}
          />
        </div>
      </div>

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
