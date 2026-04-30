"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hujur1 from "../../../../public/images/hujur1.png";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SectionHeading = ({ children }) => (
  <div className="text-center mb-10">
    <h2 className="text-2xl md:text-3xl font-bold text-green-800 inline-block relative">
      {children}
      <span className="block h-1 bg-green-600 mt-2 mx-auto w-1/2 rounded-full" />
    </h2>
  </div>
);

const TeacherCard = ({ teacher }) => (
  // h-full নিশ্চিত করে যে সব কার্ড একই উচ্চতার হবে
  <div className="group flex flex-col items-center text-center gap-4 p-5 bg-white rounded-[2rem] border border-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(22,163,74,0.1)] hover:border-green-100 transition-all duration-500 h-full w-full">
    <div className="relative">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-green-50 overflow-hidden group-hover:scale-105 transition-transform duration-500 relative">
        <Image
          src={hujur1}
          alt={teacher.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100px, 150px"
        />
      </div>
      <div className="absolute inset-[-4px] rounded-full border-2 border-transparent group-hover:border-green-500/20 group-hover:scale-110 transition-all duration-500" />
    </div>

    <div>
      <h3 className="text-base md:text-lg font-bold text-gray-800 leading-tight group-hover:text-green-700 transition-colors">
        {teacher.name}
      </h3>
      <p className="text-xs md:text-sm text-green-600 font-semibold mt-1">
        {teacher.role}
      </p>
    </div>
  </div>
);

const AmaderTeacher = () => {
  const teachers = [
    { name: "মুফতি আব্দুল্লাহ", role: "হাদিস বিশেষজ্ঞ" },
    { name: "মাওলানা ইমরান", role: "কুরআন বিশেষজ্ঞ" },
    { name: "মুফতি সাইফুল ইসলাম", role: "আরবি ভাষা বিশেষজ্ঞ" },
    { name: "মাওলানা আবু বকর", role: "ফিকহ বিশেষজ্ঞ" },
    { name: "মুফতি মাহমুদুল হাসান", role: "তাফসীর বিশেষজ্ঞ" },
    { name: "মাওলানা ইউসুফ", role: "আদব বিশেষজ্ঞ" },
  ];

  const swiperConfig = {
    modules: [Autoplay, Navigation, Pagination],
    spaceBetween: 20,
    loop: true,
    // slidesPerView কে রাউন্ড সংখ্যায় রাখা ভালো (যেমন: ১, ২, ৩)
    slidesPerView: 1,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".teacher-next",
      prevEl: ".teacher-prev",
    },
    pagination: {
      clickable: true,
      el: ".teacher-pagination",
    },
    breakpoints: {
      // মোবাইলে ১টি বা ২টি ফুল কার্ড দেখালে সুন্দর লাগে
      320: { slidesPerView: 1, spaceBetween: 15 },
      480: { slidesPerView: 2, spaceBetween: 15 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 25 },
      1280: { slidesPerView: 5, spaceBetween: 30 },
    },
  };

  return (
    <section className="bg-[#f0f7f0] px-5 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading>আমাদের শিক্ষকবৃন্দ</SectionHeading>

        <div className="relative px-2 md:px-10">
          {/* Swiper এর height ফিক্স করার জন্য কিছু CSS ক্লাস */}
          <Swiper {...swiperConfig} className="!pb-12 teacher-swiper">
            {teachers.map((teacher, index) => (
              <SwiperSlide key={index} className="!h-auto flex">
                <TeacherCard teacher={teacher} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="teacher-prev absolute top-1/2 -left-2 md:-left-4 -translate-y-12 z-10 w-11 h-11 flex items-center justify-center bg-white text-green-600 rounded-full shadow-xl hover:bg-green-600 hover:text-white transition-all duration-300">
            <ChevronLeft size={24} />
          </button>
          <button className="teacher-next absolute top-1/2 -right-2 md:-right-4 -translate-y-12 z-10 w-11 h-11 flex items-center justify-center bg-white text-green-600 rounded-full shadow-xl hover:bg-green-600 hover:text-white transition-all duration-300">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Container */}
        <div className="teacher-pagination !flex justify-center items-center gap-1 mt-5" />

        <div className="flex justify-center mt-10">
          <button className="bg-green-700 hover:bg-green-800 transform hover:-translate-y-1 transition-all text-white text-sm md:text-base font-bold px-10 py-3.5 rounded-full shadow-lg">
            সব শিক্ষক দেখুন
          </button>
        </div>
      </div>

      <style jsx global>{`
        /* কার্ডগুলোর উচ্চতা সমান করার ম্যাজিক */
        .teacher-swiper .swiper-wrapper {
          display: flex;
        }
        .teacher-swiper .swiper-slide {
          height: auto !important;
          display: flex;
        }

        .teacher-pagination .swiper-pagination-bullet {
          margin: 0 5px !important;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .teacher-pagination .swiper-pagination-bullet-active {
          background: #16a34a !important;
          width: 28px !important;
          border-radius: 12px !important;
        }
      `}</style>
    </section>
  );
};

export default AmaderTeacher;
