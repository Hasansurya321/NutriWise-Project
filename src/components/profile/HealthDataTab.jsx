import { Input } from '../ui/input';

export default function HealthDataTab({ data, isEditing, onFieldChange }) {
  const bmi = calculateBmi(data.height, data.weight);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Height (cm)" type="number" value={data.height} isEditing={isEditing} onChange={(value) => onFieldChange('height', Number(value))} />

        <Field label="Weight (kg)" type="number" value={data.weight} isEditing={isEditing} onChange={(value) => onFieldChange('weight', Number(value))} />

        <Field label="Activity Level" value={data.activityLevel} isEditing={isEditing} onChange={(value) => onFieldChange('activityLevel', value)} />

        <Field label="BMI" value={bmi} isEditing={false} onChange={() => {}} />
      </div>
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

function calculateBmi(heightCm, weightKg) {
  const heightMeter = Number(heightCm) / 100;

  if (!heightMeter || !weightKg) return '-';

  const bmi = Number(weightKg) / (heightMeter * heightMeter);

  return bmi.toFixed(1);
}
