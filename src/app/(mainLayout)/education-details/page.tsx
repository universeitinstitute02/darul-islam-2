"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, FileText, CheckCircle2 } from "lucide-react";
import CourseTabsDashboard from "@/src/components/Education/EducationDetails/page";
import TestimonialsSection from "@/src/components/Education/EducationTestimonial/EducationalTestimonial";

const seoData = {
  title: "৭ বছরে আলেম / আলেমা কোর্স | ইকরা অনলাইন মাদ্রাসা",
  description:
    "জেনারেল শিক্ষিত ভাই ও বোনদের দ্বীনি ইলমের তৃষ্ণা মেটাতে ইকরা অনলাইন মাদ্রাসা নিয়ে এসেছে ৭ বছরের পূর্ণাঙ্গ আলেম/আলেমা কোর্স।",
};

// ১. মেইন লজিক্যাল কন্টেন্ট কম্পোনেন্ট যেখানে useSearchParams আছে
function CourseDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courseTitle, setCourseTitle] = useState("৭ বছরে আলেম / আলেমা");

  // আগের পেজের ক্লিক করা বাটন বা সেকশন থেকে টাইটেল রিসিভ করার লজিক
  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        if (parsedData && parsedData.title) {
          setCourseTitle(parsedData.title);
        }
      } catch (error) {
        console.error("Error parsing section data:", error);
      }
    }
  }, [searchParams]);

  // স্ট্যাটিক ডেমো ডেটা
  const courseData = {
    subtitle: "কোর্স সম্পর্কে",
    description:
      "জেনারেল শিক্ষিত ভাই ও বোনদের দ্বীনি ইলমের তৃষ্ণা মেটাতে ইকরা অনলাইন মাদ্রাসা নিয়ে এসেছে '৭ বছরের পূর্ণাঙ্গ আলেম/আলেমা কোর্স'। আমাদের এই কোর্সের মূল দর্শন হলো একজন শিক্ষার্থীকে বিশুদ্ধভাবে কুরআন তিলাওয়াত শেখা থেকে শুরু করে সরাসরি আল্লাহর কালামের তরজমা ও মর্ম অনুধাবন করার যোগ্যতা অর্জনে সহায়তা করা। দীর্ঘ ৭ বছরের ধারাবাহিক এই সফরে শিক্ষার্থীরা হাদিস, ফিকহ, আকাইদ ও আরবি ব্যাকরণের উচ্চতর শাখাগুলোতে পাণ্ডিত্য অর্জনের সুযোগ পাবেন।",
    bannerImage:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
    regularPrice: 15500,
    discountPrice: 7750,
    monthlyFee: 1000,
    discountPercentage: 50,
    batchStartDate: "৬ই জুন ২০২৬",
    couponCode: "50% OFF",
    highlights: [
      { id: 1, text: "সময়: ৭ বছর" },
      { id: 2, text: "প্রতি ব্যাচে: ২৫ জন" },
      { id: 3, text: "সপ্তাহে ক্লাস: ৫ দিন (বৃহঃ-শুক্র) ছুটি" },
      { id: 4, text: "প্রতিদিন ক্লাস: ১ ঘণ্টা" },
      { id: 5, text: "পরীক্ষা: মাসিক / অর্등학교 / বার্ষিক" },
      { id: 6, text: "উপহার: ৫ টি বই" },
      { id: 7, text: "কোর্স শেষে: গ্রহণযোগ্য সার্টিফিকেট" },
    ],
  };

  return (
    <>
      <head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta name="robots" content="index, follow" />
      </head>

      <div className="bg-white min-h-screen pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
        <div className="max-w-6xl mx-auto">
          {/* ব্যাক বাটন */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all mb-6 md:mb-8 border border-emerald-100/50 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            পূর্বের পেজে ফিরুন
          </button>

          {/* মেইন গ্রিড লেআউট */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* বাম পাশের অংশ: কোর্স ইনফরমেশন */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-amber-500 font-bold text-sm block mb-1">
                  {courseData.subtitle}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-[#0f2942] tracking-tight leading-tight mb-4">
                  {courseTitle}
                </h1>
              </div>

              {/* বর্ণনা টেক্সট */}
              <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                {courseData.description}
              </p>

              {/* ব্যানার কার্ড */}
              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 md:h-72 shadow-xs bg-gradient-to-r from-emerald-900 to-teal-950 group">
                <img
                  src={courseData.bannerImage}
                  alt={courseTitle}
                  className="w-full h-full object-cover opacity-25 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>

                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-xs">
                  জনপ্রিয়
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
                    {courseTitle}
                  </h2>
                  <div className="bg-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-md inline-block shadow-xs">
                    ৭ বছর
                  </div>
                </div>
              </div>

              {/* সিলেবাস বাটন */}
              <button className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer text-sm">
                <FileText className="w-4 h-4" />
                পূর্ণাঙ্গ সিলেবাস দেখুন
              </button>
            </div>

            {/* ডান পাশের অংশ: ভর্তি ও প্রাইসিং উইজেট */}
            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <div className="bg-[#fffcf4] border border-[#f7e9cc] rounded-2xl p-6 shadow-xs relative overflow-hidden">
                {/* প্রাইস সেকশন */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-700 text-base font-bold">
                      ভর্তি ফি:
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-[#0f2942]">
                      ৳{courseData.discountPrice}
                    </span>
                    <span className="text-slate-400 line-through text-sm font-medium">
                      ৳{courseData.regularPrice}
                    </span>
                  </div>

                  <span className="bg-[#0f2942] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {courseData.discountPercentage}% ছাড়!
                  </span>
                </div>

                {/* মাসিক ফি */}
                <div className="text-sm font-bold text-slate-700 mb-4">
                  <span>মাসিক ফি: ৳{courseData.monthlyFee}</span>
                </div>

                {/* কুপন কোড */}
                <div className="border border-dashed border-slate-300 rounded-xl p-2 mb-6 flex justify-between items-center bg-white">
                  <span className="text-xs text-slate-500 font-medium pl-2">
                    কুপন: {courseData.couponCode}
                  </span>
                  <button className="text-xs font-medium text-slate-600 border border-slate-200 px-2 py-1 rounded-md bg-slate-50 active:scale-95 transition-all">
                    📋
                  </button>
                </div>

                {/* অ্যাকশন বাটন সমূহ */}
                <div className="space-y-3 mb-6">
                  <button className="w-full bg-[#cca03a] hover:bg-[#b88f32] text-white font-bold text-base py-3 rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer text-center">
                    এখনই ভর্তি হবো
                  </button>
                  <button className="w-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm py-3 rounded-xl transition-all shadow-xs active:scale-[0.99] cursor-pointer">
                    পরবর্তী ব্যাচের বুকিং
                  </button>
                </div>

                {/* ব্যাচ শুরুর সময় ও টাইমার */}
                <div className="pt-2 mb-6 flex flex-col gap-3">
                  <div className="text-xs font-bold text-slate-700">
                    ১১তম ব্যাচের ক্লাস শুরু :{" "}
                    <span className="text-slate-900 block mt-1 font-black">
                      {courseData.batchStartDate}
                    </span>
                  </div>

                  <div className="flex gap-1.5 text-center">
                    {["দিন", "ঘণ্টা", "মিনিট", "সেকেন্ড"].map((unit, idx) => (
                      <div
                        key={idx}
                        className="bg-[#fcefc7] border border-[#f0dfad] rounded-md p-1 min-w-[42px]"
                      >
                        <span className="text-sm font-black text-slate-900 block leading-tight">
                          0
                        </span>
                        <span className="text-[10px] text-slate-500 block leading-none font-medium mt-0.5">
                          {unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* কোর্স হাইলাইটস সেকশন */}
                <div className="border-t border-slate-200 pt-4">
                  <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5">
                    কোর্স হাইলাইটস
                  </h3>
                  <ul className="space-y-2">
                    {courseData.highlights.map((highlight) => (
                      <li
                        key={highlight.id}
                        className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-medium"
                      >
                        <span className="text-amber-500 mt-0.5">★</span>
                        <span>{highlight.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseTabsDashboard />
    </>
  );
}

// ২. মেইন পেজ এক্সপোর্ট (যাকে Suspense দিয়ে র‍্যাপ করা হয়েছে বিল্ড এরর দূর করার জন্য)
export default function CourseDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-24 font-bold text-slate-600">
          লোড হচ্ছে...
        </div>
      }
    >
      <CourseDetailsContent />
      <TestimonialsSection />
    </Suspense>
  );
}
