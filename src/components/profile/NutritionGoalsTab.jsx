import MacroDistribution from './MacroDistribution';
import { Input } from '../ui/input';

export default function NutritionGoalsTab({ data, isEditing, onFieldChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Daily Calorie Target (kcal)" type="number" value={data.calories} isEditing={isEditing} onChange={(value) => onFieldChange('calories', Number(value))} />

        <Field label="Protein Target (g)" type="number" value={data.protein} isEditing={isEditing} onChange={(value) => onFieldChange('protein', Number(value))} />

        <Field label="Carbohydrate Target (g)" type="number" value={data.carbs} isEditing={isEditing} onChange={(value) => onFieldChange('carbs', Number(value))} />

        <Field label="Fats Target (g)" type="number" value={data.fats} isEditing={isEditing} onChange={(value) => onFieldChange('fats', Number(value))} />
      </div>

      <MacroDistribution macros={data.macroDistribution} />
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
