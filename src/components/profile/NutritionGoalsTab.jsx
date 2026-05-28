import MacroDistribution from './MacroDistribution';
import ProfileField from './ProfileField';

export default function NutritionGoalsTab({ data, isEditing, onFieldChange }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ProfileField label="Daily Calorie Target (kcal)" type="number" value={data.calories} isEditing={isEditing} onChange={(value) => onFieldChange('calories', Number(value))} />

        <ProfileField label="Protein Target (g)" type="number" value={data.protein} isEditing={isEditing} onChange={(value) => onFieldChange('protein', Number(value))} />

        <ProfileField label="Carbohydrate Target (g)" type="number" value={data.carbs} isEditing={isEditing} onChange={(value) => onFieldChange('carbs', Number(value))} />

        <ProfileField label="Fats Target (g)" type="number" value={data.fats} isEditing={isEditing} onChange={(value) => onFieldChange('fats', Number(value))} />
      </div>

      <MacroDistribution macros={data.macroDistribution} />
    </div>
  );
}
