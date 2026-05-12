"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
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
import useUserRole from "../../hooks/useUserRole";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { role, user } = useUserRole();
  const queryClient = useQueryClient();

  console.log("User Role in Layout:", role);

  const handleLogout = async () => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "আপনি ড্যাশবোর্ড থেকে লগআউট করতে যাচ্ছেন!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#105D38",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, লগআউট করুন",
      cancelButtonText: "বাতিল",
      background: "#f5f5f5",
    }).then(async (result) => {
      if (result.isConfirmed) {
        queryClient.clear();
        await signOut({ callbackUrl: "/auth/login" });
      }
    });
  };

  const allLinks = [
    {
      name: "টিচার ড্যাশবোর্ড",
      href: "/dashboard/teacher/teacher-dashboard",
      icon: LayoutDashboard,
      roles: ["teacher"],
    },
    {
      name: "আমার কোর্সসমূহ",
      href: "/dashboard/teacher/my-course",
      icon: Library,
      roles: ["teacher"],
    },
    {
      name: "কোর্স যুক্ত করুন",
      href: "/dashboard/teacher/add-course",
      icon: PlusSquare,
      roles: ["teacher"],
    },
    {
      name: "ক্লাস লিঙ্ক",
      href: "/dashboard/teacher/class-link",
      icon: Video,
      roles: ["teacher"],
    },
    {
      name: "শিক্ষকবৃন্দ",
      href: "/dashboard/teacher/teacher-list",
      icon: Users,
      roles: ["admin", "teacher"],
    },
    {
      name: "সকল সদস্যবৃন্দ",
      href: "/dashboard/teacher/all-users",
      icon: Users,
      roles: ["admin"],
    },
    {
      name: "অ্যাসাইনমেন্ট ও মূল্যায়ন",
      href: "/dashboard/teacher/assignment",
      icon: GraduationCap,
      roles: ["teacher"],
    },
    {
      name: "নোটিশ বোর্ড",
      href: "/dashboard/teacher/notice-board",
      icon: Bell,
      roles: ["teacher", "admin"],
    },
    {
      name: "প্রোফাইল সেটিংস",
      href: "/dashboard/teacher/profile",
      icon: UserCog,
      roles: ["teacher", "admin"],
    },
  ];

  const navLinks = allLinks.filter((link) =>
    link.roles.includes(role as string),
  );

  return (
    <div className="flex h-screen bg-neutral-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-[#C5A059] text-white shadow-lg"
                    : "text-green-100 hover:bg-green-800/50"
                }`}
              >
                <link.icon size={20} /> {link.name}
              </Link>
            );
          })}

          {role === "admin" && (
            <Link
              href="/dashboard/teacher"
              className="flex items-center gap-3 p-3 hover:bg-[#C5A059] hover:text-white rounded-xl text-[#C5A059] font-bold transition mt-8 border border-[#C5A059]"
            >
              শিক্ষক প্যানেল দেখুন
            </Link>
          )}
        </nav>

        <div className="p-4 border-t border-green-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 hover:bg-red-600 rounded-xl text-green-100 hover:text-white font-medium transition"
          >
            <LogOut size={20} /> লগআউট
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="md:hidden bg-white p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#105D38] rounded-lg flex items-center justify-center text-white font-bold">
              DI
            </div>
            <span className="font-bold text-neutral-800 uppercase tracking-tight">
              Darul Islam
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
