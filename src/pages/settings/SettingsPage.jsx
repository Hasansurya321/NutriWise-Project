import { Settings } from 'lucide-react';
import { EmptyFeatureState } from '../../components/dashboard/EmptyFeatureState';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function SettingsPage() {
  useDocumentTitle('Pengaturan');
  return <EmptyFeatureState icon={Settings} title="Settings page" description="This route is prepared for theme, profile, notification, and system preferences." />;
}
