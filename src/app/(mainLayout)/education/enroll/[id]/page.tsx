"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  Smartphone,
  Hash,
  MapPin,
} from "lucide-react";

import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCourses } from "@/src/lib/data";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

// আপনার প্রোভাইড করা কাস্টম হুক এবং সিকিউর এক্সিওস ক্লায়েন্ট ইমপোর্ট
import useUserRole from "@/src/app/hooks/useUserRole";
import { axiosSecure } from "@/src/app/hooks/useAxiosSecure";

type PaymentMethod = "bkash" | "nagad" | "rocket" | "bank";

const PAYMENT_INFO: Record<
  PaymentMethod,
  {
    label: string;
    number?: string;
    ac?: string;
    bg: string;
    borderColor: string;
    logo: string;
  }
> = {
  bkash: {
    label: "বিকাশ (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-pink-50",
    borderColor: "border-pink-400",
    logo: "https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png",
  },
  nagad: {
    label: "নগদ (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-orange-50",
    borderColor: "border-orange-400",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Nagad-png.png",
  },
  rocket: {
    label: "রকেট (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-purple-50",
    borderColor: "border-purple-400",
    logo: "https://static.vecteezy.com/system/resources/previews/068/842/062/non_2x/rocket-icon-mobile-banking-logo-emblem-transparent-background-free-png.png",
  },
  bank: {
    label: "ইসলামী ব্যাংক",
    ac: "2050188002255",
    bg: "bg-blue-50",
    borderColor: "border-blue-400",
    logo: "https://res.cloudinary.com/darulislam/image/upload/v1780811223/central-bank_z1rprw.png",
  },
};

/* ─────────────────────────────────────────
    COPY HOOK
───────────────────────────────────────── */
function useCopy(text: string) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return { copied, copy };
}

