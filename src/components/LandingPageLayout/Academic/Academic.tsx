"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BookMarked,
  PenTool,
  GraduationCap,
  Library,
  Languages,
  UserCheck,
  HeartHandshake,
} from "lucide-react";

const Academic = () => {
  const departments = [
    { icon: <BookOpen />, title: "নূরানী বিভাগ", sub: "প্রাথমিক শিক্ষা" },
    { icon: <BookMarked />, title: "হিফজ বিভাগ", sub: "কুরআন মুখস্থ" },
    { icon: <PenTool />, title: "কিতাব বিভাগ", sub: "উচ্চতর শিক্ষা" },
    { icon: <GraduationCap />, title: "সাধারণ বিভাগ", sub: "আধুনিক শিক্ষা" },
    { icon: <Library />, title: "মক্তব বিভাগ", sub: "বুনিয়াদী তালীম" },
    { icon: <Languages />, title: "ভাষা শিক্ষা", sub: "আরবি ও ইংরেজি" },
    { icon: <UserCheck />, title: "বয়স্ক শিক্ষা", sub: "দ্বীনি কোর্স" },
    { icon: <HeartHandshake />, title: "খিদমত শাখা", sub: "সমাজ সেবা" },
  ];

  return (
    <section className="px-5 py-16 max-w-7xl mx-auto relative group">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 inline-block relative">
          একাডেমিক বিভাগ
          <span className="block h-1 bg-green-600 mt-2 mx-auto w-1/2 rounded-full" />
        </h2>
      </div>

      <div className="relative px-2 md:px-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2.2}
          loop={false}
          navigation={{
            nextEl: ".next-btn-academic",
            prevEl: ".prev-btn-academic",
          }}
          pagination={{
            clickable: true,
            el: ".academic-pagination",
          }}
          breakpoints={{
            320: { slidesPerView: 2.2, spaceBetween: 15 },
            640: { slidesPerView: 3.2, spaceBetween: 18 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
          // শ্যাডো কাটার সমস্যা সমাধানের জন্য এই ক্লাসগুলো গুরুত্বপূর্ণ
          className="!p-4 !-m-4"
        >
          {departments.map((d, i) => (
            <SwiperSlide key={i} className="h-auto !py-4">
              {" "}
              {/* কার্ডের চারপাশের স্পেস যাতে শ্যাডো দেখা যায় */}
              <div className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(22,163,74,0.12)] hover:border-green-200 transition-all duration-500 h-full">
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-green-50 text-green-700 transition-colors duration-500 group-hover:bg-green-600 group-hover:text-white">
                  {React.cloneElement(d.icon, { size: 28 })}
                </div>
                <div>
                  <p className="text-sm md:text-base font-bold text-gray-800 leading-tight">
                    {d.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-1 font-medium">
                    {d.sub}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="prev-btn-academic absolute top-1/2 -left-2 md:-left-4 -translate-y-10 z-10 w-10 h-10 flex items-center justify-center bg-white border border-green-100 text-green-600 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-all disabled:opacity-20">
          <ChevronLeft size={22} />
        </button>
        <button className="next-btn-academic absolute top-1/2 -right-2 md:-right-4 -translate-y-10 z-10 w-10 h-10 flex items-center justify-center bg-white border border-green-100 text-green-600 rounded-full shadow-md hover:bg-green-600 hover:text-white transition-all disabled:opacity-20">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pagination Dot Container - Center aligned */}
      <div className="academic-pagination !flex justify-center items-center gap-1 mt-8 !static"></div>

      <style jsx global>{`
        .academic-pagination {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
        }
        .academic-pagination .swiper-pagination-bullet {
          margin: 0 4px !important;
          background: #d1d5db;
          opacity: 1;
        }
        .academic-pagination .swiper-pagination-bullet-active {
          background: #16a34a !important;
          width: 24px !important;
          border-radius: 12px !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Academic;
