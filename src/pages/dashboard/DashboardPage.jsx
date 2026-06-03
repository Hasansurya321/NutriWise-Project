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

import { fadeUp } from '../../utils/animation.js';

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

        const [dailySummaryRes, weeklySummaryRes, predictLogsRes] = await Promise.all([
          nutritionAPI.getNutritionDaily().catch(() => null),
          nutritionAPI.getNutritionWeekly().catch(() => null),
          predictAPI.getPredictLogs(1, 5).catch(() => ({ data: { predictLogs: [] } }))
        ]);

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

        // Target nutrisi user hasil onboarding
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

        // 🟢 1. ISI DATA: MacroDistributionChart (Pie/Donut)
        // Menyelaraskan key 'fill' dengan entry.color yang diminta oleh komponen Recharts-mu
        const builtMacroData = [
          { name: 'Protein', value: Math.round(consumedProtein), color: '#3b82f6' },
          { name: 'Karbohidrat', value: Math.round(consumedCarbs), color: '#f97316' },
          { name: 'Lemak', value: Math.round(consumedFats), color: '#eab308' },
        ];

        // 2. 🟢 ISI DATA: WeeklyTrendChart (Line Chart)
        const weeklyRawData = weeklySummaryRes?.data?.nutrition || weeklySummaryRes?.data?.data?.chartData || [];

        let builtWeeklyData = [];
        if (weeklyRawData.length > 0) {
          builtWeeklyData = weeklyRawData.map((item) => ({
            day: item.dayName ? item.dayName.slice(0, 3) : '---',
            calories: Math.round(item.calorie || 0),
          }));
        } else {
          builtWeeklyData = [
            { day: 'Sen', calories: 0 },
            { day: 'Sel', calories: 0 },
            { day: 'Rab', calories: 0 },
            { day: 'Kam', calories: 0 },
            { day: 'Jum', calories: 0 },
            { day: 'Sab', calories: 0 },
            { day: 'Min', calories: 0 },
          ];
        }

        // Set semua state dashboard secara kolektif
        setStatsCards(builtStatsCards);
        setRecentMeals(flatMeals);
        setMacroDistributionData(builtMacroData);
        setWeeklyCalorieTrendData(builtWeeklyData);
        setAiInsights([]);
        setHealthNotification(null);
      } catch (error) {
        console.error("Gagal memuat visual analitik dashboard:", error);
      }
    };

    loadDashboardData();
  }, [user?.email, user?.calorieTarget]);

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
          <DashboardHeader username={user?.user?.fullname || user?.fullname || 'Pengguna'} description="Ini adalah ringkasan nutrisimu hari ini. Pantau makanan, makronutrisi, dan prediksi nutrisi dan kalori makanan dalam satu dashboard terpadu." />
        ) : (
          <DashboardHeader title="Masuk untuk melihat dashboard" description="Sesi dashboard kamu belum aktif. Silakan masuk terlebih dahulu untuk memuat data nutrisimu." />
        )}
      </motion.div>

      <motion.section
        variants={fadeUp}
        className="
          grid grid-cols-2 gap-4
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
            xl:grid-cols-2
          "
      >
        {/* Render Line Chart Tren Kalori Mingguan */}
        <ChartCard title={weeklyTrendSummary.title} description={weeklyTrendSummary.subtitle}>
          <WeeklyTrendChart data={weeklyCalorieTrendData} />
        </ChartCard>

        {/* Render Donut/Pie Chart Distribusi Gizi */}
        <ChartCard title={macroSummary.title} description={macroSummary.subtitle}>
          <MacroDistributionChart data={macroDistributionData} />
        </ChartCard>
      </motion.section>

      <motion.section
        variants={fadeUp}
        className="
          grid gap-6
          xl:grid-cols-3
        "
      >
        {isAuthenticated ? (
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 h-full">
              <UploadSection {...predictHook} />
              {predictionResult && <PredictionResult predictionResult={predictionResult} />}
            </div>
          </div>
        ) : (
          <div className="xl:col-span-2">
            <AuthRequiredPanel />
          </div>
        )}

        <div className="xl:col-span-1 md:col-span-1">
          <RecentMealsSection meals={recentMeals} />
        </div>
      </motion.section>

      {/* GRAPH CHART SECTION */}
    </motion.div>
  );
}