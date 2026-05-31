import { motion } from 'framer-motion';

const categories = [
  { key: 'meal', label: 'Meal History' },
  { key: 'predict', label: 'Predict History' },
];

const timeFilters = ['Semua', 'Hari Ini', 'Minggu Ini', 'Bulan Ini'];

export default function HistoryFilters({ activeCategory, onCategoryChange, activeFilter, onFilterChange }) {
  return (
    <div className="space-y-3">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className="
                relative
                overflow-hidden
                rounded-full
                px-5 py-2.5
                text-sm font-medium
                whitespace-nowrap
                transition-colors duration-200
              "
            >
              {isActive && (
                <motion.div
                  layoutId="history-category-pill"
                  className="
                    absolute inset-0
                    rounded-full
                    bg-primary/20
                    border border-primary/30
                  "
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 22,
                  }}
                />
              )}

              <span
                className={`
                  relative z-10
                  ${isActive ? 'text-primary' : 'text-textSecondary'}
                `}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {timeFilters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className="
                relative
                overflow-hidden
                rounded-full
                px-5 py-2
                text-sm font-medium
                whitespace-nowrap
                transition-colors duration-200
              "
            >
              {isActive && (
                <motion.div
                  layoutId="history-time-pill"
                  className="
                    absolute inset-0
                    rounded-full
                    bg-primary/10
                    border border-primary/20
                  "
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 22,
                  }}
                />
              )}

              <span
                className={`
                  relative z-10
                  ${isActive ? 'text-primary' : 'text-textMuted'}
                `}
              >
                {filter}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
