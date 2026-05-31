import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

import { DashboardHeader } from '../../components/dashboard/DashboardHeader';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { MacroDistributionChart } from '../../components/dashboard/MacroDistributionChart';
import { WeeklyTrendChart } from '../../components/dashboard/WeeklyTrendChart';
import { RecentMealsSection } from '../../components/dashboard/RecentMealsSection';
import { AiPanel } from '../../components/dashboard/AiPanel';
import { AuthRequiredPanel } from '../../components/dashboard/AuthRequiredPanel';
import { UploadSection } from '../../components/predict/UploadSection';
import PredictionResult from '../../components/predict/PredictionResult';

import { predictAPI, nutritionAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useImagePredict } from '../../hooks/useImagePredict';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const macroSummary = {
  title: 'Distribusi Makronutrisi',
  subtitle: 'Ringkasan keseimbangan makronutrisi harian',
};

const weeklyTrendSummary = {
  title: 'Tren Kalori Mingguan',
  subtitle: 'Pantau fluktuasi kalorimu sepanjang minggu',
};

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [statsCards, setStatsCards] = useState([
    {
      title: 'Kalori',
      value: '0',
      target: '2000 kcal',
      progress: 0,
      meta: 'Memuat data...',
      iconName: 'Flame',
      color: 'green',
    },
    {
      title: 'Protein',
      value: '0g',
      target: '65g',
      progress: 0,
      meta: 'Memuat data...',
      iconName: 'Drumstick',
      color: 'blue',
    },
    {
      title: 'Karbohidrat',
      value: '0g',
      target: '260g',
      progress: 0,
      meta: 'Memuat data...',
      iconName: 'Wheat',
      color: 'orange',
    },
    {
      title: 'Lemak',
      value: '0g',
      target: '80g',
      progress: 0,
      meta: 'Memuat data...',
      iconName: 'EggFried',
      color: 'warning',
    },
  ]);
  const [recentMeals, setRecentMeals] = useState([]);
  const [macroDistributionData, setMacroDistributionData] = useState([]);
  const [weeklyCalorieTrendData, setWeeklyCalorieTrendData] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [healthNotification, setHealthNotification] = useState(null);

  const predictHook = useImagePredict();
  const { predictionResult, handleReset } = predictHook;

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (!user?.email) {
          setStatsCards([]);
          setRecentMeals([]);
          setMacroDistributionData([]);
          setWeeklyCalorieTrendData([]);
          setAiInsights([]);
          setHealthNotification(null);
          return;
        }

        const [dailySummaryRes, predictLogsRes] = await Promise.all([nutritionAPI.getNutritionDaily().catch(() => null), predictAPI.getPredictLogs(1, 5).catch(() => ({ data: { predictLogs: [] } }))]);

        // Recent meals dari API predict
        const rawLogs = predictLogsRes?.data?.predictLogs || [];
        const flatMeals = rawLogs.slice(0, 3).map((log) => ({
          id: log.id,
          timestamp: new Date(log.createdAt || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          name: log.foodName || log.name || 'Makanan Terprediksi',
          type: 'Makanan Terpindai',
          calories: Math.round(log.totalNutrition?.calorie || log.nutrition?.calorie || log.calories || 0),
          confidence: log.confidenceScore || 0,
          image: log.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
          iconName: 'Apple',
        }));

        // Daily summary dari backend
        const dailyData = dailySummaryRes?.data?.nutrition || dailySummaryRes?.data || {};
        const consumedCalories = dailyData.calorieConsumed ?? dailyData.calories ?? 0;
        const consumedProtein = dailyData.proteinConsumed ?? dailyData.protein ?? 0;
        const consumedCarbs = dailyData.carbohydrateConsumed ?? dailyData.carbohydrate ?? 0;
        const consumedFats = dailyData.fatConsumed ?? dailyData.fat ?? 0;

        // Gunakan ?? bukan || agar nilai 0 tetap dianggap valid
        // Cari dari berbagai kemungkinan field name yang dikirim API
        const targetCalories = user?.calorieTarget ?? user?.calorie_target ?? user?.nutritionGoals?.calories ?? 2000;
        const targetProtein = user?.proteinTarget ?? user?.protein_target ?? user?.nutritionGoals?.protein ?? 140;
        const targetCarbs = user?.carbohydrateTarget ?? user?.carbohydrate_target ?? user?.nutritionGoals?.carbs ?? 260;
        const targetFats = user?.fatTarget ?? user?.fat_target ?? user?.nutritionGoals?.fats ?? 80;

        const calcProgress = (consumed, target) => (target > 0 ? (consumed / target) * 100 : 0);

        const builtStatsCards = [
          {
            title: 'Kalori',
            value: `${Math.round(consumedCalories)}`,
            target: `${targetCalories} kcal`,
            progress: calcProgress(consumedCalories, targetCalories),
            meta: `${Math.round(calcProgress(consumedCalories, targetCalories))}% dari target`,
            iconName: 'Flame',
            color: 'green',
          },
          {
            title: 'Protein',
            value: `${Math.round(consumedProtein)}g`,
            target: `${targetProtein}g`,
            progress: calcProgress(consumedProtein, targetProtein),
            meta: 'Asupan protein',
            iconName: 'Drumstick',
            color: 'blue',
          },
          {
            title: 'Karbohidrat',
            value: `${Math.round(consumedCarbs)}g`,
            target: `${targetCarbs}g`,
            progress: calcProgress(consumedCarbs, targetCarbs),
            meta: 'Asupan karbohidrat',
            iconName: 'Wheat',
            color: 'orange',
          },
          {
            title: 'Lemak',
            value: `${Math.round(consumedFats)}g`,
            target: `${targetFats}g`,
            progress: calcProgress(consumedFats, targetFats),
            meta: 'Asupan lemak',
            iconName: 'EggFried',
            color: 'warning',
          },
        ];

        setStatsCards(builtStatsCards);
        setRecentMeals(flatMeals);
        setMacroDistributionData([]);
        setWeeklyCalorieTrendData([]);
        setAiInsights([]);
        setHealthNotification(null);
      } catch (error) {}
    };

    loadDashboardData();
  }, [user?.email]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{
        staggerChildren: 0.06,
      }}
      className="space-y-6 sm:space-y-8"
    >
      <motion.div variants={fadeUp}>
        {isAuthenticated ? (
          <DashboardHeader username={user?.user?.fullname || user?.fullname || 'Pengguna'} description="Ini adalah ringkasan nutrisimu hari ini. Pantau makanan, makronutrisi, dan dapatkan analisis AI dalam satu dashboard terpadu." />
        ) : (
          <DashboardHeader title="Masuk untuk melihat dashboard" description="Sesi dashboard kamu belum aktif. Silakan masuk terlebih dahulu untuk memuat data nutrisimu." />
        )}
      </motion.div>

      <motion.section
        variants={fadeUp}
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2 sm:gap-6
          xl:grid-cols-4
        "
      >
        {(statsCards || []).map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </motion.section>

      <motion.section
        variants={fadeUp}
        className="
          grid gap-6
          lg:grid-cols-1
          xl:grid-cols-12
        "
      >
        {isAuthenticated ? (
          <div className="xl:col-span-8">
            <div className="grid grid-cols-1">
              <UploadSection {...predictHook} />
              {predictionResult && <PredictionResult predictionResult={predictionResult} />}
            </div>
          </div>
        ) : (
          <div className="xl:col-span-8">
            <AuthRequiredPanel />
          </div>
        )}

        <div className="xl:col-span-4">
          <AiPanel aiInsights={aiInsights} healthNotification={healthNotification} />
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        className="
          grid gap-6
          xl:grid-cols-2
        "
      >
        <ChartCard title={weeklyTrendSummary.title} description={weeklyTrendSummary.subtitle}>
          <WeeklyTrendChart data={weeklyCalorieTrendData} />
        </ChartCard>

        <ChartCard title={macroSummary.title} description={macroSummary.subtitle}>
          <MacroDistributionChart data={macroDistributionData} />
        </ChartCard>
      </motion.section>

      <motion.section
        variants={fadeUp}
        className="
          grid gap-6
          xl:grid-cols-2
        "
      >
        <RecentMealsSection meals={recentMeals} />
      </motion.section>
    </motion.div>
  );
}
