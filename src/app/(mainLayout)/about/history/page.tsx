"use client"

import { motion } from "framer-motion"
import { History, Target, Users, BookOpen, Quote } from "lucide-react"

const timeline = [
  {
    year: "২০১০",
    title: "প্রতিষ্ঠা",
    desc: "একদল নিবেদিতপ্রাণ ওলামায়ে কেরামের উদ্যোগে ছোট এক কামরায় এক হিফজখানা হিসেবে যাত্রা শুরু।"
  },
  {
    year: "২০১৪",
    title: "অ্যাকাডেমিক সম্প্রসারণ",
    desc: "মাদরাসার কলেবর বৃদ্ধি এবং হিফজুল কুরআনের পাশাপাশি আধুনিক ও ইসলামি শিক্ষার সমন্বয়ে নতুন বিভাগ চালু।"
  },
  {
    year: "২০২০",
    title: "নতুন ক্যাম্পাস",
    desc: "একটি স্থায়ী ও আধুনিক ক্যাম্পাস উদ্বোধন করা হয় যেখানে ২০০+ শিক্ষার্থীর আবাসনের ব্যবস্থা রয়েছে।"
  },
  {
    year: "২০২৬",
    title: "ডিজিটাল রূপান্তর",
    desc: "অনলাইন লার্নিং প্ল্যাটফর্ম এবং ডিজিটাল লাইব্রেরি প্রকল্প শুরু হয় যা বর্তমানে সারা দেশে সেবা প্রদান করছে।"
  }
]

export default function HistoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-[#14281D] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <History size={40} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-black">আমাদের ইতিহাস</h1>
            <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">কুরআন ও সুন্নাহর পথপ্রদর্শনের দেড় দশক</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-16 space-y-24">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-black text-[#14281D] leading-tight">
              এক নিরন্তর আধ্যাত্মিক ও বৌদ্ধিক যাত্রার গল্প
            </h2>
            <p className="text-lg text-[#14281D]/80 leading-relaxed font-medium">
              দারুল ইসলাম ইনস্টিটিউট শুধুমাত্র একটি প্রতিষ্ঠান নয়, এটি একটি দৃষ্টিভঙ্গি। ২০১০ সালে যখন এর যাত্রা শুরু হয়, তখন আমাদের লক্ষ্য ছিল এমন একটি প্রজন্ম তৈরি করা যারা একদিকে যেমন হবে কুরআনের হাফেজ ও আলেম, অন্যদিকে হবে আধুনিক জ্ঞানে সমৃদ্ধ। 
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#14281D]">১৫+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#14281D]/40">সফল বছর</span>
              </div>
              <div className="w-px h-12 bg-[#14281D]/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#14281D]">২০০+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#14281D]/40">হাফেজ শিক্ষার্থী</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-gradient-to-t from-[#14281D]/60 to-transparent" />
            <img 
              src="https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Darul Islam History"
            />
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-2xl font-black text-[#14281D] inline-block relative border-b-4 border-[#87F56]">সাফল্যের মাইলফলক</h3>
          </div>
          <div className="relative py-10 space-y-12">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#14281D]/10 -translate-x-1/2" />
            
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 flex justify-end">
                   <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#14281D]/5 w-full max-w-md">
                     <span className="text-[#87F56] font-black text-2xl mb-2 block">{item.year}</span>
                     <h4 className="text-xl font-bold text-[#14281D] mb-2">{item.title}</h4>
                     <p className="text-sm font-medium text-[#14281D]/60 leading-relaxed">{item.desc}</p>
                   </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#14281D] rounded-full border-4 border-[#87F56] -translate-x-1/2 shadow-lg z-10" />
                <div className="w-full md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Statement */}
        <section className="bg-[#14281D] rounded-[3rem] p-8 lg:p-16 text-center shadow-islamic-lg relative overflow-hidden">
          <Quote size={120} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5" />
          <h2 className="text-2xl lg:text-4xl font-black text-[#87F56] mb-8 leading-tight">
            "আমাদের লক্ষ্য এমন একটি সমাজ তৈরি করা, <br /> যেখানে জ্ঞান হবে আলো এবং চরিত্র হবে অলংকার।"
          </h2>
          <div className="flex flex-col items-center gap-4">
             <div className="w-16 h-1 bg-[#87F56] rounded-full" />
             <p className="text-[#E2D4B9] font-bold tracking-widest uppercase text-sm">দারুল ইসলাম ইনস্টিটিউট টিম</p>
          </div>
        </section>
      </main>
    </div>
  )
}
