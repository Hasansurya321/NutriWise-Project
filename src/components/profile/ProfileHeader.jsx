import EditProfileButton from './EditProfileButton';

export default function ProfileHeader({ isEditing, onEdit, onSave, onCancel }) {
  return (
    <div
      className="
        flex flex-col gap-4
        lg:flex-row lg:items-start lg:justify-between
      "
    >
      <div>
        <h1
          className="
            text-4xl font-semibold
            tracking-tight
            text-textPrimary
          "
        >
          Profile
        </h1>

        <p
          className="
            mt-2
            text-base
            text-textSecondary
          "
        >
          Manage your personal information and nutrition goals
        </p>
      </div>

      <EditProfileButton isEditing={isEditing} onEdit={onEdit} onSave={onSave} onCancel={onCancel} />
    </div>
  );
}
