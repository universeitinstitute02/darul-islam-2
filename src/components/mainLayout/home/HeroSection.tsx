"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, PlayCircle, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "../../shared/spinner/LoadingSpinner";

// 🎯 আপনার প্রজেক্টের একচুয়াল হুক ইমপোর্ট (প্রয়োজনে আপনার সঠিক ফোল্ডার পাথটি মিলিয়ে নিন)
import useUser from "@/src/app/hooks/useUser";
import useUserRole from "@/src/app/hooks/useUserRole";

type SlideType = {
  _id: string;
  pageName: string;
  badgeText: string;
  title: string;
  subtitle: string;
  image: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  isActive: boolean;
};

const fetchHeroSliders = async (): Promise<SlideType[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/content/sliders`,
  );
  return res.data.filter(
    (slide: SlideType) =>
      slide.pageName === "landing" && slide.isActive !== false,
  );
};

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🎯 আপনার কাস্টম হুক থেকে ইউজার এবং রোল স্টেট স্ট্রাকচার এক্সট্রাক্ট করা হলো
  const { data: user } = useUser();
  const { role: userRole } = useUserRole();

  const {
    data: slides = [],
    isLoading,
    isError,
  } = useQuery<SlideType[]>({
    queryKey: ["publicHeroSliders"],
    queryFn: fetchHeroSliders,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError || slides.length === 0) {
    return null;
  }

  // 🎯 কন্ডিশনাল বাটন ডিস্ট্রিবিউটর লজিক
  const getPrimaryButtonConfig = (slide: SlideType) => {
    if (user) {
      // ১. ইউজার যদি এডমিন হন
      if (userRole === "admin") {
        return {
          text: "ড্যাশবোর্ডে যান",
          link: "/dashboard/admin",
        };
      }

      // ২. ইউজার যদি শিক্ষক হন
      if (userRole === "teacher") {
        return {
          text: "ড্যাশবোর্ডে যান",
          link: "/dashboard/teacher",
        };
      }

      // ৩. ইউজার যদি ছাত্র (Student) হন বা অন্য কোনো রোল
      return {
        text: "ক্লাসে যোগ দিন",
        link: "/my-course",
      };
    }

    // ৪. ইউজার লগইন না থাকলে অরিজিনাল অ্যাডমিশন ডাটা রেন্ডার হবে
    return {
      text: slide.primaryBtnText || "ভর্তি হতে ক্লিক করুন",
      link: slide.primaryBtnLink || "/admission",
    };
  };

  return (
    <section className="relative h-[220px] md:h-[300px] lg:h-[500px] mt-16 lg:mt-18 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => {
        const primaryBtn = getPrimaryButtonConfig(slide);

        return (
          <div
            key={slide._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2E]/92 via-[#0B3D2E]/62 to-transparent z-10" />

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
                  {slide.badgeText && (
                    <span className="inline-block bg-[#22c55e] text-white px-2 py-0.5 lg:px-4 lg:py-1 rounded-full font-bold text-[10px] lg:text-base">
                      {slide.badgeText}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="text-2xl sm:text-base lg:text-7xl font-black text-white leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-[10px] sm:text-xs lg:text-2xl font-medium leading-tight lg:leading-relaxed text-[#F5EFE1] opacity-90">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-2 lg:gap-4 pt-1">
                    {slide.primaryBtnText && (
                      <Link
                        href={primaryBtn.link}
                        className="bg-[#0B5D3B] text-white px-3 py-1.5 lg:px-8 lg:py-4 rounded-md lg:rounded-xl font-bold flex items-center justify-center gap-1 lg:gap-2 text-[10px] lg:text-base transition-all hover:bg-[#0B3D2E] hover:translate-y-[-2px]"
                      >
                        {primaryBtn.text} <PlayCircle size={16} />
                      </Link>
                    )}

                    {slide.secondaryBtnText && (
                      <Link
                        href={slide.secondaryBtnLink || "/courses"}
                        className="bg-white/15 text-white border-2 border-white/30 px-3 py-1.5 lg:px-8 lg:py-4 rounded-md lg:rounded-xl font-bold flex items-center justify-center gap-1 lg:gap-2 text-[10px] lg:text-base transition-all hover:bg-white/25"
                      >
                        {slide.secondaryBtnText} <BookOpen size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      {slides.length > 1 && (
        <>
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
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-2 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1 lg:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 lg:h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#22c55e] w-4 lg:w-8"
                  : "bg-white/30 w-2 lg:w-3"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
