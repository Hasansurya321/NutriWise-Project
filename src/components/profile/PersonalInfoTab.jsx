import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PersonalInfoTab({ data }) {
  const [shakingField, setShakingField] = useState(null);

  function triggerLockedFeedback(field) {
    setShakingField(field);

    setTimeout(() => {
      setShakingField(null);
    }, 500);
  }

  const lockedFields = [
    {
      label: 'Full Name',
      field: 'fullName',
      value: data.fullName,
    },
    {
      label: 'Email Address',
      field: 'email',
      value: data.email,
    },
    {
      label: 'Age',
      field: 'age',
      value: data.age,
    },
    {
      label: 'Gender',
      field: 'gender',
      value: data.gender,
    },
  ];

  return (
    <div
      className="
        grid grid-cols-1
        gap-6
        md:grid-cols-2
      "
    >
      {lockedFields.map((item) => (
        <div key={item.field}>
          <label
            className="
              mb-3 block
              text-sm font-medium
              text-textPrimary
            "
          >
            {item.label}
          </label>

          <div className="relative">
            <input
              type="text"
              value={item.value}
              readOnly
              onClick={() => triggerLockedFeedback(item.field)}
              onFocus={() => triggerLockedFeedback(item.field)}
              className={`
                w-full
                rounded-2xl
                border
                px-4 py-4 pr-14
                outline-none
                transition-all duration-200
                cursor-not-allowed

                ${
                  shakingField === item.field
                    ? `
                      border-red-400
                      bg-red-500/10
                      text-red-200
                    `
                    : `
                      border-borderPrimary
                      bg-inputReadonly
                      text-textSecondary
                    `
                }
              `}
              style={{
                animation: shakingField === item.field ? 'lockedShake 0.45s ease' : 'none',

                boxShadow: shakingField === item.field ? '0 0 0 1px rgba(248,113,113,0.35)' : 'none',
              }}
            />

            <div
              className="
                pointer-events-none
                absolute right-4 top-1/2
                -translate-y-1/2
                text-textMuted
              "
            >
              <Lock className="h-4 w-4" />
            </div>
          </div>

          <p
            className="
              mt-2
              text-xs
              text-textMuted
            "
          >
            System controlled field
          </p>
        </div>
      ))}
    </div>
  );
}
