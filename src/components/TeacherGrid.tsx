"use client"

import { 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Twitter,
  ExternalLink 
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

const teachers = [
  { 
    name: "প্রফেসর ড. আব্দুর রহমান", 
    department: "হাদীস বিভাগ", 
    role: "বিভাগীয় প্রধান",
    image: "/teachers/rahman.jpg",
    profile: "/teachers/rahman",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#"
    }
  },
  { 
    name: "মাওলানা মুহাম্মদ ইউসুফ", 
    department: "ফিকহ বিভাগ", 
    role: "সিনিয়র লেকচারার",
    image: "/teachers/yusuf.jpg",
    profile: "/teachers/yusuf",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#"
    }
  },
  { 
    name: "ড. আয়েশা সিদ্দিকা", 
    department: "কুরআন বিভাগ", 
    role: "সহকারী অধ্যাপক",
    image: "/teachers/ayesha.jpg",
    profile: "/teachers/ayesha",
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#"
    }
  },
]

export default function TeacherSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teachers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teachers.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + teachers.length) % teachers.length)
  }

  return (
    <section className="px-4 py-7 md:py-10 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">

      {/* bg blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-200/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300/30 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-widest"
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

        {/* Slider */}
        <div className="relative overflow-hidden">

          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {teachers.map((teacher, i) => (
              <div key={i} className="min-w-full flex justify-center px-4">
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="group relative flex flex-col items-center 
                  bg-white/80 backdrop-blur 
                  p-6 rounded-2xl border border-green-100 
                  shadow-md hover:shadow-2xl 
                  transition hover:-translate-y-2 
                  w-full sm:w-2/3 lg:w-1/2"
                >

                  {/* glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 opacity-0 group-hover:opacity-20 transition rounded-2xl"></div>

                  {/* image */}
                  <div className="relative w-28 h-28 mb-5">
                    <Image 
                      src={teacher.image} 
                      alt={teacher.name} 
                      fill
                      className="object-cover rounded-xl border border-green-100 group-hover:scale-105 transition"
                    />
                  </div>

                  {/* info */}
                  <div className="text-center space-y-1 mb-5">
                    <h3 className="font-bold text-green-800 text-sm">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-green-600 font-medium">
                      {teacher.department}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {teacher.role}
                    </p>
                  </div>

                  {/* socials */}
                  <div className="flex gap-3 mb-5">
                    {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 flex items-center justify-center rounded-full 
                        bg-green-50 text-green-600 
                        hover:bg-green-600 hover:text-white 
                        transition cursor-pointer"
                      >
                        <Icon size={14} />
                      </div>
                    ))}
                  </div>

                  {/* button */}
                  <Link 
                    href={teacher.profile} 
                    className="flex items-center gap-2 text-xs text-green-700 font-semibold hover:text-green-900 transition"
                  >
                    প্রোফাইল <ExternalLink size={12} />
                  </Link>

                </motion.div>

              </div>
            ))}
          </div>

          {/* controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 
            w-10 h-10 rounded-full 
            bg-white shadow hover:bg-green-600 hover:text-white 
            flex items-center justify-center transition"
          >
            ‹
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 
            w-10 h-10 rounded-full 
            bg-white shadow hover:bg-green-600 hover:text-white 
            flex items-center justify-center transition"
          >
            ›
          </button>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-6">
            {teachers.map((_, i) => (
              <div 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === i ? "w-6 bg-green-600" : "w-2 bg-green-300"
                }`}
              />
            ))}
          </div>

        </div>

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