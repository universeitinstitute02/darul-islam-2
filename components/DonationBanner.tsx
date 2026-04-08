"use client"

import { HandHeart, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DonationBanner() {
  return (
    <section className="px-6 py-12 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-screen-xl mx-auto bg-gradient-to-br from-primary via-primary-light to-primary rounded-[3rem] p-10 lg:p-24 relative overflow-hidden shadow-premium-lg"
      >
        {/* Advanced Background Decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full -ml-48 -mb-48 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left">
          <div className="space-y-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-accent/20 transition-all hover:bg-accent/30 cursor-default">
              <HandHeart size={16} /> সদকায়ে জারিয়া
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-[1.15] text-glow">
                আপনার একটি ক্ষুদ্র দান <br /> হতে পারে <span className="text-accent underline decoration-accent/30 underline-offset-8">পরকালের পাথেয়</span>
              </h2>
              <p className="text-secondary/70 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                দারুল ইসলাম ইনস্টিটিউটের বহুমুখী দ্বীনি কার্যক্রম পরিচালনায় আপনার সহযোগিতার হাত বাড়িয়ে দিন। আপনার দান ইনসাফ ও জ্ঞানের প্রচার নিশ্চিত করবে।
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/40 text-[10px] font-black uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2"><Sparkles size={12} className="text-accent" /> স্বচ্ছ হিসাব</span>
              <span className="flex items-center gap-2"><Sparkles size={12} className="text-accent" /> সরাসরি প্রভাব</span>
              <span className="flex items-center gap-2"><Sparkles size={12} className="text-accent" /> শতভাগ নিরাপদ</span>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            <Link 
              href="/donation" 
              className="group relative px-12 py-6 bg-accent text-primary rounded-[2rem] font-black text-xl overflow-hidden shadow-premium hover:scale-105 active:scale-95 transition-all text-center min-w-[280px]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <span className="relative flex items-center justify-center gap-3">
                এখনই দান করুন <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <div className="space-y-2 text-center lg:text-right">
              <p className="text-secondary/40 text-[10px] font-black uppercase tracking-tighter">পেমেন্ট মেথড</p>
              <p className="text-white/60 text-xs font-bold tracking-widest">বিকাশ / নগদ / রকেট / ব্যাংক কার্ড</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

