"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, GraduationCap, Award } from "lucide-react";

import studentImg from "../../../../public/images/hujur2.png";

const StudentCard = ({ student }: { student: any }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-full mx-2 my-4">
    {/* Top Badge */}
    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold mb-4">
      <Award size={14} /> Top Scorer
    </div>

    {/* Profile Image */}
    <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4">
      <div className="absolute inset-0 bg-green-100 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500 opacity-50" />
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image
          src={studentImg}
          alt={student.name}
          fill
          className="object-cover"
        />
      </div>
    </div>

    {/* Info */}
    <div className="flex-grow">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
        {student.name}
      </h3>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs md:text-sm rounded-md font-medium">
          <GraduationCap size={14} /> {student.department}
        </span>
        <p className="text-xs text-gray-400 font-medium italic">
          সেশন: {student.batch}
        </p>
      </div>
    </div>
  </div>
);

const StudentSlider = () => {
  const students = [
    {
      name: "আব্দুল্লাহ আল মামুন",
      department: "কুরআন বিভাগ",
      batch: "২০২৪-২৫",
    },
    { name: "ওমর ফারুক", department: "কিতাব বিভাগ", batch: "২০২৩-২৪" },
    { name: "তামিম ইকবাল", department: "হিফজুল কুরআন", batch: "২০২৪-২৫" },
    { name: "হাসান মাহমুদ", department: "আরবি সাহিত্য", batch: "২০২২-২৩" },
    { name: "আবু রায়হান", department: "তাফসীর বিভাগ", batch: "২০২৩-২৪" },
    { name: "মাহমুদুল হাসান", department: "নাহু-সরফ", batch: "২০২৩-২৪" },
  ];

  return (
    <section className="px-5">
      <div className="bg-gray-300 max-w-7xl mx-auto px-5 py-6 rounded-2xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            আমাদের <span className="text-green-600">মেধাবী শিক্ষার্থীরা</span>
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative group/slider">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            navigation={{
              nextEl: ".next-arrow",
              prevEl: ".prev-arrow",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-12"
          >
            {students.map((student, index) => (
              <SwiperSlide key={index}>
                <StudentCard student={student} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows - Only visible on Hover on Desktop */}
          <button className="prev-arrow absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex">
            <ChevronLeft size={24} />
          </button>
          <button className="next-arrow absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex">
            <ChevronRight size={24} />
          </button>

          {/* Custom Pagination Style */}
          <div className="custom-pagination flex justify-center gap-2 mt-6"></div>
        </div>
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 24px;
          background: #16a34a;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};

export default StudentSlider;
