"use client"

import { motion } from "framer-motion"
import { Image as ImageIcon, Video, Play, Maximize2, ExternalLink } from "lucide-react"
import { useState } from "react"

const images = [
  { id: 1, title: "মাদরাসা ভবন", category: "ক্যাম্পাস", url: "https://i.ibb.co.com/wFj6PRdp/slider-1.webp" },
  { id: 2, title: "শ্রেণিকক্ষ", category: "একাডেমিক", url: "https://i.ibb.co.com/Sw8Byf5N/slider-2.webp" },
  { id: 3, title: "ইসলামি সেমিনার", category: "ইভেন্ট", url: "https://i.ibb.co.com/xSs952FC/slider-3.webp" },
  { id: 4, title: "বার্ষিক ক্রীড়া", category: "ইভেন্ট", url: "https://i.ibb.co.com/wFj6PRdp/slider-1.webp" },
  { id: 5, title: "লাইব্রেরি ভবন", category: "ক্যাম্পাস", url: "https://i.ibb.co.com/Sw8Byf5N/slider-2.webp" },
  { id: 6, title: "পরীক্ষা হল", category: "একাডেমিক", url: "https://i.ibb.co.com/xSs952FC/slider-3.webp" }
]

const videos = [
  { id: 1, title: "প্রতিষ্ঠানের পরিচিতি ভিডিও", duration: "৫:৪৫", thumbnail: "https://i.ibb.co.com/wFj6PRdp/slider-1.webp" },
  { id: 2, title: "বার্ষিক কনফারেন্স ২০২৪", duration: "১২:২০", thumbnail: "https://i.ibb.co.com/Sw8Byf5N/slider-2.webp" }
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos")

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-[#14281D] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <ImageIcon size={40} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-black">গ্যালারি</h1>
            <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">ক্যাম্পাসের এক পলক</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-12 space-y-12">
        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl shadow-xl flex gap-1 border border-[#14281D]/5">
            <button 
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all ${activeTab === "photos" ? "bg-[#14281D] text-[#E2D4B9]" : "text-[#14281D]/60 hover:bg-[#14281D]/5"}`}
            >
              <ImageIcon size={18} /> চিত্র গ্যালারি
            </button>
            <button 
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all ${activeTab === "videos" ? "bg-[#14281D] text-[#E2D4B9]" : "text-[#14281D]/60 hover:bg-[#14281D]/5"}`}
            >
              <Video size={18} /> ভিডিও গ্যালারি
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <section>
          {activeTab === "photos" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <motion.div 
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-square bg-white rounded-[2rem] overflow-hidden shadow-xl border border-[#14281D]/5 cursor-pointer"
                >
                  <img src={img.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={img.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14281D] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#87F56] mb-1">{img.category}</span>
                    <h3 className="text-xl font-black text-white">{img.title}</h3>
                    <div className="absolute top-8 right-8 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid, i) => (
                <motion.div 
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-video bg-[#14281D] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img src={vid.thumbnail} className="w-full h-full object-cover opacity-60" alt={vid.title} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 bg-[#87F56] rounded-full flex items-center justify-center text-[#14281D] shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={32} fill="currentColor" />
                    </div>
                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-black text-white">{vid.title}</h3>
                      <span className="text-sm font-bold text-[#E2D4B9]/60">{vid.duration} মিনিট</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-[#14281D] rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black">আমাদের সম্পর্কে আরও জানতে চান?</h2>
            <p className="text-[#E2D4B9]/80 max-w-xl mx-auto">আমাদের ইউটিউব চ্যানেলে আপনি মাদরাসার সকল কার্যক্রমের ভিডিও দেখতে পাবেন।</p>
            <button className="bg-[#87F56] text-[#14281D] px-10 py-4 rounded-2xl font-black flex items-center gap-3 mx-auto hover:scale-105 transition-transform">
              আমাদের ইউটিউব চ্যানেল <ExternalLink size={20} />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
