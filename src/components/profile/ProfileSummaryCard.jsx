export default function ProfileSummaryCard({ profile }) {
  return (
    <div
      className="
        rounded-3xl
        border border-borderPrimary
        bg-card
        p-8
      "
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="
            flex h-24 w-24 items-center justify-center
            rounded-full
            bg-primary/20
            text-3xl font-semibold
            text-primary
          "
        >
          {profile.initials}
        </div>

        <h2
          className="
            mt-6
            text-3xl font-semibold
            text-textPrimary
          "
        >
          {profile.fullName}
        </h2>

        <p
          className="
            mt-2
            text-base
            text-textSecondary
          "
        >
          {profile.email}
        </p>
      </div>

      <div
        className="
          mt-8
          border-t border-borderPrimary
          pt-6
          space-y-4
        "
      >
        <div className="flex items-center justify-between">
          <span className="text-textMuted">Member since</span>

          <span className="font-medium text-textPrimary">{profile.memberSince}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-textMuted">Total scans</span>

          <span className="font-medium text-textPrimary">{profile.totalScans}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-textMuted">Health score</span>

          <span
            className="
              rounded-full
              bg-primary/15
              px-3 py-1
              text-sm font-medium
              text-primary
            "
          >
            {profile.healthScore}/100
          </span>
        </div>
      </div>
    </div>
  );
}
