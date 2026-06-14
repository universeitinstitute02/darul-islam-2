"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Tag,
  Users,
  BookOpen,
  Loader2,
  Search,
  GraduationCap,
  Award,
  ChevronRight,
  Home,
} from "lucide-react";
import Image from "next/image";

interface CourseHighlight {
  label: string;
  value: string;
}

interface CourseDetails {
  fullTitle: string;
  description: string;
  admissionFee: number;
  oldAdmissionFee: number;
  monthlyFee: number | null;
  discount: number;
  coupon: string;
  batchInfo: string;
  highlights: CourseHighlight[];
}

interface CourseItem {
  id: string;
  sectionId: number;
  title: string;
  price: number;
  oldPrice: number;
  image: string;
  details: CourseDetails;
}

function CourseDirectoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const rawData = searchParams.get("data");
  let sectionData: any = null;

  try {
    if (rawData) {
      sectionData = JSON.parse(rawData);
    }
  } catch (err) {
    console.error("Error parsing section data:", err);
  }

  const targetSectionId = sectionData?.id || 1;
  const pageTitle = sectionData?.title || "বিভাগীয় কোর্স সমূহের তালিকা";

  //  SEO Fixed, ei page ta ekhon SEO Friendly Mohymin bhai
  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | আমাদের অনলাইন মাদ্রাসা`;
    }
  }, [pageTitle]);

  // public/courses.json থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/courses.json");

        if (!response.ok) {
          throw new Error("কোর্স ডাটা লোড করতে ব্যর্থ হয়েছে!");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || "কিছু একটা ভুল হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const sectionCourses = courses.filter(
    (course) => course.sectionId === Number(targetSectionId),
  );

  const filteredCourses = sectionCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.details?.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="bg-gradient-to-b from-[#f4fbf7] to-[#fcfdfd] min-h-screen pt-28 sm:pt-36 pb-12 px-2 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 px-2 sm:px-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={() => router.push("/")}
              className="hover:text-emerald-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              হোম
            </button>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <button
              onClick={() => router.push("/education")}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              কোর্স ক্যাটাগরি
            </button>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-emerald-600 font-medium truncate max-w-[150px] sm:max-w-none">
              {pageTitle}
            </span>
          </div>

          {/* প্রধান ব্যাক বাটন */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-white hover:text-emerald-600 hover:border-emerald-200 border border-slate-200 px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 self-start sm:self-auto"
            aria-label="পেছনে যান"
          >
            <ArrowLeft className="h-4 w-4" />
            পেছনে যান
          </button>
        </div>

        {/* সেকশন হেডার কন্টেন্ট */}
        <div className="mb-8 px-2 sm:px-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {pageTitle}
              </h1>
              <p className="mt-1 text-xs sm:text-base text-slate-500 max-w-3xl">
                নিচে এই বিভাগের সকল অ্যাক্টিভ ও চলমান কোর্স দেওয়া হলো। আপনার
                পছন্দের কোর্সটিতে আজই যুক্ত হোন।
              </p>
            </div>

            {/* রিয়েল-টাইম মিনি স্ট্যাটস বাটন */}
            <div className="flex gap-3 text-xs font-medium text-slate-600">
              <div className="bg-white border border-slate-100 shadow-xs px-3 py-2 rounded-xl flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>মোট কোর্স: {sectionCourses.length}টি</span>
              </div>
              <div className="bg-white border border-slate-100 shadow-xs px-3 py-2 rounded-xl flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                <span>সার্টিফিকেট যুক্ত</span>
              </div>
            </div>
          </div>
        </div>

        {/* সার্চ বার সেকশন */}
        {sectionCourses.length > 0 && (
          <div className="mb-8 px-2 sm:px-0 max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="নির্দিষ্ট কোর্স খুঁজুন (যেমন: তাজভীদ)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all shadow-xs"
              />
            </div>
          </div>
        )}

        {/* কন্ডিশনাল রেন্ডারিং: লোডিং, এরর এবং মেইন কন্টেন্ট */}
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center justify-center text-emerald-600 font-bold gap-3">
            <Loader2 className="w-10 h-10 animate-spin" />
            <span className="text-sm sm:text-base">
              কোর্স লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
            </span>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-100 m-2 p-8 text-red-600">
            <p className="font-semibold">{error}</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          /* রেসপন্সিভ গ্রিড: মোবাইলে ২টি (grid-cols-2), ল্যাপটপে ৩টি (lg:grid-cols-3) */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredCourses.map((course) => {
              const duration =
                course.details?.highlights?.find((h) => h.label === "সময়")
                  ?.value || "নির্ধারিত নয়";

              return (
                <article
                  key={course.id}
                  className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* ইমেজ ও ব্যাজ সেকশন */}
                    <div className="h-28 sm:h-48 w-full relative overflow-hidden bg-slate-50">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] sm:text-xs font-medium px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg shadow-xs">
                        ID: {course.id}
                      </div>
                      {course.details?.discount > 0 && (
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-rose-500 text-white text-[9px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg shadow-xs">
                          {course.details.discount}% ছাড়
                        </div>
                      )}
                    </div>

                    {/* টেক্সট কন্টেন্ট সেকশন */}
                    <div className="p-3 sm:p-6">
                      <h3 className="text-sm sm:text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 mb-1 sm:mb-2">
                        {course.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-slate-500 line-clamp-2 mb-3 sm:mb-4 min-h-[32px] sm:min-h-[40px]">
                        {course.details?.description}
                      </p>

                      {/* ইনফো হাইলাইটস */}
                      <div className="space-y-1.5 sm:space-y-2 border-t border-slate-100 pt-3 mb-1 text-[10px] sm:text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">মেয়াদ: {duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">
                            স্ট্যাটাস: {course.details?.batchInfo}
                          </span>
                        </div>
                        {course.details?.coupon && (
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span className="truncate">
                              কুপন:{" "}
                              <span className="font-mono bg-amber-50 px-1 py-0.2 rounded text-amber-700 font-bold">
                                {course.details.coupon}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ফুটার - প্রাইস এবং বিস্তারিত বাটন */}
                  <div className="p-3 sm:p-6 pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-auto border-t border-slate-50/50">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-2xl font-black text-emerald-600">
                          ৳{course.price}
                        </span>
                        {course.oldPrice > course.price && (
                          <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                            ৳{course.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        router.push(
                          `/education-details?data=${encodeURIComponent(
                            JSON.stringify({
                              ...sectionData,
                              title: course.details?.fullTitle || course.title,
                            }),
                          )}`,
                        );
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-200 text-[11px] sm:text-sm border border-emerald-100 shadow-xs cursor-pointer active:scale-95"
                    >
                      বিস্তারিত
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 m-2 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-sm sm:text-base">
              {searchQuery
                ? "আপনার অনুসন্ধানকৃত মেলানো কোনো কোর্স পাওয়া যায়নি।"
                : "এই বিভাগের অধীনে এই মুহূর্তে কোনো কোর্স এভেইলেবল নেই।"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs font-semibold text-emerald-600 underline"
              >
                রিসেট সার্চ
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default function CourseDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-emerald-600 font-bold flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span>লোড হচ্ছে...</span>
        </div>
      }
    >
      <CourseDirectoryContent />
    </Suspense>
  );
}
