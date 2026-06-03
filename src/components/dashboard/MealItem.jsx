import { ChevronRight } from 'lucide-react';

import { getIconByName } from '../../utils/iconRegistry';
import { Button } from '../ui/button';
import { ConfidenceBadge } from './ConfidenceBadge';
import { MealMetadata } from './MealMetadata';

export function MealItem({ name, calories, confidence, timestamp, image, iconName }) {
  const Icon = getIconByName(iconName, 'Apple');

  return (
    <article
      className="
        flex flex-col gap-4 rounded-2xl border border-white/5
        bg-white/[0.02] px-5 py-4 transition-all duration-200
        hover:border-white/10 hover:bg-white/[0.04]
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex h-12 w-12 shrink-0 items-center justify-center
            overflow-hidden rounded-xl border border-white/5
            bg-primary/10 text-primary
          "
        >
          {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : Icon ? <Icon className="h-5 w-5" /> : null}
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-textPrimary">{name}</h3>

            <ConfidenceBadge confidence={confidence} />
          </div>

          <MealMetadata calories={calories} timestamp={timestamp} />
        </div>
      </div>
    </article>
  );
}
