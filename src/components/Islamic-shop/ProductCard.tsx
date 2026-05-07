"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white border border-gray-100 rounded-2xl p-2 md:p-3 text-center shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden"
    >
      {/* ইমেজ */}
      <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />

        {/* কুইক অ্যাকশন বাটন (অপশনাল, শুধু আইকন হিসেবে থাকবে) */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-red-500">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* টেক্সট */}
      <div className="flex flex-col flex-grow justify-between">
        <h3 className="text-[10px] md:text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#105D38] transition-colors">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between bg-green-50/50 p-1 rounded-lg">
          <p className="text-[11px] md:text-sm text-[#105D38] font-black pl-1">
            ৳ {product.price}
          </p>
          <div className="p-1.5 bg-[#105D38] text-white rounded-md">
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
