"use client"

import { ArrowRight, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

// ✅ swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

const teachers = [
  { 
    name: "প্রফেসর ড. আব্দুর রহমান", 
    department: "হাদীস বিভাগ", 
    role: "বিভাগীয় প্রধান",
    image: "/hujur.webp",
    profile: "/teachers/rahman",
  },
  { 
    name: "মাওলানা মুহাম্মদ ইউসুফ", 
    department: "ফিকহ বিভাগ", 
    role: "সিনিয়র লেকচারার",
    image: "/hujur.webp",
    profile: "/teachers/yusuf",
  },
  { 
    name: "ড. আয়েশা সিদ্দিকা", 
    department: "কুরআন বিভাগ", 
    role: "সহকারী অধ্যাপক",
    image: "/hujur.webp",
    profile: "/teachers/ayesha",
  },
]

export default function TeacherSlider() {
  return (
    <section className="px-4 py-7 md:py-10 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">

      {/* BG */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-200/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300/30 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"
          >
            দক্ষ শিক্ষকমণ্ডলী
          </motion.div>

          <h2 className="text-2xl lg:text-4xl font-extrabold text-green-800">
            আমাদের অভিজ্ঞ উস্তাদগণ
          </h2>

          <p className="text-neutral-600 text-sm lg:text-base">
            অভিজ্ঞ আলেমদের তত্ত্বাবধানে মানসম্মত ইসলামি শিক্ষা।
          </p>

          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* ✅ Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={true}
          speed={800}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="teacher-swiper"
        >
          {teachers.map((teacher, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center px-4">

                {/* ❌ hover removed */}
                <div className="relative flex flex-col items-center 
                  bg-white/80 backdrop-blur 
                  p-6 rounded-2xl border border-green-100 
                  shadow-md
                  w-full sm:w-2/3 lg:w-1/2"
                >

                  {/* image */}
                  <div className="relative w-28 h-28 mb-5">
                    <Image 
                      src={teacher.image} 
                      alt={teacher.name} 
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>

                  {/* info */}
                  <div className="text-center space-y-1 mb-5">
                    <h3 className="font-bold text-green-800 text-sm">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-green-600">
                      {teacher.department}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {teacher.role}
                    </p>
                  </div>

                  {/* button */}
                  <Link 
                    href={teacher.profile} 
                    className="flex items-center gap-2 text-xs text-green-700 font-semibold hover:text-green-900 transition"
                  >
                    প্রোফাইল <ExternalLink size={12} />
                  </Link>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <Link 
            href="/teachers" 
            className="group px-6 py-3 rounded-full 
            bg-green-600 text-white 
            text-sm font-semibold 
            shadow hover:bg-green-700 
            transition flex items-center gap-2"
          >
            সকল উস্তাদজীর তালিকা 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>

      </div>
    </section>
  )
}