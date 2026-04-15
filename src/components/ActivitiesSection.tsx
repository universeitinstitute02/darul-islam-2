"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const activities = [
  { 
    name: "শিক্ষা কার্যক্রম", 
    href: "/education",
    image: "/images/gallery-gathering.png"
  },
  { 
    name: "লাইব্রেরি", 
    href: "/library",
    image: "/images/gallery-gathering.png"
  },
  { 
    name: "দাওয়াহ কার্যক্রম", 
    href: "/dawah",
    image: "/images/gallery-gathering.png"
  },
];

export default function ActivitiesSection() {
  return (
    <section className="px-3 py-3 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      
      {/* Background blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-300/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-3">
          <h2 className="text-xl lg:text-4xl font-extrabold text-green-800 tracking-tight">
            আমাদের কার্যক্রম
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Grid (always 3) */}
        <div className="grid grid-cols-3 gap-3 lg:gap-6">

          {activities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition duration-300"
            >
              
              {/* Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

              {/* Glass layer */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 lg:p-5 z-10">
                
                {/* Title */}
                <h3 className="text-white text-xs lg:text-lg font-bold leading-snug">
                  {item.name}
                </h3>

                {/* Button */}
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 
                  bg-white/90 text-green-800 
                  py-1 px-3 rounded-full 
                  text-[10px] lg:text-sm font-semibold 
                  shadow hover:bg-green-600 hover:text-white 
                  transition-all duration-300"
                >
                  বিস্তারিত <ArrowRight size={14} />
                </Link>

              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-green-500 group-hover:w-full transition-all duration-300"></div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}