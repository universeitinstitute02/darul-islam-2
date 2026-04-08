"use client"

import { 
  Languages, 
  Scale, 
  BookMarked, 
  Home as HomeIcon, 
  Star, 
  Hand, 
  Users, 
  Sparkles, 
  Clock, 
  Library, 
  History, 
  Sun,
  ArrowRight,
  BookOpen
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const categories = [
  { name: "আরবী ভাষা", icon: Languages, courses: 5, color: "bg-blue-50/50" },
  { name: "ফিকহ", icon: Scale, courses: 11, color: "bg-emerald-50/50" },
  { name: "হাদীস", icon: BookMarked, courses: 2, color: "bg-amber-50/50" },
  { name: "হোমস্কুলিং", icon: HomeIcon, courses: 1, color: "bg-purple-50/50" },
  { name: "ইসলামী বিশ্বাস", icon: Star, courses: 7, color: "bg-orange-50/50" },
  { name: "আদব-কায়দা", icon: Hand, courses: 2, color: "bg-cyan-50/50" },
  { name: "পারিবারিক জীবন", icon: Users, courses: 5, color: "bg-rose-50/50" },
  { name: "নতুন কোর্স", icon: Sparkles, courses: 13, color: "bg-indigo-50/50" },
  { name: "প্রোডাক্টিভিটি", icon: Clock, courses: 5, color: "bg-teal-50/50" },
  { name: "কুরআন শিক্ষা", icon: Library, courses: 3, color: "bg-yellow-50/50" },
  { name: "সীরাহ ও ইতিহাস", icon: History, courses: 6, color: "bg-violet-50/50" },
  { name: "সুন্নাহ লাইফস্টাইল", icon: Sun, courses: 5, color: "bg-sky-50/50" },
]

export default function CategoryGrid() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-white relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-black uppercase tracking-widest"
          >
            কোর্স ক্যাটাগরি
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-black text-primary">বিষয়ভিত্তিক ইলমে দ্বীন</h2>
          <p className="text-primary/60 font-medium leading-relaxed">আগ্রহের বিষয় অনুযায়ী আপনার পছন্দের কোর্সগুলো খুঁজে নিন এবং সঠিক জ্ঞানার্জনের পথে এগিয়ে চলুন।</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link 
                  href="/courses"
                  className={cn(
                    "group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] border border-primary/5 hover-lift shadow-premium h-full overflow-hidden transition-all bg-white"
                  )}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-primary mb-6 transition-all duration-500 group-hover:bg-accent group-hover:scale-110",
                    "bg-background-soft border border-primary/5"
                  )}>
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-3 relative z-10 w-full mb-6">
                    <h3 className="font-black text-primary text-sm lg:text-base group-hover:text-accent transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 rounded-full">
                      <BookOpen size={10} className="text-accent" />
                      <span className="text-[10px] font-black text-primary/60 uppercase">
                        {cat.courses} টি কোর্স
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    দেখুন <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="flex justify-center mt-20">
          <Link 
            href="/courses" 
            className="group px-12 py-5 bg-background-soft text-primary border border-primary/5 rounded-2xl font-black text-lg shadow-premium hover:bg-primary hover:text-white transition-all flex items-center gap-3"
          >
            সকল বিষয়াবলী <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

