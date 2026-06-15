"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", courses: 18200, shop: 9400 },
  { month: "Feb", courses: 22100, shop: 11200 },
  { month: "Mar", courses: 19800, shop: 13500 },
  { month: "Apr", courses: 27400, shop: 15800 },
  { month: "May", courses: 31200, shop: 18200 },
  { month: "Jun", courses: 29600, shop: 21400 },
  { month: "Jul", courses: 35100, shop: 19800 },
  { month: "Aug", courses: 42000, shop: 24600 },
  { month: "Sep", courses: 38400, shop: 27100 },
  { month: "Oct", courses: 45200, shop: 31200 },
  { month: "Nov", courses: 51000, shop: 36800 },
  { month: "Dec", courses: 58600, shop: 42100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="card p-3 text-sm" style={{ minWidth: 160 }}>
        <div className="font-semibold mb-2" style={{ color: "#1B4332" }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex justify-between gap-4">
            <span style={{ color: p.color }}>{p.name === "courses" ? "Courses" : "Shop"}</span>
            <span className="font-bold">${p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-lg" style={{ color: "#1C1917" }}>Revenue Overview</h3>
          <p className="text-sm mt-0.5" style={{ color: "#52796F" }}>Courses & Shop earnings — 2024</p>
        </div>
        <div className="flex gap-2">
          {["1M", "3M", "6M", "1Y"].map((t, i) => (
            <button key={t} className="px-3 py-1 rounded-lg text-xs font-semibold"
              style={i === 3 ? { background: "#1B4332", color: "white" } : { background: "#FAF7F0", color: "#52796F" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
          <defs>
            <linearGradient id="colCourses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1B4332" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#1B4332" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="colShop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D4A017" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#D4A017" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,67,50,0.07)" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => v === "courses" ? "Courses" : "Shop"}
            wrapperStyle={{ fontSize: 12, color: "#52796F" }} />
          <Area type="monotone" dataKey="courses" stroke="#1B4332" strokeWidth={2.5}
            fill="url(#colCourses)" dot={false} activeDot={{ r: 5, fill: "#1B4332" }} />
          <Area type="monotone" dataKey="shop" stroke="#D4A017" strokeWidth={2.5}
            fill="url(#colShop)" dot={false} activeDot={{ r: 5, fill: "#D4A017" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}