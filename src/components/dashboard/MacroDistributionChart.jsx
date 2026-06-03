import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { MacroLegend } from './MacroLegend';

export function MacroDistributionChart({ data = [] }) {
  return (
    <section aria-label="Macronutrient distribution chart" className="flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <div
          className="
            h-[220px] w-full
            sm:h-[260px]
          "
        >
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4} cornerRadius={8} stroke="rgba(255,255,255,.05)" strokeWidth={1}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: '#1E2C47',
                  border: '1px solid rgba(255,255,255,.05)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <MacroLegend items={data} />
    </section>
  );
}
