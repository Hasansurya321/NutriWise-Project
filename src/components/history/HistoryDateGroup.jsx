import { CalendarDays } from 'lucide-react';

import MealHistoryCard from './MealHistoryCard';

export default function HistoryDateGroup({ group, onViewDetails }) {
  return (
    <section className="space-y-6">
      <div
        className="
          flex items-center gap-3
        "
      >
        <CalendarDays size={20} className="text-emerald-400" />

        <h2
          className="
            text-2xl font-semibold
            tracking-tight
            text-textPrimary
          "
        >
          {group.date}
        </h2>
      </div>

      <div className="space-y-6">
        {group.meals.map((meal) => (
          <MealHistoryCard key={meal.id} meal={meal} onViewDetails={onViewDetails} />
        ))}
      </div>
    </section>
  );
}
