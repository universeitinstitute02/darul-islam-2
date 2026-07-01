import React from 'react';
import { Users } from 'lucide-react'; // উদাহরণস্বরূপ একটি আইকন ব্যবহার করা হয়েছে

export default function SuccessStats() {
  return (
    <section className="w-full bg-[#0B1315] text-white py-16 px-6 md:px-12 lg:px-24 font-sans relative overflow-hidden">
      
      {/* Background Subtle Mosque Vector/Pattern */}
      <div className="absolute bottom-0 left-10 opacity-10 pointer-events-none w-64 h-64">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-500 w-full h-full">
          <path d="M50 15 C45 25 48 35 50 40 C52 35 55 25 50 15 Z M50 40 L50 100 M35 50 C30 55 32 70 35 75 M65 50 C70 55 68 70 65 75" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Title and Stats Cards */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Main Heading */}
          <h2 className="text-2xl md:text-4xl font-bold tracking-wide text-center lg:text-left">
            একনজরে আমাদের <span className="text-amber-500">সাফল্যসমূহ</span>
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Green Gradient */}
            <div className="bg-gradient-to-br from-[#E8FBF2] via-[#F4FEFA] to-[#C9F3E1] p-6 rounded-2xl shadow-md min-h-[120px] flex flex-col justify-center text-[#1E293B]">
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">২৫০০+</div>
              <div className="text-sm md:text-base font-semibold text-gray-700 mt-1">শিক্ষার্থী</div>
            </div>

            {/* Card 2: Blue Gradient with Top Right Icon */}
            <div className="relative bg-gradient-to-br from-[#EBF7FF] via-[#F4FAFF] to-[#D2EDFF] p-6 rounded-2xl shadow-md min-h-[120px] flex flex-col justify-center text-[#1E293B]">
              <div className="absolute top-4 right-4 text-blue-400 bg-white/60 p-1 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">৩৫+</div>
              <div className="text-sm md:text-base font-semibold text-gray-700 mt-1">শিক্ষক</div>
            </div>

            {/* Card 3: Cyan/Mint Gradient */}
            <div className="bg-gradient-to-br from-[#E6FCFA] via-[#F3FFFE] to-[#C7F7F2] p-6 rounded-2xl shadow-md min-h-[120px] flex flex-col justify-center text-[#1E293B]">
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">১৫+</div>
              <div className="text-sm md:text-base font-semibold text-gray-700 mt-1">শিক্ষিকা</div>
            </div>

            {/* Card 4: Yellow/Orange Gradient */}
            <div className="bg-gradient-to-br from-[#FFFBEA] via-[#FFFDF5] to-[#FFEBB5] p-6 rounded-2xl shadow-md min-h-[120px] flex flex-col justify-center text-[#1E293B]">
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">৭+</div>
              <div className="text-sm md:text-base font-semibold text-gray-700 mt-1">স্টাফ</div>
            </div>

          </div>
        </div>

        {/* Right Side: Arch-shaped Dotted Framed Image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[360px] aspect-[4/5] p-2 border-2 border-dashed border-gray-400 rounded-t-[150px] rounded-b-lg flex items-center justify-center">
            <div className="w-full h-full rounded-t-[145px] rounded-b-md overflow-hidden bg-gray-800">
              {/* Replace with your original image source path */}
              <img 
                src="/images/classroom-view.jpg" 
                alt="Madrasa Success View" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}