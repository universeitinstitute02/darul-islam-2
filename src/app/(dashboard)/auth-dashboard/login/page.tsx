"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import Image from "next/image";

import login1 from "../../../../../public/images/login1.png";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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

        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#105D38] via-transparent to-transparent lg:hidden" />

        {/* Desktop Aesthetic Overlay */}
        <div className="absolute inset-0 bg-black/10 hidden lg:block" />

        {/* Logo and Welcome Text */}
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

        {/* Bottom Decorative Element (Desktop) */}
        <div className="absolute bottom-10 left-20 hidden lg:block">
          <div className="flex gap-4 items-center text-white/40 text-sm font-bold tracking-widest uppercase">
            <span className="w-12 h-[2px] bg-white/20"></span>
            Darul Islam Institute
          </div>
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
          {/* Tabs for Mobile - Fixed Section */}
          <div className="flex bg-neutral-50 p-1.5 rounded-2xl mb-8 border border-neutral-100 lg:hidden">
            <button className="flex-1 py-2.5 rounded-xl bg-[#105D38] text-white font-bold text-sm shadow-md transition-all">
              লগইন করুন
            </button>
            <Link
              href={"/auth-dashboard/register"}
              className="flex-1 py-2.5 rounded-xl text-neutral-500 font-bold text-sm hover:bg-neutral-100 transition-all text-center flex items-center justify-center"
            >
              নতুন অ্যাকাউন্ট
            </Link>
          </div>

          <div className="mb-10 hidden lg:block">
            <div className="flex items-center justify-between items-end">
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
                  href={"/auth-dashboard/register"}
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

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <input
                type="text"
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

            <div className="flex items-center justify-between text-sm px-1 font-bold">
              <label className="flex items-center gap-2.5 text-neutral-500 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4.5 h-4.5 rounded border-neutral-300 accent-[#105D38] transition-all"
                />
                <span className="group-hover:text-[#105D38]">মনে রাখুন</span>
              </label>
              <button className="text-neutral-500 hover:text-red-500 transition-colors font-extrabold underline underline-offset-4 decoration-neutral-200 hover:decoration-red-200">
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>

            <button className="w-full bg-[#105D38] hover:bg-[#0d4d2e] text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-green-900/20 active:scale-[0.98] mt-4 uppercase tracking-widest">
              লগইন করুন
            </button>
          </form>

          {/* Social Logins */}
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
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-neutral-100 rounded-2xl hover:bg-neutral-50 hover:border-neutral-200 transition-all font-bold text-neutral-700 text-sm shadow-sm">
              <Chrome size={20} className="text-red-500" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-neutral-100 rounded-2xl hover:bg-neutral-50 hover:border-neutral-200 transition-all font-bold text-neutral-700 text-sm shadow-sm">
              <Facebook size={20} className="text-blue-600" /> Facebook
            </button>
          </div>

          {/* Secure Info Badge */}
          <div className="mt-10 flex items-center gap-4 p-5 bg-[#105D38]/5 rounded-[2rem] border border-[#105D38]/10 lg:max-w-full">
            <div className="p-3 bg-white rounded-2xl text-[#105D38] shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <p className="text-[11px] leading-relaxed text-neutral-600 font-bold">
              আপনার সমস্ত তথ্য{" "}
              <span className="text-[#105D38]">256-bit SSL</span> এন্ড-টু-এন্ড
              এনক্রিপশনের মাধ্যমে সর্বোচ্চ নিরাপত্তায় রয়েছে।
            </p>
          </div>

          <p className="mt-10 text-center lg:text-left text-[13px] text-neutral-400 font-bold tracking-tight pb-6">
            © 2026 Darul Islam Institute.{" "}
            <span className="hidden lg:inline">|</span>{" "}
            <br className="lg:hidden" /> সর্বস্বত্ব সংরক্ষিত।
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
