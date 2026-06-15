"use client";

import CoursePieChart from "@/src/components/dashboard/admin/AdminDashboard/CoursePieChart";
import RecentOrders from "@/src/components/dashboard/admin/AdminDashboard/RecentOrders";
import RevenueChart from "@/src/components/dashboard/admin/AdminDashboard/RevenueChart";
import StatsCards from "@/src/components/dashboard/admin/AdminDashboard/StatsCards";
import TopCourses from "@/src/components/dashboard/admin/AdminDashboard/TopCourses";
import WeeklyBar from "@/src/components/dashboard/admin/AdminDashboard/WeeklyBar";

export default function Home() {
  return (
    <div className="min-h-screen geometric-bg">
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-5 md:p-6 space-y-5 md:space-y-6">
          {/* Islamic greeting banner */}
          <div
            className="rounded-2xl px-5 md:px-6 py-5 flex items-center justify-between relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #163828 100%)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E\")",
              }}
            />
            <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full border-2 border-white/10 pointer-events-none" />
            <div className="absolute right-16 -bottom-8 w-32 h-32 rounded-full border border-white/10 pointer-events-none" />

            <div className="relative z-10">
              <div className="text-white/60 text-sm mb-1 font-medium tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <h2 className="text-white text-lg md:text-xl font-bold">
                Assalamu Alaikum, Hujur 👋
              </h2>
              <p className="text-white/65 text-sm mt-1">
                Here's what's happening at Nur Academy today.
              </p>
            </div>

            <div className="relative z-10 hidden sm:flex flex-col items-end gap-2">
              <div
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(212,160,23,0.22)",
                  color: "#F0C040",
                }}
              >
                🌙 Jumu'ah Mubarak
              </div>
              <div className="text-white/45 text-xs">
                14 Dhul-Hijjah 1447 AH
              </div>
            </div>
          </div>

          <StatsCards />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <CoursePieChart />
          </div>

          {/* <WeeklyBar /> */}

          {/* <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
            <div className="xl:col-span-2">
              <TopCourses />
            </div>
            <div className="xl:col-span-3">
              <RecentOrders />
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
}
