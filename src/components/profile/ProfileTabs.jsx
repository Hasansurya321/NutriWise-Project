const tabs = ['Info Pribadi', 'Data Kesehatan', 'Target Nutrisi'];

export default function ProfileTabs({ activeTab, onChange }) {
  return (
    <div
      className="
        flex items-center
        rounded-full
        border border-borderPrimary
        bg-surface2
        p-1
      "
    >
      {tabs.map((tab) => {
        const active = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              relative
              flex-1
              rounded-full
              px-5 py-3
              text-sm font-medium
              transition-colors duration-200
              ${active ? 'border border-borderStrong bg-input text-textPrimary' : 'text-textMuted hover:bg-inputReadonly hover:text-textPrimary'}
            `}
          >
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
