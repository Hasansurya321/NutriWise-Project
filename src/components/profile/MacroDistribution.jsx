export default function MacroDistribution({ macros }) {
  // macros bisa berupa:
  // 1. object { protein, carbs, fats }
  // 2. array [{label, value}]
  // 3. undefined/null
  const getValue = (key) => {
    if (!macros) return '0%';
    if (Array.isArray(macros)) {
      const found = macros.find((m) => m.label?.toLowerCase() === key || m.key === key);
      return found ? `${found.value || found.percentage || 0}%` : '0%';
    }
    // Object format
    return `${macros[key] ?? 0}%`;
  };

  const items = [
    { label: 'Protein', value: getValue('protein') },
    { label: 'Carbs', value: getValue('carbs') },
    { label: 'Fats', value: getValue('fats') },
  ];

  return (
    <div className="rounded-3xl border border-borderPrimary bg-background/60 p-6">
      <h3 className="text-lg font-semibold text-textPrimary">Macro Distribution</h3>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-textMuted">{item.label}</div>
            <div className="mt-2 text-3xl font-semibold text-primary">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
