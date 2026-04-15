"use client";

import { useState } from "react";
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
  LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "শিক্ষার্থী", count: "৩৫০+", icon: Users },
  { label: "শিক্ষক", count: "২৫", icon: UserRound },

  { label: "কোর্স", count: "১৮", icon: BookOpen },
  { label: "বিভাগ", count: "৬", icon: Building2 },
];

const categories = [
  { name: "সকল", icon: Layers },

  { name: "কুরআন", icon: BookOpen },
  { name: "হাদিস", icon: Scroll },
  { name: "আরবি", icon: Languages },
  { name: "ফিকহ", icon: Scale },
  { name: "তাফসির", icon: Book },
];

const courses = [
  {
    title: "হিফযুল কুরআন",
    type: "হিফয",
    duration: "২ বছর",
    desc: "তাজবীদ সহ সম্পূর্ণ কুরআন মুখস্থ",
    price: "বিনামূল্যে",
    seats: "২৫ আসন",
    icon: BookOpen,
  },
  {
    title: "আলিম কোর্স",
    type: "আলিম",
    duration: "৬ বছর",
    desc: "হাদিস, ফিকহ, তাফসির, আরবি",
    price: "মাসিক ৫০০৳",
    seats: "৪০ আসন",
    icon: University,
  },
  {
    title: "আরবি ভাষা কোর্স",
    type: "আরবি",
    duration: "১ বছর",
    desc: "গ্রামার ও স্পোকেন আরবি",
    price: "মাসিক ৩০০৳",
    seats: "৩০ আসন",
    icon: Languages,
  },
  {
    title: "তাজবীদ ও কিরাত",
    type: "তাজবীদ",
    duration: "৬ মাস",
    desc: "প্রাকটিক্যাল তাজবীদ",
    price: "মাসিক ২০০৳",
    seats: "২০ আসন",
    icon: Mic,
  },
  {
    title: "ফিকহুল ইবাদাত",
    type: "ফিকহ",
    duration: "১ বছর",
    desc: "তাহারাহ, সালাত, সিয়াম",
    price: "মাসিক ২৫০৳",
    seats: "৩৫ আসন",
    icon: Scale,
  },
  {
    title: "তাফসিরুল কুরআন",
    type: "তাফসির",
    duration: "২ বছর",
    desc: "সূরা বাকারা ও অন্যান্য",
    price: "মাসিক ৪০০৳",
    seats: "২৫ আসন",
    icon: Book,
  },
];

const admissionDates = [
  { name: "হিফয", date: "১৫ মার্চ", icon: BookOpen },
  { name: "আলিম", date: "২০ মার্চ", icon: University },

  { name: "আরবি", date: "২৫ মার্চ", icon: Languages },
  { name: "তাজবীদ", date: "১ এপ্রিল", icon: Mic },
];

const faculty = [
  { name: "মাওলানা আব্দুর রহিম", dept: "হিফয বিভাগ" },
  { name: "উস্তাদা ফাতেমা", dept: "আরবি বিভাগ" },
  { name: "ড. মুহাম্মদ ইউসুফ", dept: "হাদিস বিভাগ" },
  { name: "উস্তাদা আয়েশা", dept: "তাজবীদ বিভাগ" },
];

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("সকল");
  const [search, setSearch] = useState("");

  //  Filter + Search
  const filteredCourses = courses.filter((c) => {
    const matchCategory = activeTab === "সকল" || c.type === activeTab;

    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

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
              <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">
                জ্ঞান অর্জন প্রতিটি মুসলিমের উপর ফরজ
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/5 whitespace-nowrap">
              ৩৫০+ শিক্ষার্থী
            </span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/5 whitespace-nowrap">
              ১৮ কোর্স
            </span>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-12 space-y-12">
        <div className="min-h-screen bg-[#FFFCDC] px-4 py-10">
          {/* 🔍 Search */}
          <div className="max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="কোর্স খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-[#14281D]/10 outline-none focus:ring-2 focus:ring-[#14281D]"
            />
          </div>

          {/* Categories */}
          <section className=" space-y-6 mb-8 ">
            <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar pb-2">
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

          {/* 📚 Courses */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredCourses.map((c, i) => (
                <motion.div
                  key={c.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-3xl shadow-xl flex gap-4 items-center"
                >
                  <div className="w-20 h-20 bg-[#14281D]/10 rounded-2xl flex items-center justify-center">
                    <c.icon size={32} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-black text-lg">{c.title}</h3>
                    <p className="text-xs text-gray-500">{c.desc}</p>

                    <div className="flex justify-between mt-3 text-sm">
                      <span>{c.price}</span>
                      <span>{c.seats}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/*  Empty state */}
          {filteredCourses.length === 0 && (
            <p className="text-center mt-10 text-gray-500">
              কোন কোর্স পাওয়া যায়নি
            </p>
          )}
        </div>

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
              <div
                key={i}
                className="bg-[#FFFCDC] p-6 rounded-3xl text-center space-y-2 border border-[#14281D]/5 shadow-sm"
              >
                <item.icon size={28} className="mx-auto text-amber-600" />
                <p className="font-black text-[#14281D]">{item.name}</p>
                <p className="text-xs font-bold text-[#14281D]/40">
                  {item.date}
                </p>
              </div>
            ))}
          </div>

          <Link href="/admission" className="block">
            <button className="w-full cursor-pointer bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
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
              <div
                key={i}
                className="bg-white p-6 rounded-3xl shadow-xl min-w-[200px] text-center space-y-4 border border-[#14281D]/5 group hover:-translate-y-1 transition-transform"
              >
                <div className="w-24 h-24 bg-[#14281D]/5 rounded-full mx-auto flex items-center justify-center text-[#14281D] group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all">
                  <UserRound size={48} />
                </div>
                <div>
                  <h4 className="font-black text-[#14281D]">{f.name}</h4>

                  <p className="text-xs font-bold text-[#14281D]/40 uppercase tracking-widest">
                    {f.dept}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
