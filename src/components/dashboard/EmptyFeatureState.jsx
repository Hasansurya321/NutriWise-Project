import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export function EmptyFeatureState({ icon: Icon, title, description, actionLabel = 'Back to dashboard', actionTo = '/' }) {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="flex flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="rounded-3xl border border-borderCard bg-primary/10 p-5 text-primary">
          <Icon className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-textPrimary">{title}</h1>
          <p className="max-w-xl text-sm text-textSecondary">{description}</p>
        </div>
        <Button asChild>
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
