import { motion } from 'framer-motion';
import { Flame, Beef, Wheat, Target, Sparkles, Droplet } from 'lucide-react';
import { fadeUp } from '../../utils/animation';

export default function MealRecommendations({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-card rounded-3xl border border-borderPrimary min-h-[300px]">
        <div className="w-8 h-8 rounded-full border-[3px] border-borderPrimary border-t-primary animate-spin" />
        <p className="mt-4 text-sm text-textSecondary font-medium">Mencari rekomendasi buah dan nutrisi…</p>
      </div>
    );
  }

  if (!data) return null;

  const { dataAnalysis, fruitRecommendations } = data.meals || data;

  if (dataAnalysis?.remainingUserQuota <= 0) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="bg-success/5 rounded-3xl border border-success/20 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col items-center justify-center text-center gap-4 mt-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/20 text-success">
          <Target size={32} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-success mb-2">Target Kalori Terpenuhi!</h2>
          <p className="text-sm text-textSecondary max-w-md mx-auto">
            Selamat! Asupan kalori kamu sudah memenuhi batas harian. Tetap jaga pola makan, jangan kurang dan juga jangan berlebihan, serta pastikan kebutuhan makronutrisi lainnya juga seimbang ya!
          </p>
        </div>
      </motion.div>
    );
  }

  if (!fruitRecommendations || fruitRecommendations.length === 0) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="bg-card rounded-3xl border border-borderPrimary p-5 sm:p-6 lg:p-8 shadow-sm flex flex-col gap-6"
    >
      <header>
        <div className="flex items-center gap-2 text-primary font-bold mb-1">
          <Sparkles size={20} />
          <h2 className="text-xl">Rekomendasi AI</h2>
        </div>
        <p className="text-sm text-textSecondary">Berdasarkan sisa kuota kalori dan makanan terakhir Anda.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Analysis Card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-primary" />
            <h3 className="font-semibold text-textPrimary text-sm">Status Kalori Anda</h3>
          </div>
          <div className="flex justify-between items-end border-b border-primary/10 pb-3">
            <p className="text-xs text-textSecondary font-medium">Sisa Kuota Hari Ini</p>
            <p className="text-xl font-bold text-primary">{Math.round(dataAnalysis?.remainingUserQuota || 0)} <span className="text-sm font-medium">kcal</span></p>
          </div>
          <div className="flex justify-between items-end pb-1 pt-1">
            <p className="text-xs text-textSecondary font-medium">Kategori Kebutuhan</p>
            <p className="text-sm font-bold text-textPrimary text-right max-w-[60%]">{dataAnalysis?.categoryName || '-'}</p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-surface2/50 rounded-2xl p-5 flex flex-col justify-center">
          <p className="text-sm text-textPrimary leading-relaxed">
            Untuk mengoptimalkan asupan nutrisi harian, kami menyarankan buah-buahan segar di bawah ini karena nilai kalorinya sangat pas dengan sisa kuota Anda!
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <h3 className="font-semibold text-textPrimary text-sm">Buah yang Disarankan:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {fruitRecommendations.map((fruit, idx) => (
            <div key={idx} className="border border-borderPrimary bg-background rounded-2xl p-4 flex flex-col gap-3 hover:border-primary/30 transition-all shadow-sm">
              <h4 className="font-bold text-textPrimary capitalize text-base">{fruit.name}</h4>
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 px-2 py-1.5 rounded-lg text-xs font-semibold">
                  <Flame size={12} /> {fruit.calories} kcal
                </div>
                <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-600 px-2 py-1.5 rounded-lg text-xs font-semibold">
                  <Wheat size={12} /> {fruit.carbohydrate}g
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 px-2 py-1.5 rounded-lg text-xs font-semibold">
                  <Beef size={12} /> {fruit.protein}g
                </div>
                <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 px-2 py-1.5 rounded-lg text-xs font-semibold">
                  <Droplet size={12} /> {fruit.water}% air
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
