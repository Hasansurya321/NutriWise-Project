import { Activity, Flame, Beef, Wheat, Droplets, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "../../utils/cn";

export default function PredictionResult({ predictionResult }) {
  if (!predictionResult) return null;

  // Handle nested or direct data structures gracefully
  const data = predictionResult.predict || predictionResult.data || predictionResult;

  const {
    foodName,
    confidence,
    totalNutrition,
    nutrition, portion
  } = data || {};

  console.log(data)

  const finalFoodName = foodName;
  const finalConfidence = confidence || 0;

  if (!data || !finalFoodName) {
    return (
      <div className="mx-auto w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-8 rounded-3xl bg-card border border-borderPrimary shadow-lg text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-danger/80 to-danger"></div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger mb-4 mt-2">
            <AlertCircle className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-bold text-textPrimary mb-2">Makanan Tidak Dikenali</h3>
          <p className="text-textSecondary max-w-md mx-auto mb-2">
            Maaf, AI kami tidak dapat mengidentifikasi makanan dari gambar yang Anda berikan. Mohon pastikan gambar terlihat jelas, fokus pada makanan, dan coba ulangi pemindaian.
          </p>
        </div>
      </div>
    );
  }

  const displayNutrition = totalNutrition || nutrition || {};
  const baseNutrition = nutrition || displayNutrition;
  const calories = displayNutrition.calorie || 0;
  const protein = displayNutrition.protein || 0;
  const carbs = displayNutrition.carbohydrate || 0;
  const fat = displayNutrition.fat || 0;

  const confidencePercent = Math.round(finalConfidence * 100);

  return (
    <div className="mx-auto w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-borderPrimary shadow-lg relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-info to-primary/50"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 mt-2">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-textSecondary uppercase tracking-wider">Hasil Analisis AI</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary capitalize mt-1">
                {finalFoodName.replace(/_/g, ' ')}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-success/10 border border-success/20 text-success px-4 py-2 rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-semibold">{confidencePercent}% Cocok</span>
          </div>
        </div>

        {/* Calories Highlight */}
        <div className="mb-8 flex flex-col items-center justify-center p-8 bg-surface2 rounded-3xl border border-borderPrimary">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Flame className="w-6 h-6 fill-primary/20" />
            <span className="text-sm font-semibold uppercase tracking-wider">Total Kalori</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-textPrimary tracking-tight">
              {typeof calories === 'number' ? Math.round(calories) : calories}
            </span>
            <span className="text-lg font-medium text-textSecondary mb-1">kcal</span>
          </div>
          {portion && portion !== 1 && (
            <p className="text-sm text-textMuted mt-3 font-medium">Berdasarkan porsi: {portion}x</p>
          )}
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-card rounded-2xl border border-borderPrimary shadow-sm flex flex-col items-center text-center group transition-colors hover:border-info/30 hover:bg-info/5">
            <div className="p-3 bg-info/10 text-info rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Beef className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Protein</p>
            <p className="text-xl font-bold text-textPrimary">
              {typeof protein === 'number' ? protein.toFixed(1) : protein}
              <span className="text-sm text-textMuted ml-1">g</span>
            </p>
          </div>

          <div className="p-5 bg-card rounded-2xl border border-borderPrimary shadow-sm flex flex-col items-center text-center group transition-colors hover:border-warning/30 hover:bg-warning/5">
            <div className="p-3 bg-warning/10 text-warning rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Wheat className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Karbohidrat</p>
            <p className="text-xl font-bold text-textPrimary">
              {typeof carbs === 'number' ? carbs.toFixed(1) : carbs}
              <span className="text-sm text-textMuted ml-1">g</span>
            </p>
          </div>

          <div className="p-5 bg-card rounded-2xl border border-borderPrimary shadow-sm flex flex-col items-center text-center group transition-colors hover:border-danger/30 hover:bg-danger/5">
            <div className="p-3 bg-danger/10 text-danger rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Lemak</p>
            <p className="text-xl font-bold text-textPrimary">
              {typeof fat === 'number' ? fat.toFixed(1) : fat}
              <span className="text-sm text-textMuted ml-1">g</span>
            </p>
          </div>
        </div>

        {/* Detailed Nutrition Table */}
        <div className="mt-8 rounded-2xl border border-borderPrimary overflow-hidden bg-card">
          <div className="bg-surface2 px-6 py-4 border-b border-borderPrimary">
            <h4 className="font-semibold text-textPrimary">Rincian Nutrisi Terdeteksi</h4>
            {baseNutrition.servingDescription && (
              <p className="text-sm text-textSecondary mt-1">
                Takaran saji standar: {baseNutrition.servingDescription}
                {baseNutrition.servingSizeG ? ` (${baseNutrition.servingSizeG}g)` : ''}
              </p>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface/50 text-textSecondary uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Nutrisi</th>
                  <th className="px-6 py-4 font-medium text-right">Per Porsi</th>
                  {portion && portion !== 1 && (
                    <th className="px-6 py-4 font-medium text-right bg-primary/5 text-primary">Total ({portion}x)</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-borderPrimary text-textPrimary">
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Kalori</td>
                  <td className="px-6 py-4 text-right">{baseNutrition.calorie?.toFixed(1) || 0} kcal</td>
                  {portion && portion !== 1 && (
                    <td className="px-6 py-4 text-right font-bold bg-primary/5">{calories?.toFixed(1) || 0} kcal</td>
                  )}
                </tr>
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Protein</td>
                  <td className="px-6 py-4 text-right">{baseNutrition.protein?.toFixed(1) || 0} g</td>
                  {portion && portion !== 1 && (
                    <td className="px-6 py-4 text-right font-bold bg-primary/5">{protein?.toFixed(1) || 0} g</td>
                  )}
                </tr>
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Karbohidrat</td>
                  <td className="px-6 py-4 text-right">{baseNutrition.carbohydrate?.toFixed(1) || baseNutrition.carbs?.toFixed(1) || 0} g</td>
                  {portion && portion !== 1 && (
                    <td className="px-6 py-4 text-right font-bold bg-primary/5">{carbs?.toFixed(1) || 0} g</td>
                  )}
                </tr>
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Lemak</td>
                  <td className="px-6 py-4 text-right">{baseNutrition.fat?.toFixed(1) || baseNutrition.fats?.toFixed(1) || 0} g</td>
                  {portion && portion !== 1 && (
                    <td className="px-6 py-4 text-right font-bold bg-primary/5">{fat?.toFixed(1) || 0} g</td>
                  )}
                </tr>
                {(baseNutrition.fiber !== null && baseNutrition.fiber !== undefined) && (
                  <tr className="hover:bg-surface2/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-textSecondary">Serat</td>
                    <td className="px-6 py-4 text-right text-textSecondary">{baseNutrition.fiber?.toFixed(1)} g</td>
                    {portion && portion !== 1 && (
                      <td className="px-6 py-4 text-right font-bold bg-primary/5 text-primary/80">{displayNutrition.fiber?.toFixed(1)} g</td>
                    )}
                  </tr>
                )}
                {(baseNutrition.water !== null && baseNutrition.water !== undefined) && (
                  <tr className="hover:bg-surface2/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-textSecondary">Air</td>
                    <td className="px-6 py-4 text-right text-textSecondary">{baseNutrition.water?.toFixed(1)} g</td>
                    {portion && portion !== 1 && (
                      <td className="px-6 py-4 text-right font-bold bg-primary/5 text-primary/80">{displayNutrition.water?.toFixed(1)} g</td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}