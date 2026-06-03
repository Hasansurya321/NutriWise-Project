// import MacroDistribution from './MacroDistribution';
import ProfileField from './ProfileField';

export default function NutritionGoalsTab({ data, isEditing, onFieldChange }) {
  const handleNumericChange = (field, value) => {
    // Pass through whatever value comes (could be '' or number) to preserve empty state
    onFieldChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ProfileField label="Daily Calorie Target (kcal)" type="number" value={data.calories} isEditing={isEditing} onChange={(value) => handleNumericChange('calories', value)} />

        <ProfileField label="Protein Target (g)" type="number" value={data.protein} isEditing={isEditing} onChange={(value) => handleNumericChange('protein', value)} />

        <ProfileField label="Carbohydrate Target (g)" type="number" value={data.carbs} isEditing={isEditing} onChange={(value) => handleNumericChange('carbs', value)} />

        <ProfileField label="Fats Target (g)" type="number" value={data.fats} isEditing={isEditing} onChange={(value) => handleNumericChange('fats', value)} />
      </div>

      {/* <MacroDistribution macros={data.macroDistribution} /> */}
    </div>
  );
}
