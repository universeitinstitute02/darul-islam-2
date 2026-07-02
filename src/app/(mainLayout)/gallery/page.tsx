"use client";

import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Video,
  Maximize2,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const images = [
  {
    id: 1,
    title: "মাদরাসা ভবন",
    category: "ক্যাম্পাস",
    url: "https://i.ibb.co.com/wFj6PRdp/slider-1.webp",
  },
  {
    id: 2,
    title: "শ্রেণিকক্ষ",
    category: "একাডেমিক",
    url: "https://i.ibb.co.com/Sw8Byf5N/slider-2.webp",
  },
  {
    id: 3,
    title: "ইসলামি সেমিনার",
    category: "ইভেন্ট",
    url: "https://i.ibb.co.com/xSs952FC/slider-3.webp",
  },
  {
    id: 4,
    title: "বার্ষিক ক্রীড়া",
    category: "ইভেন্ট",
    url: "https://i.ibb.co.com/wFj6PRdp/slider-1.webp",
  },
  {
    id: 5,
    title: "লাইব্রেরি ভবন",
    category: "ক্যাম্পাস",
    url: "https://i.ibb.co.com/Sw8Byf5N/slider-2.webp",
  },
  {
    id: 6,
    title: "পরীক্ষা হল",
    category: "একাডেমিক",
    url: "https://i.ibb.co.com/xSs952FC/slider-3.webp",
  },
];

const videos = [
  {
    id: 1,
    youtubeId: "sXO-Y9xOBRQ",
  },
  {
    id: 2,
    youtubeId: "aqz-KE-bpKQ",
  },
  {
    id: 3,
    youtubeId: "sXO-Y9xOBRQ",
  },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("photos");

  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    const nextIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;

    setSelectedIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <section className="flex flex-col min-h-screen bg-[#F7FBF7]">
      <div className="relative h-48 lg:h-64 bg-green-800 flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#8FE3A9] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Images size={40} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-black">গ্যালারি</h1>
              <p className="text-sm font-bold text-[#F5EFE1]/80 uppercase tracking-widest mt-1">
                ক্যাম্পাসের এক পলক
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto w-full px-4 py-12 space-y-12">
        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl shadow-xl flex gap-1 border border-[#0B3D2E]/5">
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 px-8 py-3 cursor-pointer rounded-xl font-black transition-all ${
                activeTab === "photos"
                  ? "bg-[#0B3D2E] text-[#F5EFE1]"
                  : "text-[#0B3D2E]/60 hover:bg-[#0B3D2E]/5"
              }`}
            >
              <ImageIcon size={18} /> চিত্র গ্যালারি
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`flex items-center gap-2 px-8 py-3 cursor-pointer rounded-xl font-black transition-all ${
                activeTab === "videos"
                  ? "bg-[#0B3D2E] text-[#F5EFE1]"
                  : "text-[#0B3D2E]/60 hover:bg-[#0B3D2E]/5"
              }`}
            >
              <Video size={18} /> ভিডিও গ্যালারি
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div>
          {activeTab === "photos" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setSelectedImage(img);
                    setSelectedIndex(i);
                  }}
                  className="group relative aspect-square bg-white rounded-[2rem] overflow-hidden shadow-xl border border-[#0B3D2E]/5 cursor-pointer"
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={img.title}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8FE3A9] mb-1">
                      {img.category}
                    </span>

                    <h3 className="text-xl font-black text-white">
                      {img.title}
                    </h3>

                    <div className="absolute top-8 right-8 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videos.map((vid, i) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-video bg-[#0B3D2E] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white"
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${vid.youtubeId}`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-[#0B3D2E] rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black">
              আমাদের সম্পর্কে আরও জানতে চান?
            </h2>

            <p className="text-[#F5EFE1]/80 max-w-xl mx-auto">
              আমাদের ইউটিউব চ্যানেলে আপনি মাদরাসার সকল কার্যক্রমের ভিডিও দেখতে
              পাবেন।
            </p>

            <Link
              href="https://www.youtube.com/"
              target="_blank"
              className=" inline-flex bg-green-800 text-white px-10 py-4 rounded-2xl font-black items-center gap-3 mx-auto hover:scale-105 transition-transform"
            >
              আমাদের ইউটিউব চ্যানেল <ExternalLink size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          {/* Close */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white z-50"
          >
            <X size={24} />
          </button>

          {/* Previous */}
          <button
            onClick={handlePrev}
            className="absolute left-4 lg:left-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white z-50"
          >
            <ChevronLeft size={30} />
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 lg:right-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white z-50"
          >
            <ChevronRight size={30} />
          </button>

          {/* Image */}
          <motion.div
            key={selectedImage.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl w-full flex flex-col items-center"
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[80vh] object-contain rounded-3xl shadow-2xl"
            />

            <div className="text-center mt-6">
              <span className="text-[#8FE3A9] uppercase tracking-widest text-xs font-black">
                {selectedImage.category}
              </span>

              <h2 className="text-white text-3xl font-black mt-2">
                {selectedImage.title}
              </h2>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
