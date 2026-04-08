"use client"

import { useState } from "react"
import { 
  University, 
  Users, 
  BookOpen, 
  Building2, 
  Crown, 
  Clock, 
  Calendar, 
  Armchair, 
  Layers, 
  Scroll, 
  Languages, 
  Scale, 
  Book, 
  Mic, 
  DoorOpen, 
  UserRound,
  ArrowRight,
  LucideIcon

} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const stats = [
  { label: "শিক্ষার্থী", count: "৩৫০+", icon: Users },
  { label: "শিক্ষক", count: "২৫", icon: UserRound },

  { label: "কোর্স", count: "১৮", icon: BookOpen },
  { label: "বিভাগ", count: "৬", icon: Building2 },
]

const categories = [
  { name: "সকল", icon: Layers },

  { name: "কুরআন", icon: BookOpen },
  { name: "হাদিস", icon: Scroll },
  { name: "আরবি", icon: Languages },
  { name: "ফিকহ", icon: Scale },
  { name: "তাফসির", icon: Book },
]

const courses = [
  {
    title: "হিফযুল কুরআন",
    type: "হিফয",
    duration: "২ বছর",
    desc: "তাজবীদ সহ সম্পূর্ণ কুরআন মুখস্থ",
    price: "বিনামূল্যে",
    seats: "২৫ আসন",
    icon: BookOpen
  },
  {
    title: "আলিম কোর্স",
    type: "আলিম",
    duration: "৬ বছর",
    desc: "হাদিস, ফিকহ, তাফসির, আরবি",
    price: "মাসিক ৫০০৳",
    seats: "৪০ আসন",
    icon: University

  },
  {
    title: "আরবি ভাষা কোর্স",
    type: "আরবি",
    duration: "১ বছর",
    desc: "গ্রামার ও স্পোকেন আরবি",
    price: "মাসিক ৩০০৳",
    seats: "৩০ আসন",
    icon: Languages
  },
  {
    title: "তাজবীদ ও কিরাত",
    type: "তাজবীদ",
    duration: "৬ মাস",
    desc: "প্রাকটিক্যাল তাজবীদ",
    price: "মাসিক ২০০৳",
    seats: "২০ আসন",
    icon: Mic

  },
  {
    title: "ফিকহুল ইবাদাত",
    type: "ফিকহ",
    duration: "১ বছর",
    desc: "তাহারাহ, সালাত, সিয়াম",
    price: "মাসিক ২৫০৳",
    seats: "৩৫ আসন",
    icon: Scale
  },
  {
    title: "তাফসিরুল কুরআন",
    type: "তাফসির",
    duration: "২ বছর",
    desc: "সূরা বাকারা ও অন্যান্য",
    price: "মাসিক ৪০০৳",
    seats: "২৫ আসন",
    icon: Book
  }
]

const admissionDates = [
  { name: "হিফয", date: "১৫ মার্চ", icon: BookOpen },
  { name: "আলিম", date: "২০ মার্চ", icon: University },

  { name: "আরবি", date: "২৫ মার্চ", icon: Languages },
  { name: "তাজবীদ", date: "১ এপ্রিল", icon: Mic },

]

