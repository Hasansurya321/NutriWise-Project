import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Progress } from '../ui/progress';
import { getIconByName } from '../../utils/iconRegistry';

export function KpiCard({ title, value, target, progress, change, direction, iconName }) {
  const badgeVariant = direction === 'down' ? 'warning' : 'success';
  const Icon = getIconByName(iconName, 'Flame');

  return (
    <Card className="h-full">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="rounded-2xl border border-borderCard bg-primary/10 p-3 text-primary">
            {Icon ? <Icon className="h-5 w-5" /> : null}
          </div>
          <Badge variant={badgeVariant}>{change}</Badge>
        </div>

        <div className="space-y-1">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-3xl">{value}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Progress value={progress} />
        <div className="flex items-center justify-between text-xs text-textSecondary">
          <span>Target</span>
          <span>{target}</span>
        </div>
      </CardContent>
    </Card>
  );
}
