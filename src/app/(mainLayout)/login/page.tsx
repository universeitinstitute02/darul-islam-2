"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  BookOpen,
  Heart,
  Calendar,
  Phone,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const quickLinks = [
  { name: "কোর্স সমূহ", icon: BookOpen, href: "/courses" },
  { name: "দান", icon: Heart, href: "/donation" },
  { name: "ইভেন্ট", icon: Calendar, href: "#" },
  { name: "যোগাযোগ", icon: Phone, href: "#" },
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // 1. Initialize Form
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "", // This will hold EITHER email or phone for the backend
      password: "",
    },
  });

  // 2. Email/Phone Submit Handler
  const onSubmit = async (data: any) => {
    setGlobalError("");

    // Call NextAuth's signIn function
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setGlobalError(res.error);
    } else {
      router.push("/dashboard"); // Redirect to protected route on success
      router.refresh(); // Ensure server components update with the new session
    }
  };

  // 3. Google Sign In Handler
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
            <LogIn size={28} />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-black">লগইন করুন</h1>
            <p className="text-xs font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-0.5">
              দারুল ইসলাম ইনস্টিটিউটে স্বাগতম
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
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#14281D]">লগইন</h2>
              <p className="text-sm font-medium text-[#14281D]/40 mt-1">
                আপনার তথ্য দিন
              </p>
            </div>
          </div>

          {/* Error Message */}
          {globalError && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 text-center">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Email/Mobile */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} className="text-amber-600" /> ইমেইল বা মোবাইল
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="example@gmail.com / ০১৭XXXXXXXX"
                  className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
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
                    {...register("password", { required: true })}
                    placeholder="********"
                    className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14281D]/30 hover:text-[#14281D] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#14281D] rounded-lg"
                />
                <span className="text-sm font-bold text-[#14281D]/60 group-hover:text-[#14281D] transition-colors">
                  মনে রাখুন
                </span>
              </label>
              <button
                type="button"
                className="text-sm font-black text-amber-600 hover:text-amber-700 transition-colors"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] disabled:opacity-70 disabled:hover:translate-y-0 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                "লগইন করুন"
              )}
              {!isSubmitting && <ArrowRight size={24} />}
            </button>

            {/* Google Sign In Divider */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-[#14281D]/10"></div>
              <span className="text-xs font-black text-[#14281D]/40 uppercase">
                অথবা
              </span>
              <div className="flex-1 h-px bg-[#14281D]/10"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border-2 border-[#14281D]/10 text-[#14281D] py-4 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            <p className="text-center text-sm font-bold text-[#14281D]/60 pt-2">
              এখনও অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/register"
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                নিবন্ধন করুন
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Quick Links */}
        <section className="mt-12 w-full max-w-md">
          <h3 className="text-xs font-black text-[#14281D]/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
            <span className="flex-1 h-px bg-[#14281D]/10"></span>
            দ্রুত লিংক
            <span className="flex-1 h-px bg-[#14281D]/10"></span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="bg-white p-4 rounded-2xl shadow-lg border border-[#14281D]/5 flex items-center gap-3 hover:-translate-y-1 transition-all group"
              >
                <div className="w-10 h-10 bg-[#BCB1D]/10 text-[#14281D] rounded-xl flex items-center justify-center group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all">
                  <link.icon size={20} />
                </div>
                <span className="text-xs font-black text-[#14281D]">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
