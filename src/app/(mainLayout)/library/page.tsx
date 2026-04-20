"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Bell,
  Search,
  Book as BookIcon,
  CloudSun,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* -------------------- STATIC DATA -------------------- */

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800",
    title: "যাকাত ও ফিতরা",
    subtitle: "আদায়ের সুন্নাহ পদ্ধতি",
    desc: "ইসলামের অন্যতম স্তম্ভ সম্পর্কে জানুন।",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    title: "ঈদের আমল",
    subtitle: "সঠিক নিয়মে পালন",
    desc: "ঈদের দিনের সুন্নাহসমূহ জানুন।",
  },
];

const ilmCategories = [
  { name: "কুরআন", emoji: "📖" },
  { name: "কিতাব", emoji: "📚" },
  { name: "হাদীস", emoji: "🕌" },
  { name: "প্রবন্ধ", emoji: "📝" },
  { name: "রওয়ান", emoji: "💡" },
  { name: "নামায শিক্ষা", emoji: "🕋" },
];

const amalCategories = [
  { name: "নামাযের সময়", emoji: "🌍" },
  { name: "দু'আ", emoji: "🤲" },
  { name: "তারাবীহ", emoji: "🌙" },
];

/* -------------------- COMPONENT -------------------- */

export default function LibraryPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [time, setTime] = useState(new Date());
const [data, setData] = useState<any>(null);
  const [weather, setWeather] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  /* -------------------- SLIDER -------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* -------------------- LIVE CLOCK -------------------- */
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  /* -------------------- FETCH DATA -------------------- */
  useEffect(() => {
    // Prayer + Hijri
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2`,
    )
      .then((res) => res.json())
      .then((res) => setData(res.data));

    // Weather
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=${API_KEY}&units=metric`,
    )
      .then((res) => res.json())
      .then((res) => setWeather(res));
  }, []);

  /* -------------------- NEXT PRAYER -------------------- */
  useEffect(() => {
    if (!data) return;

    const timings = data.timings;

    const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const now = new Date();
    let next = null;

    for (let p of prayers) {
      const [h, m] = timings[p].split(":");
      const t = new Date();
      t.setHours(h, m, 0);

      if (t > now) {
        next = { name: p, date: t };
        break;
      }
    }

    if (!next) {
      const [h, m] = timings.Fajr.split(":");
      const t = new Date();
      t.setDate(t.getDate() + 1);
      t.setHours(h, m, 0);
      next = { name: "Fajr", date: t };
    }

    setNextPrayer(next);

    const interval = setInterval(() => {
      const diff = next.date - new Date();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  const hijri = data.date.hijri;
  const gregorian = data.date.gregorian;
  const timings = data.timings;

  return (
    <div className="bg-[#FFFCDC] min-h-screen">
      {/* HEADER */}
      <section className="flex justify-between p-4">
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
          <MapPin size={14} /> ঢাকা
        </div>
        <Bell />
      </section>

      {/* ISLAMIC CARD */}
      <section className="p-4">
        <motion.div className="bg-white rounded-3xl p-6 shadow-xl space-y-5">
          <div className="text-center">
            <h2 className="font-bold text-xl">
              {hijri.day} {hijri.month.en} {hijri.year} AH 🌙
            </h2>
            <p className="text-sm text-gray-500">{gregorian.date}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">{time.toLocaleTimeString()}</p>

            <div className="flex items-center gap-2">
              <CloudSun />
              {weather ? (
                <div>
                  <p>{weather?.main?.temp}°C</p>
                  <p className="text-xs">
                    {weather?.weather?.[0]?.description}
                  </p>
                </div>
              ) : (
                <p className="text-xs">Loading...</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((p) => (
              <div key={p} className="bg-gray-100 p-2 rounded-xl text-center">
                <p className="text-sm font-bold">{p}</p>
                <p>{timings[p]}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-100 p-3 rounded-xl text-center">
            <p className="font-bold">Next: {nextPrayer?.name}</p>
            <p className="text-sm">{countdown}</p>
          </div>
        </motion.div>
      </section>

       <section className="px-4 py-8 max-w-screen-xl mx-auto w-full">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-56 lg:h-64 shadow-[#14281D]/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Image 
                src={bannerSlides[currentSlide].image} 
                alt={bannerSlides[currentSlide].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/90 via-amber-400/80 to-transparent p-8 lg:p-12 flex flex-col justify-center max-w-lg space-y-3">
                <h3 className="text-2xl font-black text-[#14281D]">{bannerSlides[currentSlide].title}</h3>
                <p className="text-sm font-bold text-[#14281D]">{bannerSlides[currentSlide].subtitle}</p>
                <p className="text-xs text-[#14281D]/70 font-medium leading-relaxed hidden lg:block">
                  {bannerSlides[currentSlide].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerSlides.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 transition-all rounded-full ${currentSlide === i ? "w-8 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Search Action */}
      <div className="fixed bottom-24 right-6 z-50">
        <button className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-600/40 hover:scale-110 active:scale-95 transition-all">
          <Search size={28} strokeWidth={3} />
        </button>
      </div>

      {/* Ilm & Amal Grids */}
  
        
        {/* Ilm Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#14281D] rounded-full" />
            <h3 className="text-xl font-black text-[#14281D]">ইলম</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ilmCategories.map((cat, i) => (
              <div 
                key={i}
                className="bg-white/60 p-6 rounded-3xl text-center border border-[#14281D]/5 hover:bg-[#14281D] hover:text-[#E2D4B9] group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>
                  <span className="text-sm font-bold">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Amal Section */}
        <section className="space-y-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
            <h3 className="text-xl font-black text-[#14281D]">আমল</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {amalCategories.map((cat, i) => (
              <div 
                key={i}
                className="bg-[#E2D4B9]/20 p-6 rounded-3xl text-center border border-[#14281D]/5 hover:bg-[#14281D] hover:text-[#E2D4B9] group transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </div>
                  <span className="text-sm font-bold">{cat.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      {/* FLOAT SEARCH */}
      <button className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full">
        <Search />
      </button>
    </div>
  );
}
