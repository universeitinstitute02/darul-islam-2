"use client"

import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  "/images/gallery-gathering.png",
  "/images/gallery-gathering.png",
  "/images/gallery-gathering.png",
]

const HomeGallery = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-4 md:py-10 px-3 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      
      {/* background blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto relative z-10 space-y-6">

        {/* Header */}
        <div className="mx-auto text-center max-w-xl space-y-2">
          <h2 className="text-2xl lg:text-4xl font-extrabold text-green-800">
            লাইফ এট দারুল ইসলাম
          </h2>
          <p className="text-neutral-600 text-sm lg:text-base">
            শিক্ষার্থীদের পদচারণায় মুখরিত আমাদের ক্যাম্পাসের খণ্ডচিত্রসমূহ।
          </p>

          {/* accent line */}
          <div className="w-16 h-1 bg-green-500 rounded-full mx-auto"></div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-3 lg:gap-6">
          {galleryImages.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedImage(src)}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition duration-300"
            >
              <Image 
                src={src} 
                alt={`Gallery ${i + 1}`} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />

              {/* icon center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="bg-white/90 p-2 rounded-full shadow">
                  <ImageIcon size={18} className="text-green-700" />
                </div>
              </div>

              {/* bottom gradient */}
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Link 
            href="/gallery"
            className="inline-flex items-center gap-2 
            px-5 py-2.5 rounded-full 
            bg-green-600 text-white 
            text-sm font-semibold 
            shadow hover:bg-green-700 
            transition-all duration-300"
          >
            <ImageIcon size={18} /> সকল ছবি দেখুন
          </Link>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* close */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:scale-110 transition"
              >
                <X size={30} />
              </button>

              {/* image */}
              <div className="relative w-full h-[70vh]">
                <Image 
                  src={selectedImage}
                  alt="Preview"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default HomeGallery;