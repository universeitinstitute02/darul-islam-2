"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Video,
  FileText,
  Lock,
  Unlock,
  Sparkles,
  ExternalLink,
  UploadCloud,
  CheckCircle,
  PlayCircle,
  BookmarkCheck,
} from "lucide-react";
import { getAllCourses } from "@/src/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

import useUserRole from "@/src/app/hooks/useUserRole";
import Swal from "sweetalert2";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isEnrolled, setIsEnrolled] = useState(false);

  const [activeTab, setActiveTab] = useState<"live" | "assignment">("live");
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const { role } = useUserRole();

  const [liveSession] = useState<any>({
    id: "session-01",
    title: "লাইভ সেশন ০১ : পরিচিতি ও ড্যাশবোর্ড সেটআপ",
    meetLink: "https://meet.google.com/abc-defg-hij",
    instructor: "মাওলানা রফিকুল ইসলাম",
    time: "আজ রাত ০৯:০০ টা",
  });

  const [assignmentDetails] = useState<any>({
    id: "assign-01",
    title: "অ্যাসাইনমেন্ট-০১: বেসিক থিওরি ও নোট সাবমিশন",
    description:
      "গত ৩টি সেশনে যা শেখানো হয়েছে, তার উপর একটি সংক্ষিপ্ত বিবরণী লিখে ডক ফাইল অথবা ড্রাইভ লিংক আকারে নিচে সাবমিট করুন।",
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        if (!data || !Array.isArray(data)) return;

        let foundCourse = null;
        for (const section of data) {
          const match = section.courses.find((c: any) => String(c.id) === id);
          if (match) {
            foundCourse = { ...match, category: section.category };
            break;
          }
        }
        setCourse(foundCourse);
      } catch (err) {
        console.error("Error fetching course details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  const toggleItemComplete = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEnrolled) return;
    if (completedItems.includes(itemId)) {
      setCompletedItems(completedItems.filter((id) => id !== itemId));
    } else {
      setCompletedItems([...completedItems, itemId]);
    }
  };

  const isAllModulesFinished =
    completedItems.includes("session-01") && assignmentSubmitted;

  const handleEnrollAction = () => {
    if (role && role.toLowerCase() !== "student") {
      return Swal.fire(
        "অ্যাক্সেস অস্বীকৃত",
        "দুঃখিত, শিক্ষক বা অ্যাডমিন অ্যাকাউন্ট থেকে কোর্সে এনরোল করা সম্ভব নয়। অনুগ্রহ করে শিক্ষার্থী অ্যাকাউন্ট ব্যবহার করুন।",
        "warning",
      );
    }
    router.push(`/education/enroll/${id}`);
  };

  if (loading) return <LoadingSpinner fullScreen />;

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#f8fafc] p-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-neutral-800">
            কোর্সটি পাওয়া যায়নি!
          </h2>
          <p className="text-neutral-500">
            সম্ভবত লিংকটি ভুল অথবা курсটি বর্তমানে উপলব্ধ নেই।
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-[#0B5D3B] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-[#0d4d2e] transition-all cursor-pointer"
        >
          <ArrowLeft size={20} /> পেছনে ফিরে যান
        </button>
      </div>
    );
  }

  const { details, image, category, title, price } = course;

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-16 md:pt-20 font-sans antialiased">
      {/* Navigation Sub-header Bar */}
      <nav
        className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-4 py-3"
        aria-label="ব্রেডক্রাম্ব ও নেভিগেশন"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center hover:cursor-pointer gap-2 text-neutral-600 hover:text-[#0B5D3B] transition-colors group"
            aria-label="পূর্ববর্তী পৃষ্ঠায় ফিরে যান"
          >
            <div className="p-2 rounded-full group-hover:bg-[#0B5D3B]/10 transition-colors ">
              <ArrowLeft size={20} aria-hidden="true" />
            </div>
            <span className="font-bold text-sm hidden md:block">পেছনে যান</span>
          </button>

          <div className="flex items-center gap-3">
            {isEnrolled && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] md:text-xs font-black px-3 py-1 rounded-full flex items-center gap-1">
                <BookmarkCheck size={14} aria-hidden="true" /> আপনি এই কোর্সে
                এনরোলড
              </span>
            )}
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold">
              <Link
                href="/education"
                className="text-neutral-400 hover:text-[#0B5D3B]"
              >
                এডুকেশন
              </Link>
              <span className="text-neutral-300" aria-hidden="true">
                /
              </span>
              <span className="text-[#0B5D3B] line-clamp-1 max-w-[120px] md:max-w-none uppercase">
                {title}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Grid Content Matrix */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column Area: Details & Core Interaction Panel */}
          <article className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block bg-[#0B5D3B] text-white px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  {category}
                </span>
                <div
                  className="flex items-center gap-1 text-amber-500 font-bold text-sm"
                  aria-label="কোর্স রেটিং ৪.৯"
                >
                  <Star size={16} fill="currentColor" aria-hidden="true" /> 4.9
                  (রিভিউ)
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-neutral-900 leading-tight">
                {details?.fullTitle || title}
              </h1>
            </motion.div>

            {/* Banner/Video Access Control Logic */}
            {!isEnrolled ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video rounded-[2rem] overflow-hidden shadow-xl border-4 md:border-[8px] border-white bg-neutral-900 group"
              >
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    <div
                      onClick={handleEnrollAction}
                      className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4 text-center cursor-pointer"
                      role="button"
                      aria-label="কোর্সে জয়েন করতে এনরোলমেন্ট প্রক্রিয়া শুরু করুন"
                    >
                      <PlayCircle
                        size={64}
                        className="text-white opacity-90 drop-shadow-md mb-2 animate-pulse"
                        aria-hidden="true"
                      />
                      <p className="text-xs md:text-sm font-bold tracking-wide bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                        কোর্সে জয়েন করতে এখনই এনরোল করুন
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    কোর্স ইমেজ লোড হচ্ছে...
                  </div>
                )}
              </motion.div>
            ) : (
              <section
                className="space-y-6"
                aria-label="অ্যাক্টিভ লার্নিং ড্যাশবোর্ড"
              >
                <AnimatePresence mode="wait">
                  {activeTab === "live" ? (
                    <motion.div
                      key="live-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gradient-to-br from-[#0d4d2e] via-[#052214] to-black rounded-[2rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-neutral-800"
                    >
                      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#0B5D3B]/30 rounded-full blur-3xl pointer-events-none"></div>
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-white/10 px-2.5 py-1 rounded-md">
                            লাইভ ক্লাস ড্যাশবোর্ড
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                            <Sparkles
                              className="text-emerald-400 shrink-0"
                              size={20}
                              aria-hidden="true"
                            />
                            {liveSession.title}
                          </h2>
                          <p className="text-xs text-slate-300">
                            প্রশিক্ষক:{" "}
                            <span className="text-white font-bold">
                              {liveSession.instructor}
                            </span>{" "}
                            | সময়:{" "}
                            <span className="text-emerald-400 font-bold">
                              {liveSession.time}
                            </span>
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                          আজকের ক্লাসটি Google Meet-এর মাধ্যমে লাইভ হবে। সরাসরি
                          শিক্ষকের সাথে প্রশ্ন-উত্তর সেশনে অংশ নিতে নিচের বাটনে
                          কлик করুন।
                        </p>
                        <div className="pt-2">
                          <a
                            href={liveSession.meetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B5D3B] hover:bg-[#0c462a] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                          >
                            <Video size={16} aria-hidden="true" />
                            <span>গুগল মিট ক্লাসে জয়েন করুন</span>
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="assignment-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-200/70 shadow-xl space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-2">
                          <span>📝 মডিউল অ্যাসাইনমেন্ট হাব</span>
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${assignmentSubmitted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {assignmentSubmitted
                            ? "সাবমিট করা হয়েছে"
                            : "পেন্ডিং"}
                        </span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-200/50 space-y-2">
                        <h4 className="text-xs sm:text-sm font-black text-slate-700">
                          {assignmentDetails.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          {assignmentDetails.description}
                        </p>
                      </div>

                      {!assignmentSubmitted ? (
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <input
                            type="text"
                            placeholder="আপনার অ্যাসাইনমেন্ট ড্রাইভ লিংকটি এখানে দিন..."
                            className="flex-1 px-4 py-2.5 bg-slate-50 border border-neutral-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0B5D3B] transition-all"
                            aria-label="অ্যাসাইনমেন্ট ড্রাইভ লিংক ইনপুট"
                          />
                          <button
                            onClick={() => setAssignmentSubmitted(true)}
                            className="px-5 py-2.5 bg-slate-950 hover:bg-[#0B5D3B] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                          >
                            <UploadCloud size={14} aria-hidden="true" />{" "}
                            অ্যাসাইনমেন্ট জমা দিন
                          </button>
                        </div>
                      ) : (
                        <div
                          className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-bold"
                          role="status"
                        >
                          <CheckCircle
                            size={18}
                            className="text-emerald-600 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            আলহামদুলিল্লাহ্‌! আপনার অ্যাসাইনমেন্টটি সফলভাবে জমা
                            নেওয়া হয়েছে। ওস্তাদ খুব দ্রুত এটি মূল্যায়ন করবেন।
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )}

            {/* Course Description Card Summary Component */}
            <section
              className="bg-white p-6 sm:p-8 rounded-[2rem] border border-neutral-100 shadow-sm space-y-4"
              aria-labelledby="desc-heading"
            >
              <h3
                id="desc-heading"
                className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-wider"
              >
                কোর্সের বিবরণ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {details?.description ||
                  "এই কোর্সটি আপনাকে সম্পূর্ণ জিরো থেকে অ্যাডভান্স লেভেল পর্যন্ত প্রফেশনালি গাইড করবে।"}
              </p>
            </section>

            {/* Core Course Meta Badges Feature Grid */}
            <section
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              aria-label="কোর্স ফিচারসমূহ"
            >
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Clock size={22} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-800">
                    কোর্সের মেয়াদ
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    লাইফটাইম আনলিমিটেড এক্সেস
                  </p>
                </div>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-neutral-100 flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <ShieldCheck size={22} aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-neutral-800">
                    সার্টিফিকেশন
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    কোর্স শেষে ভেরিভাইড সার্টিফিকেট
                  </p>
                </div>
              </div>
            </section>
          </article>

          {/* Right Column Area: Progress Registry & Curriculum Tracking Panel */}
          <aside className="space-y-6 lg:sticky lg:top-28 h-fit">
            {/* Action Checkout CTA & Progress Panel Configuration Layer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-neutral-100 shadow-2xl space-y-6"
            >
              {!isEnrolled ? (
                <>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      ভর্তি ফি সর্বমোট
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-black text-[#0B5D3B]">
                        {details?.admissionFee === 0 ||
                        (!price && !details?.admissionFee)
                          ? "ফ্রি!"
                          : `৳${details?.admissionFee || price}`}
                      </span>
                      {details?.oldAdmissionFee > 0 && (
                        <span className="text-neutral-300 line-through text-lg font-bold">
                          ৳{details.oldAdmissionFee}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleEnrollAction}
                      className="w-full bg-[#0B5D3B] text-white font-black py-4 rounded-2xl hover:bg-[#0d4d2e] hover:shadow-lg hover:shadow-[#0B5D3B]/30 transition-all text-base active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      এখনী ভর্তি হবো{" "}
                      <CheckCircle2 size={20} aria-hidden="true" />
                    </button>
                    <p className="text-[10px] text-center text-neutral-400 font-medium">
                      নিরাপদ পেমেন্ট গেটওয়ের মাধ্যমে ইনস্ট্যান্ট অ্যাক্সেস পান
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>আপনার কোর্স প্রোগ্রেস</span>
                      <span>{isAllModulesFinished ? "১০০%" : "৫০%"}</span>
                    </div>
                    <div
                      className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={isAllModulesFinished ? 100 : 50}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full transition-all duration-500 ${isAllModulesFinished ? "w-full bg-emerald-600" : "w-1/2 bg-amber-500"}`}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (isAllModulesFinished) router.push("/education");
                    }}
                    disabled={!isAllModulesFinished}
                    className={`w-full py-4 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                      isAllModulesFinished
                        ? "bg-slate-950 text-white hover:bg-black hover:cursor-pointer"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    <CheckCircle2 size={15} aria-hidden="true" />
                    <span>কোর্স সম্পন্ন করুন</span>
                  </button>
                  {!isAllModulesFinished && (
                    <p className="text-[10px] text-center text-amber-600 font-medium">
                      সবগুলো লাইভ সেশন এবং অ্যাসাইনমেন্ট শেষ করে কোর্সটি কমপ্লিট
                      করুন।
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Curriculum/Playlist Hierarchy Layout Framework Wrapper */}
            <section
              className="bg-white rounded-[2rem] border border-neutral-100 shadow-xl overflow-hidden flex flex-col justify-between"
              aria-label="কোর্স কারিকুলাম সিলেবাস"
            >
              <div className="p-5 bg-slate-50/80 border-b border-neutral-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-800">
                    কোর্স মডিউল এবং কারিকুলাম
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {isEnrolled
                      ? "আইটেমে ক্লিক করে ক্লাসে অংশ নিন"
                      : "মডিউলগুলো দেখতে আগে ভর্তি হোন"}
                  </p>
                </div>
                {!isEnrolled ? (
                  <Lock
                    size={14}
                    className="text-slate-400"
                    aria-label="মডিউল লকড"
                  />
                ) : (
                  <Unlock
                    size={14}
                    className="text-emerald-600"
                    aria-label="মডিউল আনলকড"
                  />
                )}
              </div>

              <div className="divide-y divide-neutral-100 overflow-y-auto max-h-[320px]">
                <div
                  onClick={() => isEnrolled && setActiveTab("live")}
                  className={`p-4 flex items-start gap-3.5 transition-all border-l-4 ${
                    !isEnrolled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  } ${isEnrolled && activeTab === "live" ? "bg-[#0B5D3B]/5 border-[#0B5D3B]" : "border-transparent hover:bg-slate-50"}`}
                >
                  <div
                    onClick={(e) =>
                      isEnrolled && toggleItemComplete("session-01", e)
                    }
                    className="mt-0.5 shrink-0"
                    role="checkbox"
                    aria-checked={completedItems.includes("session-01")}
                  >
                    {completedItems.includes("session-01") ? (
                      <CheckCircle2 size={18} className="text-[#0B5D3B]" />
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-neutral-300"></div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      ০১. অরিয়েন্টেশন ও ড্যাশবোর্ড সেটআপ
                    </h4>
                    <span className="text-[10px] text-[#0B5D3B] font-bold inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-[#0B5D3B]/10">
                      <Video size={10} aria-hidden="true" /> লাইভ ক্লাস - একটিভ
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => isEnrolled && setActiveTab("assignment")}
                  className={`p-4 flex items-start gap-3.5 transition-all border-l-4 ${
                    !isEnrolled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  } ${isEnrolled && activeTab === "assignment" ? "bg-[#0B5D3B]/5 border-[#0B5D3B]" : "border-transparent hover:bg-slate-50"}`}
                >
                  <div
                    className="mt-0.5 shrink-0"
                    role="checkbox"
                    aria-checked={assignmentSubmitted}
                  >
                    {assignmentSubmitted ? (
                      <CheckCircle2 size={18} className="text-[#0B5D3B]" />
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-neutral-300"></div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      ০২. মডিউল ১ টাস্ক: হোমওয়ার্ক সাবমিশন
                    </h4>
                    <span
                      className={`text-[10px] font-bold inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${assignmentSubmitted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      <FileText size={10} aria-hidden="true" />{" "}
                      {assignmentSubmitted
                        ? "সাবমিট সম্পন্ন"
                        : "অ্যাসাইনমেন্ট পেন্ডিং"}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3.5 text-slate-400 bg-slate-50/40">
                  <Lock
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-300"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-400 leading-snug">
                      ০৩. অ্যাডভান্সড আর্কিটেকচার ও প্রজেক্ট রিভিউ
                    </h4>
                  </div>
                </div>

                <div
                  onClick={() => isEnrolled && setActiveTab("live")}
                  className={`p-4 flex items-start gap-3.5 transition-all border-l-4 ${
                    !isEnrolled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  } ${isEnrolled && activeTab === "live" ? "bg-[#0B5D3B]/5 border-[#0B5D3B]" : "border-transparent hover:bg-slate-50"}`}
                >
                  <div
                    onClick={(e) =>
                      isEnrolled && toggleItemComplete("session-01", e)
                    }
                    className="mt-0.5 shrink-0"
                  >
                    {completedItems.includes("session-01") ? (
                      <CheckCircle2 size={18} className="text-[#0B5D3B]" />
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-neutral-300"></div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      ০১. অরিয়েন্টেশন ও ড্যাশবোর্ড সেটআপ
                    </h4>
                    <span className="text-[10px] text-[#0B5D3B] font-bold inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-[#0B5D3B]/10">
                      <Video size={10} /> লাইভ ক্লাস - একটিভ
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => isEnrolled && setActiveTab("assignment")}
                  className={`p-4 flex items-start gap-3.5 transition-all border-l-4 ${
                    !isEnrolled
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  } ${isEnrolled && activeTab === "assignment" ? "bg-[#0B5D3B]/5 border-[#0B5D3B]" : "border-transparent hover:bg-slate-50"}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {assignmentSubmitted ? (
                      <CheckCircle2 size={18} className="text-[#0B5D3B]" />
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-neutral-300"></div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      ০২. মডিউল ১ টাস্ক: হোমওয়ার্ক সাবমিশন
                    </h4>
                    <span
                      className={`text-[10px] font-bold inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${assignmentSubmitted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      <FileText size={10} />{" "}
                      {assignmentSubmitted
                        ? "সাবমিট সম্পন্ন"
                        : "অ্যাসাইনমেন্ট পেন্ডিং"}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex items-start gap-3.5 text-slate-400 bg-slate-50/40">
                  <Lock size={15} className="mt-0.5 shrink-0 text-slate-300" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-400 leading-snug">
                      ০৩. অ্যাডভান্সড আর্কিটেকচার ও প্রজেক্ট রিভিউ
                    </h4>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
