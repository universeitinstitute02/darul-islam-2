"use client"

import { 
  University, 
  BookOpen, 
  Users, 
  HandHeart, 
  Image as ImageIcon,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const activities = [
  { 
    name: "শিক্ষা কার্যক্রম", 
    icon: University, 
    href: "/education",
    desc: "আধুনিক ও ইসলামি শিক্ষার সমন্বিত সিলেবাস"
  },
  { 
    name: "ইসলামিক লাইব্রেরি", 
    icon: BookOpen, 
    href: "/library",
    desc: "হাজারো কিতাব ও ডিজিটাল গবেষণাগার" 
  },
  { 
    name: "দাওয়াহ কার্যক্রম", 
    icon: Users, 
    href: "/dawah",
    desc: "হিদায়েতের আলো ছড়িয়ে দেওয়ার মিশন"
  },
  { 
    name: "দান প্রকল্প", 
    icon: HandHeart, 
    href: "/donation",
    desc: "মুসলিম উম্মাহর সেবায় আপনার অবদান"
  },
]

const galleryImages = [
  "/images/gallery-gathering.png",
  "https://images.unsplash.com/photo-1540317580114-1e7492c3a5e8?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577891772449-b003666b6c20?w=820&auto=format&fit=crop",
  "https://img.freepik.com/premium-photo/muslim-child-mosque-quran-with-teacher-spiritual-learning-development-growth-carpet-islamic-teaching-man-boy-holy-worship-book-reading-faith-islam-study-qatar_590464-122202.jpg",
]

export default function ActivitiesSection() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-background-soft relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto space-y-24 relative z-10">
        
        {/* Activities Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-black text-primary">আমাদের কার্যক্রম</h2>
            <p className="text-primary/60 font-medium leading-relaxed">প্রতিষ্ঠানের বহুমুখী কার্যক্রমের মাধ্যমে আমরা সমাজের প্রতিটি স্তরে শিক্ষার আলো এবং ইসলামের সুমহান আদর্শ পৌঁছে দিতে অঙ্গীকারবদ্ধ।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((act, i) => {
              const Icon = act.icon
               return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={act.href}
                    className="flex flex-col h-full bg-white p-8 rounded-[2.5rem] border border-primary/5 hover:border-accent transition-all group shadow-premium hover:shadow-premium-lg"
                  >
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-primary transition-all mb-6">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-black text-primary mb-2">{act.name}</h3>
                    <p className="text-sm font-medium text-primary/40 leading-relaxed mb-6">{act.desc}</p>
                    <div className="mt-auto flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                      বিস্তারিত দেখুন <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <h2 className="text-3xl lg:text-5xl font-black text-primary">লাইফ এট দারুল ইসলাম</h2>
              <p className="text-primary/60 font-medium">শিক্ষার্থীদের পদচারণায় মুখরিত আমাদের ক্যাম্পাসের খণ্ডচিত্রসমূহ যা তাদের মেধা বিকাশের পরিবেশ নিশ্চিত করে।</p>
            </div>
            <Link 
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-secondary rounded-2xl font-black text-sm hover:bg-primary-light transition-all shadow-premium self-center md:self-end"
            >
              <ImageIcon size={18} /> সকল ছবি দেখুন
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-8 border-white shadow-premium group"
              >
                <Image 
                  src={src} 
                  alt={`Gallery ${i + 1}`} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

