import { motion } from 'framer-motion';

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
import { UploadSection } from '../../components/dashboard/UploadSection';

import { featureHighlights, macroDistributionData, macroSummary, recentMeals, statsCards, weeklyCalorieTrendData, weeklyTrendSummary } from '../../data/dashboard';

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

export default function DashboardPage() {
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
        <DashboardHeader username="Hasan" description="Here's your nutrition summary for today. Track your meals, monitor macro balance, and review your nutrition insights in one unified dashboard." />
      </motion.div>

      <motion.section
        variants={fadeUp}
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-2 sm:gap-6
          xl:grid-cols-4
        "
      >
        {statsCards.map((item) => (
          <StatsCard key={item.title} {...item} />
        ))}
      </motion.section>

      <motion.div variants={fadeUp}>
        <HeroSection />
      </motion.div>

      <motion.section
        variants={fadeUp}
        className="
          grid gap-6
          lg:grid-cols-1
          xl:grid-cols-12
        "
      >
        <div className="xl:col-span-8">
          <UploadSection />
        </div>

        <div className="xl:col-span-4">
          <AiPanel />
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
            {featureHighlights.map((item) => {
              const Icon = item.icon;

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
                    <Icon className="h-5 w-5" />
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

function HeroSection() {
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
