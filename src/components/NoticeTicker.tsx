"use client"

import { Megaphone, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const notices = [
  "২০২৬ সালের বার্ষিক পরীক্ষার সময়সূচী প্রকাশিত হয়েছে।",
  "নতুন কোর্সে ভর্তির শেষ সময় ৩০ শে এপ্রিল পর্যন্ত বাড়ানো হয়েছে।",
  "অনলাইন লাইব্রেরিতে নতুন ২০০+ কিতাব যুক্ত করা হয়েছে।",
  "রমজান উপলক্ষ্যে বিশেষ দাওয়াহ প্রোগ্রাম শুরু হচ্ছে।",
]

export default function NoticeTicker() {
  return (
    <section className="px-4 lg:px-8 py-4">
      <div className="max-w-screen-xl mx-auto flex items-stretch h-12 bg-white rounded-full overflow-hidden border border-[#30360E]/20 shadow-sm">
        {/* Badge */}
        <div className="bg-gradient-to-r from-[#14281D] to-[#30360E] text-white px-6 flex items-center justify-center gap-2 font-bold text-sm tracking-wide shrink-0">
          <Megaphone size={16} />
          নোটিশ
        </div>

        {/* Ticker Container */}
        <div className="flex-1 relative overflow-hidden group">
          <motion.div
            animate={{ y: ["0%", "-100%"] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-col h-full group-hover:[animation-play-state:paused]"
          >
            {/* Duplicating for seamless loop */}
            {[...notices, ...notices].map((notice, i) => (
              <div 
                key={i} 
                className="h-12 flex items-center px-4 whitespace-nowrap text-sm font-medium text-[#14281D]/80 hover:text-[#14281D] cursor-pointer"
              >
                <Link href="/notices" className="hover:underline">
                  {notice}
                </Link>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Action Button */}
        <button className="px-4 border-l border-gray-100 flex items-center justify-center text-[#14281D]/50 hover:text-[#14281D] hover:bg-gray-50 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
