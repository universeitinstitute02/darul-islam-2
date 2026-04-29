"use client";
import React from "react";
import {
  Menu,
  BookOpen,
  Book,
  Calendar,
  BarChart3,
  ClipboardCheck,
  Megaphone,
  Library,
  Wallet,
  MessageCircle,
  Phone,
  Info,
  ChevronRight as ArrowRight,
  Trophy,
  CheckCircle2,
  Bell, // Bell icon import করা হয়েছে
} from "lucide-react";
import student from "../../../../public/images/student.png";
import Image from "next/image";

const StudentDashboard = () => {
  const stats = [
    { title: "ক্লাসসমূহ", icon: <BookOpen size={24} /> },
    { title: "আমার হিফজ", icon: <Book size={24} /> },
    { title: "রুটিন", icon: <Calendar size={24} /> },
    { title: "পরীক্ষার ফলাফল", icon: <BarChart3 size={24} /> },
    { title: "অ্যাটেন্ডেন্স", icon: <ClipboardCheck size={24} /> },
    { title: "নোটিশ বোর্ড", icon: <Megaphone size={24} /> },
    { title: "লাইব্রেরী", icon: <Library size={24} /> },
    { title: "ফি প্রদান", icon: <Wallet size={24} /> },
  ];

  const notices = [
    { text: "আগামীকাল তিলাওয়াত ক্লাস সকাল ৮টা", date: "২০ মে, ২০২৪" },
    { text: "মাসিক পরীক্ষা ২৫ মে, ২০২৪", date: "১৮ মে, ২০২৪" },
    { text: "ফি জমার শেষ তারিখ ৩১ মে, ২০২৪", date: "১৭ মে, ২০২৪" },
  ];

  const routine = [
    { time: "০৬:০০ - ০৭:০০", subject: "ফজর ও মুরাকাবা" },
    { time: "০৮:০০ - ০৯:০০", subject: "হিফজ ক্লাস" },
    { time: "০৯:১৫ - ১০:১৫", subject: "তাজবীদ ক্লাস" },
    { time: "১১:০০ - ১২:০০", subject: "কিতাব ক্লাস" },
    { time: "০৭:০০ - ০৮:০০", subject: "মাগরিব ও দোয়া" },
  ];

  const achievements = [
    {
      title: "হিফজ",
      detail: "১৮ পারা সম্পন্ন",
      icon: <Trophy size={20} className="text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      title: "মাসিক পরীক্ষা",
      detail: "১ম স্থান",
      icon: <Trophy size={20} className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "উপস্থিতি",
      detail: "৯৫%",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] pb-12">
      {/* Header Section */}
      <div className="bg-[#105D38] text-white p-6 pt-12 pb-24 rounded-b-[2.5rem] lg:rounded-b-[4.5rem] shadow-lg relative z-0">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <Menu className="lg:hidden cursor-pointer" />

            <div>
              <p className="text-white/80 text-xs lg:text-sm italic">
                আসসালামু আলাইকুম,
              </p>
              <h1 className="text-xl lg:text-3xl font-black tracking-tight">
                মাহিন আহমাদ
              </h1>
              <p className="text-white/60 text-[10px] lg:text-xs mt-1 italic">
                হিফজ বিভাগ - লেভেল ৩
              </p>
            </div>
          </div>

          {/* Profile Picture with Notification Bell */}
          <div className="relative">
            <div className="w-18 h-18 lg:w-25 lg:h-25  overflow-hidden shadow-inner">
              <Image
                src={student}
                alt="Student Profile"
                fill
                priority
                className="object-cover opacity-100 scale-105" // ছবির অপাসিটি 100 করা হয়েছে
              />
            </div>

            {/* Bell Icon Stack */}
            <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
              {/* White Bell Icon */}
              <Bell size={20} className="text-white" strokeWidth={1.5} />

              {/* Red Notification Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white">
                ৩
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 lg:-mt-16 relative z-10 space-y-6">
        {/* Progress Card */}
        <div className="bg-white p-6 lg:p-10 rounded-[2rem] shadow-xl border border-neutral-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-neutral-800 text-sm lg:text-xl italic">
              আমার প্রগ্রেস
            </h3>
            <span className="text-[10px] lg:text-xs font-bold text-neutral-400">
              লক্ষ্য: পুরো কোরআন হিফজ
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { label: "মোট অগ্রগতি", val: "৬০%", color: "text-[#105D38]" },
              { label: "মোট পারা", val: "৩০", color: "text-neutral-800" },
              { label: "সম্পন্ন", val: "১৮", color: "text-neutral-800" },
            ].map((item, i) => (
              <div
                key={i}
                className={`text-center ${i === 1 ? "border-x border-neutral-100" : ""}`}
              >
                <p className="text-neutral-400 text-[9px] lg:text-[11px] font-bold uppercase mb-1">
                  {item.label}
                </p>
                <p className={`text-xl lg:text-3xl font-black ${item.color}`}>
                  {item.val}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full bg-neutral-100 h-2.5 lg:h-4 rounded-full overflow-hidden">
            <div className="bg-[#105D38] h-full w-[60%] rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Actions */}
          <div className="lg:col-span-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 lg:p-8 rounded-[1.5rem] border border-neutral-100 shadow-sm flex flex-col items-center justify-center gap-3 hover:bg-[#105D38] hover:text-white transition-all duration-300 cursor-pointer group"
                >
                  <div className="p-3 bg-[#F4F7F5] rounded-2xl group-hover:bg-white/20 transition-colors text-[#105D38]">
                    {React.cloneElement(item.icon, {
                      className: "group-hover:text-white",
                    })}
                  </div>
                  <span className="text-xs lg:text-sm font-bold text-center leading-tight">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Content Responsive Row for LG */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Notices */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-neutral-100">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-neutral-800 text-sm lg:text-base italic">
                  সাম্প্রতিক নোটিশ
                </h3>
                <button className="text-[10px] font-bold text-[#105D38]">
                  সব দেখুন
                </button>
              </div>
              <div className="space-y-4">
                {notices.map((notice, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between pb-3 border-b border-neutral-50 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
                        <Megaphone size={14} />
                      </div>
                      <p className="text-[11px] font-bold text-neutral-700 leading-tight">
                        {notice.text}
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-neutral-400 shrink-0 ml-2">
                      {notice.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Card */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-neutral-100">
              <h3 className="font-black text-neutral-800 text-sm mb-4 italic uppercase tracking-wider">
                আমার শিক্ষক
              </h3>
              <div className="flex items-center gap-4 mb-5">
                <img
                  src="https://avatar.iran.liara.run/public/44"
                  className="w-14 h-14 rounded-2xl bg-neutral-100 shadow-sm"
                  alt="Teacher"
                />
                <div>
                  <h4 className="text-sm font-black text-neutral-800 leading-none">
                    মাওলানা রফিকুল ইসলাম
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase mt-1">
                    হিফজ বিভাগ
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href="tel:01812345678"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-neutral-50 rounded-xl text-neutral-600 text-[10px] font-bold border border-neutral-100 hover:bg-white"
                >
                  <Phone size={14} /> কল
                </a>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#105D38] text-white rounded-xl text-[10px] font-bold shadow-md active:scale-95 transition-transform">
                  <MessageCircle size={14} /> বার্তা
                </button>
              </div>
            </div>

            {/* Routine Section */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-neutral-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-neutral-800 text-sm lg:text-base italic">
                  আজকের রুটিন
                </h3>
                <span className="text-[9px] font-bold text-neutral-400">
                  ২০ মে, ২০২৪
                </span>
              </div>
              <div className="space-y-3">
                {routine.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-b border-neutral-50 last:border-0 last:pb-0"
                  >
                    <span className="text-[10px] font-bold text-neutral-400 font-mono italic">
                      {item.time}
                    </span>
                    <span className="text-xs font-black text-neutral-800">
                      {item.subject}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Support */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-neutral-100">
                <div className="grid grid-cols-3 gap-2">
                  {achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className={`${ach.bg} p-2 rounded-xl flex flex-col items-center text-center gap-1 border border-neutral-100/50`}
                    >
                      <div className="p-1 bg-white rounded-lg shadow-sm">
                        {React.cloneElement(ach.icon, { size: 14 })}
                      </div>
                      <p className="text-[8px] font-black text-neutral-800 leading-tight">
                        {ach.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#105D38] p-4 rounded-[1.5rem] shadow-lg text-white">
                <h3 className="font-bold text-[10px] mb-2 italic">
                  সহায়তা প্রয়োজন?
                </h3>
                <div className="flex gap-2">
                  <button className="flex-1 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold transition-all">
                    সাপোর্ট
                  </button>
                  <button className="flex-1 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-[9px] font-bold transition-all">
                    জিজ্ঞাসা
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
