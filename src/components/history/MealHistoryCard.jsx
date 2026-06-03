import { motion } from 'framer-motion';
import { Clock3, Flame, Beef, Wheat, Droplets, Pencil, Trash2, Eye } from 'lucide-react';

const MEAL_TYPE_LABELS = {
  BREAKFAST: 'Sarapan',
  LUNCH: 'Makan Siang',
  DINNER: 'Makan Malam',
  SNACK: 'Camilan',
};

const MEAL_TYPE_STYLES = {
  BREAKFAST: 'bg-amber-500/10 text-amber-600 border border-amber-500/25',
  LUNCH: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25',
  DINNER: 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/25',
  SNACK: 'bg-rose-500/10 text-rose-600 border border-rose-500/25',
};

function fmt(n) {
  if (typeof n !== 'number' || isNaN(n)) return '–';
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

export default function MealHistoryCard({ meal, onEdit, onDelete, onView }) {
  const n = meal.totalNutrition || meal.nutrition || {};
  const label = MEAL_TYPE_LABELS[meal.mealType] || meal.mealType;
  const badgeClass = MEAL_TYPE_STYLES[meal.mealType] || MEAL_TYPE_STYLES.SNACK;
  const time = new Date(meal.createdAt).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-borderPrimary bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {meal.imageUrl && (
          <img
            src={meal.imageUrl}
            alt={meal.foodName}
            className="h-16 w-16 rounded-2xl object-cover shrink-0 border border-borderPrimary"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}

        <div className="flex-1 min-w-0">
          {/* Badge + time row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide ${badgeClass}`}>
              {label}
            </span>
            <span className="text-xs text-textMuted flex items-center gap-1">
              <Clock3 size={11} /> {time}
            </span>
            {meal.portion && meal.portion !== 1 && (
              <span className="text-xs text-textMuted">{meal.portion} porsi</span>
            )}
          </div>
          <h3 className="mt-1.5 text-base font-semibold text-textPrimary capitalize leading-snug truncate">
            {meal.foodName?.replace(/_/g, ' ')}
          </h3>
        </div>

        {/* Calorie highlight */}
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-primary leading-tight">{Math.round(n.calorie || 0)}</p>
          <p className="text-xs text-textMuted">kcal</p>
        </div>
      </div>

      {/* Nutrition row */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Beef, label: 'Protein', value: n.protein, unit: 'g', color: 'text-emerald-500' },
          { icon: Wheat, label: 'Karbohidrat', value: n.carbohydrate, unit: 'g', color: 'text-indigo-500' },
          { icon: Droplets, label: 'Lemak', value: n.fat, unit: 'g', color: 'text-rose-500' },
        ].map(({ icon: Icon, label: lbl, value, unit, color }) => (
          <div key={lbl} className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2">
            <Icon size={13} className={`shrink-0 ${color}`} />
            <div>
              <p className="text-[0.6rem] uppercase tracking-wide text-textMuted font-medium">{lbl}</p>
              <p className="text-sm font-bold text-textPrimary leading-tight">{fmt(value)}<span className="text-xs font-normal text-textMuted">{unit}</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView?.(meal)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-borderPrimary bg-background/40 px-3 py-2.5 text-[0.8rem] font-medium text-textSecondary transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
        >
          <Eye size={14} /> Lihat
        </button>
        <button
          onClick={() => onEdit?.(meal)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-borderPrimary bg-background/40 px-3 py-2.5 text-[0.8rem] font-medium text-textSecondary transition-all hover:border-primary/30 hover:text-primary hover:bg-primary/5"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          onClick={() => onDelete?.(meal)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-borderPrimary bg-background/40 px-3 py-2.5 text-[0.8rem] font-medium text-textSecondary transition-all hover:border-danger/30 hover:text-danger hover:bg-danger/5"
        >
          <Trash2 size={14} /> Hapus
        </button>
      </div>
    </motion.div>
  );
}
