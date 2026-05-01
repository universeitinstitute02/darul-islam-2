"use client";

import React from "react";
import {
  Home,
  BookOpen,
  Settings,
  LayoutDashboard,
  LogOut,
  FileText,
} from "lucide-react";
import LogoutButton from "@/src/components/dashboard/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-islamic-green text-white flex flex-col hidden md:flex rounded-tr-2xl shadow-xl overflow-hidden z-20">
        <div className="p-6 border-b border-green-800 flex items-center gap-3">
          <LayoutDashboard />
          <h2 className="text-xl font-bold">ড্যাশবোর্ড</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-3 bg-islamic-green-light rounded text-white font-medium"
          >
            <Home size={20} /> ওভারভিউ
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-islamic-green-light rounded text-green-100 font-medium transition"
          >
            <BookOpen size={20} /> আমার কোর্সসমূহ
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-islamic-green-light rounded text-green-100 font-medium transition"
          >
            <FileText size={20} /> পেমেন্ট ও রসিদ
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-3 hover:bg-islamic-green-light rounded text-green-100 font-medium transition"
          >
            <Settings size={20} /> প্রোফাইল সেটিংস
          </a>
          {/* Directing to Teacher for Mockup purposes */}
          <a
            href="/dashboard/teacher"
            className="flex items-center gap-3 p-3 hover:bg-islamic-gold hover:text-islamic-green rounded text-islamic-gold font-medium transition mt-8 border border-islamic-gold"
          >
            শিক্ষক প্যানেল দেখুন
          </a>
        </nav>
        <LogoutButton />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="overflow-y-auto p-8 h-full bg-neutral-50 shadow-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
