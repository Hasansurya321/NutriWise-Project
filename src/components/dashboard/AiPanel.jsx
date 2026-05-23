import { Activity, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { InsightCard } from './InsightCard';
import { getInsightVariant } from './ai-insight-variants';
import { cn } from '../../utils/cn';

export function AiPanel({ aiInsights = [], healthNotification = null }) {
  const health = healthNotification || {
    variant: 'default',
    title: 'No health notification',
    label: 'Info',
    message: '',
    meta: '',
  };

  const healthConfig = getInsightVariant(health?.variant ?? 'default');

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-borderCard bg-primary/10 p-3 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Personalized nutrition insights</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4" aria-live="polite">
        <section role={healthConfig.role} aria-live={healthConfig.role === 'alert' ? 'assertive' : 'polite'} className={cn('rounded-2xl border p-4', 'transition-all duration-200', healthConfig.wrapper)}>
          <div className="flex items-start gap-3">
            <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', healthConfig.icon)} aria-hidden="true">
              <Activity className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold text-textPrimary">{health.title}</h4>

                <Badge variant={healthConfig.badge}>{health.label}</Badge>
              </div>

              <p className="text-sm leading-relaxed text-textSecondary">{health.message}</p>

              {health.meta ? <p className="text-xs text-textMuted">{health.meta}</p> : null}
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3">
          {(aiInsights || []).map((insight) => {
            const safeInsight = insight || {
              id: crypto.randomUUID(),
              variant: 'default',
              title: 'No insights available',
              message: '',
              meta: '',
              iconName: null,
            };

            return <InsightCard key={safeInsight.id} variant={safeInsight.variant} title={safeInsight.title} message={safeInsight.message} meta={safeInsight.meta} iconName={safeInsight.iconName} />;
          })}
        </div>
      </CardContent>
    </Card>
  );
}
