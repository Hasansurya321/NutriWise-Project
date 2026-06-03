import { CalendarDays } from 'lucide-react';
import MealHistoryCard from './MealHistoryCard';

export default function HistoryDateGroup({ group, onEdit, onDelete, onViewDetails }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2.5">
        <CalendarDays size={18} className="text-primary shrink-0" />
        <h2 className="text-xl font-semibold tracking-tight text-textPrimary">{group.date}</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {group.meals.map((meal) => (
          <MealHistoryCard
            key={meal.id}
            meal={meal}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
}
