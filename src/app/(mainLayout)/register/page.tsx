"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  UserPlus,
  Mail,
  Lock,
  Smartphone,
  User,
  BookOpen,
  Download,
  Video,
  MessageSquare,
  Eye,
  EyeOff,
  Loader2,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const benefits = [
  { name: "কোর্সে ভর্তি", icon: BookOpen },
  { name: "বই ডাউনলোড", icon: Download },
  { name: "ভিডিও লেকচার", icon: Video },
  { name: "ফোরাম", icon: MessageSquare },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // 1. Initialize Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      gender: "Male",
      isTeacherMode: false,
      department: "",
      designation: "",
      qualifications: "",
    },
  });

  const isTeacherMode = watch("isTeacherMode");

  // 2. TanStack Query for Categories (Only runs if isTeacherMode is true)
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      return res.data;
    },
    enabled: isTeacherMode,
  });

  const departments = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];

  // 3. Form Submission
  const onSubmit = async (data: any) => {
    setGlobalError("");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);

      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res?.error) {
        setGlobalError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setGlobalError(err.response?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  // 4. Google Sign In
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-32 lg:h-40 bg-gradient-to-r from-emerald-800 to-teal-900 flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <UserPlus size={28} />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-black">নিবন্ধন করুন</h1>
            <p className="text-xs font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-0.5">
              দারুল ইসলাম পরিবারে যোগ দিন
            </p>
          </div>
        </div>
      </section>

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 lg:p-10 rounded-[3rem] shadow-2xl border border-[#14281D]/5 w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4 pb-6 border-b-2 border-dashed border-[#14281D]/10">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#14281D]">নিবন্ধন ফর্ম</h2>
              <p className="text-sm font-medium text-[#14281D]/40 mt-1">আপনার সঠিক তথ্য দিন</p>
            </div>
          </div>

          {/* Global Error Message */}
          {globalError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 text-center">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} className="text-amber-600" /> আপনার নাম
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="যেমন: মুহাম্মদ রহিম"
                  className="w-full bg-[#14281D]/5 p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} className="text-amber-600" /> ইমেইল
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="example@gmail.com"
                  className="w-full bg-[#14281D]/5 p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                />
              </div>

              {/* Mobile */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <Smartphone size={12} className="text-amber-600" /> মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="০১৭XXXXXXXX"
                  className="w-full bg-[#14281D]/5 p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={12} className="text-amber-600" /> পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder="********"
                    className="w-full bg-[#14281D]/5 p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14281D]/30 hover:text-[#14281D] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} className="text-amber-600" /> লিঙ্গ
                </label>
                <div className="flex gap-4">
                  <label className="flex-1 bg-[#14281D]/5 p-3.5 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#14281D]/10 transition-colors">
                    <input
                      type="radio"
                      value="Male"
                      {...register("gender")}
                      className="w-5 h-5 accent-[#14281D]"
                    />
                    <span className="font-bold text-sm">পুরুষ</span>
                  </label>
                  <label className="flex-1 bg-[#14281D]/5 p-3.5 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#14281D]/10 transition-colors">
                    <input
                      type="radio"
                      value="Female"
                      {...register("gender")}
                      className="w-5 h-5 accent-[#14281D]"
                    />
                    <span className="font-bold text-sm">মহিলা</span>
                  </label>
                </div>
              </div>

              {/* Teacher Toggle */}
              <div className="pt-4 pb-2 border-t border-dashed border-[#14281D]/10">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-black text-[#14281D]">শিক্ষক হিসেবে আবেদন করুন</span>
                  <input
                    type="checkbox"
                    {...register("isTeacherMode")}
                    className="w-6 h-6 accent-amber-600"
                  />
                </label>
              </div>

              {/* Conditional Teacher Fields */}
              <AnimatePresence>
                {isTeacherMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden bg-amber-50/50 p-4 rounded-2xl border border-amber-100"
                  >
                    {/* Department Fetch & Select */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen size={12} className="text-amber-600" /> বিভাগ
                      </label>
                      <select
                        {...register("department", { required: isTeacherMode })}
                        disabled={categoriesLoading}
                        className="w-full bg-white p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all disabled:opacity-50"
                      >
                        <option value="">
                          {categoriesLoading ? "লোড হচ্ছে..." : "বিভাগ নির্বাচন করুন"}
                        </option>
                        {departments.map((dept: any) => (
                          <option key={dept._id} value={dept._id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {categoriesError && (
                        <p className="text-red-500 text-xs mt-1">বিভাগ লোড করতে সমস্যা হয়েছে!</p>
                      )}
                    </div>

                    {/* Designation */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                        <Briefcase size={12} className="text-amber-600" /> পদবি
                      </label>
                      <input
                        type="text"
                        {...register("designation", { required: isTeacherMode })}
                        placeholder="উদাঃ সিনিয়র প্রভাষক"
                        className="w-full bg-white p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                      />
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                        <GraduationCap size={12} className="text-amber-600" /> যোগ্যতা
                      </label>
                      <input
                        type="text"
                        {...register("qualifications", { required: isTeacherMode })}
                        placeholder="উদাঃ দাওরায়ে হাদিস, এম.এ"
                        className="w-full bg-white p-3.5 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Terms */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  required
                  type="checkbox"
                  className="w-6 h-6 accent-[#14281D] shrink-0 mt-0.5"
                />
                <p className="text-xs font-medium text-amber-900 leading-relaxed">
                  আমি দারুল ইসলাম ইনস্টিটিউটের শর্তাবলী এবং গোপনীয়তা নীতি মেনে চলতে সম্মত আছি।
                </p>
              </label>
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] disabled:opacity-70 disabled:hover:translate-y-0 transition-all"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "নিবন্ধন করুন"}
              {!isSubmitting && <UserPlus size={24} />}
            </button>

            {/* Google Sign In Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-[#14281D]/10"></div>
              <span className="text-xs font-black text-[#14281D]/40 uppercase">অথবা</span>
              <div className="flex-1 h-px bg-[#14281D]/10"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border-2 border-[#14281D]/10 text-[#14281D] py-4 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            <p className="text-center text-sm font-bold text-[#14281D]/60 pt-2">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
              <Link href="/login" className="text-amber-600 hover:text-amber-700 transition-colors">
                লগইন করুন
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Benefits Section */}
        <section className="mt-12 w-full max-w-md">
          <h3 className="text-xs font-black text-[#14281D]/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
            <span className="flex-1 h-px bg-[#14281D]/10"></span>
            নিবন্ধনের সুবিধা
            <span className="flex-1 h-px bg-[#14281D]/10"></span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-2xl shadow-lg border border-[#14281D]/5 flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <benefit.icon size={20} />
                </div>
                <span className="text-xs font-black text-[#14281D]">{benefit.name}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}