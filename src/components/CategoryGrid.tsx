"use client"

import { 
  Languages, 
  BookMarked, 
  Home as HomeIcon, 
  ArrowRight,
  BookOpen,
  Library,
  History,
  Sun
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  { name: "কুরআন শিক্ষা", icon: Library, courses: 3 },
  { name: "আরবী ভাষা", icon: Languages, courses: 5 },
  { name: "হাদীস", icon: BookMarked, courses: 2 },
  { name: "হোমস্কুলিং", icon: HomeIcon, courses: 1 },
  { name: "সীরাহ ও ইতিহাস", icon: History, courses: 6 },
  { name: "সুন্নাহ লাইফস্টাইল", icon: Sun, courses: 5 },
]

export default function CategoryGrid() {
  return (
    <section className="px-4 py-5 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">

      {/* background blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold tracking-widest"
          >
            কোর্স ক্যাটাগরি
          </motion.div>

          <h2 className="text-2xl lg:text-4xl font-extrabold text-green-800">
            বিষয়ভিত্তিক ইলমে দ্বীন
          </h2>

          <p className="text-neutral-600 text-sm lg:text-base">
            আগ্রহের বিষয় অনুযায়ী আপনার পছন্দের কোর্সগুলো খুঁজে নিন।
          </p>

          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">

          {categories.map((cat, i) => {
            const Icon = cat.icon

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href="/courses"
                  className="group relative flex flex-col items-center text-center p-5 rounded-2xl 
                  bg-white/80 backdrop-blur border border-green-100
                  shadow-md hover:shadow-2xl 
                  transition duration-300 hover:-translate-y-2 overflow-hidden"
                >

                  {/* glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 opacity-0 group-hover:opacity-20 transition"></div>

                  {/* icon */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center 
                  bg-green-100 text-green-700 mb-4 
                  transition-all duration-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white">
                    <Icon size={26} />
                  </div>
                  
                  {/* content */}
                  <div className="space-y-2 relative z-10 mb-4">
                    <h3 className="font-bold text-green-800 text-xs lg:text-sm leading-snug">
                      {cat.name}
                    </h3>

                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                      <BookOpen size={10} />
                      <span className="text-[10px] text-green-700 font-medium">
                        {cat.courses} টি কোর্স
                      </span>
                    </div>
                  </div>

                  {/* hover action */}
                  <div className="mt-auto flex items-center gap-1 text-green-600 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                    দেখুন <ArrowRight size={14} />
                  </div>

                  {/* bottom line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 group-hover:w-full transition-all duration-300"></div>

                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-5">
          <Link 
            href="/courses" 
            className="group px-6 py-3 rounded-full 
            bg-green-600 text-white 
            font-semibold text-sm 
            shadow hover:bg-green-700 
            transition flex items-center gap-2"
          >
            সকল বিষয়াবলী 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>

      </div>
    </section>
  )
}