"use client"

import { motion } from "framer-motion"
import { Target, Eye, Heart, ShieldCheck, Star, Lightbulb } from "lucide-react"

const values = [
  {
    title: "সহীহ আকিদা",
    desc: "কুরআন ও সুন্নাহর সঠিক জ্ঞান প্রচার ও প্রসার।",
    icon: ShieldCheck
  },
  {
    title: "আধুনিকায়ন",
    desc: "সনাতন পদ্ধতির সাথে আধুনিক প্রযুক্তি ও কারিকুলামের সমন্বয়।",
    icon: Lightbulb
  },
  {
    title: "চরিত্র গঠন",
    desc: "শিক্ষার্থীদের আদর্শ মুসলিম হিসেবে গড়ে তোলা।",
    icon: Heart
  },
  {
    title: "মানসম্মত শিক্ষা",
    desc: "অভিজ্ঞ শিক্ষকমণ্ডলী দ্বারা পাঠদান নিশ্চিত করা।",
    icon: Star
  }
]

export default function MissionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-[#14281D] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <Target size={40} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-black">লক্ষ্য ও উদ্দেশ্য</h1>
            <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">আমাদের পথচলার মূল প্রেরণা</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-16 space-y-24">
        {/* Mission & Vision Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-[#87F56]/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 text-[#87F56]/10 group-hover:scale-110 transition-transform">
              <Target size={120} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-[#14281D] text-[#E2D4B9] rounded-2xl flex items-center justify-center">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-black text-[#14281D]">আমাদের লক্ষ্য (Mission)</h2>
              <p className="text-lg text-[#14281D]/70 leading-relaxed font-medium">
                পরিপূর্ণ ইসলামি জ্ঞান এবং বাস্তব জীবনের দক্ষতার সমন্বয়ে একদল শিক্ষিত ও সৎ মানুষ তৈরি করা যারা সমাজ ও উম্মাহর কল্যাণে নিবেদিত থাকবে।
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#14281D] p-10 rounded-[3rem] shadow-2xl border-4 border-white/10 relative overflow-hidden group text-[#E2D4B9]"
          >
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:scale-110 transition-transform">
              <Eye size={120} />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-[#87F56] text-[#14281D] rounded-2xl flex items-center justify-center">
                <Eye size={32} />
              </div>
              <h2 className="text-3xl font-black text-white">আমাদের উদ্দেশ্য (Vision)</h2>
              <p className="text-lg opacity-80 leading-relaxed font-medium">
                একটি আদর্শ ইসলামি বিদ্যাপীঠ হিসেবে নিজেদের প্রতিষ্ঠিত করা, যেখানে দ্বীনি শিক্ষার পাশাপাশি আধুনিক জ্ঞানের মাধ্যমে শিক্ষার্থীদের বিশ্বমানের নাগরিক হিসেবে গড়ে তোলা হবে।
              </p>
            </div>
          </motion.div>
        </section>

        {/* Global Values */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-[#14281D] inline-block relative">
              আমাদের মূলনীতি
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-[#87F56] rounded-full" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-[#14281D]/5 hover:shadow-islamic transition-all text-center space-y-4"
              >
                <div className="w-16 h-16 bg-[#14281D]/5 text-[#14281D] rounded-2xl flex items-center justify-center mx-auto transition-colors group-hover:bg-[#14281D] group-hover:text-white">
                  <v.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#14281D]">{v.title}</h3>
                <p className="text-sm text-[#14281D]/60 font-medium leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="text-center py-12 px-6 bg-[#87F56]/10 rounded-[3rem] border-2 border-dashed border-[#14281D]/20">
          <h3 className="text-2xl font-black text-[#14281D] mb-4">দ্বীনি শিক্ষার এই মহৎ যাত্রায় আপনিও আমাদের সাথে যোগ দিন।</h3>
          <p className="text-[#14281D]/60 max-w-2xl mx-auto font-medium">দারুল ইসলাম ইনস্টিটিউট শুধুমাত্র একটি শিক্ষাপ্রতিষ্ঠান নয়, এটি একটি আদর্শ পরিবার।</p>
        </section>
      </main>
    </div>
  )
}
