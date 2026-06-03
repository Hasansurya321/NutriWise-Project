import EditProfileButton from './EditProfileButton';
import { PageHeader } from '../layout/PageHeader';

export default function ProfileHeader({ isEditing, onEdit, onSave, onCancel }) {
  return (
    <PageHeader
      title="Profil"
      description="Kelola informasi pribadi dan target nutrisi Anda"
    >
      <EditProfileButton isEditing={isEditing} onEdit={onEdit} onSave={onSave} onCancel={onCancel} />
    </PageHeader>
  );
}
