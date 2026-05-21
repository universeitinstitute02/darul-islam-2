"use client";

import { ArrowRight, Briefcase, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// ✅ swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const teachers = [
  {
    name: "প্রফেসর ড. আব্দুর রহমান",
    degree: "দাওরায়ে হাদীস, পিএইচডি",
    experience: "১৫ বছরের অভিজ্ঞতা",
    department: "হাদীস বিভাগ",
    darulDepartment: "দারুল ইসলাম হাদীস অনুষদ",
    image: "/hujur.webp",
    profile: "/teachers/rahman",
  },
  {
    name: "মাওলানা মুহাম্মদ ইউসুফ",
    degree: "মুফতি, তাকমীল ফিকহ",
    experience: "১২ বছরের অভিজ্ঞতা",
    department: "ফিকহ বিভাগ",
    darulDepartment: "দারুল ইসলাম ফিকহ অনুষদ",
    image: "/hujur.webp",
    profile: "/teachers/yusuf",
  },
  {
    name: "ড. আয়েশা সিদ্দিকা",
    degree: "তাফসীর, ইসলামিক স্টাডিজ",
    experience: "১০ বছরের অভিজ্ঞতা",
    department: "কুরআন বিভাগ",
    darulDepartment: "দারুল ইসলাম কুরআন অনুষদ",
    image: "/hujur.webp",
    profile: "/teachers/ayesha",
  },
  {
    name: "মাওলানা মুহাম্মদ ইউসুফ",
    degree: "মুফতি, তাকমীল ফিকহ",
    experience: "১২ বছরের অভিজ্ঞতা",
    department: "ফিকহ বিভাগ",
    darulDepartment: "দারুল ইসলাম ফিকহ অনুষদ",
    image: "/hujur.webp",
    profile: "/teachers/yusuf",
  },
];

export default function TeacherSlider() {
  return (
    <section className="relative overflow-hidden  px-4 py-8 md:py-12 lg:px-8">
      <div className="relative z-10 bg-gray-300 max-w-7xl mx-auto px-5 py-6 rounded-2xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-bold text-green-700"
          >
            দক্ষ শিক্ষকমণ্ডলী
          </motion.div>

          <h2 className="text-2xl font-extrabold text-green-800 lg:text-4xl">
            আমাদের অভিজ্ঞ উস্তাদগণ
          </h2>

          <p className="text-sm text-neutral-600 lg:text-base">
            অভিজ্ঞ আলেমদের তত্ত্বাবধানে মানসম্মত ইসলামি শিক্ষা।
          </p>

          <div className="mx-auto h-1 w-16 rounded-full bg-green-500"></div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="teacher-swiper"
        >
          {teachers.map((teacher, i) => (
            <SwiperSlide key={i} className="py-4">
              <div className="flex justify-center px-3">
                {/* Card */}
                <div
                  className="
                    group w-full max-w-sm overflow-hidden rounded-3xl
                    border border-green-100 bg-white/90
                    shadow-lg backdrop-blur transition-all duration-300
                     hover:shadow-2xl
                  "
                >
                  {/* top bg */}
                  <div className="relative h-24 bg-gradient-to-r from-green-700 to-green-500" />

                  {/* image */}
                  <div className="-mt-14 flex justify-center">
                    <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* content */}
                  <div className="space-y-4 px-6 pb-6 pt-4 text-center">
                    {/* name */}
                    <div>
                      <h3 className="text-lg font-bold text-green-800">
                        {teacher.name}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {teacher.degree}
                      </p>
                    </div>

                    {/* info */}
                    <div className="space-y-3 rounded-2xl bg-green-50 p-4 text-left">
                      <div className="flex items-start gap-3">
                        <Briefcase
                          size={18}
                          className="mt-0.5 text-green-700"
                        />

                        <div>
                          <p className="text-xs font-semibold text-green-700">
                            অভিজ্ঞতা
                          </p>

                          <p className="text-sm text-neutral-700">
                            {teacher.experience}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <GraduationCap
                          size={18}
                          className="mt-0.5 text-green-700"
                        />

                        <div>
                          <p className="text-xs font-semibold text-green-700">
                            বিভাগ
                          </p>

                          <p className="text-sm text-neutral-700">
                            {teacher.department}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-green-100 pt-3">
                        <p className="text-xs font-semibold text-green-700">
                          Department of Darul Islam
                        </p>

                        <p className="text-sm text-neutral-700">
                          {teacher.darulDepartment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
 
        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/teachers"
            className="
              group flex items-center gap-2 rounded-full
              bg-green-700 px-6 py-3 text-sm font-semibold
              text-white shadow-lg transition hover:bg-green-800
            "
          >
            সকল উস্তাদজীর তালিকা
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
