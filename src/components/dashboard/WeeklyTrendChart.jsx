import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartTooltip } from './ChartTooltip';

export function WeeklyTrendChart({ data = [] }) {
  return (
    <section aria-label="Weekly calorie intake trend chart" className="flex flex-col gap-6">
      <div
        className="
          h-[220px] w-full
          sm:h-[260px]
          lg:h-[300px]
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              left: -12,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,.08)" vertical={false} />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: '#64748B',
                fontSize: 12,
              }}
              dy={10}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{
                fill: '#64748B',
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: 'rgba(93,219,138,.2)',
                strokeWidth: 1,
              }}
              content={<ChartTooltip valueSuffix="kcal" />}
            />

            <Line
              type="monotone"
              dataKey="calories"
              stroke="#5DDB8A"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: '#5DDB8A',
                stroke: '#081225',
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
