"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Star, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─────────────── DATA ─────────────── */

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=900",
    tag: "জ্ঞান",
    title: "যাকাত ও ফিতরা",
    subtitle: "ইসলামের অন্যতম স্তম্ভ সম্পর্কে জানুন",
  },
  {
    image: "https://images.unsplash.com/photo-1564769610726-59cead6a6f8f?w=900",
    tag: "আমল",
    title: "ঈদের সুন্নাহ",
    subtitle: "ঈদের দিনের সঠিক আমলসমূহ",
  },
  {
    image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=900",
    tag: "দু'আ",
    title: "রমাদানের বিশেষ দু'আ",
    subtitle: "প্রতিটি মুহূর্তের জন্য নির্বাচিত দু'আ",
  },
];

const ilmCategories = [
  { name: "কুরআন", emoji: "📖", color: "#1a4731", light: "#e8f5ee" },
  { name: "হাদীস", emoji: "🕌", color: "#2d3a1e", light: "#edf0e8" },
  { name: "কিতাব", emoji: "📚", color: "#3b2a0f", light: "#f5ede0" },
  { name: "প্রবন্ধ", emoji: "📝", color: "#0f2b3b", light: "#e0edf5" },
];

const amalCategories = [
  { name: "নামায", emoji: "🕋", color: "#1e2d3a", light: "#e0eaf5" },
  { name: "দু'আ", emoji: "🤲", color: "#2a1e3a", light: "#ede0f5" },
  { name: "তারাবীহ", emoji: "🌙", color: "#1a3a2a", light: "#e0f5ea" },
];

/* ─────────────── COMPONENT ─────────────── */

export default function ContentSections() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* Slider auto-advance */
  useEffect(() => {
    const t = setInterval(
      () => setCurrentSlide((p) => (p + 1) % bannerSlides.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ── BANNER SLIDER ── */}
        <section>
          <div className="relative h-60 md:h-80 lg:h-[400px] rounded-[2rem] overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={bannerSlides[currentSlide].image}
                  alt="banner"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                  <motion.span
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xs md:text-sm bg-amber-400 text-amber-950 font-bold px-4 py-1.5 rounded-full mb-4 inline-block shadow-lg"
                  >
                    {bannerSlides[currentSlide].tag}
                  </motion.span>
                  <motion.h3
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white font-bold text-3xl md:text-5xl leading-tight"
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/80 text-base md:text-xl mt-3 max-w-2xl"
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-8 right-8 flex gap-2.5">
              {bannerSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-500 rounded-full ${
                    i === currentSlide
                      ? "w-10 h-2 bg-white shadow-md"
                      : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── ইলম ── */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-2xl md:text-3xl tracking-tight">
              ইলম
            </h3>
            <button className="text-sm font-semibold text-[#1a4731] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-1">
              সব দেখুন <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ilmCategories.map((c, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                }}
                className="bg-white border border-gray-100 rounded-3xl p-6 flex items-center gap-5 text-left shadow-sm transition-all hover:border-[#1a4731]/10"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner"
                  style={{ background: c.light }}
                >
                  {c.emoji}
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">{c.name}</p>
                  <p className="text-xs text-[#1a4731] mt-1 font-bold tracking-widest uppercase opacity-70">
                    পড়ুন →
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── আমল ── */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-2xl md:text-3xl tracking-tight">
              আমল
            </h3>
            <button className="text-sm font-semibold text-[#1a4731] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-1">
              সব দেখুন <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {amalCategories.map((c, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                }}
                className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-sm transition-all hover:border-[#1a4731]/10"
              >
                <div
                  className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl shadow-inner"
                  style={{ background: c.light }}
                >
                  {c.emoji}
                </div>
                <p className="font-bold text-base md:text-lg text-gray-800 text-center">
                  {c.name}
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── Daily Ayah Card ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a4731] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-10 -right-10 text-white/5 text-[15rem] font-bold select-none leading-none">
            "
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm text-amber-300 font-black mb-6 flex items-center justify-center gap-3 uppercase tracking-[0.3em]">
              <span className="h-px w-8 bg-amber-300/30"></span>
              <Star size={16} className="fill-amber-300" /> আজকের আয়াত
              <span className="h-px w-8 bg-amber-300/30"></span>
            </p>
            <p
              className="text-3xl md:text-5xl leading-relaxed text-white mb-8 font-serif italic"
              dir="rtl"
            >
              إِنَّ مَعَ الْعُسْرِ يُسْرًا
            </p>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
                "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে।"
              </p>
              <p className="text-sm md:text-base text-white/40 font-semibold tracking-widest uppercase">
                — সূরা ইনশিরাহ: ৬
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── FLOAT SEARCH ── */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-16 h-16 bg-[#1a4731] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 group overflow-hidden"
          style={{ boxShadow: "0 15px 40px rgba(26,71,49,0.3)" }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Search size={28} className="relative z-10" />
        </motion.button>
      </div>
    </div>
  );
}
