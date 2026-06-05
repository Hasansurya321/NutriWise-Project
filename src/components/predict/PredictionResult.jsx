import { useState, useEffect, useRef } from 'react';
import { Activity, Flame, Beef, Wheat, Droplets, CheckCircle2, AlertCircle } from 'lucide-react';
import { mealAPI } from '../../services/api';

export default function PredictionResult({ predictionResult, onAdd }) {
  const [mealState, setMealState] = useState('idle'); // idle | submitting | confirmed | error
  const containerRef = useRef(null);

  useEffect(() => {
    if (predictionResult && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [predictionResult]);

  if (!predictionResult) return null;

  const responseData = predictionResult.data || predictionResult;
  const data = responseData.predict || responseData;
  const predictLogId = responseData.predictLogId || data?.id || data?.predictLogId;

  const { foodName, confidence, confidenceScore, totalNutrition, nutrition, portion } = data || {};

  const finalFoodName = foodName;
  const finalConfidence = confidence || confidenceScore || 0;

  if (!data || !finalFoodName) {
    return (
      <div ref={containerRef} className="mx-auto w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-8 rounded-3xl bg-card border border-borderPrimary shadow-lg text-center relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-danger/80 to-danger"></div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger/10 text-danger mb-4 mt-2">
            <AlertCircle className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-bold text-textPrimary mb-2">Makanan Tidak Dikenali</h3>
          <p className="text-textSecondary max-w-md mx-auto mb-2">Maaf, AI kami tidak dapat mengidentifikasi makanan dari gambar yang Anda berikan. Mohon pastikan gambar terlihat jelas, fokus pada makanan, dan coba ulangi pemindaian.</p>
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

  const handleConfirmMeal = async () => {
    if (!predictLogId || mealState !== 'idle') return;
    setMealState('submitting');
    try {
      await mealAPI.createMealFromPredict({ predictLogId });
      setMealState('confirmed');
    } catch (err) {
      // 409 = already exists, treat as confirmed
      if (err.response?.status === 409) {
        setMealState('confirmed');
      } else {
        console.error('Failed to create meal:', err);
        setMealState('error');
      }
    }
  };

  const renderConfirmButton = () => {
    if (mealState === 'idle') {
      return (
        <button
          onClick={() => onAdd && onAdd(data)}
          className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          Tambahkan ke Jurnal Makan
        </button>
      );
    }

    if (mealState === 'submitting') {
      return (
        <button disabled className="w-full sm:w-auto px-8 py-3 bg-primary/50 text-white rounded-xl font-semibold cursor-not-allowed">
          Menyimpan...
        </button>
      );
    }

    if (mealState === 'confirmed') {
      return (
        <button disabled className="w-full sm:w-auto px-8 py-3 bg-success/10 text-success border border-success/30 rounded-xl font-semibold cursor-not-allowed">
          ✓ Sudah Ditambahkan ke Meal History
        </button>
      );
    }

    if (mealState === 'error') {
      return (
        <button onClick={handleConfirmMeal} className="w-full sm:w-auto px-8 py-3 bg-danger text-white rounded-xl font-semibold hover:bg-danger/90 transition-colors duration-200">
          Coba Lagi
        </button>
      );
    }

    return null;
  };

  return (
    <div ref={containerRef} className="mx-auto w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
              <h3 className="text-2xl sm:text-3xl font-bold text-textPrimary capitalize mt-1">{finalFoodName.replace(/_/g, ' ')}</h3>
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
            <span className="text-5xl font-black text-textPrimary tracking-tight">{typeof calories === 'number' ? Math.round(calories) : calories}</span>
            <span className="text-lg font-medium text-textSecondary mb-1">kcal</span>
          </div>
          {portion && portion !== 1 && <p className="text-sm text-textMuted mt-3 font-medium">Berdasarkan porsi: {portion}x</p>}
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 bg-card rounded-2xl border border-borderPrimary shadow-sm flex flex-col items-center text-center group transition-colors hover:border-info/30 hover:bg-info/5">
            <div className="p-3 bg-info/10 text-info rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Beef className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Protein</p>
            <p className="text-xl font-bold text-textPrimary">
              {Number(protein || 0).toFixed(1)}
              <span className="text-sm text-textMuted ml-1">g</span>
            </p>
          </div>

          <div className="p-5 bg-card rounded-2xl border border-borderPrimary shadow-sm flex flex-col items-center text-center group transition-colors hover:border-warning/30 hover:bg-warning/5">
            <div className="p-3 bg-warning/10 text-warning rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Wheat className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Karbohidrat</p>
            <p className="text-xl font-bold text-textPrimary">
              {Number(carbs || 0).toFixed(1)}
              <span className="text-sm text-textMuted ml-1">g</span>
            </p>
          </div>

          <div className="p-5 bg-card rounded-2xl border border-borderPrimary shadow-sm flex flex-col items-center text-center group transition-colors hover:border-danger/30 hover:bg-danger/5">
            <div className="p-3 bg-danger/10 text-danger rounded-xl mb-3 group-hover:scale-110 transition-transform">
              <Droplets className="w-6 h-6" />
            </div>
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Lemak</p>
            <p className="text-xl font-bold text-textPrimary">
              {Number(fat || 0).toFixed(1)}
              <span className="text-sm text-textMuted ml-1">g</span>
            </p>
          </div>
        </div>

        {/* Detailed Nutrition Table */}
        <div className="mt-6 rounded-2xl border border-borderPrimary overflow-hidden bg-card">
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
                  {portion && portion !== 1 && <th className="px-6 py-4 font-medium text-right bg-primary/5 text-primary">Total ({portion}x)</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-borderPrimary text-textPrimary">
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Kalori</td>
                  <td className="px-6 py-4 text-right">{Number(baseNutrition.calorie || 0).toFixed(1)} kcal</td>
                  {portion && portion !== 1 && <td className="px-6 py-4 text-right font-bold bg-primary/5">{Number(calories || 0).toFixed(1)} kcal</td>}
                </tr>
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Protein</td>
                  <td className="px-6 py-4 text-right">{Number(baseNutrition.protein || 0).toFixed(1)} g</td>
                  {portion && portion !== 1 && <td className="px-6 py-4 text-right font-bold bg-primary/5">{Number(protein || 0).toFixed(1)} g</td>}
                </tr>
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Karbohidrat</td>
                  <td className="px-6 py-4 text-right">{Number(baseNutrition.carbohydrate || baseNutrition.carbs || 0).toFixed(1)} g</td>
                  {portion && portion !== 1 && <td className="px-6 py-4 text-right font-bold bg-primary/5">{Number(carbs || 0).toFixed(1)} g</td>}
                </tr>
                <tr className="hover:bg-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-medium">Lemak</td>
                  <td className="px-6 py-4 text-right">{Number(baseNutrition.fat || baseNutrition.fats || 0).toFixed(1)} g</td>
                  {portion && portion !== 1 && <td className="px-6 py-4 text-right font-bold bg-primary/5">{Number(fat || 0).toFixed(1)} g</td>}
                </tr>
                {baseNutrition.fiber !== null && baseNutrition.fiber !== undefined && (
                  <tr className="hover:bg-surface2/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-textSecondary">Serat</td>
                    <td className="px-6 py-4 text-right text-textSecondary">{Number(baseNutrition.fiber).toFixed(1)} g</td>
                    {portion && portion !== 1 && <td className="px-6 py-4 text-right font-bold bg-primary/5 text-primary/80">{Number(displayNutrition.fiber || 0).toFixed(1)} g</td>}
                  </tr>
                )}
                {baseNutrition.water !== null && baseNutrition.water !== undefined && (
                  <tr className="hover:bg-surface2/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-textSecondary">Air</td>
                    <td className="px-6 py-4 text-right text-textSecondary">{Number(baseNutrition.water).toFixed(1)} g</td>
                    {portion && portion !== 1 && <td className="px-6 py-4 text-right font-bold bg-primary/5 text-primary/80">{Number(displayNutrition.water || 0).toFixed(1)} g</td>}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center mt-8">{renderConfirmButton()}</div>
      </div>
    </div>
  );
}
