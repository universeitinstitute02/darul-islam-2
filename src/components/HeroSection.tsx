"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, PlayCircle, BookOpen } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    image: "https://i.ibb.co.com/wFj6PRdp/slider-1.webp",
    title: "শুদ্ধভাবে কুরআন শিক্ষা হোন সফল দুনিয়া ও আখিরাতে",
    subtitle: "সহজ পদ্ধতিতে তাজবীদসহ কুরআন শিক্ষা ও হিফজ প্রোগ্রাম",
    tag: "ভর্তি চলছে"
  },
  {
    image: "https://i.ibb.co.com/Sw8Byf5N/slider-2.webp",
    title: "ইলমে দ্বীন অর্জন হোক আপনার নিত্যদিনের সঙ্গী",
    subtitle: "আরবী ভাষা ও মৌলিক ইসলামি শিক্ষা কোর্স",
    tag: "নতুন ব্যাচ"
  },
  {
    image: "https://i.ibb.co.com/xSs952FC/slider-3.webp",
    title: "আধুনিক ও ইসলামি শিক্ষার এক অপূর্ব সমন্বয়",
    subtitle: "একটি আদর্শ মানুষ গড়ার অনন্য বিদ্যাপীঠ",
    tag: "২০২৬ শিক্ষাবর্ষ"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14281D]/90 via-[#14281D]/60 to-transparent z-10" />
          
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-screen-xl mx-auto w-full px-4 lg:px-8">
              <div className="max-w-2xl space-y-6">
                <span className="inline-block bg-[#87F56] text-[#14281D] px-4 py-1.5 rounded-full font-bold text-sm lg:text-base animate-bounce">
                  {slide.tag}
                </span>
                
                <h1 className="text-4xl lg:text-7xl font-black text-white leading-[1.15]">
                  {slide.title}
                </h1>
                <p className="text-[#E2D4B9] text-lg lg:text-2xl font-medium leading-relaxed opacity-90">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/admission" className="bg-[#87F56] text-[#14281D] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-islamic hover:translate-y-[-2px] transition-all">
                    ভর্তি হতে ক্লিক করুন <PlayCircle size={20} />
                  </Link>
                  <Link href="/courses" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                    কোর্সসমূহ দেখুন <BookOpen size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-md transition-all hidden lg:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-md transition-all hidden lg:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 cursor-pointer">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentSlide ? "bg-[#87F56] w-8" : "bg-white/30"}`}
          />
        ))}
      </div>
    </section>
  )
}
