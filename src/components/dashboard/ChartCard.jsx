import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';

export function ChartCard({ title, description, action, children, footer, className = '' }) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </CardHeader>

      <CardContent>{children}</CardContent>

      {footer ? <div className="px-6 pb-6">{footer}</div> : null}
    </Card>
  );
}
