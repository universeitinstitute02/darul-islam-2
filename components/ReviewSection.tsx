"use client"

import { Quote, Star, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

const reviews = [
  {
    name: "আব্দুল্লাহ আল মামুন",
    role: "শিক্ষার্থী, আরবী ভাষা",
    content: "দারুল ইসলাম ইনস্টিটিউটের আরবী ভাষা কোর্সটি অত্যন্ত গোছানো। উস্তাদদের পড়ানোর ধরণ খুব সাবলীল এবং সহজবোধ্য। আমার ইলমি সফরের এই অংশটি ছিল সবচেয়ে আনন্দদায়ক।",
    rating: 5,
  },
  {
    name: "ফাতেমা জান্নাত",
    role: "শিক্ষার্থী, ফিকহ বিভাগ",
    content: "ইসলামি জ্ঞান অর্জনের জন্য এটি একটি নির্ভরযোগ্য প্রতিষ্ঠান। নিয়মিত ক্লাস এবং মানসম্পন্ন নোটস আমার গবেষণায় এবং পরীক্ষার প্রস্তুতিতে অনেক সাহায্য করেছে। জাযাকুমুল্লাহ খায়রান!",
    rating: 5,
  },
  {
    name: "মো: হাসান আলী",
    role: "অভিভাবক",
    content: "আমার সন্তানের নৈতিক ও জ্ঞানতাত্ত্বিক বিকাশ নিয়ে আমি চিন্তিত ছিলাম। এখানকার পরিবেশ এবং শিক্ষার মান আমাকে নিশ্চিন্ত করেছে। আমি অত্যন্ত সন্তুষ্ট।",
    rating: 4,
  },
]

export default function ReviewSection() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-background-soft relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-black uppercase tracking-widest"
          >
            প্রশংসা ও মতামত
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-black text-primary">শিক্ষার্থীদের চোখে আমরা</h2>
          <p className="text-primary/60 font-medium leading-relaxed">আমাদের প্রচেষ্টা ও সদিচ্ছার প্রতিফলন ঘটে শিক্ষার্থীদের সফলতায়। শুনুন তাদের মুখ থেকেই আমাদের কথা।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative p-10 bg-white border border-primary/5 rounded-[3rem] shadow-premium hover-lift group"
            >
              {/* Premium Quote Icon */}
              <div className="absolute top-10 right-10 text-accent/10 group-hover:text-accent/20 transition-colors">
                <Quote size={80} fill="currentColor" strokeWidth={0} />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                <div className="space-y-6">
                  {/* Rating with refined colors */}
                  <div className="flex gap-1.5">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        size={16} 
                        className={cn(
                          "transition-all",
                          j < review.rating ? "text-accent fill-accent" : "text-primary/5 fill-primary/5"
                        )} 
                      />
                    ))}
                  </div>

                  {/* Content with high readability */}
                  <p className="text-primary/70 font-medium text-lg leading-relaxed italic">
                    "{review.content}"
                  </p>
                </div>

                {/* Profile branding */}
                <div className="flex items-center gap-5 pt-10 mt-auto border-t border-primary/5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent rounded-2xl rotate-6 group-hover:rotate-12 transition-transform opacity-20" />
                    <div className="relative w-14 h-14 bg-white rounded-2xl border border-primary/5 flex items-center justify-center text-primary font-black text-xl shadow-sm">
                      {review.name[0]}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-primary group-hover:text-accent transition-colors">{review.name}</h4>
                    <p className="text-[10px] uppercase font-black text-primary/40 tracking-widest leading-none mt-1">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="flex justify-center mt-20">
          <Link 
            href="/reviews" 
            className="group inline-flex items-center gap-3 px-12 py-5 bg-primary text-secondary rounded-[2rem] font-black text-lg shadow-premium hover:bg-primary-light hover:shadow-premium-lg transition-all active:scale-95"
          >
            মতামতসমূহ দেখুন <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

