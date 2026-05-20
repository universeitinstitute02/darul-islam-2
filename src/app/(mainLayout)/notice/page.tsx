"use client";
import React, { useState } from "react";
import {
  Megaphone,
  Calendar,
  Search,
  Bell,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function NoticeBoard() {
  const [activeCategory, setActiveCategory] = useState("সব");

  // নোটিশের জন্য স্ট্যাটিক মক ডাটা
  const noticesData = [
    {
      id: 1,
      title: "আসন্ন ঈদুল আজহা উপলক্ষে ইনস্টিটিউট বন্ধের নোটিশ",
      category: "একাডেমিক",
      date: "২০ মে, ২০২৬",
      important: true,
      description:
        "আগামী মাসের ১০ তারিখ থেকে ১৭ তারিখ পর্যন্ত ইনস্টিটিউটের সকল অনলাইন ক্লাস ও সাপোর্ট রুম বন্ধ থাকবে। ১৮ তারিখ থেকে পুনরায় নিয়মিত সিডিউল অনুযায়ী ক্লাস শুরু হবে।",
    },
    {
      id: 2,
      title: "মডিউল ০৫ এর অ্যাসাইনমেন্ট জমা দেওয়ার সময় বর্ধিতকরণ",
      category: "অ্যাসাইনমেন্ট",
      date: "১৮ মে, ২০২৬",
      important: false,
      description:
        "শিক্ষার্থীদের অনুরোধের প্রেক্ষিতে মডিউল ০৫-এর 'অ্যাডভান্সড ডাটাবেজ ডিজাইন' অ্যাসাইনমেন্ট জমা দেওয়ার শেষ সময় আগামী ২২ মে রাত ১১:৫৯ মিনিট পর্যন্ত বাড়ানো হলো।",
    },
    {
      id: 3,
      title: "লাইভ প্রজেক্ট ও ক্যারিয়ার গাইডলাইন সেশন",
      category: "ইভেন্ট",
      date: "১৫ মে, ২০২৬",
      important: true,
      description:
        "আগামী শুক্রবার রাত ৯:০০ টায় আমাদের বিশেষ ক্যারিয়ার মেন্টরিং সেশন অনুষ্ঠিত হবে। জুম লিংক ক্লাসের ১৫ মিনিট আগে প্রোভাইড করা হবে।",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] pb-12">
      {/* 🟢 Top Hero Header Banner - lg:pt-24 যোগ করা হয়েছে নেভবার ওভারল্যাপ ফিক্স করতে */}
      <div className="bg-[#105D38] text-white pt-20 lg:pt-24 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full w-fit backdrop-blur-sm">
              <Bell size={13} className="text-emerald-300 animate-bounce" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-200">
                সর্বশেষ ঘোষণা
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-black italic">
              ইনস্টিটিউট নোটিশ বোর্ড
            </h1>
            <p className="text-xs font-medium text-emerald-100 max-w-xl leading-relaxed">
              দারুল ইসলাম ইনস্টিটিউটের অফিশিয়াল নোটিশ ও গুরুত্বপূর্ণ আপডেটগুলো
              এখানে সংক্ষেপে দেখতে পাবেন।
            </p>
          </div>

          {/* সার্চ বার */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="নোটিশ খুঁজুন..."
              className="w-full pl-9 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-xs focus:outline-none focus:bg-white focus:text-neutral-800 focus:placeholder-neutral-400 transition-all"
            />
            <Search
              className="absolute left-3 top-2.5 text-white/50"
              size={14}
            />
          </div>
        </div>
      </div>

      {/* 🔵 Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10 space-y-4">
        {/* ক্যাটাগরি ফিল্টারের বদলে মিনিমাল নোটিশ হেডার টাইটেল */}
        <div className="bg-white px-4 py-3 rounded-xl shadow-md border border-neutral-100 flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#105D38]"></span>
          <h2 className="text-xs font-black text-neutral-700 uppercase tracking-wider">
            সকল নোটিশ ({noticesData.length})
          </h2>
        </div>

        {/* নোটিশ লিস্ট এরিয়া */}
        <div className="grid grid-cols-1 gap-3">
          {noticesData.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-xl border border-neutral-100 p-4 md:p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 relative overflow-hidden"
            >
              {/* গুরুত্বপূর্ণ নোটিশের জন্য পাশে কালার বার */}
              {notice.important && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
              )}

              <div className="flex items-start gap-3">
                {/* নোটিশ আইকন বক্স - মোবাইলেও ক্লিন দেখাবে */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    notice.important
                      ? "bg-orange-50 text-orange-500"
                      : "bg-emerald-50 text-[#105D38]"
                  }`}
                >
                  <Megaphone size={16} />
                </div>

                {/* নোটিশ টেক্সট কনটেন্ট */}
                <div className="space-y-1.5 w-full">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* ক্যাটাগরি ব্যাজ */}
                      <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-bold">
                        {notice.category}
                      </span>
                      {/* জরুরী ব্যাজ */}
                      {notice.important && (
                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 border border-orange-100 rounded text-[9px] font-black italic animate-pulse">
                          জরুরী
                        </span>
                      )}
                    </div>

                    {/* প্রকাশের তারিখ - রাইট অ্যালাইনড */}
                    <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-bold">
                      <Calendar size={10} />
                      <span>{notice.date}</span>
                    </div>
                  </div>

                  {/* নোটিশ টাইটেল */}
                  <h3 className="text-xs md:text-base font-black text-neutral-800 leading-snug">
                    {notice.title}
                  </h3>

                  {/* নোটিশ ডেসক্রিপশন */}
                  <p className="text-[11px] md:text-xs text-neutral-500 font-medium leading-relaxed">
                    {notice.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ফুটার হেল্প ডেক্স পার্ট */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#105D38] shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <h4 className="text-xs font-black text-neutral-800">
                কোনো কিছু বুঝতে সমস্যা হচ্ছে?
              </h4>
              <p className="text-[10px] text-neutral-400 font-medium mt-0.5">
                বিস্তারিত জানতে সরাসরি আপনার মেন্টর বা সাপোর্ট রুমে যোগাযোগ
                করুন।
              </p>
            </div>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-[#105D38] hover:bg-[#0c462a] text-white font-bold text-[11px] rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 shrink-0">
            <span>সাপোর্ট রুম</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
