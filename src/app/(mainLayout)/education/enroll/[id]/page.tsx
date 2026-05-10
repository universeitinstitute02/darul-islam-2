"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CreditCard,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { getAllCourses } from "@/src/lib/data";

export default function EnrollPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getAllCourses();
      let found = null;
      for (const section of data) {
        const match = section.courses.find((c: any) => String(c.id) === id);
        if (match) {
          found = { ...match, category: section.category };
          break;
        }
      }
      setCourse(found);
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-[#105D38]">
        প্রসেসিং হচ্ছে...
      </div>
    );

  const finalPrice = course?.details?.admissionFee || course?.price || 0;

  return (
    // মেইন ডিভে pt-20 বা pt-24 যোগ করা হয়েছে যাতে মেইন নেভিবারের নিচে চাপা না পড়ে
    <div className="min-h-screen bg-[#F8FAF8] pb-20 pt-16 md:pt-20">
      {/* Header: z-index কমিয়ে ৪0 করা হয়েছে যাতে মেইন নেভিবার (সাধারণত ৫০ থাকে) উপরে থাকে */}
      <header className="bg-white border-b py-4 px-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-600 font-bold text-sm hover:text-[#105D38] transition-colors"
          >
            <ArrowLeft size={18} /> ফিরে যান
          </button>
          <h1 className="text-lg font-black text-neutral-800">চেকআউট</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6"
            >
              <h2 className="text-xl font-bold flex items-center gap-2 text-neutral-800">
                <User size={20} className="text-[#105D38]" /> আপনার তথ্য দিন
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    পূর্ণ নাম
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="উদা: আব্দুল্লাহ"
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-[#105D38]/20 outline-none transition-all text-sm"
                    />
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={16}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    মোবাইল নাম্বার
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-[#105D38]/20 outline-none transition-all text-sm"
                    />
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                      size={16}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  ইমেইল এড্রেস
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-[#105D38]/20 outline-none transition-all text-sm"
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={16}
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Selection */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-100 shadow-sm space-y-6"
            >
              <h2 className="text-xl font-bold flex items-center gap-2 text-neutral-800">
                <CreditCard size={20} className="text-[#105D38]" /> পেমেন্ট মেথড
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["bkash", "nagad", "rocket"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === method
                        ? "border-[#105D38] bg-[#105D38]/5"
                        : "border-neutral-50 bg-neutral-50 hover:border-neutral-200"
                    }`}
                  >
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center font-bold text-xs uppercase">
                      {method}
                    </div>
                    <span className="text-xs font-bold capitalize">
                      {method}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#105D38] text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl sticky top-28"
            >
              <h3 className="text-lg font-bold mb-6">অর্ডার সামারি</h3>

              <div className="flex gap-4 items-center pb-6 border-b border-white/10">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/20 shrink-0 bg-white/10">
                  {course?.image && (
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 uppercase">
                    {course?.category}
                  </p>
                  <h4 className="font-bold leading-tight line-clamp-2">
                    {course?.title}
                  </h4>
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">কোর্স ফি</span>
                  <span className="font-bold">৳{finalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">ডিসকাউন্ট</span>
                  <span className="font-bold text-green-300">- ৳0</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-bold">মোট পরিমাণ</span>
                  <span className="text-3xl font-black">৳{finalPrice}</span>
                </div>
              </div>

              <button className="w-full bg-white text-[#105D38] font-black py-4 rounded-2xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 group">
                পেমেন্ট সম্পন্ন করুন
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] text-white/50 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} /> 100% Secure
                </div>
                <div className="flex items-center gap-1">
                  <Lock size={14} /> SSL Encrypted
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
