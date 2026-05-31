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
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import { HeroSection } from '../../components/dashboard/HeroSection';
import { AuthRequiredPanel } from '../../components/dashboard/AuthRequiredPanel';
import { UploadSection } from '../../components/predict/UploadSection';
import PredictionResult from '../../components/predict/PredictionResult';

import { predictAPI, nutritionAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { getIconByName } from '../../utils/iconRegistry';
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

const featureHighlights = [
  {
    title: 'Panduan Nutrisi AI',
    description: 'AI membandingkan makananmu dengan target harian.',
    iconName: 'BrainCircuit',
  },
  {
    title: 'Pelacakan Cerdas',
    description: 'Kalori, protein, air, dan serat dalam satu tampilan.',
    iconName: 'Sparkles',
  },
];

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
  const [statsCards, setStatsCards] = useState([]);
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
          console.warn('No active session, cannot load dashboard data');
          setStatsCards([]);
          setRecentMeals([]);
          setMacroDistributionData([]);
          setWeeklyCalorieTrendData([]);
          setAiInsights([]);
          setHealthNotification(null);
          return;
        }

        const email = user.email;

        const [dailyNutritionRes, predictLogsRes, macros, trend, insights, notification] = await Promise.all([
          nutritionAPI.getNutritionDaily().catch(() => ({ data: {} })),
          predictAPI.getPredictLogs().catch(() => ({ data: [] })),
        ]);

        const rawLogs = predictLogsRes?.data?.predictLogs || [];
        const flatMeals = rawLogs.slice(0, 3).map(log => ({
          id: log.id,
          timestamp: new Date(log.createdAt || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          name: log.foodName || log.name || 'Makanan Terprediksi',
          type: 'Makanan Terpindai',
          calories: Math.round(log.totalNutrition?.calorie || log.nutrition?.calorie || log.calories || 0),
          confidence: log.confidenceScore || 0,
          image: log.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
          iconName: 'Apple'
        }));

        const dailyData = dailyNutritionRes?.data?.nutrition || dailyNutritionRes?.data || {};

        const safeTotalCalories = dailyData.calorieConsumed;
        const safeTotalProtein = dailyData.proteinConsumed;
        const safeTotalCarbs = dailyData.carbohydrateConsumed;
        const safeTotalFats = dailyData.fatConsumed;

        const targetCalories = user?.calorieTarget || 2000;
        const targetProtein = user?.proteinTarget || 140;
        const targetCarbs = user?.carbohydrateTarget || 260;
        const targetFats = user?.fatTarget || 80;

        const builtStatsCards = [
          {
            title: 'Kalori',
            value: `${Math.round(safeTotalCalories)}`,
            target: `${targetCalories} kcal`,
            progress: targetCalories > 0 ? (safeTotalCalories / targetCalories) * 100 : 0,
            meta: `${Math.round(targetCalories > 0 ? (safeTotalCalories / targetCalories) * 100 : 0)}% dari target`,
            iconName: 'Flame',
            color: 'green',
          },
          {
            title: 'Protein',
            value: `${Math.round(safeTotalProtein)}g`,
            target: `${targetProtein}g`,
            progress: targetProtein > 0 ? (safeTotalProtein / targetProtein) * 100 : 0,
            meta: 'Asupan protein',
            iconName: 'Drumstick',
            color: 'blue',
          },
          {
            title: 'Karbohidrat',
            value: `${Math.round(safeTotalCarbs)}g`,
            target: `${targetCarbs}g`,
            progress: targetCarbs > 0 ? (safeTotalCarbs / targetCarbs) * 100 : 0,
            meta: 'Asupan karbohidrat',
            iconName: 'Wheat',
            color: 'orange',
          },
          {
            title: 'Lemak',
            value: `${Math.round(safeTotalFats)}g`,
            target: `${targetFats}g`,
            progress: targetFats > 0 ? (safeTotalFats / targetFats) * 100 : 0,
            meta: 'Asupan lemak',
            iconName: 'EggFried',
            color: 'warning',
          },
        ];

        setStatsCards(builtStatsCards);
        setRecentMeals(flatMeals || []);
        setMacroDistributionData(macros || []);
        setWeeklyCalorieTrendData(trend || []);
        setAiInsights(insights || []);
        setHealthNotification(notification || null);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
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

      <motion.div variants={fadeUp}>
        <HeroSection isAuthenticated={isAuthenticated} />
      </motion.div>

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
            <div className='grid grid-cols-1'>
              <UploadSection {...predictHook} />
              {predictionResult && (
                <PredictionResult predictionResult={predictionResult} />
              )}

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

        <Card>
          <div className="px-6 pt-6">
            <SectionHeader eyebrow="Fitur Unggulan" title="Analisis Cerdas" description="Dapatkan kemudahan pemantauan nutrisi dengan dukungan kecerdasan buatan" />
          </div>

          <CardContent className="space-y-3">
            {(featureHighlights || []).map((item) => {
              const Icon = getIconByName(item.iconName, 'Sparkles');

              return (
                <div
                  key={item.title}
                  className="
                    flex items-start gap-3 rounded-2xl
                    border border-borderSoft
                    bg-white/3 p-4 transition-all
                    duration-200 ease-out
                    hover:border-white/10
                    hover:bg-white/[0.04]
                  "
                >
                  <div
                    className="
                      rounded-2xl border border-borderCard
                      bg-primary/10 p-3 text-primary
                    "
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-medium text-textPrimary">{item.title}</h4>

                    <p className="text-sm text-textSecondary">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
}
