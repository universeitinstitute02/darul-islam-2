"use client"

import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { ImageIcon, X } from 'lucide-react';
import { motion } from "framer-motion";

const galleryImages = [
  "/images/gallery-gathering.png",
  "/images/gallery-gathering.png",
  "/images/gallery-gathering.png",
]

const HomeGallery = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-4 py-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1 max-w-xl text-center md:text-left">
          <h2 className="text-2xl lg:text-5xl font-black text-primary">
            লাইফ এট দারুল ইসলাম
          </h2>
          <p className="text-primary/60 font-sm">
            শিক্ষার্থীদের পদচারণায় মুখরিত আমাদের ক্যাম্পাসের খণ্ডচিত্রসমূহ।
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-3 gap-4">
        {galleryImages.map((src, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedImage(src)}
            className="relative aspect-[4/5] cursor-pointer overflow-hidden rounded border-3 border-white shadow-premium group"
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
      <div class="flex justify-center">
         <Link 
          href="/gallery"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-secondary rounded-2xl font-black text-sm hover:bg-primary-light transition-all shadow-premium self-center md:self-end"
        >
          <ImageIcon size={18} /> সকল ছবি দেখুন
        </Link>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={30} />
            </button>

            <div className="relative w-full h-[70vh]">
              <Image 
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomeGallery;