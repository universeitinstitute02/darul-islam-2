"use client";
import React from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  ArrowUpRight,
  PlayCircle,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function StudentDashboardWelcome() {
  const stats = [
    {
      label: "চলমান কোর্স",
      value: 3,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "সম্পন্ন ক্লাস",
      value: 12,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "উপস্থিতি হার",
      value: 85,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      suffix: "%",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#105D38] p-8 md:p-12 text-white shadow-2xl shadow-green-900/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 text-center md:text-left"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full w-fit mx-auto md:mx-0 border border-white/20">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                লার্নিং আপডেট
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              আস-সালামু আলাইকুম, আব্দুল্লাহ!
            </h1>
            <p className="text-white/70 max-w-md font-medium leading-relaxed">
              আপনার জ্ঞানের যাত্রায় আজকে ২টি নতুন লেসন এবং ১টি কুইজ পেন্ডিং আছে।
              আপনার অগ্রগতি বেশ চমৎকার!
            </p>
            <button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-black/20">
              পরবর্তী লেসন শুরু করুন <PlayCircle size={18} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative"
          >
            <div className="w-48 h-48 rounded-full border-[12px] border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <span className="text-4xl font-black block">৬৫%</span>
                <span className="text-[10px] uppercase font-bold opacity-60 tracking-tighter">
                  কোর্স কমপ্লিট
                </span>
              </div>
            </div>
            {/* Decorative small circle */}
            <div className="absolute top-2 right-2 w-12 h-12 bg-[#C5A059] rounded-full blur-xl opacity-50"></div>
          </motion.div>
        </div>
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/50 transition-all group"
          >
            <div
              className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-4 group-hover:scale-110 transition-transform`}
            >
              <stat.icon size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-neutral-800 tracking-tight">
                <CountUp end={stat.value} duration={2} />
                {stat.suffix}
              </h3>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">
              <TrendingUp size={12} /> অগ্রগতি ভালো
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Enrolled Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-black text-neutral-800 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-[#105D38] rounded-full"></span> আপনার
            এনরোলকৃত কোর্স
          </h2>
          <button className="text-sm font-bold text-[#105D38] hover:underline flex items-center gap-1">
            সবগুলো দেখুন <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Card 1 */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:border-[#105D38]/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-1 bg-green-50 text-[#105D38] text-[10px] font-black uppercase rounded-full tracking-wider border border-green-100">
                চলমান
              </div>
              <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1">
                <Calendar size={12} /> আজ সন্ধ্যা ৭:০০
              </span>
            </div>
            <h4 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-[#105D38] transition-colors">
              সহীহ তিলাওয়াত ও তাজবিদ
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-neutral-500">
                <span>অগ্রগতি</span>
                <span>৬০%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  className="bg-[#105D38] h-full rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:border-[#105D38]/30 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-1 bg-green-50 text-[#105D38] text-[10px] font-black uppercase rounded-full tracking-wider border border-green-100">
                চলমান
              </div>
              <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1">
                <Calendar size={12} /> কাল ৪:০০
              </span>
            </div>
            <h4 className="text-xl font-bold text-neutral-800 mb-4 group-hover:text-[#105D38] transition-colors">
              হাদিস পরিচিতি
            </h4>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-neutral-500">
                <span>অগ্রগতি</span>
                <span>২০%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20%" }}
                  className="bg-[#C5A059] h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
