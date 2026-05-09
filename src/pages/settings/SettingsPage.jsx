import { Settings } from 'lucide-react';
import { EmptyFeatureState } from '../../components/dashboard/EmptyFeatureState';

export default function SettingsPage() {
  return <EmptyFeatureState icon={Settings} title="Settings page" description="This route is prepared for theme, profile, notification, and system preferences." />;
}
