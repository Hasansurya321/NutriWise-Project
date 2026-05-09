export default function MacroDistribution({ macros }) {
  const items = [
    {
      label: 'Protein',
      value: `${macros.protein}%`,
    },
    {
      label: 'Carbs',
      value: `${macros.carbs}%`,
    },
    {
      label: 'Fats',
      value: `${macros.fats}%`,
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border border-borderPrimary
        bg-background/60
        p-6
      "
    >
      <h3
        className="
          text-lg font-semibold
          text-textPrimary
        "
      >
        Macro Distribution
      </h3>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-textMuted">{item.label}</div>

            <div
              className="
                mt-2
                text-3xl font-semibold
                text-primary
              "
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
