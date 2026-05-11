"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Settings,
  LayoutDashboard,
  LogOut,
  FileCheck,
  Menu,
  X,
  Library,
  PlusSquare,
  Video,
  Users,
  GraduationCap,
  Bell,
  UserCog,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    // { name: "ওভারভিউ", href: "/dashboard", icon: Home },
    {
      name: "টিচার ড্যাশবোর্ড",
      href: "/dashboard/teacher/teacher-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "আমার কোর্সসমূহ",
      href: "/dashboard/teacher/my-course",
      icon: Library,
    },
    {
      name: "কোর্স যুক্ত করুন",
      href: "/dashboard/teacher/add-course",
      icon: PlusSquare,
    },
    {
      name: "ক্লাস লিঙ্ক",
      href: "/dashboard/teacher/class-link",
      icon: Video,
    },
    {
      name: "শিক্ষকবৃন্দ",
      href: "/dashboard/teacher/teacher-list",
      icon: Users,
    },
    {
      name: "সকল সদস্যবৃন্দ",
      href: "/dashboard/teacher/all-users",
      icon: Users,
    },
    {
      name: "অ্যাসাইনমেন্ট ও মূল্যায়ন",
      href: "/dashboard/teacher/assignment",
      icon: GraduationCap,
    },
    {
      name: "নোটিশ বোর্ড",
      href: "/dashboard/teacher/notice-board",
      icon: Bell,
    },
    {
      name: "প্রোফাইল সেটিংস",
      href: "/dashboard/teacher/profile",
      icon: UserCog,
    },
  ];

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
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#105D38] text-white flex flex-col 
        transition-transform duration-300 transform md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        rounded-tr-2xl shadow-xl overflow-hidden
      `}
      >
        <div className="p-6 border-b border-green-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard />
            <h2 className="text-xl font-bold">ড্যাশবোর্ড</h2>
          </div>
          {/* Mobile Close Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)} // মোবাইলে ক্লিক করলে বন্ধ হবে
                className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-[#C5A059] text-white shadow-lg" // একটিভ স্টাইল
                    : "text-green-100 hover:bg-green-800/50"
                }`}
              >
                <link.icon size={20} /> {link.name}
              </Link>
            );
          })}

          <Link
            href="/dashboard/teacher"
            className="flex items-center gap-3 p-3 hover:bg-[#C5A059] hover:text-white rounded-xl text-[#C5A059] font-bold transition mt-8 border border-[#C5A059]"
          >
            শিক্ষক প্যানেল দেখুন
          </Link>
        </nav>

        <div className="p-4 border-t border-green-800">
          <button className="flex items-center gap-3 w-full p-3 hover:bg-red-600 rounded-xl text-green-100 hover:text-white font-medium transition">
            <LogOut size={20} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Top Header (Search bar এর নিচে বা উপরে দিতে পারেন) */}
        <header className="md:hidden bg-white p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#105D38] rounded-lg flex items-center justify-center text-white font-bold">
              ও
            </div>
            <span className="font-bold text-neutral-800 uppercase tracking-tight">
              Ostad
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-neutral-600"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-neutral-50">
          {children}
        </div>
      </main>
    </div>
  );
}
