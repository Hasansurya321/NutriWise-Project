import { Flame, Beef, Droplets } from 'lucide-react';

export default function NutritionSummary({ macros }) {
  const items = [
    {
      label: 'Protein',
      value: `${macros.protein}g`,
      icon: Beef,
    },
    {
      label: 'Carbs',
      value: `${macros.carbs}g`,
      icon: Flame,
    },
    {
      label: 'Fats',
      value: `${macros.fats}g`,
      icon: Droplets,
    },
  ];

  return (
    <div
      className="
        grid grid-cols-1
        gap-4
        rounded-2xl
        bg-background/50
        px-6 py-5
        sm:grid-cols-3
      "
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
              flex flex-col
              items-center justify-center
              text-center
            "
          >
            <div
              className="
                flex items-center gap-2
                text-xs text-textMuted
              "
            >
              <Icon size={14} />
              {item.label}
            </div>

            <div
              className="
                mt-2
                text-xl font-semibold
                text-textPrimary
              "
            >
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
