"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const weekData = [
  { day: "Mon", enrollments: 142, sales: 38 },
  { day: "Tue", enrollments: 98, sales: 52 },
  { day: "Wed", enrollments: 176, sales: 61 },
  { day: "Thu", enrollments: 234, sales: 44 },
  { day: "Fri", enrollments: 312, sales: 87 },
  { day: "Sat", enrollments: 189, sales: 73 },
  { day: "Sun", enrollments: 156, sales: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="card p-2.5 text-xs" style={{ minWidth: 120 }}>
        <div className="font-semibold mb-1" style={{ color: "#1B4332" }}>{label}</div>
        <div className="flex justify-between gap-3"><span style={{ color: "#1B4332" }}>Enrollments</span><b>{payload[0]?.value}</b></div>
        <div className="flex justify-between gap-3"><span style={{ color: "#D4A017" }}>Sales</span><b>{payload[1]?.value}</b></div>
      </div>
    );
  }
  return null;
};

const feed = [
  { text: "New student enrolled in Tajweed course", time: "2m ago", icon: "🎓" },
  { text: "Order #4821 delivered successfully", time: "14m ago", icon: "✅" },
  { text: "Sh. Abdullah uploaded new lecture", time: "1h ago", icon: "📤" },
  { text: "5 new reviews received this morning", time: "2h ago", icon: "⭐" },
  { text: "Coupon RAMADAN24 used 18 times", time: "3h ago", icon: "🏷️" },
  { text: "New product: Zamzam Water added", time: "5h ago", icon: "🛍️" },
];

export default function WeeklyBar() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="card p-6">
        <h3 className="font-bold text-base mb-1" style={{ color: "#1C1917" }}>This Week Activity</h3>
        <p className="text-xs mb-5" style={{ color: "#52796F" }}>Daily enrollments & shop sales</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(27,67,50,0.07)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="enrollments" fill="#1B4332" radius={[5, 5, 0, 0]} maxBarSize={28} />
            <Bar dataKey="sales" fill="#D4A017" radius={[5, 5, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 text-xs" style={{ color: "#52796F" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#1B4332" }} />Enrollments
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#D4A017" }} />Sales
          </span>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-bold text-base mb-1" style={{ color: "#1C1917" }}>Live Activity</h3>
        <p className="text-xs mb-5" style={{ color: "#52796F" }}>Real-time platform events</p>
        <div className="space-y-3">
          {feed.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: "rgba(27,67,50,0.07)" }}>
                {f.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: "#1C1917" }}>{f.text}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{f.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}