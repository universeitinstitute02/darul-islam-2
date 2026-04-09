"use client"

import { useState, useEffect } from "react"
import { 
  Sun, 
  Moon, 
  MapPin, 
  Bell, 
  Search, 
  BookOpen, 
  Book as BookIcon, 
  FileText, 
  Lightbulb, 
  Globe, 
  Heart, 
  ArrowRight,
  ChevronRight,
  ChevronLeft

} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=800&h=400&fit=crop",
    title: "যাকাত ও ফিতরা",
    subtitle: "আদায়ের সুন্নাহ পদ্ধতি",
    desc: "দুস্থদের পাশে দাঁড়ানো এবং ইসলামের অন্যতম স্তম্ভ আদায়ের বিস্তারিত নির্দেশিকা।"
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    title: "ঈদের আমল",
    subtitle: "সঠিক নিয়মে সুন্নাত পালন",
    desc: "প্রস্তুতি এবং ঈদের দিনের আমল সম্পর্কে সঠিক ও নির্ভরযোগ্য তথ্য জানুন।"
  }
]

const ilmCategories = [
  { name: "কুরআন", emoji: "📖", icon: BookOpen },
  { name: "কিতাব", emoji: "📚", icon: BookIcon },
  { name: "হাদীস", emoji: "🕌", icon: FileText },
  { name: "প্রবন্ধ", emoji: "📝", icon: FileText },
  { name: "রওয়ান", emoji: "💡", icon: Lightbulb },
  { name: "কুরআন শিক্ষা", emoji: "📖", icon: BookOpen },
  { name: "নামায শিক্ষা", emoji: "🕋", icon: BookIcon },
]

const amalCategories = [
  { name: "নামাযের সময়", emoji: "🌍", icon: Sun },
  { name: "তিলাওয়াত", emoji: "📖", icon: BookOpen },
  { name: "দু'আ", emoji: "🤲", icon: Heart },

  { name: "তারাবীহ", emoji: "🌙", icon: Moon },
]

export default function LibraryPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Top Header/Status section (Mobile friendly) */}
      <section className="px-4 py-4 max-w-screen-xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-[#14281D]/10 backdrop-blur-sm">
          <ChevronRight size={14} className="text-[#14281D]/40" />
          <span className="text-sm font-bold text-[#14281D]">মাৎ-০৪</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-amber-600 hover:scale-110 transition-transform">
            <Bell size={20} fill="currentColor" stroke="none" />
          </button>
          <div className="flex items-center gap-2 bg-[#14281D] text-[#E2D4B9] px-4 py-1.5 rounded-full text-xs font-bold border border-[#30360E]">
            <MapPin size={12} /> ঢাকা ১২২১ <ChevronRight size={10} className="rotate-90" />
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-[#14281D] rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
            👨
          </div>
        </div>
      </section>

      {/* Prayer Time & Islamic Calendar Card */}
      <section className="px-4 py-2 max-w-screen-xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#14281D]/5 shadow-xl shadow-[#14281D]/5 relative overflow-hidden"
        >
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 p-8 text-[#14281D]/5">
            <Moon size={120} fill="currentColor" />
          </div>

          <div className="relative z-10 space-y-6 text-center">
            <div className="space-y-1">
              <h2 className="text-xl lg:text-2xl font-black text-[#14281D]">
                ১৪ রমাযান ১৪৪৭ হিঃ ইসলামুল আরবিয়া 🌙
              </h2>
              <p className="text-xs font-medium text-[#14281D]/40">
                বুধবার, ১৯ ফাল্গুন ১৪৩২ বঙ্গাব্দ, বসন্তকাল
              </p>
            </div>

            {/* Sun times visualization */}
            <div className="flex items-center justify-around gap-4 py-4 border-y border-[#14281D]/5">
              <div className="flex flex-col items-center gap-1">
                <Sun size={28} className="text-amber-500" />
                <span className="text-lg font-black text-[#14281D]">৬:०৮</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#14281D]/40">সূর্যোদয় শেষ</span>
              </div>

              <div className="flex-1 max-w-[120px] flex flex-col items-center gap-1 relative">
                <div className="text-xs font-black text-[#14281D] bg-[#E2D4B9] px-3 py-1 rounded-full">১২:০৮</div>
                <div className="w-full h-0.5 bg-[#14281D]/10 relative mt-2">
                    <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full border border-white" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#14281D]/40 mt-1">মধ্যাহ্ন</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Moon size={28} className="text-[#14281D]" />
                <span className="text-lg font-black text-[#14281D]">৬:०২</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#14281D]/40">ইফতার</span>
              </div>
            </div>

            {/* Prayer specific progress */}
            <div className="bg-[#14281D]/5 rounded-2xl p-4 text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-black text-[#14281D]">যুহর</span>
                </div>
                <span className="text-xs font-bold text-[#14281D]">১২:১১ - ০৪:২৬</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-[#14281D] w-[45%]" />
              </div>
              <p className="text-[10px] font-bold text-[#14281D]/40 text-right uppercase tracking-wider">
                ২ ঘণ্টা ৪৭ মিনিট বাকি
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Banner Carousel */}
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
      <main className="px-4 pb-20 space-y-12 max-w-screen-xl mx-auto w-full">
        
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

      </main>
    </div>
  )
}
