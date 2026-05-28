import { motion } from 'framer-motion';

const filters = ['All', 'Today', 'This Week', 'This Month'];

export default function HistoryFilters({ activeFilter, onFilterChange }) {
  return (
    <div
      className="
        flex items-center gap-2
        overflow-x-auto
      "
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
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
                layoutId="history-filter-pill"
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
              {filter}
            </span>
          </button>
        );
      })}
    </div>
  );
}
