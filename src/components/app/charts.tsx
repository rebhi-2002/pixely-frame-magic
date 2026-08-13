import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AXIS = { fontSize: 11, fill: "var(--color-muted-foreground)" } as const;

const TOOLTIP_STYLE = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 14,
  fontSize: 12,
  color: "var(--color-foreground)",
  boxShadow: "0 12px 32px -12px color-mix(in oklab, var(--color-foreground) 30%, transparent)",
  padding: "8px 12px",
} as const;

/** منحنى تراكمي (نمو/نشاط) — البند 16. */
export function TrendChart({
  data,
  dataKey = "value",
  height = 220,
}: {
  data: { label: string; value: number }[];
  dataKey?: string;
  height?: number;
}) {
  const id = useMemo(() => `grad-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS} axisLine={false} tickLine={false} width={44} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="var(--color-primary)"
            strokeWidth={2.5}
            fill={`url(#${id})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** أعمدة مقارنة (أقسام/مواد) — البند 16. */
export function ComparisonChart({
  data,
  height = 220,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 5" vertical={false} />
          <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS} axisLine={false} tickLine={false} width={44} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "var(--color-accent)", opacity: 0.35 }}
          />
          <Bar dataKey="value" radius={[8, 8, 4, 4]} fill="var(--color-primary)" barSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const DONUT_COLORS = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-info)",
  "var(--color-muted-foreground)",
];

/** توزيع دائري (حالات/أدوار) — البند 16. */
export function SplitChart({
  data,
  height = 220,
}: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius="55%"
            outerRadius="82%"
            paddingAngle={3}
            stroke="var(--color-card)"
          >
            {data.map((entry, i) => (
              <Cell key={entry.label} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
