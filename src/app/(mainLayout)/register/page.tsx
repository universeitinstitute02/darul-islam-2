"use client"

import { useState } from "react"
import { 
  UserPlus, 
  Mail, 
  Lock, 
  Smartphone, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Download, 
  Video, 
  MessageSquare,
  Eye,
  EyeOff,
  ChevronDown
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const benefits = [
  { name: "কোর্সে ভর্তি", icon: BookOpen },
  { name: "বই ডাউনলোড", icon: Download },
  { name: "ভিডিও লেকচার", icon: Video },
  { name: "ফোরাম", icon: MessageSquare },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
            <p className="text-xs font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-0.5">দারুল ইসলাম পরিবারে যোগ দিন</p>
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

          <form className="space-y-5">
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <User size={12} className="text-amber-600" /> আপনার নাম
                </label>
                <input 
                  type="text" 
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
                    <input type="radio" name="gender" className="w-5 h-5 accent-[#14281D]" defaultChecked />
                    <span className="font-bold text-sm">পুরুষ</span>
                  </label>
                  <label className="flex-1 bg-[#14281D]/5 p-3.5 rounded-2xl flex items-center justify-center gap-3 cursor-pointer hover:bg-[#14281D]/10 transition-colors">
                    <input type="radio" name="gender" className="w-5 h-5 accent-[#14281D]" />
                    <span className="font-bold text-sm">মহিলা</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input required type="checkbox" className="w-6 h-6 accent-[#14281D] shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-amber-900 leading-relaxed">
                  আমি দারুল ইসলাম ইনস্টিটিউটের শর্তাবলী এবং গোপনীয়তা নীতি মেনে চলতে সম্মত আছি।
                </p>
              </label>
            </div>

            <button className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
              নিবন্ধন করুন <UserPlus size={24} />
            </button>

            <p className="text-center text-sm font-bold text-[#14281D]/60">
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
  )
}
