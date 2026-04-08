"use client"

import { useState } from "react"
import { 
  LogIn, 
  Mail, 
  Lock, 
  Smartphone, 
  ArrowRight, 
  UserPlus, 
  BookOpen, 
  Heart, 
  Calendar, 
  Phone,
  Eye,
  EyeOff
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const quickLinks = [
  { name: "কোর্স সমূহ", icon: BookOpen, href: "/courses" },
  { name: "দান", icon: Heart, href: "/donation" },
  { name: "ইভেন্ট", icon: Calendar, href: "#" },
  { name: "যোগাযোগ", icon: Phone, href: "#" },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

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
            <p className="text-xs font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-0.5">দারুল ইসলাম ইনস্টিটিউটে স্বাগতম</p>
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
              <p className="text-sm font-medium text-[#14281D]/40 mt-1">আপনার তথ্য দিন</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              {/* Email/Mobile */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#14281D]/60 uppercase tracking-widest flex items-center gap-2">
                  <Mail size={12} className="text-amber-600" /> ইমেইল বা মোবাইল
                </label>
                <input 
                  type="text" 
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
                <input type="checkbox" className="w-5 h-5 accent-[#14281D] rounded-lg" />
                <span className="text-sm font-bold text-[#14281D]/60 group-hover:text-[#14281D] transition-colors">মনে রাখুন</span>
              </label>
              <button type="button" className="text-sm font-black text-amber-600 hover:text-amber-700 transition-colors">
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>

            <button className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
              লগইন করুন <ArrowRight size={24} />
            </button>

            <p className="text-center text-sm font-bold text-[#14281D]/60">
              এখনও অ্যাকাউন্ট নেই?{" "}
              <Link href="/register" className="text-amber-600 hover:text-amber-700 transition-colors">
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
                <span className="text-xs font-black text-[#14281D]">{link.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
