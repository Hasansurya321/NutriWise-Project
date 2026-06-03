import AvatarUpload from './AvatarUpload';

export default function ProfileSummaryCard({ profile, userId, onAvatarSuccess }) {
  return (
    <div className="rounded-3xl border border-borderPrimary bg-card p-8">
      {/* Avatar section */}
      <div className="flex flex-col items-center text-center gap-2">
        <AvatarUpload
          avatarUrl={profile.avatarUrl}
          fullName={profile.fullName}
          userId={userId}
          onSuccess={onAvatarSuccess}
        />
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-borderPrimary" />

      {/* Fullname display */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-textPrimary">{profile.fullName}</h2>
      </div>

      {/* Email (always locked, no edit) */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-textPrimary">Email</label>
        <div className="flex items-center rounded-xl border border-borderPrimary bg-inputReadonly px-3 py-2.5 cursor-not-allowed">
          <span className="flex-1 text-sm text-textSecondary truncate">{profile.email}</span>
          <span className="ml-2 text-[0.6rem] font-semibold uppercase tracking-wide text-textMuted bg-surface2 border border-borderPrimary rounded-full px-2 py-0.5">
            Tetap
          </span>
        </div>
        <p className="mt-1 text-xs text-textMuted">Email tidak dapat diubah.</p>
      </div>

      {/* Stats */}
      <div className="border-t border-borderPrimary pt-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-textMuted">Member since</span>
          <span className="text-sm font-medium text-textPrimary">{profile.memberSince}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-textMuted">Total scans</span>
          <span className="text-sm font-medium text-textPrimary">{profile.totalScans}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-textMuted">Health score</span>
          <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
            {profile.healthScore}/100
          </span>
        </div>
      </div>
    </div>
  );
}
