"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Lock,
  ChevronRight,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import { getAllCourses } from "@/src/lib/data";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

// আপনার প্রোভাইড করা কাস্টম হুক এবং সিকিউর এক্সিওস ক্লায়েন্ট ইমপোর্ট
import useUserRole from "@/src/app/hooks/useUserRole";
import { axiosSecure } from "@/src/app/hooks/useAxiosSecure";

export default function EnrollPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // কাস্টম হুক থেকে রিয়েল-টাইম লগইন থাকা ইউজারের ডাটা রিট্রিভ
  const { user, isLoading: isUserLoading, role } = useUserRole();

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const data = await getAllCourses();
        let found = null;
        for (const section of data) {
          const match = section.courses.find(
            (c: any) => String(c.id) === String(id),
          );
          if (match) {
            found = { ...match, category: section.category };
            break;
          }
        }
        setCourse(found);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setCourseLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("দয়া করে পেমেন্ট করার আগে লগইন সম্পন্ন করুন।");
      return;
    }

    setIsSubmitting(true);
    const finalPrice = course?.details?.admissionFee || course?.price || 0;

    // ডকুমেন্টেশনের প্রোডাক্ট অর্ডার আর্কিটেকচার অনুযায়ী নিখুঁত অবজেক্ট ম্যাপিং
    const checkoutPayload = {
      customerDetails: {
        name: user?.name || "Anonymous User",
        phone: user?.phone || "01XXXXXXXXX",
        address: user?.profile?.address || "মাদরাসা ক্যাম্পাস",
        district: user?.profile?.district || "Dhaka",
      },
      items: [
        {
          product: id, // কোর্স আইডিটি প্রোডাক্টের ট্র্যাকার হিসেবে পাস হবে
          quantity: 1,
        },
      ],
      paymentDetails: {
        method: paymentMethod, // 'bkash' | 'nagad' | 'rocket'
        status: "unpaid",
        bkashMsisdn: "",
        transactionId: "",
      },
    };

    try {
      // axiosSecure স্বয়ংক্রিয়ভাবে ইন্টারসেপ্টর থেকে Bearer Token যুক্ত করে নিবে
      const response = await axiosSecure.post(
        "/orders/checkout",
        checkoutPayload,
      );

      if (response.data) {
        console.log("Order Processed Successfully:", response.data);
        // পেমেন্ট সাকসেস বা পরবর্তী ড্যাশবোর্ড পেজে রিডাইরেক্ট লজিক এখানে লিখুন
        // router.push("/student/my-links");
      }
    } catch (error) {
      console.error("Darul Islam Checkout System Failure:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // TanStack Query অথবা লোকাল কোর্স ডেটা যেকোনো একটি লোড হতে থাকলে ফুল স্ক্রিন স্পিনার দেখাবে
  if (courseLoading || isUserLoading) return <LoadingSpinner fullScreen />;

  const finalPrice = course?.details?.admissionFee || course?.price || 0;

  return (
    <div className="min-h-screen bg-[#F4F7F4] pb-24 pt-20 md:pt-24 antialiased selection:bg-[#105D38]/10 selection:text-[#105D38]">
      {/* Dynamic Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200/60 py-4 px-4 sticky top-0 z-50 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-600 font-bold text-sm hover:text-[#105D38] transition-all hover:cursor-pointer group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-0.5 transition-transform"
            />{" "}
            ফিরে যান
          </button>
          <h1 className="text-xl font-black text-neutral-800 tracking-tight">
            নিরাপদ চেকআউট
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <form
          onSubmit={handlePaymentSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Premium Payment selection & User Context Profile */}
          <div className="lg:col-span-7 space-y-6">
            {/* Authenticated User Status Box from useUser Hook */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border border-neutral-200/60 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#105D38]/10 rounded-2xl flex items-center justify-center text-[#105D38] shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-[#105D38]/10 text-[#105D38] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {role || "Student"}
                    </span>
                    <span className="text-xs font-medium text-neutral-400">
                      অ্যাকাউন্ট ভেরিফাইড
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-800 mt-0.5">
                    {user?.name || "ইউজারের নাম পাওয়া যায়নি"}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {user?.email}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Premium Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200/60 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black flex items-center gap-2 text-neutral-800">
                  <CreditCard size={20} className="text-[#105D38]" /> পেমেন্ট
                  গেটওয়ে সিলেক্ট করুন
                </h2>
                <Wallet size={18} className="text-neutral-400" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "bkash",
                    label: "bKash",
                    color: "text-pink-500",
                    labelBn: "বিকাশ",
                    mark: "bK",
                  },
                  {
                    id: "nagad",
                    label: "Nagad",
                    color: "text-orange-500",
                    labelBn: "নগদ",
                    mark: "নগদ",
                  },
                  {
                    id: "rocket",
                    label: "Rocket",
                    color: "text-purple-600",
                    labelBn: "রকেট",
                    mark: "R",
                  },
                ].map((method) => {
                  const isSelected = paymentMethod === method.id;
                  return (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border-2 transition-all flex sm:flex-col items-center justify-between sm:justify-center gap-3 text-left sm:text-center hover:cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? "border-[#105D38] bg-[#105D38]/[0.03] text-[#105D38]"
                          : "border-neutral-100 bg-neutral-50 hover:border-neutral-200 text-neutral-600"
                      }`}
                    >
                      <div className="flex items-center sm:flex-col gap-3">
                        <div
                          className={`w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-sm uppercase border border-neutral-100 transition-transform group-hover:scale-105 ${method.color}`}
                        >
                          {method.mark}
                        </div>
                        <div>
                          <span className="block text-sm font-bold tracking-tight capitalize sm:mt-1">
                            {method.label}
                          </span>
                          <span className="block text-[10px] text-neutral-400 sm:hidden">
                            {method.labelBn} পেমেন্ট চ্যানেল
                          </span>
                        </div>
                      </div>

                      {/* Active Check Dot */}
                      <div
                        className={`w-4 h-4 rounded-full border-4 flex items-center justify-center border-white shadow-sm shrink-0 transition-all ${
                          isSelected
                            ? "bg-[#105D38] scale-100"
                            : "bg-neutral-200 scale-90"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Order Summary (Sticky Panel) */}
          <div className="lg:col-span-5 sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#105D38] text-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-[#105D38]/10"
            >
              <h3 className="text-lg font-bold mb-6 tracking-wide opacity-90">
                অর্ডার সামারি
              </h3>

              <div className="flex gap-4 items-center pb-6 border-b border-white/10">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shrink-0 bg-white/10 shadow-inner">
                  {course?.image && (
                    <Image
                      src={course.image}
                      alt={course.title || "Course Cover"}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black bg-white/10 text-white/90 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                    {course?.category || "জেনারেল"}
                  </span>
                  <h4 className="font-bold leading-snug text-sm md:text-base line-clamp-2 text-white">
                    {course?.title || "কোর্সের নাম লোড হচ্ছে..."}
                  </h4>
                </div>
              </div>

              {/* Dynamic Bill Calculation Block */}
              <div className="py-6 space-y-4 border-b border-white/10">
                <div className="flex justify-between text-sm opacity-85">
                  <span>কোর্স এনরোলমেন্ট ফি</span>
                  <span className="font-bold">৳{finalPrice}</span>
                </div>
                <div className="flex justify-between text-sm opacity-85">
                  <span>ভ্যাট ও ট্যাক্স (০%)</span>
                  <span className="font-bold">৳০</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-base font-bold opacity-90">
                    মোট প্রদেয় পরিমাণ
                  </span>
                  <span className="text-3xl font-black tracking-tight text-white">
                    ৳{finalPrice}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-white text-[#105D38] font-black py-4 rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 group hover:cursor-pointer shadow-md text-base mt-6"
              >
                পেমেন্ট করুন
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* Trust badges */}
              <div className="mt-6 flex items-center justify-center gap-5 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-400" /> 100%
                  Secured Pipeline
                </div>
                <div className="flex items-center gap-1">
                  <Lock size={12} className="text-emerald-400" /> SSL Encrypted
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </main>
    </div>
  );
}
