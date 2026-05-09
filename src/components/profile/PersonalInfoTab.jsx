import { Input } from '../ui/input';

export default function PersonalInfoTab({ data, isEditing, onFieldChange }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <Field label="Full Name" value={data.fullName} isEditing={isEditing} onChange={(value) => onFieldChange('fullName', value)} />

      <Field label="Email Address" value={data.email} isEditing={isEditing} onChange={(value) => onFieldChange('email', value)} />

      <Field label="Age" type="number" value={data.age} isEditing={isEditing} onChange={(value) => onFieldChange('age', Number(value))} />

      <Field label="Gender" value={data.gender} isEditing={isEditing} onChange={(value) => onFieldChange('gender', value)} />
    </div>
  );
}

function Field({ label, value, isEditing, onChange, type = 'text' }) {
  return (
    <div>
      <label
        className="
          mb-2 block
          text-sm font-medium
          text-textPrimary
        "
      >
        {label}
      </label>

      <Input
        type={type}
        value={value}
        readOnly={!isEditing}
        onChange={(event) => onChange(event.target.value)}
        className={isEditing ? 'border-borderStrong bg-input text-textPrimary' : 'cursor-default border-borderPrimary bg-inputReadonly text-textSecondary'}
      />
    </div>
  );
}
