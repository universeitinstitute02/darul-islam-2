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
    <section className="relative h-[150px] md:h-[300px] lg:h-[500px] overflow-hidden">
      
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14281D]/90 via-[#14281D]/60 to-transparent z-10" />

          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-screen-xl mx-auto w-full px-3 lg:px-8">
              <div className="max-w-2xl space-y-2 lg:space-y-2">

                {/* Tag */}
                <span className="inline-block bg-[#87F56] text-[#14281D] px-2 py-0.5 lg:px-4 lg:py-1 rounded-full font-bold text-[10px] lg:text-base">
                  {slide.tag}
                </span>

                {/* Title */}
                <h1 className="text-sm sm:text-base lg:text-7xl font-black text-white leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-[10px] sm:text-xs lg:text-2xl font-medium leading-tight lg:leading-relaxed text-[#E2D4B9] opacity-90">
                  {slide.subtitle}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 lg:gap-4 pt-1">
                  <Link
                    href="/admission"
                    className="bg-red-600 text-white px-3 py-1.5 lg:px-8 lg:py-4 rounded-md lg:rounded-xl font-bold flex items-center justify-center gap-1 lg:gap-2 text-[10px] lg:text-base transition-all hover:translate-y-[-2px]"
                  >
                    ভর্তি হতে ক্লিক করুন <PlayCircle size={16} />
                  </Link>

                  <Link
                    href="/courses"
                    className="bg-green-400 text-white border-2 border-white/20 px-3 py-1.5 lg:px-8 lg:py-4 rounded-md lg:rounded-xl font-bold flex items-center justify-center gap-1 lg:gap-2 text-[10px] lg:text-base transition-all"
                  >
                    কোর্সসমূহ দেখুন <BookOpen size={16} />
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
        className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-2 lg:p-3 rounded-full text-white backdrop-blur-md transition-all hidden lg:block"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-2 lg:p-3 rounded-full text-white backdrop-blur-md transition-all hidden lg:block"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1 lg:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 lg:h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-[#87F56] w-4 lg:w-8"
                : "bg-white/30 w-2 lg:w-3"
            }`}
          />
        ))}
      </div>
    </section>
  )
}