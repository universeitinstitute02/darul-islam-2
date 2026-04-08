"use client"

import { useState } from "react"
import { 
  SquarePen, 
  User, 
  UserPlus, 
  UserCheck, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  University, 
  CheckCircle2, 
  Send, 
  Clock,
  ChevronDown

} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const courses = [
  { id: "hifz", name: "হিফযুল কুরআন" },
  { id: "alim", name: "আলিম কোর্স" },
  { id: "arabic", name: "আরবি ভাষা কোর্স" },
  { id: "tajweed", name: "তাজবীদ ও কিরাত" },
  { id: "fiqh", name: "ফিকহুল ইবাদাত" },
]

const proficiencies = [
  { id: "tajweed", label: "তাজবীদ জানি" },
  { id: "hifz", label: "হিফয করছি" },
  { id: "read", label: "আরবি পড়তে পারি" },
  { id: "mean", label: "অর্থ বুঝি" },
]

export default function AdmissionPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#FFFCDC] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl border-4 border-green-100 text-center space-y-6 max-w-lg"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={64} />
          </div>
          <h2 className="text-3xl font-black text-[#14281D]">আবেদন জমা হয়েছে!</h2>
          <p className="text-lg font-medium text-[#14281D]/60 leading-relaxed">
            আলহামদুলিল্লাহ, আপনার ভর্তির আবেদনটি সফলভাবে গৃহীত হয়েছে। খুব শীঘ্রই আমরা আপনার মোবাইলে এসএমএস-এর মাধ্যমে পরবর্তী পদক্ষেপ জানিয়ে দেব।
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-[#14281D] text-[#E2D4B9] py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
          >
            ধন্যবাদ
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-40 lg:h-48 bg-gradient-to-r from-emerald-800 to-teal-900 flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-14 h-14 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <SquarePen size={32} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-black">ভর্তি ফর্ম</h1>
            <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">২০২৬ শিক্ষাবর্ষ</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-12 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl border border-[#14281D]/5 w-full max-w-3xl space-y-12"
        >
          {/* Header */}
          <div className="flex items-center gap-4 pb-6 border-b-2 border-dashed border-[#14281D]/10">
            <div className="w-12 h-12 bg-[#14281D]/5 text-[#14281D] rounded-2xl flex items-center justify-center">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#14281D]">আবেদনকারীর তথ্য</h2>
              <p className="text-sm font-medium text-[#14281D]/40 mt-1">সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Full Name */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <User size={14} className="text-amber-600" /> আবেদনকারীর নাম (পূর্ণ)
              </label>
              <input 
                required
                type="text" 
                placeholder="যেমন: মুহাম্মদ রহিম"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
              />
            </div>

            {/* Fathers Name */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <UserCheck size={14} className="text-amber-600" /> পিতার নাম
              </label>
              <input 
                required
                type="text" 
                placeholder="যেমন: আব্দুল করিম"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
              />
            </div>

            {/* Mother's Name */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <UserCheck size={14} className="text-amber-600" /> মাতার নাম
              </label>
              <input 
                required
                type="text" 
                placeholder="যেমন: রহিমা বেগম"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
              />
            </div>

            {/* DOB */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <Calendar size={14} className="text-amber-600" /> জন্ম তারিখ
              </label>
              <input 
                required
                type="date" 
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all appearance-none"
              />
            </div>

            {/* Gender */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider">লিঙ্গ</label>
              <div className="flex gap-4">
                <label className="flex-1 bg-[#14281D]/5 p-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer group hover:bg-[#14281D]/10 transition-colors">
                  <input type="radio" name="gender" className="w-5 h-5 accent-[#14281D]" defaultChecked />
                  <span className="font-bold">পুরুষ</span>
                </label>
                <label className="flex-1 bg-[#14281D]/5 p-4 rounded-2xl flex items-center justify-center gap-3 cursor-pointer group hover:bg-[#14281D]/10 transition-colors">
                  <input type="radio" name="gender" className="w-5 h-5 accent-[#14281D]" />
                  <span className="font-bold">মহিলা</span>
                </label>
              </div>
            </div>

            {/* Mobile */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <Phone size={14} className="text-amber-600" /> মোবাইল নম্বর
              </label>
              <input 
                required
                type="tel" 
                placeholder="০১৭XXXXXXXX"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} className="text-amber-600" /> ইমেইল (ঐচ্ছিক)
              </label>
              <input 
                type="email" 
                placeholder="example@gmail.com"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
              />
            </div>

            {/* Course Selection */}
            <div className="space-y-3">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={14} className="text-amber-600" /> পছন্দের কোর্স
              </label>
              <div className="relative">
                <select className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all appearance-none pr-10 cursor-pointer">
                  <option value="">নির্বাচন করুন</option>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14281D]/40 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} className="text-amber-600" /> বর্তমান ঠিকানা
              </label>
              <textarea 
                required
                rows={3}
                placeholder="আপনার পূর্ণ ঠিকানা লিখুন"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all resize-none"
              />
            </div>

            {/* Education */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider flex items-center gap-2">
                <University size={14} className="text-amber-600" /> সর্বোচ্চ শিক্ষাগত যোগ্যতা
              </label>

              <input 
                type="text" 
                placeholder="যেমন: দাখিল, আলিম, এসএসসি"
                className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
              />
            </div>

            {/* Quran Proficiency */}
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-wider">কুরআন সম্পর্কিত দক্ষতা</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {proficiencies.map(p => (
                  <label key={p.id} className="flex items-center gap-3 p-4 bg-[#14281D]/5 rounded-2xl cursor-pointer hover:bg-[#14281D]/10 transition-colors">
                    <input type="checkbox" className="w-5 h-5 accent-[#14281D]" />
                    <span className="text-xs font-bold leading-tight">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Declaration */}
            <div className="md:col-span-2 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
              <input required type="checkbox" className="w-6 h-6 accent-[#14281D] shrink-0 mt-1" />
              <p className="text-sm font-medium text-amber-900 leading-relaxed">
                আমি ঘোষণা করছি যে উপরে প্রদত্ত সকল তথ্য সঠিক এবং আমি দারুল ইসলাম ইনস্টিটিউটের সকল নিয়ম কানুন মেনে চলব।
              </p>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-6">
              <button 
                type="submit"
                className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
              >
                আবেদন জমা দিন <Send size={24} />
              </button>
              <p className="text-center text-[10px] font-bold text-[#14281D]/40 uppercase tracking-widest mt-4">
                আবেদনের পর পরবর্তী পদক্ষেপসমূহ ফোনের মাধ্যমে জানানো হবে।
              </p>
            </div>
          </form>
        </motion.div>

        {/* Quick Info */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-[#14281D]/5">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#14281D]/40">ভর্তির শেষ তারিখ</p>
              <p className="text-xl font-black text-[#14281D]">১৫ মার্চ ২০২৬</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4 border border-[#14281D]/5">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#14281D]/40">হেল্পলাইন</p>
              <p className="text-xl font-black text-[#14281D]">০১৭১২-৩৪৫৬৭৮</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
