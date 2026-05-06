"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  BookOpen,
  BookText,
  PenTool,
  GraduationCap,
  School,
  Languages,
  Users,
  Heart,
} from "lucide-react";

import SectionHeading from "../../shared/SectionHeading";

const Course = () => {
  // Store the Icon components directly (without < />)
  const courses = [
    { icon: BookOpen, title: "নূরানী বিভাগ", sub: "সহজ কুরআন শিক্ষা" },
    { icon: BookText, title: "হিফজ বিভাগ", sub: "হিফজুল কুরআন" },
    { icon: PenTool, title: "কিতাব বিভাগ", sub: "দীনি শিক্ষা" },
    { icon: GraduationCap, title: "সাধারণ শিক্ষা", sub: "আধুনিক সমন্বয়" },
    { icon: School, title: "নাজেরা বিভাগ", sub: "শুদ্ধ তিলাওয়াত" },
    { icon: Languages, title: "আরবি ভাষা", sub: "কথোপকথন" },
    { icon: Users, title: "বয়স্ক শিক্ষা", sub: "বুনিয়াদী কোর্স" },
    { icon: Heart, title: "মহিলা শাখা", sub: "দীনি তালীম" },
  ];

  return (
<<<<<<< HEAD
    <div className="bg-[#f8fafc] py-6 md:py-12">
      <section className="px-4 max-w-7xl mx-auto">
        <SectionHeading>কোর্সসমূহ</SectionHeading>

        <div className="relative pb-6 md:pb-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={15}
            slidesPerView={2.2}

=======
    <div className="pt-7 px-4">
      <div className="px-4 max-w-7xl mx-auto bg-gray-300 rounded-2xl p-4">
        <SectionHeading>কোর্সসমূহ</SectionHeading>

        {/* Wrapper to control pagination spacing */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
>>>>>>> a047d036378b791765388dc468366e09e6fcd6b5
            loop={true}
            centeredSlides={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".custom-pagination",
            }}
            breakpoints={{
              320: { slidesPerView: 2.2, spaceBetween: 12 },
              640: { slidesPerView: 3.2, spaceBetween: 15 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              1280: { slidesPerView: 6, spaceBetween: 20 },
            }}
            className="rounded-xl"
          >
            {courses.map((d, i) => {
              // Extract the component and capitalize it for React usage
              const Icon = d.icon;
              return (
                <SwiperSlide key={i} className="h-auto">
                  <div className="group flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 hover:border-green-300 transition-all duration-300 h-full">
                    <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                      {/* Render the icon directly with props */}
                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm md:text-base font-bold text-gray-800 leading-tight">
                        {d.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium line-clamp-1">
                        {d.sub}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="custom-pagination flex justify-center mt-4 md:mt-8"></div>
        </div>
      </section>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #16a34a !important;
          width: 24px !important;
          border-radius: 12px !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Course;
