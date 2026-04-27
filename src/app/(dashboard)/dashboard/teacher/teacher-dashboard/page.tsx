"use client";
import React from "react";
import {
  Users,
  BookOpen,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Clock,
  ChevronRight,
  FileEdit,
  Video,
  FileCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Link from "next/link";

const TeacherDashboardOverview = () => {
  // ১. স্ট্যাটাস গ্রিড (আয় রিমুভ করে অ্যাসাইনমেন্ট অ্যাড করা হয়েছে)
  const stats = [
    {
      id: 1,
      label: "মোট শিক্ষার্থী",
      value: 1240,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+১২% এই মাসে",
    },
    {
      id: 2,
      label: "সক্রিয় কোর্স",
      value: 4,
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "সবগুলো রানিং",
    },
    {
      id: 3,
      label: "পেন্ডিং অ্যাসাইনমেন্ট",
      value: 18,
      icon: FileCheck,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "৮টি নতুন জমা",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: "সহীহ তিলাওয়াত ও তাজবিদ",
      time: "আজ সন্ধ্যা ৭:৩০",
      platform: "Zoom Live",
      batch: "Batch-24",
    },
    {
      id: 2,
      course: "হাদিস পরিচিতি",
      time: "আগামীকাল বিকাল ৪:০০",
      platform: "Google Meet",
      batch: "Batch-09",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
            আস-সালামু আলাইকুম, ওস্তাদ!
          </h2>
          <p className="text-sm md:text-base text-neutral-500">
            আপনার আজকের শিডিউল এবং অগ্রগতি দেখে নিন।
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-neutral-100 shadow-sm w-fit">
          <Calendar className="text-[#105D38]" size={18} />
          <span className="text-sm font-bold text-neutral-700">
            ২৬ এপ্রিল, ২০২৬
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div
              className={`p-3 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-4`}
            >
              <stat.icon size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl md:text-4xl font-black text-neutral-800 tracking-tight">
                <CountUp end={stat.value} duration={2.5} separator="," />
              </h3>
              <p className="text-sm font-bold text-neutral-500">{stat.label}</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">
              <ArrowUpRight size={12} /> {stat.trend}
            </div>
          </motion.div>
        ))}
      </div>

      {/* অতিরিক্ত ফিচার ২: কুইক অ্যাকশন বাটন (মোবাইল ফোকাসড) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href={"/dashboard/teacher/my-course"}
          className="flex flex-col items-center justify-center p-4 bg-white border border-neutral-100 rounded-3xl gap-2 hover:bg-[#105D38] hover:text-white transition-all group shadow-sm"
        >
          <div className="p-2 bg-green-50 rounded-xl group-hover:bg-white/20">
            <Video
              size={20}
              className="text-[#105D38] group-hover:text-white"
            />
          </div>
          <span className="text-xs font-bold">লাইভ ক্লাস</span>
        </Link>
        <Link
          href={"/dashboard/teacher/assignment"}
          className="flex flex-col items-center justify-center p-4 bg-white border border-neutral-100 rounded-3xl gap-2 hover:bg-[#105D38] hover:text-white transition-all group shadow-sm"
        >
          <div className="p-2 bg-blue-50 rounded-xl group-hover:bg-white/20">
            <FileEdit
              size={20}
              className="text-blue-600 group-hover:text-white"
            />
          </div>
          <span className="text-xs font-bold">অ্যাসাইনমেন্ট</span>
        </Link>
        <Link
          href={"/dashboard/teacher"}
          className="flex flex-col items-center justify-center p-4 bg-white border border-neutral-100 rounded-3xl gap-2 hover:bg-[#105D38] hover:text-white transition-all group shadow-sm"
        >
          <div className="p-2 bg-orange-50 rounded-xl group-hover:bg-white/20">
            <Zap size={20} className="text-orange-600 group-hover:text-white" />
          </div>
          <span className="text-xs font-bold">নোটিশ দিন</span>
        </Link>
        <Link
          href={"/dashboard/teacher/teacher-list"}
          className="flex flex-col items-center justify-center p-4 bg-white border border-neutral-100 rounded-3xl gap-2 hover:bg-[#105D38] hover:text-white transition-all group shadow-sm"
        >
          <div className="p-2 bg-purple-50 rounded-xl group-hover:bg-white/20">
            <Users
              size={20}
              className="text-purple-600 group-hover:text-white"
            />
          </div>
          <span className="text-xs font-bold">সদস্যবৃন্দ</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Schedule */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
              <Clock size={20} className="text-[#C5A059]" /> আজকের ক্লাস শিডিউল
            </h3>
            <button className="text-xs font-bold text-[#105D38]">সবগুলো</button>
          </div>

          <div className="space-y-3">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white p-4 rounded-3xl border border-neutral-100 flex items-center justify-between group hover:border-[#105D38]/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-[#105D38] font-bold border border-neutral-100">
                    {cls.id === 1 ? "01" : "02"}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm md:text-base">
                      {cls.course}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {cls.batch} • {cls.platform}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#105D38] bg-green-50 px-3 py-1.5 rounded-xl block mb-1">
                    {cls.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Messaging */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-[#C5A059]" />{" "}
              শিক্ষার্থীদের প্রশ্ন
            </h3>
            <button className="text-xs font-bold text-[#105D38]">
              রিপ্লাই দিন
            </button>
          </div>

          <div className="bg-[#105D38] rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-xl shadow-green-900/20">
            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-2">
                নতুন ১২টি প্রশ্ন জমা পড়েছে
              </p>
              <h4 className="text-xl font-bold mb-4 leading-tight">
                শিক্ষার্থীদের ডাউট ক্লিয়ারিং সেশন বাকি আছে
              </h4>
              <button className="bg-[#C5A059] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#b38f4d] transition-all active:scale-95">
                ইনবক্স চেক করুন <ChevronRight size={18} />
              </button>
            </div>
            <MessageSquare
              size={120}
              className="absolute -bottom-8 -right-8 text-white opacity-10 rotate-12"
            />
          </div>
        </section>
      </div>

      {/* অতিরিক্ত ফিচার ৩: সাম্প্রতিক অ্যাক্টিভিটি টাইমলাইন */}
      <section className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm">
        <h3 className="text-lg font-bold text-neutral-800 mb-6">
          সাম্প্রতিক কার্যক্রম
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4 relative">
            <div className="w-0.5 h-10 bg-neutral-100 absolute left-[19px] top-10"></div>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <FileCheck size={18} className="text-[#105D38]" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-800">
                নতুন অ্যাসাইনমেন্ট জমা
              </p>
              <p className="text-xs text-neutral-500">
                আরিফ বিল্লাহ 'তাজবিদ' কোর্সে একটি ফাইল জমা দিয়েছেন।
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">১০ মিনিট আগে</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Users size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-800">
                নতুন শিক্ষার্থী ভর্তি
              </p>
              <p className="text-xs text-neutral-500">
                ৩ জন নতুন শিক্ষার্থী 'হাদিস পরিচিতি' কোর্সে যুক্ত হয়েছেন।
              </p>
              <p className="text-[10px] text-neutral-400 mt-1">২ ঘণ্টা আগে</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboardOverview;
