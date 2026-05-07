"use client";
import { useState } from "react";
import {
  Search,
  Users,
  Clock,
  Play,
  Star,
  ArrowRight,
  University,
  BookMarked,
} from "lucide-react";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  "All",
  "Qur’an",
  "Hadith",
  "Arabic",
  "Tajweed",
  "Tafsir",
  "Aqeedah",
];

const courses = [
  {
    id: 1,
    title: "Quran Memorization (Hifz)",
    instructor: "Ustadh Amin",
    duration: "2 years",
    price: "Free",
    type: "Hifz",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    desc: "with Tajweed & Tafseer basics · full-time or part-time",
    seats: 32,
  },
  {
    id: 2,
    title: "Arabic Mastery (MSA & Quranic)",
    instructor: "Dr. Layth",
    duration: "1 year",
    price: "$120",
    type: "Arabic",
    image:
      "https://i.ibb.co.com/ccSX0XB2/web-madrasa-students-mahmud-hossain-opu-1.webp",
    desc: "Grammar, Balagha, and conversation with native curriculum",
    seats: 18,
  },
  {
    id: 3,
    title: "Fiqh of Worship (Hanafi)",
    instructor: "Sh. Tariq",
    duration: "6 months",
    price: "$75",
    type: "Fiqh",
    image:
      "https://i.ibb.co.com/vxMZtV5L/Madrasa-Madarsa-Boy-student-Muslim.avif",
    desc: "Tahara, Salah, Zakat, fasting – based on Nur al-Idah",
    seats: 25,
  },
];

const lectures = [
  { title: "Tafsir Surat Yaseen", episodes: "6 episodes" },
  { title: "40 Hadith Nawawi", episodes: "10 lessons" },
  { title: "Seerah of Prophet", episodes: "15 parts" },
  { title: "Arabaic for Beginners", episodes: "12 lessons" },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 lg:h-80 bg-[#14281D] overflow-hidden flex items-end pb-8">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 w-full relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-[#87F56] text-xs font-bold uppercase tracking-widest border border-white/5">
            <University size={14} /> Islamic Institute
          </div>

          <h1 className="text-3xl lg:text-5xl font-black text-white drop-shadow-lg">
            Seek knowledge <br className="hidden lg:block" /> from cradle to
            grave
          </h1>
          <div className="flex gap-4">
            <div className="bg-[#E2D4B9] text-[#14281D] px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
              📖 24 Courses
            </div>
            <div className="bg-white/10 text-[#E2D4B9] px-4 py-1.5 rounded-full text-xs font-bold border border-white/5 backdrop-blur-md">
              👥 400+ Students
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-4 -mt-8 relative z-20 max-w-screen-xl mx-auto w-full">
        <div className="bg-white p-3 rounded-2xl shadow-xl border border-[#14281D]/5 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl w-full border border-gray-100 focus-within:border-[#14281D]/20 transition-all">
            <Search size={20} className="text-[#14281D]/40" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm font-medium text-[#14281D]"
            />
          </div>
          <button className="bg-[#14281D] text-[#E2D4B9] px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 w-full md:w-auto shadow-md hover:bg-[#30360E] transition-all">
            Browse All
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? "bg-[#14281D] text-[#E2D4B9] border-[#14281D]"
                  : "bg-white text-[#14281D] border-[#14281D]/10 hover:border-[#14281D]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="px-4 py-10 lg:px-8 max-w-screen-xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#14281D] flex items-center gap-2">
              <Star size={20} className="text-yellow-500 fill-yellow-500" />{" "}
              Featured Courses
            </h2>
            <p className="text-sm text-[#14281D]/60 font-medium">
              Explore our top-rated islamic programs
            </p>
          </div>
          <button className="text-xs font-black text-[#14281D] flex items-center gap-1.5 hover:translate-x-1 transition-transform">
            See All <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#14281D]/5 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#14281D] text-[#E2D4B9] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  📖 {course.type}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#14281D] leading-tight group-hover:text-amber-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-[#14281D]/60 mt-2 font-medium leading-relaxed">
                    {course.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#14281D]/5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#14281D]/70 bg-[#E2D4B9]/30 px-3 py-1 rounded-full">
                    <Clock size={12} /> {course.duration}
                  </div>
                  <span className="text-lg font-black text-[#14281D]">
                    {course.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-2 text-[#14281D]/60 text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <Users size={14} /> {course.instructor}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookMarked size={14} /> {course.seats} seats left
                  </div>
                </div>

                <button className="w-full bg-[#14281D] text-[#E2D4B9] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#30360E] transition-all shadow-md">
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lecture Series Scroll */}
      <section className="px-4 py-12 lg:px-8 max-w-screen-xl mx-auto w-full bg-[#14281D]/5 rounded-[3rem] my-8">
        <h3 className="text-xl font-black text-[#14281D] mb-8 flex items-center gap-2">
          <Play size={20} fill="currentColor" stroke="none" /> Free Lecture
          Series
        </h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 lg:-mx-0 px-4 lg:px-0">
          {lectures.map((lec, i) => (
            <div
              key={i}
              className="shrink-0 w-[240px] bg-white p-4 rounded-3xl border border-[#14281D]/5 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-[#E2D4B9] rounded-2xl flex items-center justify-center text-[#14281D] mb-4 group-hover:bg-[#14281D] group-hover:text-white transition-colors duration-300">
                <Play size={24} fill="currentColor" stroke="none" />
              </div>
              <h4 className="font-bold text-[#14281D]">{lec.title}</h4>
              <p className="text-xs font-bold text-[#14281D]/40 uppercase tracking-widest mt-1">
                {lec.episodes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scholars Section */}
      <section className="px-4 py-12 lg:px-8 max-w-screen-xl mx-auto w-full text-center">
        <h3 className="text-xl font-black text-[#14281D] mb-8">
          Guided by Knowledgeable Scholars
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Sh. Ahmad", role: "Quran Expert", emoji: "👳🏽" },
            { name: "Ustadha Aisha", role: "Arabic Specialist", emoji: "🧕🏽" },
            { name: "Dr. Yusuf", role: "Fiqh Scholar", emoji: "👳🏽" },
          ].map((sch, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-[#E2D4B9] rounded-full flex items-center justify-center text-4xl shadow-islamic border-4 border-white">
                {sch.emoji}
              </div>
              <div>
                <h4 className="font-bold text-[#14281D]">{sch.name}</h4>
                <p className="text-xs font-medium text-[#14281D]/60">
                  {sch.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enrollment Steps */}
      <section className="px-4 py-16 lg:px-8 max-w-screen-xl mx-auto w-full">
        <h3 className="text-2xl font-black text-[#14281D] text-center mb-12">
          How to Enroll
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { step: 1, title: "Choose Course", desc: "Select your program" },
            { step: 2, title: "Fill Form", desc: "Enter your details" },
            { step: 3, title: "Interview", desc: "Short skill assessment" },
            { step: 4, title: "Start Class", desc: "Begin your journey" },
          ].map((s) => (
            <div
              key={s.step}
              className="flex flex-col items-center text-center gap-4 relative group"
            >
              <div className="w-12 h-12 bg-[#14281D] text-[#E2D4B9] rounded-full flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform z-10">
                {s.step}
              </div>
              <div>
                <h4 className="font-bold text-[#14281D]">{s.title}</h4>
                <p className="text-xs text-[#14281D]/40 font-bold uppercase tracking-widest">
                  {s.desc}
                </p>
              </div>
              {s.step < 4 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-dashed bg-[#14281D]/10 -z-0" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
