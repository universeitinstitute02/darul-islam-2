"use client";

import { useState } from "react";
import {
  University,
  Users,
  BookOpen,
  Clock,
  Layers,
  Scroll,
  Languages,
  Scale,
  Book,
  Mic,
  DoorOpen,
  UserRound,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const courses = [
  {
    title: "হিফযুল কুরআন",
    slug: "hifzul-quran",
    category: "কুরআন",
    level: "Beginner",
    duration: "২ বছর",
    studentsCount: 120,
    description: "তাজবীদ সহ সম্পূর্ণ কুরআন মুখস্থ করার কোর্স",
    price: "ফ্রি",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800",
  },
  {
    title: "আলিম কোর্স",
    slug: "alim-course",
    category: "হাদিস",
    level: "Advanced",
    duration: "৬ বছর",
    studentsCount: 200,
    description: "হাদিস, ফিকহ, তাফসির ও আরবি ভাষার পূর্ণাঙ্গ কোর্স",
    price: "৫০০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800",
  },
  {
    title: "আরবি ভাষা কোর্স",
    slug: "arabic-language",
    category: "আরবি",
    level: "Intermediate",
    duration: "১ বছর",
    studentsCount: 90,
    description: "গ্রামার ও স্পোকেন আরবি শেখানো হয়",
    price: "৩০০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
  },
  {
    title: "ফিকহুল ইবাদাত",
    slug: "fiqh-course",
    category: "ফিকহ",
    level: "Beginner",
    duration: "১ বছর",
    studentsCount: 70,
    description: "তাহারাহ, সালাত, সিয়ামসহ ফিকহ শিক্ষা",
    price: "২৫০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
  },
  {
    title: "তাফসিরুল কুরআন",
    slug: "tafsir-course",
    category: "তাফসির",
    level: "Advanced",
    duration: "২ বছর",
    studentsCount: 60,
    description: "কুরআনের গভীর ব্যাখ্যা ও বিশ্লেষণ",
    price: "৪০০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1591608516485-aeecb8f0c7f6?q=80&w=800",
  },
];

const categories = [
  { name: "সকল", icon: Layers },
  { name: "কুরআন", icon: BookOpen },
  { name: "হাদিস", icon: Scroll },
  { name: "আরবি", icon: Languages },
  { name: "ফিকহ", icon: Scale },
  { name: "তাফসির", icon: Book },
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
    const matchCategory = activeTab === "সকল" || c.category === activeTab;

    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="flex flex-col min-h-screen mt-16 lg:mt-18">
      {/* Hero Section */}
      <div className="relative h-48 lg:h-64 bg-gradient-to-br from-emerald-800 to-teal-900 flex items-end p-6 lg:p-12 text-white overflow-hidden">
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
      </div>

      <div className="max-w-screen-xl mx-auto w-full px-4 space-y-12">
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
          <div className="space-y-6 mb-8">
            <div className="flex gap-2 lg:justify-center sm:gap-3 overflow-x-auto no-scrollbar pb-2 px-1 sm:px-0 snap-x snap-mandatory">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(cat.name)}
                  className={`snap-start flex items-center gap-2 sm:gap-3 
        px-4 sm:px-6 md:px-8 
        py-2.5 sm:py-3.5 
        rounded-full font-semibold sm:font-bold 
        whitespace-nowrap transition-all border text-sm sm:text-base
        
        ${
          activeTab === cat.name
            ? "bg-green-700 text-white border-green-700 shadow-md"
            : "bg-white text-gray-600 border-gray-200 hover:bg-green-50"
        }`}
                >
                  <cat.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* 📚 Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/education/${course.slug}`}
                  className="block h-full"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-green-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Badge */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">
                          {course.category}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold text-white ${
                            course.level === "Beginner"
                              ? "bg-green-500"
                              : course.level === "Intermediate"
                                ? "bg-green-600"
                                : "bg-green-800"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold mb-3">
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {course.studentsCount}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-2 group-hover:text-green-600">
                        {course.title}
                      </h3>

                      <p className="text-gray-500 text-sm mb-4">
                        {course.description}
                      </p>

                      <div className="mt-auto flex justify-between items-center">
                        <span className="font-bold text-green-700">
                          {course.price}
                        </span>

                        <span className="flex items-center gap-2 text-sm font-bold text-green-700">
                          বিস্তারিত
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
      </div>
    </section>
  );
}
