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
import { UploadSection } from '../../components/predict/UploadSection';
import PredictionResult from '../../components/predict/PredictionResult';

import { nutritionService } from '../../services';
import { predictAPI } from '../../services/api';
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
    title: 'Nutrition guidance',
    description: 'AI checks meals against daily targets.',
    iconName: 'BrainCircuit',
  },
  {
    title: 'Smart tracking',
    description: 'Calories, protein, water, and fiber in one view.',
    iconName: 'Sparkles',
  },
];

const macroSummary = {
  title: 'Macro distribution',
  subtitle: 'Daily macronutrient balance overview',
};

const weeklyTrendSummary = {
  title: 'Weekly calorie trend',
  subtitle: 'Track calorie fluctuations throughout the week',
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

        const [stats, predictLogsRes, macros, trend, insights, notification] = await Promise.all([
          Promise.resolve(nutritionService.getDashboardStats(email)),
          predictAPI.getPredictLogs().catch(() => ({ data: [] })),
          Promise.resolve(nutritionService.getMacroDistribution(email)),
          Promise.resolve(nutritionService.getWeeklyTrend(email)),
          Promise.resolve(nutritionService.getAiInsights(email)),
          Promise.resolve(nutritionService.getHealthNotification(email)),
        ]);

        const rawLogs = predictLogsRes?.data?.predictLogs || [];
        const flatMeals = rawLogs.slice(0, 3).map(log => ({
          id: log.id,
          timestamp: new Date(log.created_at || log.createdAt || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
          name: log.food_name || log.name || 'Predicted Meal',
          type: 'Scanned Food',
          calories: Math.round(log.calorie || log.calories || 0),
          confidence: log.confident_score || 0,
          image: log.image_url || log.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
          iconName: 'Apple'
        }));

        setStatsCards(stats || []);
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
          <DashboardHeader username={user?.user?.fullname || user?.fullname || 'User'} description="Here's your nutrition summary for today. Track your meals, monitor macro balance, and review your nutrition insights in one unified dashboard." />
        ) : (
          <DashboardHeader title="Sign in to view your dashboard" description="Your dashboard session is inactive. Mock sandbox data may still exist internally, but it will not be shown until you authenticate again." />
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
            <SectionHeader eyebrow="Foundation highlights" title="Reusable patterns" description="Cards, badges, sections, and layouts are separated cleanly for scale" />
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

function HeroSection({ isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <section
        className="
          rounded-2xl border border-borderCard
          bg-card p-5 shadow-card
          sm:p-6
        "
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Badge variant="primary" className="w-fit">
              Logged out
            </Badge>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-textPrimary sm:text-3xl">Authentication required</h2>

              <p className="max-w-2xl text-sm leading-6 text-textSecondary sm:text-base">Sign in through the auth gateway to load the demo sandbox. Direct dashboard navigation will never restore a session automatically.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary">
              <Link to="/auth">Login</Link>
            </Button>

            <Button asChild variant="secondary">
              <Link to="/auth?mode=register">Register</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        rounded-2xl border border-borderCard
        bg-card p-5 shadow-card
        sm:p-6
      "
    >
      <div
        className="
          flex flex-col gap-6
          xl:flex-row xl:items-end xl:justify-between
        "
      >
        <div className="space-y-4">
          <Badge variant="primary" className="w-fit">
            Nutrition AI Dashboard
          </Badge>

          <div className="space-y-2">
            <h2
              className="
                text-2xl font-bold tracking-tight
                text-textPrimary sm:text-3xl
              "
            >
              Build healthy habits with a modern nutrition control center.
            </h2>

            <p
              className="
                max-w-2xl text-sm leading-6
                text-textSecondary sm:text-base
              "
            >
              Monitor calories, protein, hydration, and macro balance in one dashboard. This foundation is structured for growth, future API integration, and reusable UI composition.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="primary">Add meal</Button>

          <Button variant="secondary">View reports</Button>
        </div>
      </div>
    </section>
  );
}

function AuthRequiredPanel() {
  return (
    <Card className="h-full">
      <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <Badge variant="primary">Session inactive</Badge>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-textPrimary">No active dashboard session</h3>
          <p className="mx-auto max-w-xl text-sm leading-6 text-textSecondary">Protected dashboard actions are disabled while logged out. Persistent mock data stays isolated and will not be read until you explicitly log in.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="primary">
            <Link to="/auth">Login</Link>
          </Button>

          <Button asChild variant="secondary">
            <Link to="/auth?mode=register">Register</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
