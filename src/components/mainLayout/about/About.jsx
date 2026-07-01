import React from 'react';
import Image from 'next/image';
import { Star, BookOpen } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="relative w-full min-h-[600px] bg-[#FAF9F5] py-26 px-6 md:px-12 lg:px-24 overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-10 flex gap-12 z-10">
        <div className="flex flex-col items-center">
          <div className="w-[2px] h-24 bg-amber-400"></div>
          <Star className="w-5 h-5 text-amber-400 fill-amber-400 -mt-1 animate-pulse" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-[2px] h-12 bg-amber-400"></div>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400 -mt-1 animate-pulse" />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left Side: Text Content */}
        <div className="lg:col-span-6 space-y-6 text-right lg:text-left">
          <div className="flex items-center gap-2 text-[#0A4740] font-bold text-lg mb-2">
            <BookOpen className="w-5 h-5" />
            <span>আমাদের সম্পর্কে</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-[#1E293B] leading-tight">
            বাংলাদেশের প্রথম <span className="text-amber-500">৭ বছরের</span> <br />
            <span className="text-[#0A4740]">দীর্ঘ মেয়াদি অনলাইন</span> <br />
            ভিত্তিক মাদ্রাসা
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-normal pt-4 border-t border-amber-200">
            জেনারেল শিক্ষিতদের উপযোগী মাদানী নেসাবের আদলে আধুনিক ও সৃজনশীল সিলেবাস; 
            যেখানে পরিচালক মহোদয়ের নিজস্ব গবেষণালব্ধ কিতাবসমূহের মাধ্যমে আরবি ভাষা 
            শেখা এখন সহজ ও আনন্দদায়ক।
          </p>
        </div>

        {/* Right Side: Photo Collage */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center">
          
          {/* Main Large Image (Left side of the collage) */}
          <div className="col-span-7 relative bg-white p-3 rounded-sm shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Top pin decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-200 rounded-full border-4 border-white shadow-inner"></div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-100">
              {/* Replace src with your actual image path */}
              <img 
                src="/images/main-gathering.jpg" 
                alt="Islami Majlis Gathering" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mini Bookcase Overlay at bottom */}
            <div className="absolute -bottom-8 -left-6 w-1/2 bg-white p-1.5 rounded-sm shadow-lg transform rotate-3 hidden sm:block">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-200">
                <img 
                  src="/images/bookcase.jpg" 
                  alt="Iqra Publication" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side Stacked Images */}
          <div className="col-span-5 space-y-4 flex flex-col justify-center">
            
            {/* Top Right Photo */}
            <div className="bg-white p-2 rounded-sm shadow-md transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100">
                <img 
                  src="/images/library-class.jpg" 
                  alt="Library view" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Right Photo with Caption Card */}
            <div className="bg-white p-2 pb-4 rounded-sm shadow-md transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex flex-col gap-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100">
                <img 
                  src="/images/students.jpg" 
                  alt="Students gathering" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Caption */}
              <div className="text-center pt-2 border-t border-gray-100">
                <p className="text-xs md:text-sm font-bold text-gray-700 leading-tight">
                  মুত্তাকীদের কাফেলার একটি ক্ষুদ্র অংশ
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Subtle Islamic/Arabic Pattern Watermark background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#0A4740" strokeWidth="1"/>
              <path d="M30 10 L50 30 L30 50 L10 30 Z" fill="none" stroke="#0A4740" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-grid)" />
        </svg>
      </div>

    </div>
  );
}