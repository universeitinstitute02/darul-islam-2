"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Chrome,
  Facebook,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import login1 from "../../../../../public/images/login1.png";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<any> = async (data) => {
    setGlobalError("");

    const res = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (res?.error) {
      setGlobalError("লগইন ব্যর্থ হয়েছে। আপনার তথ্য সঠিক কিনা যাচাই করুন।");
    } else {
      window.location.href = "/dashboard";
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen lg:h-screen bg-[#f8fafc] flex flex-col lg:flex-row lg:overflow-hidden font-sans">
      {/* 1. Top Section / Hero Banner */}
      <div className="relative h-[45vh] lg:h-full lg:w-[55%] bg-[#105D38] overflow-hidden shrink-0">
        <Image
          src={login1}
          alt="Mosque Banner"
          fill
          priority
          className="object-cover opacity-50 lg:opacity-60 scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#105D38] via-transparent to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-black/10 hidden lg:block" />

        <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center text-center lg:text-left p-8 lg:p-20 space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col items-center lg:items-start gap-2 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/20 shadow-2xl"
          >
            <h1 className="text-white font-black text-2xl lg:text-3xl tracking-tight uppercase">
              স্বাগতম
            </h1>
            <span className="text-[11px] lg:text-[13px] text-white/90 font-semibold tracking-widest uppercase">
              ইসলামি শিক্ষা, সুশিক্ষিত জীবন
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-tight lg:block hidden drop-shadow-lg"
          >
            ইলম ও দ্বীন <br />{" "}
            <span className="text-[#C5A059]">উত্তম জীবনের জন্য</span>
          </motion.h2>

          <p className="text-white/70 max-w-md text-lg font-medium hidden lg:block leading-relaxed">
            একটি আধুনিক প্ল্যাটফর্ম যেখানে আপনি আপনার দ্বীনী জ্ঞানকে আরও সমৃদ্ধ
            করতে পারেন সহজ এবং সাবলীলভাবে।
          </p>
        </div>
      </div>

      {/* 2. Login Card Section */}
      <div className="flex-1 flex items-start lg:items-center justify-center relative -mt-16 lg:mt-0 z-10 lg:z-0 px-4 pb-12 lg:p-12 lg:bg-white lg:overflow-y-auto lg:h-screen scrollbar-hide">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white rounded-[2.5rem] lg:rounded-none lg:shadow-none border border-neutral-100 lg:border-none p-8 md:p-10 lg:p-0 my-auto"
        >
          <div className="mb-6 lg:mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#105D38] transition-colors group"
            >
              <div className="p-2.5 lg:p-0 bg-neutral-50 lg:bg-transparent rounded-full lg:rounded-none border border-neutral-100 lg:border-none shadow-sm lg:shadow-none">
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </div>
              <span className="hidden lg:block text-sm font-bold uppercase tracking-widest">
                পিছনে যান
              </span>
            </Link>
          </div>

          {/* Error Message */}
          {globalError && (
            <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 text-center">
              {globalError}
            </div>
          )}

          <div className="mb-10 hidden lg:block">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-black text-neutral-900 tracking-tight">
                  লগইন করুন
                </h2>
                <p className="text-neutral-500 font-semibold mt-2 text-[15px]">
                  আপনার অ্যাকাউন্টে প্রবেশ করুন
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-400 font-bold mb-1 uppercase tracking-tighter">
                  নতুন ইউজার?
                </p>
                <Link
                  href={"/auth/register"}
                  className="text-[#105D38] font-black text-sm flex items-center gap-1 hover:underline group transition-all"
                >
                  রেজিস্টার{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative group">
              <input
                type="text"
                {...register("identifier", { required: true })}
                placeholder="আপনার মোবাইল নম্বর / ইমেইল"
                className="w-full pl-6 pr-12 py-4.5 bg-neutral-50 lg:bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] focus:bg-white outline-none transition-all font-bold text-sm"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#105D38] transition-colors">
                <Mail size={20} />
              </div>
            </div>

            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="পাসওয়ার্ড"
                className="w-full pl-6 pr-14 py-4.5 bg-neutral-50 lg:bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] focus:bg-white outline-none transition-all font-bold text-sm"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3 text-neutral-300">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-[#105D38] transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <div className="w-[1px] h-4 bg-neutral-200"></div>
                <Lock size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#105D38] hover:bg-[#0d4d2e] text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-green-900/20 active:scale-[0.98] mt-4 uppercase tracking-widest disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> অপেক্ষা করুন...
                </>
              ) : (
                "লগইন করুন"
              )}
            </button>
          </form>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-8 text-neutral-300 font-black tracking-[0.4em]">
                অথবা সামাজিক যোগাযোগ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex items-center justify-center gap-3 py-4 border-2 border-neutral-100 rounded-2xl hover:bg-neutral-50 hover:border-neutral-200 transition-all font-bold text-neutral-700 text-sm shadow-sm"
            >
              <Chrome size={20} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-neutral-100 rounded-2xl hover:bg-neutral-50 hover:border-neutral-200 transition-all font-bold text-neutral-700 text-sm shadow-sm">
              <Facebook size={20} className="text-blue-600" /> Facebook
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 p-5 bg-[#105D38]/5 rounded-[2rem] border border-[#105D38]/10">
            <div className="p-3 bg-white rounded-2xl text-[#105D38] shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-600 font-bold">
              আপনার সমস্ত তথ্য{" "}
              <span className="text-[#105D38]">256-bit SSL</span> এন্ড-টু-এন্ড
              এনক্রিপশনের মাধ্যমে সর্বোচ্চ নিরাপত্তায় রয়েছে।
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
