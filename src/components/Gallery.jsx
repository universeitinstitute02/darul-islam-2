"use client"

import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { ImageIcon } from 'lucide-react';

const galleryImages = [
  "/images/gallery-gathering.png",
  "https://images.unsplash.com/photo-1540317580114-1e7492c3a5e8?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1577891772449-b003666b6c20?w=820&auto=format&fit=crop",
  "https://img.freepik.com/premium-photo/muslim-child-mosque-quran-with-teacher-spiritual-learning-development-growth-carpet-islamic-teaching-man-boy-holy-worship-book-reading-faith-islam-study-qatar_590464-122202.jpg",
]

const Gallery = () => {
    return (
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
    );
};

export default Gallery;