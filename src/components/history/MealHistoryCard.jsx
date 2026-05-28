import { motion } from 'framer-motion';
import { Clock3, ChevronRight } from 'lucide-react';

import FoodItemRow from './FoodItemRow';
import NutritionSummary from './NutritionSummary';

export default function MealHistoryCard({ meal, onViewDetails }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      className="
        rounded-3xl
        border border-borderPrimary
        bg-card
        p-6
        shadow-lg
        transition-all duration-300
        hover:border-primary/20
        hover:shadow-2xl
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="
                rounded-full
                bg-primary/20
                px-3 py-1
                text-xs font-medium
                text-primary
              "
            >
              {meal.type}
            </span>

            <div
              className="
                flex items-center gap-2
                text-sm text-textMuted
              "
            >
              <Clock3 size={14} />
              {meal.time}
            </div>
          </div>

          <p
            className="
              mt-3
              text-sm text-textMuted
            "
          >
            {meal.items.length} items detected
          </p>
        </div>

        <div className="text-left lg:text-right">
          <div
            className="
              text-3xl font-semibold
              text-primary
            "
          >
            {meal.totalCalories}
          </div>

          <div
            className="
              text-sm text-textMuted
            "
          >
            total kcal
          </div>
        </div>
      </div>

      {/* Food Items */}
      <div className="mt-6 space-y-3">
        {meal.items.map((item) => (
          <FoodItemRow key={item.id} item={item} />
        ))}
      </div>

      {/* Nutrition Summary */}
      <div className="mt-5">
        <NutritionSummary macros={meal.macros} />
      </div>

      {/* Action Button */}
      <button
        onClick={() => onViewDetails(meal)}
        className="
          mt-5
          flex w-full
          items-center justify-center gap-2
          rounded-2xl
          border border-borderPrimary
          bg-background/30
          px-4 py-3
          text-sm font-medium
          text-primary
          transition-colors duration-200
          hover:bg-background/50
        "
      >
        View Details
        <ChevronRight size={16} />
      </button>
    </motion.div>
  );
}
