"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Book,
  Clock,
  HelpCircle,
  FileText,
  Award,
  Shield,
  Users,
  Calendar,
  Trophy,
  Video,
  Sparkles,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { getAllCourses } from "@/src/lib/data";

const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Sparkles,
  Book,
  FileText,
  Shield,
  Users,
  Clock,
  HelpCircle,
  Award,
  Calendar,
  Trophy,
  Video,
};

interface TSubCategory {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  fullTitle?: string;
  admissionFee?: number;
  monthlyFee?: number;
  classSchedule?: string;
  highlights?: any[];
}

interface TCategoryGroup {
  _id: string;
  name: string;
  description?: string;
  image: string;
  subCategories?: TSubCategory[];
}

export default function EduCategories() {
  const [categories, setCategories] = useState<TCategoryGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<TSubCategory | null>(null);

  useEffect(() => {
    const loadDynamicCategories = async () => {
      try {
        const res = await getAllCourses();
        if (res && Array.isArray(res.dynamicCategories)) {
          setCategories(res.dynamicCategories);
        }
      } catch (error) {
        console.error("Failed to sync subcategory elements:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDynamicCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center gap-2 text-xs font-bold text-neutral-500">
        <Loader2 className="w-5 h-5 animate-spin text-[#0B5D3B]" /> ডাটা লোড
        הচ্ছে...
      </div>
    );
  }

  // 🔹 সেফটি গার্ড: নিশ্চিত হওয়া যে categories সবসময় একটি অ্যারে
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="bg-gradient-to-b from-[#f4fbf7] to-[#fcfdfd] py-12 px-4 sm:px-6 lg:px-8 selection:bg-emerald-100 selection:text-emerald-950">
      <div className="max-w-7xl mx-auto text-center mb-16 relative">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#0f5132] font-semibold text-sm sm:text-base shadow-sm mb-4">
          📖 আমাদের একাডেমিক শিক্ষা ব্যবস্থা
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          দ্বীনী শিক্ষার একটি সুবিন্যস্ত এবং আধুনিক রূপরেখা
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
          বিভাগ অনুযায়ী আমাদের সকল কোর্সসমূহ এমনভাবে সাজানো হয়েছে যা একজন
          শিক্ষার্থীকে আদেশ ও নৈতিক শিক্ষায় উন্নত করবে।
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {safeCategories.map((section) => {
          // 🔹 সিনিয়র ডিফেন্সিভ ফিক্স: subCategories ফিল্ডটি আসলেই অ্যারে কি না তা ১০০% ভেরিফাই করা (Vercel ক্র্যাশ সমাধান)
          const cleanSubCategories = Array.isArray(section?.subCategories)
            ? section.subCategories
            : [];

          return (
            <div
              key={section._id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 overflow-hidden"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-gradient-to-t from-[#064e3b] to-emerald-950/80">
                  <img
                    src={
                      section.image ||
                      "https://images.unsplash.com/photo-1609599006353-e629f1d50218?q=80&w=800&auto=format&fit=crop"
                    }
                    alt={section.name}
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                </div>

                <div className="text-center -mt-6 relative z-10 px-4">
                  <span className="bg-white text-[#115e59] font-bold px-6 py-2.5 rounded-xl shadow-md border border-emerald-50 text-base sm:text-lg inline-block tracking-wide">
                    {section.name}
                  </span>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-2 gap-3.5 mt-3">
                  {cleanSubCategories.slice(0, 4).map((item) => {
                    const IconComponent = iconMap[item?.icon] || BookOpen;
                    return (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => setActiveItem(item)}
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-xl border bg-slate-50/60 border-green-200 hover:border-green-500 text-center sm:text-left transition-all duration-200 group/item cursor-pointer active:scale-95"
                      >
                        <div className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-600 group-hover/item:border-emerald-200 group-hover/item:text-emerald-600 shadow-xs transition-colors shrink-0">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover/item:text-emerald-900 leading-tight line-clamp-2">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex flex-col gap-3">
                <Link
                  href={{
                    pathname: `/course-directory/${section._id}`,
                    query: { name: section.name },
                  }}
                  className="w-full text-center bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-150 cursor-pointer active:scale-98"
                >
                  বিস্তারিত দেখুন
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {activeItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-emerald-50 transform transition-all animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600" />

            <div className="flex justify-between items-start mb-4 mt-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  📌
                </span>
                {activeItem.name}
              </h3>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-slate-600 text-sm leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <p className="font-bold text-neutral-800">
                {activeItem.fullTitle || activeItem.name}
              </p>
              <p className="text-xs text-neutral-500 font-medium">
                {activeItem.description || "কোনো বিবরণ প্রদান করা হয়নি।"}
              </p>

              {activeItem.admissionFee ? (
                <div className="pt-2 border-t border-neutral-200/60 grid grid-cols-2 gap-2 text-xs font-black text-neutral-700">
                  <p>
                    💵 ভর্তি ফি:{" "}
                    <span className="text-[#0B5D3B]">
                      ৳{activeItem.admissionFee}
                    </span>
                  </p>
                  {activeItem.monthlyFee ? (
                    <p>📅 মাসিক ফি: ৳{activeItem.monthlyFee}</p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="bg-linear-to-r from-emerald-600 to-teal-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                ঠিক আছে, বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}