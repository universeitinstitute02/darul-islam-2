"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Quran & Tajweed", value: 38, color: "#1B4332" },
  { name: "Islamic Studies", value: 27, color: "#2D6A4F" },
  { name: "Arabic Language", value: 19, color: "#D4A017" },
  { name: "Hadith Sciences", value: 10, color: "#52796F" },
  { name: "Fiqh & Jurisprudence", value: 6, color: "#B45309" },
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  if (percent < 0.07) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CoursePieChart() {
  return (
    <div className="card p-6">
      <h3 className="font-bold text-lg mb-1" style={{ color: "#1C1917" }}>Course Categories</h3>
      <p className="text-sm mb-5" style={{ color: "#52796F" }}>Enrollment distribution</p>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value"
            labelLine={false} label={renderLabel}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip formatter={(v: any, n: any) => [`${v}%`, n]} />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-2 mt-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span style={{ color: "#52796F" }}>{d.name}</span>
            </div>
            <span className="font-semibold" style={{ color: "#1C1917" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}