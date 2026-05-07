"use client";
import React from "react";
import { Bell, Calendar, ChevronRight } from "lucide-react";

interface Notice {
  title: string;
  date: string;
  isNew?: boolean;
}

const NoticeBoard: React.FC = () => {
  const notices: Notice[] = [
    {
      title: "বার্ষিক পরীক্ষা ২০২৪ এর সময়সূচি প্রকাশ",
      date: "20 May 2024",
      isNew: true,
    },
    { title: "নতুন সেশনের ভর্তি শুরু", date: "18 May 2024" },
    { title: "ঈদুল ফিতরের ছুটি সংক্রান্ত নোটিশ", date: "15 May 2024" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="bg-gray-200 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
        {/* হেডার সেকশন */}
        <div className="bg-[#105D38] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
              <Bell className="w-6 h-6 text-white animate-ring" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              নোটিশ বোর্ড
            </h2>
          </div>
          <span className="hidden md:block text-emerald-100 text-sm">
            সর্বশেষ আপডেট: আজ ২:৩০ পিএম
          </span>
        </div>

        {/* নোটিশ লিস্ট */}
        <div className="p-2 md:p-6">
          <div className="space-y-3">
            {notices.map((notice, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-emerald-50/50 border border-gray-300 hover:border-emerald-100 transition-all duration-300 cursor-pointer"
              >
                {/* ডেট আইকন/ব্যাজ */}
                <div className="hidden sm:flex flex-col items-center justify-center min-w-[70px] h-[70px] bg-white border border-emerald-100 rounded-xl shadow-sm group-hover:bg-[#105D38] group-hover:text-white transition-colors">
                  <span className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-emerald-200">
                    {notice.date.split(" ")[1]}
                  </span>
                  <span className="text-xl font-black text-[#105D38] group-hover:text-white">
                    {notice.date.split(" ")[0]}
                  </span>
                </div>

                {/* মেইন কন্টেন্ট */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 sm:hidden" />
                    <span className="text-xs text-emerald-600 font-bold sm:hidden">
                      {notice.date}
                    </span>
                    {notice.isNew && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-[#105D38] transition-colors line-clamp-1">
                    {notice.title}
                  </h3>
                </div>

                {/* অ্যারো আইকন */}
                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-[#105D38] group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* সব নোটিশ বাটন */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#105D38] text-[#105D38] font-black rounded-xl hover:bg-[#105D38] hover:text-white transition-all duration-300 group">
              সব নোটিশ দেখুন
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
