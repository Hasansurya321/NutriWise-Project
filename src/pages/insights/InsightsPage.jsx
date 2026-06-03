import { Sparkles } from 'lucide-react';
import { EmptyFeatureState } from '../../components/dashboard/EmptyFeatureState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function InsightsPage() {
  useDocumentTitle('Insights');
  return <EmptyFeatureState icon={Sparkles} title="Insights page" description="This route is prepared for AI summaries, analytics detail, and nutrition recommendations." />;
}
