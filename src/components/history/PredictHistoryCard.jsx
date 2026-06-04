import { motion } from 'framer-motion';
import { Clock3, Beef, Wheat, Droplets, Plus, Eye, Trash2 } from 'lucide-react';
import { formatNutrition as fmt } from '../../utils/format';

export default function PredictHistoryCard({ log, onView, onAdd, onDelete }) {
  const n = log.nutrition || {};
  const tn = log.totalNutrition || n;

  return (
    <motion.div
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
            className="h-16 w-16 shrink-0 rounded-2xl border border-borderPrimary object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-blue-600">Scan AI</span>
            <span className="flex items-center gap-1 text-xs text-textMuted">
              <Clock3 size={11} />
              {new Date(log.createdAt).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <h3 className="mt-1.5 truncate text-base font-semibold capitalize leading-snug text-textPrimary">{log.foodName?.replace(/_/g, ' ')}</h3>
          {(n.servingDescription || n.servingSizeG) && (
            <p className="mt-0.5 text-[0.65rem] text-textSecondary">
              {n.servingDescription || '-'}
              {n.servingSizeG ? ` (${n.servingSizeG}g)` : ''}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className="text-2xl font-bold leading-tight text-primary">{Math.round(tn.calorie || n.calorie || 0)}</p>
          <p className="text-xs text-textMuted">kcal</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: Beef, label: 'Protein', value: tn.protein || n.protein, unit: 'g', color: 'text-emerald-500' },
          { icon: Wheat, label: 'Karbohidrat', value: tn.carbohydrate || n.carbohydrate, unit: 'g', color: 'text-indigo-500' },
          { icon: Droplets, label: 'Lemak', value: tn.fat || n.fat, unit: 'g', color: 'text-rose-500' },
        ].map(({ icon: Icon, label, value, unit, color }) => (
          <div key={label} className="flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2">
            <Icon size={13} className={`shrink-0 ${color}`} />
            <div>
              <p className="text-[0.6rem] font-medium uppercase tracking-wide text-textMuted">{label}</p>
              <p className="text-sm font-bold leading-tight text-textPrimary">
                {fmt(value)}
                <span className="text-xs font-normal text-textMuted">{unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView(log)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-borderPrimary bg-background/40 px-3 py-2.5 text-[0.8rem] font-medium text-textSecondary transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          <Eye size={14} /> Lihat
        </button>
        <button
          onClick={() => onAdd(log)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-primary/20 bg-primary/10 px-3 py-2.5 text-[0.8rem] font-medium text-primary transition-all hover:border-primary hover:bg-primary hover:text-white"
        >
          <Plus size={14} /> Tambah
        </button>
        <button
          onClick={() => onDelete?.(log)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-borderPrimary bg-background/40 px-3 py-2.5 text-[0.8rem] font-medium text-textSecondary transition-all hover:border-danger/30 hover:bg-danger/5 hover:text-danger"
        >
          <Trash2 size={14} /> Hapus
        </button>
      </div>
    </motion.div>
  );
}
