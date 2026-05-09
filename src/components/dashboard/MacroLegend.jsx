import { MacroLegendItem } from './MacroLegendItem';

export function MacroLegend({ items = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <MacroLegendItem key={item.name} color={item.color} label={item.name} value={item.value} percentage={item.percentage} />
      ))}
    </div>
  );
}
