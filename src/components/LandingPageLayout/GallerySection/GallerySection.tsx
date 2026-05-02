"use client";
import React from "react";
import { ImageIcon, Expand, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  title: string;
  size: string;
}

const GallerySection: React.FC = () => {
  const images: GalleryImage[] = [
    {
      src: "https://ibb.co.com/2YSZWdDy",
      title: "গ্রুপ স্টাডি",
      size: "lg:col-span-2 lg:row-span-2 md:col-span-2",
    },
    {
      src: "https://ibb.co.com/bprY4fG",
      title: "আধুনিক ক্লাসরুম",
      size: "lg:col-span-1 lg:row-span-1",
    },
    {
      src: "https://ibb.co.com/xSV09MWp",
      title: "প্রধান ভবন",
      size: "lg:col-span-1 lg:row-span-2 md:col-span-1",
    },
    {
      src: "https://ibb.co.com/rf5rkpFb",
      title: "সাংস্কৃতিক অনুষ্ঠান",
      size: "lg:col-span-1 lg:row-span-1",
    },
  ];

  return (
    <section className="px-4 py-16 lg:py-24 max-w-7xl mx-auto">
      {/* হেডার অংশ */}
      <div className="flex flex-col items-center mb-12 text-center">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-[#105D38] rounded-full text-xs font-bold mb-4">
          <ImageIcon className="w-4 h-4" />
          <span>আমাদের ক্যাম্পাস লাইফ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          ফটো গ্যালারি
        </h2>
        <div className="w-20 h-1.5 bg-[#105D38] rounded-full"></div>
      </div>

      {/* মেইন গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[250px] md:auto-rows-[300px]">
        {images.map((img, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-gray-100 transition-all duration-700 hover:shadow-2xl hover:shadow-emerald-900/20 ${img.size}`}
          >
            {/* ছবি */}
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
            />

            {/* প্রিমিয়াম ওভারলে: মোবাইলে সবসময় হালকা দৃশ্যমান, ডেস্কটপে হোভারে */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
                    স্মৃতি
                  </p>
                  <h3 className="text-white text-lg md:text-xl font-bold">
                    {img.title}
                  </h3>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-[#105D38] scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>

            {/* মোবাইল ইন্ডিকেটর আইকন */}
            <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full md:hidden">
              <Expand className="w-4 h-4 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* গ্লাস-মর্ফিজম বাটন */}
      <div className="mt-12 flex justify-center">
        <button className="group relative flex items-center gap-3 px-12 py-5 bg-[#105D38] text-white font-black rounded-full overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-xl shadow-emerald-900/20">
          <span className="relative z-10">সম্পূর্ণ গ্যালারি দেখুন</span>
          <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />

          {/* বাটন এনিমেশন লেয়ার */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
