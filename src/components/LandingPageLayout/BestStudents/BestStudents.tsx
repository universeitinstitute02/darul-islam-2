"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  GraduationCap,
  Calendar,
  Loader2,
} from "lucide-react";

type StudentApiType = {
  _id: string;
  studentNameBn: string;
  classLevel: string;
  user: {
    name: string;
    profileImage: string | null;
    gender: string;
  };
  department: {
    _id?: string;
    name: string;
  };
  address: string;
  age: string;
};

const StudentCard = ({ student }: { student: StudentApiType }) => (
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
      <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-xl bg-white">
        <Image
          src={student.user?.profileImage || "/hujur.webp"} // প্রোফাইল ইমেজ নাল থাকলে ডিফল্ট ইমেজ প্লেসহোল্ডার
          alt={student.studentNameBn || "Student"}
          fill
          sizes="(max-width: 112px) 100vw, 112px"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>

    {/* Content */}
    <div className="space-y-5 px-6 pb-6 pt-4 text-center">
      {/* Name */}
      <div>
        <h3 className="text-xl font-bold text-green-800 line-clamp-1">
          {student.studentNameBn}
        </h3>
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
            <p className="text-sm text-neutral-700 line-clamp-1">
              {student.address}
            </p>
          </div>
        </div>

        {/* Department */}
        <div className="flex items-start gap-3 border-t border-green-100 pt-3">
          <div className="rounded-xl bg-white p-2 shadow-sm">
            <GraduationCap size={16} className="text-green-700" />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-700">বিভাগ</p>
            <p className="text-sm text-neutral-700 line-clamp-1">
              {student.department?.name || "সাধারণ বিভাগ"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Fetcher Function using Environment URL
const fetchTalentedStudents = async (): Promise<StudentApiType[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/students?limit=10`,
  );
  return response.data;
};

const StudentSlider = () => {
  // TanStack Query Hooks integration
  const {
    data: students = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery<StudentApiType[]>({
    queryKey: ["talentedStudents"],
    queryFn: fetchTalentedStudents,
    staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ক্যাশ তাজা থাকবে
    refetchOnWindowFocus: false,
    retry: 2,
  });

  if (isError) {
    console.error("Error loading talented students data:", error);
  }

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

        {/* Dynamic Loading/Data State Rendering */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-green-700 animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <div className="text-center text-neutral-600 text-sm font-bold py-16">
            কোনো কৃতি শিক্ষার্থীর তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          /* Slider Container */
          <div className="relative group/slider">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop={students.length > 1} // ১ জনের বেশি ডাটা থাকলে কেবল লুপ এক্টিভ হবে
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
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-14"
            >
              {students.map((student) => (
                <SwiperSlide key={student._id} className="py-4">
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
        )}
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
