import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BookPromotionBanner() {
  return (
    <section className="w-full bg-[#FAF9F5] py-12 px-4 md:px-12 lg:px-24 flex items-center justify-center font-sans">
      
      {/* Main Banner Container with custom gradient and thin golden border */}
      <div className="max-w-6xl w-full bg-gradient-to-r from-[#014E56] via-[#165E55] to-[#919525] rounded-[24px] border border-amber-400/50 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center relative min-h-[340px] md:min-h-[380px]">
        
        {/* Background Decorative Mosque/Book Vector Watermark (Right Side Overlay) */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-[0.07] pointer-events-none mix-blend-overlay hidden md:block">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor" className="text-white">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
            <path d="M50 20 L80 50 L50 80 L20 50 Z" />
          </svg>
        </div>

        {/* Left Content Area (Text and Button) */}
        <div className="col-span-1 md:col-span-7 p-8 md:p-12 lg:p-16 text-left space-y-4 z-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide leading-tight">
            জ্ঞান অর্জনে <br />
            আমাদের <span className="text-amber-400">কিতাবসমূহ</span>
          </h2>
          
          <p className="text-gray-200 text-sm md:text-base max-w-md leading-relaxed font-normal opacity-90">
            জ্ঞান অর্জন ও আমলে সহায়ক, কুরআন-সুন্নাহভিত্তিক আমাদের প্রকাশিত কিতাবসমূহ এখানে পড়তে পারবেন।
          </p>

          <div className="pt-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 group"
            >
              <span>ওয়েবসাইট ভিজিট করুন</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Content Area (Image Overlay) */}
        <div className="col-span-1 md:col-span-5 h-full relative flex items-end justify-center md:justify-end self-end pe-0 md:pe-8 lg:pe-12">
          <div className="relative w-[280px] md:w-[340px] lg:w-[380px] aspect-[1/1] md:aspect-square flex items-end">
            {/* Replace with your actual cut-out image path */}
            <img
              src="/images/scholar-with-books.png"
              alt="Scholar holding Islamic books"
              className="w-full h-auto object-contain object-bottom drop-shadow-[-10px_10px_20px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

      </div>

    </section>
  );
}