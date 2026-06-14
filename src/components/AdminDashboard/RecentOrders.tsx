"use client";
import { MoreHorizontal } from "lucide-react";

const orders = [
  { id: "#ORD-4821", customer: "Fatima Al-Zahra", product: "Quran with Tafsir (Hardcover)", amount: "$42.00", status: "Delivered", date: "Jun 12", avatar: "FZ" },
  { id: "#ORD-4820", customer: "Ibrahim Hassan", product: "Islamic Calligraphy Set", amount: "$78.50", status: "Processing", date: "Jun 12", avatar: "IH" },
  { id: "#ORD-4819", customer: "Aisha Rahman", product: "Prayer Rug — Medina Pattern", amount: "$34.00", status: "Shipped", date: "Jun 11", avatar: "AR" },
  { id: "#ORD-4818", customer: "Yusuf Al-Amin", product: "Arabic Grammar Book Bundle", amount: "$56.00", status: "Delivered", date: "Jun 11", avatar: "YA" },
  { id: "#ORD-4817", customer: "Khadijah Omar", product: "Attar Rose Fragrance Oil", amount: "$28.00", status: "Pending", date: "Jun 10", avatar: "KO" },
  { id: "#ORD-4816", customer: "Muhamad Bilal", product: "Misbahas (Tasbeeh) — Pearl", amount: "$19.00", status: "Delivered", date: "Jun 10", avatar: "MB" },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  Delivered: { bg: "rgba(27,67,50,0.1)", color: "#1B4332" },
  Processing: { bg: "rgba(212,160,23,0.12)", color: "#B45309" },
  Shipped: { bg: "rgba(59,130,246,0.1)", color: "#1D4ED8" },
  Pending: { bg: "rgba(239,68,68,0.1)", color: "#DC2626" },
};

const avatarColors = ["#1B4332", "#2D6A4F", "#D4A017", "#52796F", "#B45309", "#1B4332"];

export default function RecentOrders() {
  return (
    <div className="card">
      <div className="flex items-center justify-between px-6 py-5 border-b"
        style={{ borderColor: "rgba(27,67,50,0.07)" }}>
        <div>
          <h3 className="font-bold text-base" style={{ color: "#1C1917" }}>Recent Orders</h3>
          <p className="text-xs mt-0.5" style={{ color: "#52796F" }}>Latest shop transactions</p>
        </div>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "#FAF7F0", color: "#1B4332" }}>View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(27,67,50,0.06)" }}>
              {["Order", "Customer", "Product", "Amount", "Status", "Date", ""].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#9CA3AF" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => {
              const s = statusStyle[o.status];
              return (
                <tr key={o.id} className="border-b hover:bg-gray-50/50 transition-colors"
                  style={{ borderColor: "rgba(27,67,50,0.05)" }}>
                  <td className="px-5 py-3.5 text-sm font-mono font-semibold" style={{ color: "#1B4332" }}>{o.id}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: avatarColors[i % avatarColors.length] }}>
                        {o.avatar}
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#1C1917" }}>{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm max-w-[200px] truncate" style={{ color: "#52796F" }}>{o.product}</td>
                  <td className="px-5 py-3.5 text-sm font-bold" style={{ color: "#1C1917" }}>{o.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className="badge text-xs" style={{ background: s.bg, color: s.color }}>{o.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm" style={{ color: "#9CA3AF" }}>{o.date}</td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100">
                      <MoreHorizontal size={15} color="#9CA3AF" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}