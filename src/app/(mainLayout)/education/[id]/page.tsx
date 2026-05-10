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
} from "lucide-react";
import { getAllCourses } from "@/src/lib/data";
import { motion } from "framer-motion";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const handleEnroll = () => {
    router.push(`/education/enroll/${course.id}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#105D38] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-[#105D38] animate-pulse">লোড হচ্ছে...</p>
        </div>
      </div>
    );

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#f8fafc]">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-neutral-800">
            কোর্সটি পাওয়া যায়নি!
          </h2>
          <p className="text-neutral-500">
            সম্ভবত লিংকটি ভুল অথবা কোর্সটি বর্তমানে উপলব্ধ নেই।
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-[#105D38] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-[#0d4d2e] transition-all"
        >
          <ArrowLeft size={20} /> পেছনে ফিরে যান
        </button>
      </div>
    );
  }

  const { details, image, category, title, price } = course;

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 pt-16 md:pt-20">
      {/* স্টিকি সাব-হেডার (Breadcrumb) */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-600 hover:text-[#105D38] transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-[#105D38]/10 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold text-sm hidden md:block">ফিরে যান</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold">
            <Link
              href="/education"
              className="text-neutral-400 hover:text-[#105D38]"
            >
              এডুকেশন
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-[#105D38] line-clamp-1 max-w-[150px] md:max-w-none uppercase">
              {title}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 md:gap-12">
          <div className="order-1 lg:order-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="inline-block bg-[#105D38] text-white px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  {category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star size={16} fill="currentColor" /> 4.9 (রিয়েটিং)
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-neutral-900 leading-[1.15]">
                {details?.fullTitle || title}
              </h1>

              <p className="text-neutral-600 text-base md:text-xl leading-relaxed">
                {details?.description ||
                  "এই কোর্সটি আপনাকে সম্পূর্ণ জিরো থেকে অ্যাডভান্স লেভেল পর্যন্ত গাইড করবে। বিস্তারিত কন্টেন্ট শীঘ্রই আপলোড করা হবে।"}
              </p>
            </motion.div>

            {/* কোর্স ইমেজ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 md:border-[12px] border-white bg-neutral-200"
            >
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-400">
                  Image Placeholder
                </div>
              )}
            </motion.div>

            {/* অতিরিক্ত তথ্য */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white rounded-2xl border border-neutral-100 flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">কোর্সের মেয়াদ</h4>
                  <p className="text-sm text-neutral-500">
                    লাইফটাইম এক্সেস পাবেন
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-neutral-100 flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">সার্টিফিকেট</h4>
                  <p className="text-sm text-neutral-500">
                    কোর্স শেষে ভেরিফাইড সার্টিফিকেট
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-2 lg:sticky lg:top-28 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-neutral-100 shadow-2xl shadow-neutral-200/50 space-y-6"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
                  ভর্তি ফি
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-[#105D38]">
                    {details?.admissionFee === 0 ||
                    (!price && !details?.admissionFee)
                      ? "ফ্রি!"
                      : `৳${details?.admissionFee || price}`}
                  </span>
                  {details?.oldAdmissionFee > 0 && (
                    <span className="text-neutral-300 line-through text-xl font-bold">
                      ৳{details.oldAdmissionFee}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleEnroll}
                  className="w-full bg-[#105D38] text-white font-black py-5 rounded-2xl hover:bg-[#0d4d2e] hover:shadow-lg hover:shadow-[#105D38]/30 transition-all text-lg active:scale-95 flex items-center justify-center gap-3"
                >
                  এখনই ভর্তি হবো
                  <CheckCircle2 size={22} />
                </button>
                <p className="text-[11px] text-center text-neutral-400 font-medium">
                  নিরাপদ পেমেন্ট গেটওয়ের মাধ্যমে পেমেন্ট সম্পন্ন করুন
                </p>
              </div>

              {details?.highlights && details.highlights.length > 0 && (
                <div className="pt-6 border-t border-neutral-100">
                  <h4 className="text-xs font-black text-neutral-800 mb-5 uppercase tracking-widest flex items-center gap-2">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    কোর্স মডিউল হাইলাইটস
                  </h4>
                  <ul className="space-y-4">
                    {details.highlights.map((h: any, i: number) => (
                      <li key={i} className="flex gap-4 text-sm items-start">
                        <div className="mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#105D38]" />
                        </div>
                        <span className="text-neutral-600 leading-tight">
                          <strong className="text-neutral-900 block mb-0.5">
                            {h.label}
                          </strong>
                          {h.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