function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopy(text);

  return (
    <button
      type="button"
      onClick={copy}
      className="px-3 py-2 rounded-xl bg-white/80 text-xs font-black text-neutral-700 border border-black/5 shadow-sm hover:bg-white transition-colors"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function RHFInput({
  icon,
  registration,
  className = "",
  ...props
}: {
  icon: React.ReactNode;
  registration: UseFormRegisterReturn;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-3 focus-within:border-[#105D38] transition-colors">
      <span className="text-neutral-400 shrink-0">{icon}</span>
      <input
        {...props}
        {...registration}
        className={`w-full bg-transparent text-sm font-semibold text-neutral-800 outline-none placeholder:text-neutral-400 ${className}`}
      />
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;

  return <p className="mt-1 text-xs font-semibold text-red-600">{msg}</p>;
}

interface DonorFormValues {
  name: string;
  phone: string;
  senderNumber?: string;
  address?: string;
  trxId?: string;
}

export default function EnrollPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [course, setCourse] = useState<any>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [method, setMethod] = useState<PaymentMethod>("bkash");
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
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

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<DonorFormValues>({ mode: "onSubmit" });

  const paymentInfo = PAYMENT_INFO[method];
  const copyTarget =
    method === "bank" ? (paymentInfo.ac ?? "") : (paymentInfo.number ?? "");

  const handleMethodChange = (selectedMethod: PaymentMethod) => {
    setMethod(selectedMethod);
    setIsPaymentComplete(false);
  };

  const handlePaymentComplete = async () => {
    const requiredFields: (keyof DonorFormValues)[] =
      method === "bank"
        ? ["name", "phone", "trxId"]
        : ["name", "phone", "senderNumber", "trxId"];
    const isValid = await trigger(requiredFields, { shouldFocus: true });
    if (!isValid) return;

    setIsPaymentComplete(true);
  };

  const handlePaymentSubmit = async (data: DonorFormValues) => {
    if (!isPaymentComplete) return;

    if (!user) {
      alert("দয়া করে পেমেন্ট করার আগে লগইন সম্পন্ন করুন।");
      return;
    }

    setIsSubmitting(true);
    const finalPrice = course?.details?.admissionFee || course?.price || 0;

    // ডকুমেন্টেশনের প্রোডাক্ট অর্ডার আর্কিটেকচার অনুযায়ী নিখুঁত অবজেক্ট ম্যাপিং
    const checkoutPayload = {
      customerDetails: {
        name: data.name || user?.name || "Anonymous User",
        phone: data.phone || user?.phone || "01XXXXXXXXX",
        address: data.address || user?.profile?.address || "মাদরাসা ক্যাম্পাস",
        district: user?.profile?.district || "Dhaka",
      },
      items: [
        {
          product: id, // কোর্স আইডিটি প্রোডাক্টের ট্র্যাকার হিসেবে পাস হবে
          quantity: 1,
        },
      ],
      paymentDetails: {
        method, // 'bkash' | 'nagad' | 'rocket' | 'bank'
        status: "unpaid",
        bkashMsisdn: method === "bank" ? "" : (data.senderNumber ?? ""),
        transactionId: method === "bank" ? "" : (data.trxId ?? ""),
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
          onSubmit={handleSubmit(handlePaymentSubmit)}
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

            {/* Payment method selector */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {(["bkash", "nagad", "rocket", "bank"] as PaymentMethod[]).map(
                (m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMethodChange(m)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                      method === m
                        ? "border-[#14281D] bg-gray-50"
                        : "border-gray-100 opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={PAYMENT_INFO[m].logo}
                      alt={m}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-[10px] font-black uppercase">
                      {m}
                    </span>
                  </button>
                ),
              )}
            </div>

            {/* Payment info card with copy button */}
            <AnimatePresence mode="wait">
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl mb-6 border-l-4 ${paymentInfo.bg} ${paymentInfo.borderColor}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={paymentInfo.logo}
                    alt={method}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <p className="text-xs font-bold opacity-70">
                    {paymentInfo.label}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p
                    className={`font-black ${method === "bank" ? "text-sm" : "text-xl"} flex-1`}
                  >
                    {method === "bank"
                      ? `A/C: ${paymentInfo.ac}`
                      : `Number: ${paymentInfo.number}`}
                  </p>
                  <CopyButton text={copyTarget} />
                </div>

                <p className="text-[10px] mt-2 opacity-60 italic">
                  * এই ঠিকানায় টাকা পাঠিয়ে নিচের তথ্যগুলো পূরণ করুন।
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Form fields via react-hook-form */}
            <div>
              <div className="space-y-3 mb-6">

                
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <div>
                      <RHFInput
                        icon={<Smartphone size={16} />}
                        placeholder="যে নাম্বার থেকে পাঠিয়েছেন"
                        registration={register("senderNumber", {
                          required: "সেন্ডার নাম্বার দিন",
                          pattern: {
                            value: /^[0-9+]{10,15}$/,
                            message: "সঠিক নাম্বার দিন",
                          },
                        })}
                      />
                      {errors.senderNumber && (
                        <FieldError msg={errors.senderNumber.message} />
                      )}
                    </div>

                    <div>
                      <RHFInput
                        icon={<Hash size={16} />}
                        placeholder="ট্রানজেকশন আইডি (TrxID) / ব্যাংক অ্যাকাউন্ট নম্বর"
                        registration={register("trxId", {
                          required: "TrxID দিন",
                        })}
                      />
                      {errors.trxId && (
                        <FieldError msg={errors.trxId.message} />
                      )}
                    </div>
                  </motion.div>
                
              </div>

              <button
                type="button"
                onClick={handlePaymentComplete}
                disabled={isSubmitting}
                className="relative w-full cursor-pointer bg-green-800 text-white py-4 rounded-2xl font-black flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-60 overflow-hidden"
              >
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-800">
                    <LoadingSpinner />
                  </div>
                )}

                <span
                  className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                >
                  পেমেন্ট করুন
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
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
                disabled={!isPaymentComplete || isSubmitting}
                className="w-full bg-white text-[#105D38] font-black py-4 rounded-2xl hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 group hover:cursor-pointer shadow-md text-base mt-6 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
              >
                সম্পূর্ণ করুন
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
