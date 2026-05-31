import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { SectionHeader } from './SectionHeader';
import { MealItem } from './MealItem';

export function RecentMealsSection({ meals = [] }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <SectionHeader eyebrow="Aktivitas terbaru" title="Makanan terakhir" description="Pemindaian makanan dan deteksi nutrisi terbarumu" />

        <Button variant="ghost" className="hidden shrink-0 sm:inline-flex">
          Lihat semua
          <ArrowRight className="h-4 w-4 ml-2" />
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
          Lihat semua makanan
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
