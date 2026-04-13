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
    <section className="px-3 py-3 lg:px-8 bg-background-soft relative overflow-hidden">
      
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl lg:text-5xl font-black text-primary">
            আমাদের কার্যক্রম
          </h2>
          {/* <p className="text-primary/60 text-xs lg:text-base leading-relaxed">
            প্রতিষ্ঠানের বহুমুখী কার্যক্রমের মাধ্যমে আমরা সমাজের প্রতিটি স্তরে
            শিক্ষার আলো এবং ইসলামের সুমহান আদর্শ পৌঁছে দিতে অঙ্গীকারবদ্ধ।
          </p> */}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {activities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[4/5] overflow-hidden rounded-xl group cursor-pointer"
            >
              
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-3 lg:p-5 z-10">
                
                {/* Title (Top) */}
                <h3 className="text-sm lg:text-xl font-bold">
                  {item.name}
                </h3>

                {/* Button (Bottom) */}
                <Link
                  href={item.href}
                  className="flex items-center gap-2 bg-red-500 py-1 px-2 rounded-2xl text-white text-[10px] lg:text-sm font-semibold opacity-90 group-hover:opacity-100 transition"
                >
                  বিস্তারিত দেখুন <ArrowRight size={14} />
                </Link>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}