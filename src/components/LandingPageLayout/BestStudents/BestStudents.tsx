"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  GraduationCap,
  Calendar,
} from "lucide-react";

import studentImg from "../../../../public/images/hujur2.png";

type StudentType = {
  image: any;
  name: string;
  age: string;
  location: string;
  department: string;
};

const StudentCard = ({ student }: { student: StudentType }) => (
  <div
    className="
      group relative overflow-hidden rounded-3xl
      border border-green-100 bg-white/90
      shadow-lg backdrop-blur transition-all duration-500
     hover:shadow-2xl
      h-full
    "
  >
    {/* Top Gradient */}
    <div className="relative h-24 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500" />

    {/* Image */}
    <div className="-mt-14 flex justify-center">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl">
        <Image
          src={student.image}
          alt={student.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>

    {/* Content */}
    <div className="space-y-5 px-6 pb-6 pt-4 text-center">
      {/* Name */}
      <div>
        <h3 className="text-xl font-bold text-green-800">{student.name}</h3>
      </div>

      {/* Info */}
      <div className="space-y-3 rounded-2xl bg-green-50 p-4 text-left">
        {/* Age */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-2 shadow-sm">
            <Calendar size={16} className="text-green-700" />
          </div>

          <div>
            <p className="text-xs font-semibold text-green-700">বয়স</p>

            <p className="text-sm text-neutral-700">{student.age}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-2 shadow-sm">
            <MapPin size={16} className="text-green-700" />
          </div>

          <div>
            <p className="text-xs font-semibold text-green-700">লোকেশন</p>

            <p className="text-sm text-neutral-700">{student.location}</p>
          </div>
        </div>

        {/* Department */}
        <div className="flex items-start gap-3 border-t border-green-100 pt-3">
          <div className="rounded-xl bg-white p-2 shadow-sm">
            <GraduationCap size={16} className="text-green-700" />
          </div>

          <div>
            <p className="text-xs font-semibold text-green-700">বিভাগ</p>

            <p className="text-sm text-neutral-700">{student.department}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentSlider = () => {
  const students: StudentType[] = [
    {
      image: studentImg,
      name: "আব্দুল্লাহ আল মামুন",
      age: "১৮ বছর",
      location: "ঢাকা",
      department: "দারুল ইসলাম বিভাগ",
    },
    {
      image: studentImg,
      name: "ওমর ফারুক",
      age: "২০ বছর",
      location: "কুমিল্লা",
      department: "দারুল ইসলাম বিভাগ",
    },
    {
      image: studentImg,
      name: "তামিম ইকবাল",
      age: "১৭ বছর",
      location: "চট্টগ্রাম",
      department: "ইসলামিক স্টাডিজ",
    },
    {
      image: studentImg,
      name: "হাসান মাহমুদ",
      age: "১৯ বছর",
      location: "সিলেট",
      department: "ভাষা বিভাগ",
    },
    {
      image: studentImg,
      name: "আবু রায়হান",
      age: "২১ বছর",
      location: "রাজশাহী",
      department: "কিতাব বিভাগ",
    },
    {
      image: studentImg,
      name: "মাহমুদুল হাসান",
      age: "১৮ বছর",
      location: "বরিশাল",
      department: "হাদিস বিভাগ",
    },
    {
      image: studentImg,
      name: "ইয়াসিন আরাফাত",
      age: "১৬ বছর",
      location: "ময়মনসিংহ",
      department: "হিফজ বিভাগ",
    },
    {
      image: studentImg,
      name: "সাইফুল ইসলাম",
      age: "২২ বছর",
      location: "রংপুর",
      department: "ফিকহ বিভাগ",
    },
  ];

  return (
    <section className="overflow-hidden px-4 py-8 md:py-1 lg:px-8">
      <div className="bg-gray-300 max-w-7xl mx-auto px-5 py-6 rounded-2xl ">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-bold text-green-700">
            মেধাবী শিক্ষার্থীরা
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-green-800 md:text-5xl">
            আমাদের কৃতি শিক্ষার্থীরা
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 md:text-base">
            দারুল ইসলাম ইনস্টিটিউটের মেধাবী ও কৃতি শিক্ষার্থীদের সংক্ষিপ্ত
            পরিচিতি।
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-green-500"></div>
        </div>

        {/* Slider */}
        <div className="relative group/slider">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={900}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".next-arrow",
              prevEl: ".prev-arrow",
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="!pb-14"
          >
            {students.map((student, index) => (
              <SwiperSlide key={index} className="py-4">
                <StudentCard student={student} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Prev Button */}
          <button className="prev-arrow cursor-pointer absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-green-700 shadow-lg transition hover:bg-green-600 hover:text-white lg:flex">
            <ChevronLeft size={22} />
          </button>

          {/* Next Button */}
          <button className="next-arrow cursor-pointer absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-green-700 shadow-lg transition hover:bg-green-600 hover:text-white lg:flex">
            <ChevronRight size={22} />
          </button>

          {/* Pagination */}
          <div className="custom-pagination mt-6 flex justify-center gap-2"></div>
        </div>
      </div>

      {/* Pagination Style */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          border-radius: 999px;
          transition: all 0.4s ease;
        }

        .custom-pagination .swiper-pagination-bullet-active {
          width: 30px;
          background: linear-gradient(to right, #16a34a, #10b981);
        }
      `}</style>
    </section>
  );
};

export default StudentSlider;
