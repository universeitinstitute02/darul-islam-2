"use client";

import { useState } from "react";
import {
  User,
  BookOpen,
  Award,
  Clock,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
  CheckCircle2,
  Download,
  Star,
  Edit,
  Mail,
  Phone,
  Shield,
  University,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const stats = [
  {
    label: "কোর্স",
    value: "৪",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "সার্টিফিকেট",
    value: "২",
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "ঘন্টা",
    value: "১২৮",
    icon: Clock,
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

const courses = [
  {
    name: "হিফযুল কুরআন",
    progress: 75,
    detail: "১৫ টি সূরা সম্পন্ন",
    color: "bg-[#14281D]",
  },
  {
    name: "আরবি ভাষা কোর্স",
    progress: 40,
    detail: "৮ টি পাঠ সম্পন্ন",
    color: "bg-amber-600",
  },
  {
    name: "তাজবীদ ও কিরাত",
    progress: 90,
    detail: "প্রায় সম্পন্ন",
    color: "bg-teal-600",
  },
];

const activities = [
  { action: "হিফয ক্লাসে অংশগ্রহণ", time: "২ ঘন্টা আগে", icon: CheckCircle2 },
  { action: "তাজবীদ বই ডাউনলোড", time: "গতকাল", icon: Download },
  { action: "কুইজে অংশগ্রহণ - ৮৫%", time: "৩ দিন আগে", icon: Star },
];

const badges = [
  { name: "হাফিয", icon: University },

  { name: "আরবি", icon: BookOpen },
  { name: "১০০ ঘন্টা", icon: Clock },
  { name: "উত্তীর্ণ", icon: Award },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-40 lg:h-48 bg-gradient-to-r from-emerald-800 to-teal-900 flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-3xl flex items-center justify-center text-[#14281D] shadow-2xl relative group cursor-pointer"
            >
              <User size={48} />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white border-4 border-[#14281D] group-hover:bg-amber-400 transition-colors">
                <Edit size={14} />
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl lg:text-3xl font-black">মুহাম্মদ রহিম</h1>
              <p className="text-xs lg:text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1 flex items-center gap-2">
                <University size={14} /> শিক্ষার্থী · দারুল ইসলাম ইনস্টিটিউট
              </p>
            </div>
          </div>
          <div className="hidden lg:flex gap-4">
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-[#14281D]"></span>
            </button>
            <button className="bg-[#E2D4B9] text-[#14281D] px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-transform">
              <Settings size={20} /> সেটিংস
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-12 gap-8 grid grid-cols-1 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-[#14281D]/5 space-y-1">
            {[
              { id: "dashboard", label: "ড্যাশবোর্ড", icon: Shield },
              { id: "courses", label: "আমার কোর্স", icon: BookOpen },
              { id: "achievements", label: "অর্জনসমূহ", icon: Award },
              { id: "settings", label: "সেটিংস", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-black transition-all ${
                  activeTab === tab.id
                    ? "bg-[#14281D] text-[#E2D4B9] shadow-lg translate-x-2"
                    : "text-[#14281D]/60 hover:bg-[#14281D]/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && <ChevronRight size={18} />}
              </button>
            ))}
            <hr className="my-2 border-[#14281D]/5" />
            <button className="w-full flex items-center gap-3 p-4 rounded-2xl font-black text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={20} />
              <span>লগআউট</span>
            </button>
          </div>

          <div className="bg-[#14281D] p-6 rounded-[2rem] text-[#E2D4B9] shadow-2xl space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
              অ্যাপ সাপোর্ট
            </p>
            <h4 className="text-lg font-black leading-tight">
              আপনার কি কোনো সহযোগিতা প্রয়োজন?
            </h4>
            <button className="w-full bg-[#E2D4B9] text-[#14281D] py-3 rounded-xl font-bold text-sm">
              যোগাযোগ করুন
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 lg:p-8 rounded-[2.5rem] shadow-xl border border-[#14281D]/5 text-center space-y-2 relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 lg:w-16 lg:h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-sm`}
                  >
                    <stat.icon size={32} />
                  </div>
                  <p className="text-2xl lg:text-4xl font-black text-[#14281D]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] lg:text-xs font-black text-[#14281D]/40 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column: Progress & Activity */}
            <div className="lg:col-span-3 space-y-8">
              {/* Course Progress */}
              <section className="bg-white p-8 rounded-[3rem] shadow-xl border border-[#14281D]/5 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-[#14281D] flex items-center gap-3">
                    <BookOpen className="text-amber-600" /> কোর্সের অগ্রগতি
                  </h3>
                  <Link
                    href="/courses"
                    className="text-xs font-black text-amber-600 hover:underline"
                  >
                    সকল কোর্স
                  </Link>
                </div>
                <div className="space-y-6">
                  {courses.map((course, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <div>
                          <p className="font-black text-[#14281D]">
                            {course.name}
                          </p>
                          <p className="text-[10px] font-bold text-[#14281D]/30 uppercase tracking-widest">
                            {course.detail}
                          </p>
                        </div>
                        <span className="text-sm font-black text-[#14281D]">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#14281D]/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${course.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Badges */}
              <section className="bg-white p-8 rounded-[3rem] shadow-xl border border-[#14281D]/5 space-y-6">
                <h3 className="text-xl font-black text-[#14281D] flex items-center gap-3">
                  <Award className="text-amber-600" /> আমার ব্যাজসমূহ
                </h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                  {badges.map((badge, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-[#FFFCDC] p-6 rounded-[2rem] shadow-lg border border-amber-100 min-w-[120px] text-center space-y-3 shrink-0"
                    >
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto text-[#14281D] shadow-sm">
                        <badge.icon size={28} />
                      </div>
                      <p className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest">
                        {badge.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Personal Info & Activity */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Info */}
              <section className="bg-[#14281D] p-8 rounded-[3rem] shadow-2xl text-[#E2D4B9] space-y-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 p-12 text-white/5 opacity-10">
                  <User size={180} />
                </div>
                <h3 className="text-lg font-black relative z-10">
                  ব্যক্তিগত তথ্য
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <Mail size={18} className="text-amber-500" />
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40">
                        ইমেইল
                      </p>
                      <p className="text-sm font-bold">rahim@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <Phone size={18} className="text-amber-500" />
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40">
                        মোবাইল
                      </p>
                      <p className="text-sm font-bold">০১৭১২-৩৪৫৬৭৮</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <Clock size={18} className="text-amber-500" />
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40">
                        সদস্য শুরু
                      </p>
                      <p className="text-sm font-bold">১৫ জানুয়ারি ২০২৬</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#E2D4B9] text-[#14281D] py-4 rounded-2xl font-black text-sm relative z-10">
                  এডিট প্রোফাইল
                </button>
              </section>

              {/* Recent Activity */}
              <section className="bg-white p-8 rounded-[3rem] shadow-xl border border-[#14281D]/5 space-y-6">
                <h3 className="text-xl font-black text-[#14281D] flex items-center gap-3">
                  <Clock className="text-amber-600" /> সাম্প্রতিক কার্যক্রম
                </h3>
                <div className="space-y-4">
                  {activities.map((act, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-10 h-10 bg-[#14281D]/5 text-[#14281D] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all">
                        <act.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#14281D]">
                          {act.action}
                        </p>
                        <p className="text-[10px] font-bold text-[#14281D]/30 uppercase tracking-widest">
                          {act.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
