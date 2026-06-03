import { Flame, Beef, Wheat, Droplets, Clock3 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

const MEAL_TYPE_LABELS = {
  BREAKFAST: 'Sarapan',
  LUNCH:     'Makan Siang',
  DINNER:    'Makan Malam',
  SNACK:     'Camilan',
};

const MEAL_TYPE_STYLES = {
  BREAKFAST: 'bg-amber-500/10 text-amber-600 border border-amber-500/25',
  LUNCH:     'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25',
  DINNER:    'bg-indigo-500/10 text-indigo-600 border border-indigo-500/25',
  SNACK:     'bg-rose-500/10 text-rose-600 border border-rose-500/25',
};

function fmt(n) {
  if (typeof n !== 'number' || isNaN(n)) return '–';
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

function NutrientRow({ icon: Icon, label, value, unit, color }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-borderPrimary last:border-0">
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${color.bg}`}>
          <Icon size={15} className={color.text} />
        </div>
        <span className="text-sm font-medium text-textPrimary">{label}</span>
      </div>
      <span className="text-sm font-bold text-textPrimary">
        {fmt(value)}<span className="text-xs font-normal text-textMuted ml-0.5">{unit}</span>
      </span>
    </div>
  );
}

export function MealDetailsModal({ meal, open, onClose }) {
  if (!meal) return null;

  const n = meal.totalNutrition || meal.nutrition || {};
  const label = MEAL_TYPE_LABELS[meal.mealType] || meal.mealType;
  const badgeClass = MEAL_TYPE_STYLES[meal.mealType] || MEAL_TYPE_STYLES.SNACK;
  const time = new Date(meal.createdAt).toLocaleString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] w-[92%] max-w-md overflow-y-auto rounded-3xl border border-borderPrimary bg-card p-0">
        <DialogTitle className="sr-only">Detail Makanan – {meal.foodName}</DialogTitle>

        {/* Hero Image */}
        {meal.imageUrl && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
            <img
              src={meal.imageUrl}
              alt={meal.foodName}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className="px-6 pt-5 pb-6 flex flex-col gap-5">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide ${badgeClass}`}>
                {label}
              </span>
              {meal.portion && (
                <span className="text-xs text-textMuted">{meal.portion} porsi</span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-textPrimary capitalize leading-snug">
              {meal.foodName?.replace(/_/g, ' ')}
            </h2>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-textMuted">
              <Clock3 size={12} /> {time}
            </p>
          </div>

          {/* Calorie card */}
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-primary/8 border border-primary/20 py-5">
            <Flame size={20} className="text-primary" />
            <div className="text-center">
              <p className="text-4xl font-black text-textPrimary leading-none">{Math.round(n.calorie || 0)}</p>
              <p className="text-xs font-medium text-textSecondary mt-1">kcal total</p>
            </div>
          </div>

          {/* Macro details */}
          <div className="rounded-2xl border border-borderPrimary bg-background/60 px-4 overflow-hidden">
            <NutrientRow
              icon={Beef}     label="Protein"      value={n.protein}      unit="g"
              color={{ bg: 'bg-emerald-500/10', text: 'text-emerald-600' }}
            />
            <NutrientRow
              icon={Wheat}    label="Karbohidrat"  value={n.carbohydrate} unit="g"
              color={{ bg: 'bg-indigo-500/10', text: 'text-indigo-600' }}
            />
            <NutrientRow
              icon={Droplets} label="Lemak"        value={n.fat}          unit="g"
              color={{ bg: 'bg-rose-500/10', text: 'text-rose-600' }}
            />
            {n.fiber != null && (
              <NutrientRow
                icon={Wheat} label="Serat" value={n.fiber} unit="g"
                color={{ bg: 'bg-green-500/10', text: 'text-green-600' }}
              />
            )}
            {n.water != null && (
              <NutrientRow
                icon={Droplets} label="Air" value={n.water} unit="ml"
                color={{ bg: 'bg-blue-500/10', text: 'text-blue-600' }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
