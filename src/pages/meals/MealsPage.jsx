import { UtensilsCrossed } from 'lucide-react';
import { EmptyFeatureState } from '../../components/dashboard/EmptyFeatureState';

export default function MealsPage() {
  return <EmptyFeatureState icon={UtensilsCrossed} title="Meals page" description="This route is prepared for meal logging, meal history, and future CRUD operations." />;
}
