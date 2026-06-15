"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  { label: "Total Students", value: "12,847", change: "+18.4%", up: true, sub: "vs last month", icon: "🎓", color: "#1B4332", bg: "rgba(27,67,50,0.08)" },
  { label: "Active Courses", value: "148", change: "+6", up: true, sub: "new this month", icon: "📚", color: "#2D6A4F", bg: "rgba(45,106,79,0.08)" },
  { label: "Shop Revenue", value: "$84,210", change: "+22.1%", up: true, sub: "vs last month", icon: "🛍️", color: "#D4A017", bg: "rgba(212,160,23,0.10)" },
  { label: "Pending Orders", value: "234", change: "-12%", up: false, sub: "vs last week", icon: "📦", color: "#B45309", bg: "rgba(180,83,9,0.08)" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5 pointer-events-none"
            style={{ background: `radial-gradient(circle at top right, ${s.color}, transparent)` }} />

          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
              style={{ background: s.bg }}>
              {s.icon}
            </div>
            <span className={`badge ${s.up ? "text-green-700 bg-green-50" : "text-red-600 bg-red-50"}`}>
              {s.up ? <TrendingUp size={11} className="mr-1" /> : <TrendingDown size={11} className="mr-1" />}
              {s.change}
            </span>
          </div>

          <div className="text-2xl font-bold mb-1" style={{ color: "#1C1917" }}>{s.value}</div>
          <div className="text-sm font-medium" style={{ color: "#52796F" }}>{s.label}</div>
          <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}