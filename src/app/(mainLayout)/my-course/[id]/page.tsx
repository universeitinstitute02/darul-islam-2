"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  FileText,
  CheckCircle2,
  Video,
  HelpCircle,
  Loader2,
  Lock,
  Sparkles,
} from "lucide-react";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

const MyCourseDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/education.json");
        const data = await response.json();
        const allCourses = data?.freeCoursesData?.courses || [];
        const matched = allCourses.find((c: any) => c.id === Number(id));
        setCourse(matched || null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) loadCourseData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4 text-center">
        <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm max-w-sm w-full">
          <HelpCircle className="text-red-400 mx-auto mb-3" size={40} />
          <h2 className="text-base font-black text-slate-800">
            কোর্সটি খুঁজে পাওয়া যায়নি!
          </h2>
          <button
            onClick={() => router.push("/my-courses")}
            className="mt-4 hover:cursor-pointer w-full py-2.5 bg-slate-950 hover:bg-[#105D38] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            ড্যাশবোর্ডে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  return (
    /* 🛠 Navbar overlap fix: pt-24 (mobile) to pt-32 (desktop) adds safe padding below your top navbar */
    <div className="min-h-screen bg-[#F8FAFC] pb-16 pt-24 md:pt-28 lg:pt-32 font-sans relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back navigation */}
        <button
          onClick={() => router.back()}
          className="mb-6 hover:cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#105D38] transition-colors bg-white px-4 py-2 rounded-full border border-neutral-100 shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>ড্যাশবোর্ডে ফিরে যান</span>
        </button>

        {/* Dynamic Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Video Player and Class Details Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Premium Video Player Container */}
            <div className="bg-gradient-to-br from-[#0d4d2e] via-[#052214] to-black aspect-video rounded-[2rem] overflow-hidden shadow-xl flex flex-col items-center justify-center text-white relative group border border-neutral-100">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${course.image})` }}
              ></div>

              {/* Decorative Lighting Orbs */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-[#105D38]/30 rounded-full blur-2xl pointer-events-none"></div>

              <button className="w-16 h-16 sm:w-20 sm:h-20 bg-[#105D38] hover:bg-[#105D38]/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 relative z-10 group/btn border border-white/20">
                <Play
                  size={26}
                  className="text-white fill-white ml-1 transition-transform group-hover/btn:scale-110"
                />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                <span className="text-[10px] sm:text-xs font-bold bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
                  <Sparkles
                    size={12}
                    className="text-emerald-400 animate-pulse"
                  />
                  লেকচার ০১ : পরিচিতি ও ড্যাশবোর্ড সেটআপ
                </span>
              </div>
            </div>

            {/* Course Information Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-100 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#105D38] bg-[#105D38]/5 px-3 py-1 rounded-md">
                  {course.details.batchInfo.split(" ")[0]}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
                  ফুল অ্যাক্সেস
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-black text-slate-800 leading-snug">
                {course.details.fullTitle}
              </h1>

              <div className="h-px bg-neutral-100 w-full"></div>

              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-wider">
                  কোর্সের বিবরণ
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {course.details.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Course Outline Playlist Module */}
          {/* 🛠 Desktop Sticky Fix: lg:top-28 to avoid getting cut off under fixed headers */}
          <div className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden flex flex-col justify-between lg:sticky lg:top-28">
            <div className="p-5 bg-slate-50/80 border-b border-neutral-100">
              <h3 className="text-xs sm:text-sm font-black text-slate-800">
                কোর্স মডিউল ও ক্লাস লিস্টিং
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5">
                টোটাল মডিউলগুলো সিরিয়ালি সাজানো আছে
              </p>
            </div>

            {/* Playlist Modules with fluid scrolling heights */}
            <div className="divide-y divide-neutral-100 overflow-y-auto max-h-[380px] sm:max-h-[450px]">
              {/* Active / Unlocked Video Item */}
              <div className="p-4 bg-[#105D38]/5 flex items-start gap-3.5 cursor-pointer border-l-4 border-[#105D38] transition-colors">
                <CheckCircle2
                  size={18}
                  className="text-[#105D38] mt-0.5 shrink-0"
                />
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                    ০১. অরিয়েন্টেশন ও প্রাথমিক গাইডলাইন
                  </h4>
                  <span className="text-[10px] text-[#105D38] font-bold inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-[#105D38]/10">
                    <Video size={10} /> ভিডিও - ১৫ মিনিট
                  </span>
                </div>
              </div>

              {/* Unlocked Item */}
              <div className="p-4 flex items-start gap-3.5 hover:bg-slate-50/80 cursor-pointer border-l-4 border-transparent transition-all group">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 mt-1 flex items-center justify-center shrink-0 group-hover:border-[#105D38] transition-colors">
                  <div className="w-1.5 h-1.5 bg-transparent group-hover:bg-[#105D38] rounded-full transition-colors"></div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#105D38] transition-colors leading-snug">
                    ০২. বেসিক থিওরি এবং প্র্যাক্টিক্যাল ক্লাস
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <Video size={10} /> ভিডিও - ৪৫ মিনিট
                  </span>
                </div>
              </div>

              {/* Locked Resource Item */}
              <div className="p-4 flex items-start gap-3.5 text-slate-400 bg-slate-50/40">
                <Lock size={16} className="mt-0.5 shrink-0 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-400 leading-snug">
                    ০৩. অ্যাডভান্সড সেশন ও প্রজেক্ট রিভিউ
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <FileText size={10} /> স্টাডি রিসোর্স ফাইল
                  </span>
                </div>
              </div>

              {/* Locked Quiz Item */}
              <div className="p-4 flex items-start gap-3.5 text-slate-400 bg-slate-50/40">
                <Lock size={16} className="mt-0.5 shrink-0 text-slate-300" />
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-400 leading-snug">
                    ০৪. ফাইনাল এসেসমেন্ট ও ভাইভা পরীক্ষা
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                    <HelpCircle size={10} /> কুইজ মডিউল
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Batch Info Bar */}
            <div className="p-4 bg-slate-950 text-white">
              <div className="text-[10px] text-center font-bold uppercase tracking-widest text-slate-300">
                {course.details.batchInfo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseDetailsPage;
