"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import Kuran from "../../../public/images/kuran.png";
import tasbih from "../../../public/images/tasbih.png";

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategorySection = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "কুরআন শরীফ",
      image:
        "https://i.ibb.co.com/1f4vFQh9/360-F-263148731-URq-K7-TVJz0a1ja-V3-Iu-Ad-TBu-Xmoi4lc-A6.jpg",
    },
    {
      id: 2,
      name: "তাসবিহ",
      image:
        "https://i.ibb.co.com/1f4vFQh9/360-F-263148731-URq-K7-TVJz0a1ja-V3-Iu-Ad-TBu-Xmoi4lc-A6.jpg",
    },
    {
      id: 3,
      name: "ইসলামিক বই",
      image:
        "https://i.ibb.co.com/KzXKdMKt/png-row-islamic-books-transparent-background-378502811.webp",
    },
    {
      id: 4,
      name: "আতর",
      image: "https://i.ibb.co.com/rRR1Bstz/ramy-vicky-ator-3-ml-2.png",
    },
    {
      id: 5,
      name: "হাদিসের কিতাব",
      image:
        "https://i.ibb.co.com/KzXKdMKt/png-row-islamic-books-transparent-background-378502811.webp",
    },
    {
      id: 6,
      name: "পোশাক",
      image:
        "https://i.ibb.co.com/8g0CcrK3/pngtree-women-muslim-with-black-dress-png-image-5294699.png",
    },
    {
      id: 7,
      name: "উপহার সামগ্রী",
      image:
        "https://i.ibb.co.com/1f4vFQh9/360-F-263148731-URq-K7-TVJz0a1ja-V3-Iu-Ad-TBu-Xmoi4lc-A6.jpg",
    },
  ];

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto bg-white">
      {/* হেডার অংশ */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-black text-[#105D38]">
          ক্যাটেগরি সমূহ
        </h2>
        <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-gray-500 hover:text-[#105D38] transition-colors">
          সব দেখুন
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ক্যাটেগরি গ্রিড */}
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="group cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              {/* ইমেজ কন্টেইনার */}
              <div className="relative w-full aspect-square bg-[#F3F4F6] rounded-2xl md:rounded-[2rem] overflow-hidden border border-gray-100 group-hover:border-emerald-200 transition-all group-hover:shadow-lg group-hover:shadow-emerald-900/5">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover p-2 md:p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* নাম */}
              <span className="text-[10px] md:text-sm font-bold text-gray-700 text-center line-clamp-1 group-hover:text-[#105D38]">
                {cat.name}
              </span>
            </div>
          </div>
        ))}

        {/* 'অন্যান্য' বা More বাটন */}
        <div className="group cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-full aspect-square bg-[#F3F4F6] rounded-2xl md:rounded-[2rem] flex items-center justify-center border border-gray-100 group-hover:bg-emerald-50 transition-all">
              <MoreHorizontal className="w-6 h-6 text-gray-400 group-hover:text-[#105D38]" />
            </div>
            <span className="text-[10px] md:text-sm font-bold text-gray-700">
              অন্যান্য
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
