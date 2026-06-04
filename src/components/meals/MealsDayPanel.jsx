import { X, Flame, Beef, Wheat, Droplets, Pencil, Trash2, Eye } from 'lucide-react';

const MEAL_TYPE_LABELS = {
  BREAKFAST: 'Sarapan',
  LUNCH: 'Makan Siang',
  DINNER: 'Makan Malam',
  SNACK: 'Camilan',
};

const MEAL_TYPE_STYLES = {
  BREAKFAST: 'bg-amber-500/10 text-amber-600 border border-amber-500/30',
  LUNCH: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30',
  DINNER: 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/30',
  SNACK: 'bg-rose-500/10 text-rose-600 border border-rose-500/30',
};

function fmt(n) {
  const val = Number(n);
  if (isNaN(val) || n === null || n === undefined) return '–';
  return val % 1 === 0 ? val.toString() : val.toFixed(1);
}

function NutrientBadge({ icon: Icon, label, value, unit, colorClass }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl bg-surface2/60 dark:bg-surface2/30 px-1.5 py-2 text-center">
      <Icon size={13} className={colorClass} />
      <p className="text-[0.6rem] font-medium uppercase tracking-wide text-textMuted">{label}</p>
      <p className="text-[0.8125rem] font-bold text-textPrimary leading-tight">
        {fmt(value)}<span className="text-[0.6rem] font-medium text-textMuted">{unit}</span>
      </p>
    </div>
  );
}

function MealCard({ meal, onEdit, onDelete, onView }) {
  const nutrients = meal.totalNutrition || meal.nutrition || meal;
  const info = meal.nutrition || meal;
  const badgeClass = MEAL_TYPE_STYLES[meal.mealType] || MEAL_TYPE_STYLES.SNACK;
  const label = MEAL_TYPE_LABELS[meal.mealType] || meal.mealType;
  const time = new Date(meal.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="rounded-2xl border border-borderPrimary bg-background p-3.5 flex flex-col gap-3 transition-all duration-150 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(93,219,138,0.08)]">
      <div className="flex gap-3 items-start">
        <img
          src={meal.imageUrl || 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80'}
          alt={meal.foodName}
          className="w-[52px] h-[52px] rounded-xl object-cover shrink-0 border border-borderPrimary"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80'; }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-block px-2 py-0.5 rounded-full text-[0.6rem] font-semibold uppercase tracking-wide ${badgeClass}`}>
              {label}
            </span>
            <span className="text-[0.7rem] text-textMuted ml-auto">{time}</span>
          </div>
          <p className="mt-1 text-[0.9375rem] font-semibold text-textPrimary truncate">{meal.foodName}</p>
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            {meal.portion && Number(meal.portion) !== 1 && (
              <p className="text-[0.75rem] text-textMuted">{meal.portion}</p>
            )}
            {(info.servingDescription || info.servingSizeG) ? (
              <>
                {meal.portion && Number(meal.portion) > 1 && (
                  <span className="text-textMuted text-[0.75rem]">x</span>
                )}
                <p className="text-[0.75rem] text-textSecondary">
                  {info.servingDescription || '-'}
                  {(info.servingSizeG) ? ` (${info.servingSizeG}g)` : ''}
                </p>
              </>
            ) : (
              Number(meal.portion) === 1 && (
                <p className="text-[0.75rem] text-textMuted">1 porsi</p>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5">
        <NutrientBadge icon={Flame} label="Kalori" value={nutrients.calorie} unit=" kcal" colorClass="text-amber-500" />
        <NutrientBadge icon={Beef} label="Protein" value={nutrients.protein} unit="g" colorClass="text-emerald-500" />
        <NutrientBadge icon={Wheat} label="Karbo" value={nutrients.carbohydrate} unit="g" colorClass="text-indigo-500" />
        <NutrientBadge icon={Droplets} label="Lemak" value={nutrients.fat} unit="g" colorClass="text-rose-500" />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView?.(meal)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-borderPrimary py-1.5 text-xs font-medium text-textSecondary hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
        >
          <Eye size={12} /> Lihat
        </button>
        <button
          onClick={() => onEdit?.(meal)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-borderPrimary py-1.5 text-xs font-medium text-textSecondary hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
        >
          <Pencil size={12} /> Edit
        </button>
        <button
          onClick={() => onDelete?.(meal)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-borderPrimary py-1.5 text-xs font-medium text-textSecondary hover:border-danger/30 hover:text-danger hover:bg-danger/5 transition-all"
        >
          <Trash2 size={12} /> Hapus
        </button>
      </div>
    </div>
  );
}

export default function MealsDayPanel({ date, meals, onClose, onEdit, onDelete, onView }) {
  const totalCalorie = meals.reduce((s, m) => s + Number(m.totalNutrition?.calorie || m.nutrition?.calorie || m.calorie || 0), 0);
  const totalProtein = meals.reduce((s, m) => s + Number(m.totalNutrition?.protein || m.nutrition?.protein || m.protein || 0), 0);
  const totalCarbs = meals.reduce((s, m) => s + Number(m.totalNutrition?.carbohydrate || m.nutrition?.carbohydrate || m.carbohydrate || 0), 0);
  const totalFat = meals.reduce((s, m) => s + Number(m.totalNutrition?.fat || m.nutrition?.fat || m.fat || 0), 0);

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
    : '';

  if (!date) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full min-h-[400px] px-8 py-12 text-center gap-3">
        <span className="text-4xl opacity-50">📅</span>
        <p className="text-base font-semibold text-textPrimary">Pilih Tanggal</p>
        <p className="text-sm text-textSecondary max-w-[220px] leading-relaxed">
          Klik pada tanggal di kalender untuk melihat detail makanan yang dikonsumsi.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-start justify-between px-5 py-4 border-b border-borderPrimary shrink-0">
        <div>
          <p className="text-[0.9375rem] font-semibold text-textPrimary leading-snug">{formattedDate}</p>
          <p className="mt-0.5 text-[0.75rem] text-textMuted">{meals.length} item makanan</p>
        </div>
        <button
          className="flex items-center justify-center w-[30px] h-[30px] rounded-lg border border-borderPrimary text-textSecondary hover:bg-surface2 hover:text-textPrimary transition-all duration-150 shrink-0"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={16} />
        </button>
      </div>

      {meals.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 px-6 py-10 text-center gap-2">
          <span className="text-3xl opacity-50">🍽️</span>
          <p className="text-sm text-textSecondary max-w-[220px] leading-relaxed">
            Tidak ada makanan yang tercatat pada hari ini.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 border-b border-borderPrimary shrink-0">
            {[
              { icon: Flame, label: 'Kalori', value: `${Math.round(totalCalorie)} kcal`, color: 'text-amber-500' },
              { icon: Beef, label: 'Protein', value: `${fmt(totalProtein)}g`, color: 'text-emerald-500' },
              { icon: Wheat, label: 'Karbo', value: `${fmt(totalCarbs)}g`, color: 'text-indigo-500' },
              { icon: Droplets, label: 'Lemak', value: `${fmt(totalFat)}g`, color: 'text-rose-500' },
            ].map(({ icon: Icon, label, value, color }, i, arr) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-2.5 py-3 ${i < arr.length - 1 ? 'border-r border-borderPrimary' : ''}`}
              >
                <Icon size={13} className={`shrink-0 ${color}`} />
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-medium uppercase tracking-wide text-textMuted leading-tight whitespace-nowrap">{label}</p>
                  <p className="text-[0.8rem] font-bold text-textPrimary leading-tight whitespace-nowrap">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} onEdit={onEdit} onDelete={onDelete} onView={onView} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
