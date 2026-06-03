import { Clock3, Flame } from 'lucide-react';

export function MealMetadata({ calories, timestamp, servingSizeG, servingDescription, portion }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-textSecondary">
      <div className="flex items-center gap-1.5">
        <Flame className="h-4 w-4" />
        <span>{calories} kcal</span>
      </div>

      <span className="h-1 w-1 rounded-full bg-textMuted" />

      <div className="flex items-center gap-1.5">
        <Clock3 className="h-4 w-4" />
        <span>{timestamp}</span>
      </div>

      {(servingDescription || servingSizeG) && (
        <>
          <span className="h-1 w-1 rounded-full bg-textMuted" />
          <div className="flex items-center gap-1.5 max-w-[150px]">
            <span className="truncate">
              {portion ? `${portion}x ` : ''}
              {servingSizeG ? `${servingSizeG}g` : servingDescription}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
