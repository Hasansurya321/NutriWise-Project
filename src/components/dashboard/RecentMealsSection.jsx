import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { SectionHeader } from './SectionHeader';
import { MealItem } from './MealItem';

export function RecentMealsSection({ meals = [] }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <SectionHeader eyebrow="Recent activity" title="Recent meals" description="Your latest food scans and nutrition detections" />

        <Button variant="ghost" className="hidden shrink-0 sm:inline-flex">
          View all
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <CardContent>
        <ul className="flex flex-col gap-3">
          {meals.map((meal) => (
            <li key={meal.id}>
              <MealItem {...meal} />
            </li>
          ))}
        </ul>

        <Button variant="ghost" className="mt-4 w-full sm:hidden">
          View all meals
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
