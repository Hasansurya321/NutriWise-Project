import { getIconByName } from '../../utils/iconRegistry';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

export function MealDetailsModal({ meal, open, onClose }) {
  if (!meal) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] w-[92%] max-w-2xl overflow-y-auto sm:rounded-3xl border-modalPanelBorder bg-modalPanel p-6">
        <DialogTitle className="sr-only">Meal Details for {meal.name || 'Predicted Meal'}</DialogTitle>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-textSecondary">
              {meal.type} • {meal.time}
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-textPrimary">{meal.totalCalories} Calories</h2>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">
          {/* AI Insight */}
          <div>
            <h3 className="text-sm font-medium text-textSecondary">AI Nutrition Insight</h3>
            <div className="mt-3 rounded-2xl border border-borderPrimary bg-background/40 p-4 text-sm leading-relaxed text-textPrimary">
              {meal.aiInsight}
            </div>
          </div>

          {/* Ingredients */}
          {meal.ingredients && meal.ingredients.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-textSecondary">Ingredients</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {meal.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="rounded-full border border-borderPrimary bg-background/40 px-4 py-2 text-sm text-textPrimary"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition Macros */}
          <div>
            <h3 className="text-sm font-medium text-textSecondary">Nutrition Macros</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-borderPrimary bg-background/40 p-4">
                <p className="text-xs text-textSecondary">Protein</p>
                <p className="mt-2 text-lg font-semibold text-textPrimary">{meal.macros.protein}g</p>
              </div>

              <div className="rounded-2xl border border-borderPrimary bg-background/40 p-4">
                <p className="text-xs text-textSecondary">Carbs</p>
                <p className="mt-2 text-lg font-semibold text-textPrimary">{meal.macros.carbs}g</p>
              </div>

              <div className="rounded-2xl border border-borderPrimary bg-background/40 p-4">
                <p className="text-xs text-textSecondary">Fats</p>
                <p className="mt-2 text-lg font-semibold text-textPrimary">{meal.macros.fat || meal.macros.fats}g</p>
              </div>
            </div>
          </div>

          {/* Food Items */}
          <div>
            <h3 className="text-sm font-medium text-textSecondary">Meal Items</h3>
            <div className="mt-3 space-y-3">
              {meal.items.map((item) => {
                const Icon = getIconByName(item.iconName, 'Apple');

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-borderPrimary bg-background/40 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-card text-primary">
                        <img src={item.img_url} alt={item.name} className="h-5 w-5 aspect-square" />
                      </div>

                      <div>
                        <p className="font-medium text-textPrimary">{item.name}</p>
                        <p className="text-sm text-textSecondary">{item.calories} kcal</p>
                      </div>
                    </div>

                    <div className="text-right text-sm text-textSecondary">
                      <p>P {item.protein}g</p>
                      <p>C {item.carbs}g</p>
                      <p>F {item.fats || item.fat}g</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
