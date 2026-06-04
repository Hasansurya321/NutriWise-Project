export function formatNutrition(n) {
  const val = Number(n);
  if (isNaN(val) || n === null || n === undefined) return '–';
  return val % 1 === 0 ? val.toString() : val.toFixed(1);
}
