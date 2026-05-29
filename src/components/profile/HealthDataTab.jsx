import ProfileField from './ProfileField';

export default function HealthDataTab({ data, isEditing, onFieldChange }) {
return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ProfileField label="Height (cm)" type="number" value={data.height} isEditing={isEditing} onChange={(value) => onFieldChange('height', Number(value))} />

        <ProfileField label="Weight (kg)" type="number" value={data.weight} isEditing={isEditing} onChange={(value) => onFieldChange('weight', Number(value))} />

        <ProfileField label="Activity Level" value={data.activityLevel} isEditing={isEditing} onChange={(value) => onFieldChange('activityLevel', value)} />

        <ProfileField label="BMI" value={data.bmi} isEditing={false} onChange={() => {}} />
      </div>
    </div>
  );
}