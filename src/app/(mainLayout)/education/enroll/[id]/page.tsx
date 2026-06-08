"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  User,
  Smartphone,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { getAllCourses } from "@/src/lib/data";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

import useUserRole from "@/src/app/hooks/useUserRole";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";

interface Batch {
  _id: string;
  batchName: string;
  maxSeats: number;
  enrolledStudents: string[];
  status: string;
}

interface EnrollFormValues {
  senderName: string;
  accountNumber: string;
  transactionId: string;
}

const CHANNEL_NUMBERS: Record<
  string,
  { label: string; number: string; bg: string; border: string; logo: string }
> = {
  bkash: {
    label: "বিকাশ (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-pink-50",
    border: "border-pink-400",
    logo: "https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png",
  },
  nagad: {
    label: "নগদ (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-orange-50",
    border: "border-orange-400",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Nagad-png.png",
  },
  rocket: {
    label: "রকেট (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-purple-50",
    border: "border-purple-400",
    logo: "https://static.vecteezy.com/system/resources/previews/068/842/062/non_2x/rocket-icon-mobile-banking-logo-emblem-transparent-background-free-png.png",
  },
};

export default function EnrollPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const axiosSecure = useAxiosSecure();

  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<EnrollFormValues>();
  const { user, isLoading: isUserLoading, role } = useUserRole();

  const { data: course = null, isLoading: courseLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!id) return null;
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
      return found;
    },
    enabled: !!id,
  });

  const handleCopyClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to execute copy sequence", err);
    }
  };

  const handlePaymentSubmit = async (data: EnrollFormValues) => {
    if (!user) {
      return Swal.fire(
        "নির্দেশনা",
        "দয়া করে পেমেন্ট করার আগে লগইন সম্পন্ন করুন।",
        "warning",
      );
    }
    if (
      !data.senderName.trim() ||
      !data.accountNumber.trim() ||
      !data.transactionId.trim()
    ) {
      return Swal.fire(
        "তথ্য প্রয়োজন",
        "পেমেন্ট ভেরিফিকেশনের জন্য সবগুলো ফিল্ড পূরণ করুন।",
        "warning",
      );
    }

    setIsSubmitting(true);
    const finalPrice = course?.details?.admissionFee || course?.price || 0;

    const requestPayload = {
      courseId: id,
      method: paymentMethod,
      senderName: data.senderName.trim(),
      bkashNumber: data.accountNumber.trim(),
      transactionId: data.transactionId.trim().toUpperCase(),
      amountPaid: Number(finalPrice),
    };

    try {
      const response = await axiosSecure.post(
        "/enrollments/enroll-course",
        requestPayload,
      );
      if (response.data.success) {
        Swal.fire({
          title: "আবেদন সফল হয়েছে!",
          text: "আপনার ট্রানজেকশন তথ্যটি সফলভাবে গৃহীত হয়েছে। অ্যাডমিন ভেরিফিকেশন সম্পন্ন হলে আপনার কোর্সটি আনলক হয়ে যাবে।",
          icon: "success",
          confirmButtonColor: "#105D38",
        });
        router.push("/student-profile");
      }
    } catch (error: any) {
      Swal.fire(
        "আবেদন ব্যর্থ",
        error?.response?.data?.message ||
          "Something went wrong during checkout propagation",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (courseLoading || isUserLoading) return <LoadingSpinner fullScreen />;

  const finalPrice = course?.details?.admissionFee || course?.price || 0;
  const activeChannel = CHANNEL_NUMBERS[paymentMethod];

  return (
    <div className="min-h-screen bg-[#F4F7F4] pb-24 pt-20 md:pt-24 antialiased selection:bg-[#105D38]/10 selection:text-[#105D38]">
      <header className="bg-white/80 border-b border-neutral-200/60 py-4 px-4">
        <div className="max-w-7xl px-4 mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral-600 font-bold text-sm hover:text-[#105D38] transition-all hover:cursor-pointer group"
            aria-label="পূর্ববর্তী পৃষ্ঠায় ফিরে যান"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
            ফিরে যান
          </button>
          <h1 className="text-xl font-black text-neutral-800 tracking-tight">
            নিরাপদ চেকআউট
          </h1>
          <div className="w-10" aria-hidden="true"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit(handlePaymentSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <section className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 shadow-xl border border-black/5 space-y-6">
            <div
              className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-neutral-100"
              role="region"
              aria-label="ইউজার প্রোফাইল তথ্য"
            >
              <div className="w-12 h-12 bg-[#105D38]/10 rounded-2xl flex items-center justify-center text-[#105D38] shrink-0">
                <CheckCircle2 size={24} aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-[#105D38]/10 text-[#105D38] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {role || "Student"}
                  </span>
                  <span className="text-xs font-medium text-neutral-400">
                    অ্যাকাউন্ট ভেরিফাইড
                  </span>
                </div>
                <h2 className="text-base font-bold text-neutral-800 mt-0.5">
                  {user?.name || "ইউজারের নাম পাওয়া যায়নি"}
                </h2>
                <p className="text-xs text-neutral-500 font-medium">
                  {user?.email}
                </p>
              </div>
            </div>

            <fieldset className="space-y-3 border-none p-0 m-0">
              <legend className="text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                পেমেন্ট গেটওয়ে সিলেক্ট করুন
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {["bkash", "nagad", "rocket"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      paymentMethod === m
                        ? "border-[#105D38] bg-gray-50 text-[#105D38]"
                        : "border-gray-100 opacity-60 hover:opacity-80"
                    }`}
                    aria-pressed={paymentMethod === m}
                  >
                    <img
                      src={CHANNEL_NUMBERS[m].logo}
                      alt={`${m} লোগো`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-[10px] font-black uppercase">
                      {m}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <AnimatePresence mode="wait">
              <motion.div
                key={paymentMethod}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-5 mt-7 rounded-2xl border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${activeChannel.bg} ${activeChannel.border}`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={activeChannel.logo}
                      alt=""
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <p className="text-xs font-bold opacity-70">
                      {activeChannel.label}
                    </p>
                  </div>
                  <p className="text-xl font-black text-neutral-800 tracking-wide">
                    Number: {activeChannel.number}
                  </p>
                  <p className="text-[10px] mt-2 opacity-60 italic">
                    * এই ঠিকানায় টাকা পাঠিয়ে নিচের তথ্যগুলো পূরণ করুন।
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyClipboard(activeChannel.number)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold self-start sm:self-center transition-all cursor-pointer border ${
                    copied
                      ? "bg-green-100 border-green-300 text-green-700"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                  aria-label="নম্বরটি ক্লিপবোর্ডে কপি করুন"
                >
                  {copied ? (
                    <>
                      <Check size={13} aria-hidden="true" /> কপি হয়েছে
                    </>
                  ) : (
                    <>
                      <Copy size={13} aria-hidden="true" /> কপি করুন
                    </>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>

            <div className="space-y-4">
              <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest border-b border-neutral-100 pb-2">
                পেমেন্ট ভেরিফিকেশন তথ্য দিন
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label htmlFor="sender-name-field" className="sr-only">
                    প্রেরক এর নাম
                  </label>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={16} aria-hidden="true" />
                  </span>
                  <input
                    id="sender-name-field"
                    type="text"
                    placeholder="প্রেরক এর নাম (Sender Name)"
                    {...register("senderName", { required: true })}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-gray-200 transition-all text-neutral-800"
                    required
                  />
                </div>

                <div className="relative">
                  <label htmlFor="account-number-field" className="sr-only">
                    যে নম্বর থেকে টাকা পাঠিয়েছেন
                  </label>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Smartphone size={16} aria-hidden="true" />
                  </span>
                  <input
                    id="account-number-field"
                    type="text"
                    placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন"
                    {...register("accountNumber", { required: true })}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-gray-200 transition-all text-neutral-800"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="transaction-id-field" className="sr-only">
                  ট্রানজেকশন আইডি
                </label>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Hash size={16} aria-hidden="true" />
                </span>
                <input
                  id="transaction-id-field"
                  type="text"
                  placeholder="ট্রানজেকশন আইডি (Transaction ID)"
                  {...register("transactionId", { required: true })}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-bold font-mono uppercase tracking-wide outline-none border border-transparent focus:border-gray-200 transition-all text-neutral-800 placeholder:normal-case"
                  required
                />
              </div>
            </div>
          </section>

          <aside className="lg:col-span-5 sticky top-24">
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
                      alt=""
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
                    মোট প্রদেয় পরিমাণ
                  </span>
                  <span className="text-3xl font-black tracking-tight text-white">
                    ৳{finalPrice}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full cursor-pointer bg-white text-[#105D38] font-black py-4 rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center shadow-md text-base mt-6 active:scale-[0.98] disabled:opacity-60 overflow-hidden"
              >
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white">
                    <LoadingSpinner />
                  </div>
                )}
                <span
                  className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                >
                  পেমেন্ট নিশ্চিত করুন
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </button>

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
          </aside>
        </form>
      </main>
    </div>
  );
}