const faculty = [
  { name: "মাওলানা আব্দুর রহিম", dept: "হিফয বিভাগ" },
  { name: "উস্তাদা ফাতেমা", dept: "আরবি বিভাগ" },
  { name: "ড. মুহাম্মদ ইউসুফ", dept: "হাদিস বিভাগ" },
  { name: "উস্তাদা আয়েশা", dept: "তাজবীদ বিভাগ" },
]

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("সকল")

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-gradient-to-br from-emerald-800 to-teal-900 flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
              <University size={40} />

            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-black">ইসলামী শিক্ষা</h1>
              <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">জ্ঞান অর্জন প্রতিটি মুসলিমের উপর ফরজ</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/5 whitespace-nowrap">৩৫০+ শিক্ষার্থী</span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/5 whitespace-nowrap">১৮ কোর্স</span>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-12 space-y-12">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-xl border border-[#14281D]/5 text-center space-y-2 group hover:bg-[#14281D] hover:text-[#E2D4B9] transition-all"
            >
              <s.icon size={32} className="mx-auto text-amber-600 group-hover:text-[#87F56] transition-colors" />
              <p className="text-2xl font-black">{s.count}</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">{s.label}</p>
            </motion.div>
          ))}
        </section>

        {/* Featured Program */}
        <section className="relative rounded-[2.5rem] bg-[#14281D] overflow-hidden shadow-2xl p-8 lg:p-12 text-white">
          <div className="absolute top-0 right-0 p-12 text-white/5 rotate-12">
            <Crown size={200} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#87F56] rounded-3xl flex items-center justify-center text-[#14281D] shadow-xl shrink-0">
              <BookOpen size={64} />
            </div>
            <div className="space-y-6 flex-1 text-center lg:text-left">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#87F56]/20 text-[#87F56] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  <Crown size={14} /> বিশেষ প্রোগ্রাম
                </div>
                <h2 className="text-3xl lg:text-5xl font-black">হিফযুল কুরআন</h2>
                <p className="text-[#E2D4B9] text-xl font-medium mt-2">২ বছর • পূর্ণ সময়</p>
              </div>
              <p className="text-[#E2D4B9]/80 text-lg leading-relaxed max-w-2xl">
                পূর্ণ সময়ের হিফয প্রোগ্রাম। তাজবীদ সহ সম্পূর্ণ কুরআন মুখস্থ করার সুযোগ। অভিজ্ঞ শিক্ষকগণ ও ব্যক্তিগত তত্ত্বাবধান।
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-1">
                  <Clock size={20} className="text-[#87F56]" />
                  <p className="text-xs font-bold uppercase tracking-tighter opacity-40">ভর্তি</p>
                  <p className="font-black">চলছে</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-1">
                  <Calendar size={20} className="text-[#87F56]" />
                  <p className="text-xs font-bold uppercase tracking-tighter opacity-40">শুরু</p>
                  <p className="font-black">১৫ মার্চ</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-1">
                  <Armchair size={20} className="text-[#87F56]" />
                  <p className="text-xs font-bold uppercase tracking-tighter opacity-40">আসন</p>
                  <p className="font-black">২৫</p>
                </div>
              </div>
              <button className="bg-[#87F56] text-[#14281D] px-10 py-4 rounded-full font-black text-lg transition-all hover:scale-105 shadow-lg">
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-[#14281D] flex items-center gap-3">
            <Layers className="text-amber-600" /> কোর্স ক্যাটাগরি

          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(cat.name)}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-bold whitespace-nowrap transition-all border ${
                  activeTab === cat.name 
                    ? "bg-[#14281D] text-[#E2D4B9] border-[#14281D] shadow-lg" 
                    : "bg-white text-[#14281D]/60 border-[#14281D]/5 hover:bg-white/80"
                }`}
              >
                <cat.icon size={18} /> {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Courses Grid */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-[#14281D] flex items-center gap-3">
            <BookOpen className="text-amber-600" /> আমাদের কোর্স সমূহ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-6 flex items-center gap-6 shadow-xl border border-[#14281D]/5 group hover:border-[#14281D] transition-all"
              >
                <div className="w-24 h-24 bg-[#14281D]/5 rounded-3xl flex items-center justify-center text-[#14281D] group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all duration-300">
                  <c.icon size={48} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-700 px-3 py-1 rounded-full">{c.type}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-[#14281D]/5 text-[#14281D]/60 px-3 py-1 rounded-full">{c.duration}</span>
                  </div>
                  <h4 className="text-xl font-black text-[#14281D]">{c.title}</h4>
                  <p className="text-xs font-medium text-[#14281D]/50">{c.desc}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-black text-[#14281D]">{c.price}</span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">{c.seats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Admission Panel */}
        <section className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl border-4 border-amber-100 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
              <DoorOpen size={32} />
            </div>
            <h3 className="text-2xl font-black text-[#14281D]">ভর্তি চলছে</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {admissionDates.map((item, i) => (
              <div key={i} className="bg-[#FFFCDC] p-6 rounded-3xl text-center space-y-2 border border-[#14281D]/5 shadow-sm">
                <item.icon size={28} className="mx-auto text-amber-600" />
                <p className="font-black text-[#14281D]">{item.name}</p>
                <p className="text-xs font-bold text-[#14281D]/40">{item.date}</p>
              </div>
            ))}
          </div>

          <Link href="/admission" className="block">
            <button className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
              ভর্তি ফর্ম পূরণ করুন <ArrowRight />
            </button>
          </Link>
        </section>

        {/* Faculty */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-[#14281D] flex items-center gap-3">
            <UserRound className="text-amber-600" /> আমাদের শিক্ষকগণ
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-4 -mx-4 lg:-mx-0">
            {faculty.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-xl min-w-[200px] text-center space-y-4 border border-[#14281D]/5 group hover:-translate-y-1 transition-transform">
                <div className="w-24 h-24 bg-[#14281D]/5 rounded-full mx-auto flex items-center justify-center text-[#14281D] group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all">
                  <UserRound size={48} />
                </div>
                <div>
                  <h4 className="font-black text-[#14281D]">{f.name}</h4>

                  <p className="text-xs font-bold text-[#14281D]/40 uppercase tracking-widest">{f.dept}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
