"use client";
import React from "react";
import Image from "next/image";
import { ChevronRight, ShieldCheck, RefreshCcw, Truck } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const BestSellingProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "কুরআন শরীফ",
      price: "৬৫০",
      image:
        "https://pngtree.com/freepng/3d-quran-holder-transparent-background_16072331.html",
    },
    {
      id: 2,
      name: "তাসবিহ",
      price: "২০০",
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
    {
      id: 3,
      name: "ইসলামিক বই",
      price: "৪৫০",
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
    {
      id: 4,
      name: "আতর",
      price: "৫৫০",
      // ফিক্সড: ডাবল https মুছে ফেলা হয়েছে
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
    {
      id: 5,
      name: "নামাযের চাদর",
      price: "৪০০",
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
    {
      id: 6,
      name: "টুপি",
      price: "১৫০",
      image:
        "https://i.ibb.co.com/0jJJ8yMh/463087068-500611622945397-6536297165675071357-n-420x420.jpg",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "বিশ্বস্ত মানের পণ্য",
    },
    {
      icon: <RefreshCcw className="w-5 h-5 text-emerald-600" />,
      title: "সহজ রিটার্ন নীতি",
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      title: "দ্রুত ডেলিভারি",
    },
  ];

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-black text-[#105D38]">
          সেরা পণ্য সমূহ
        </h2>
        <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-gray-500">
          সব দেখুন <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl p-2 md:p-3 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-xl bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <h3 className="text-[10px] md:text-sm font-bold text-gray-800 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-[10px] md:text-xs text-gray-500 font-bold mt-1">
              ৳ {product.price}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center p-3 bg-[#F9FAFB] rounded-xl border border-gray-50 text-center"
          >
            {f.icon}
            <span className="text-[9px] md:text-xs font-bold text-gray-600 mt-2">
              {f.title}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-[#105D38] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#0d4d2e] transition-all active:scale-95">
        সব পণ্য দেখুন
      </button>
    </section>
  );
};

export default BestSellingProducts;
