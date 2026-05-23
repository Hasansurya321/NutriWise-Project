import { getIconByName } from '../../utils/iconRegistry';

export default function FoodItemRow({ item }) {
  const Icon = getIconByName(item.iconName, 'Apple');

  return (
    <div
      className="
        flex items-center justify-between
        gap-4
        rounded-2xl
        bg-background/40
        px-4 py-3
      "
    >
      <div
        className="
          flex items-center gap-4
          min-w-0
        "
      >
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-card
            text-xl
          "
        >
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </div>

        <div className="min-w-0">
          <h4
            className="
              truncate
              text-sm font-semibold
              text-textPrimary
            "
          >
            {item.name}
          </h4>

          <div
            className="
              mt-1
              flex flex-wrap items-center gap-3
              text-xs text-textMuted
            "
          >
            <span>{item.protein}g protein</span>
            <span>{item.carbs}g carbs</span>
            <span>{item.fats}g fats</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div
          className="
            text-lg font-semibold
            text-textPrimary
          "
        >
          {item.calories}
        </div>

        <div
          className="
            text-xs
            text-textMuted
          "
        >
          kcal
        </div>
      </div>
    </div>
  );
}
