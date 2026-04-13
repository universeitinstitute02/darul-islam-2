"use client"

import { 
  Users, 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Twitter,
  ExternalLink 
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const teachers = [
  { name: "প্রফেসর ড. আব্দুর রহমান", department: "হাদীস বিভাগ", role: "বিভাগীয় প্রধান" },
  { name: "মাওলানা মুহাম্মদ ইউসুফ", department: "ফিকহ বিভাগ", role: "সিনিয়র লেকচারার" },
  { name: "ড. আয়েশা সিদ্দিকা", department: "কুরআন বিভাগ", role: "সহকারী অধ্যাপক" },
  { name: "উস্তাজা ফাতেমা খাতুন", department: "আরবি ভাষা", role: "ভাষা প্রশিক্ষক" },
  { name: "মুফতি শাহিন আহমেদ", department: "ফাতওয়া বিভাগ", role: "প্রধান মুফতি" },
  { name: "প্রফেসর ড. জাকির নায়েক", department: "তাফসীর বিভাগ", role: "সিনিয়র গবেষক" },
]

export default function TeacherGrid() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-white relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-black uppercase tracking-widest"
          >
            দক্ষ শিক্ষকমণ্ডলী
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-black text-primary">আমাদের অভিজ্ঞ উস্তাদগণ</h2>
          <p className="text-primary/60 font-medium leading-relaxed">দেশি-বিদেশি সমাদৃত আলেম ও গবেষকগণের তত্ত্বাবধানে আমরা প্রদান করছি মানসম্মত ইসলামি শিক্ষা যা নৈতিকতা ও আদর্শের ভিত্তি গড়ে দেয়।</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {teachers.map((teacher, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex flex-col items-center bg-background-soft p-6 rounded-[2.5rem] border border-primary/5 hover-lift shadow-premium"
            >
              {/* Profile Image / Initials */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-accent rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20" />
                <div className="relative w-full h-full bg-white rounded-[1.8rem] border border-primary/5 flex items-center justify-center text-primary shadow-sm overflow-hidden group-hover:shadow-premium transition-all">
                  <Users size={40} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center space-y-2 mb-6">
                <h3 className="font-black text-primary leading-tight group-hover:text-accent transition-colors">{teacher.name}</h3>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">{teacher.department}</p>
                  <p className="text-[11px] font-bold text-primary/40 uppercase">{teacher.role}</p>
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-3 mb-6">
                {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                  <button key={idx} className="w-8 h-8 rounded-full bg-white text-primary/40 hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center">
                    <Icon size={14} />
                  </button>
                ))}
              </div>

              {/* Action */}
              <button className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-wider group/btn">
                প্রোফাইল <ExternalLink size={12} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="flex justify-center mt-20">
          <Link 
            href="/teachers" 
            className="group px-10 py-5 bg-primary text-secondary rounded-2xl font-black text-lg shadow-premium hover:bg-primary-light hover:shadow-premium-lg transition-all flex items-center gap-3 active:scale-95"
          >
            সকল উস্তাদজীর তালিকা <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

