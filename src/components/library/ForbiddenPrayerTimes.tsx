"use client";

import React from "react";
import { Info, ExternalLink, Sunrise, Sun, Sunset } from "lucide-react";
import { motion } from "framer-motion";

const ForbiddenPrayerTimes = () => {
  const forbiddenSlots = [
    {
      label: "সূর্যোদয়",
      time: "০৫:২২ - ০৫:৩৭",
      icon: Sunrise,
      color: "from-orange-500/20",
    },
    {
      label: "মধ্যাহ্ন",
      time: "১১:৫৩ - ১১:৫৬",
      icon: Sun,
      color: "from-yellow-500/20",
    },
    {
      label: "সূর্যাস্ত",
      time: "০৬:১৪ - ০৬:২৮",
      icon: Sunset,
      color: "from-rose-500/20",
    },
  ];

  return (
    // বাইরের ব্যাকগ্রাউন্ড এখন gray-50
    <div className="w-full bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Card: bg-emerald-950 দিয়ে আগের সেকশনের সাথে মিল রাখা হয়েছে */}
        <div className="relative bg-emerald-950 rounded-[2.5rem] p-6 lg:p-10 shadow-2xl border border-white/5 overflow-hidden">
          {/* Background Decorative Glow (ডার্ক থিমে প্রিমিয়াম লুকের জন্য) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -z-10" />

          {/* Header Section */}
          <div className="flex flex-row justify-between items-center mb-8 gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl lg:text-3xl font-black text-rose-400 tracking-tight">
                নিষিদ্ধ সময়
              </h2>
              <p className="hidden md:block text-emerald-300/50 text-xs font-bold uppercase tracking-widest">
                Forbidden Prayer Intervals
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-emerald-400 transition-all text-xs lg:text-sm font-bold border border-white/5 group"
            >
              রেফারেন্স
              <ExternalLink
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </motion.button>
          </div>

          {/* Alert/Disclaimer Section */}
          <div className="flex items-center gap-3 bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 mb-8">
            <div className="p-2 bg-rose-500/20 rounded-lg shrink-0">
              <Info size={18} className="text-rose-400" />
            </div>
            <p className="text-[11px] lg:text-sm text-rose-200/80 leading-relaxed font-medium">
              এই সময়ে সকল প্রকার সালাত আদায় করা শরীয়ত অনুযায়ী নিষিদ্ধ।
              <span className="hidden sm:inline">
                {" "}
                (ব্যতিক্রম: আসর সালাত যদি ওই দিনেরই হয়)
              </span>
            </p>
          </div>

          {/* Forbidden Times Grid */}
          <div className="grid grid-cols-3 gap-3 lg:gap-6">
            {forbiddenSlots.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br ${slot.color} to-transparent bg-white/5 rounded-3xl p-4 lg:p-8 border border-white/10 flex flex-col items-center text-center group hover:border-rose-500/30 transition-all duration-500`}
              >
                {/* Icon Container */}
                <div className="mb-3 lg:mb-4 p-2 lg:p-3 bg-white/5 rounded-2xl group-hover:bg-rose-500/20 transition-colors">
                  <slot.icon className="w-5 h-5 lg:w-8 lg:h-8 text-rose-400" />
                </div>

                <span className="text-[10px] lg:text-sm text-white/40 font-bold uppercase tracking-widest mb-1">
                  {slot.label}
                </span>

                <span className="text-[12px] sm:text-base lg:text-3xl font-mono font-black text-white tracking-tighter lg:tracking-normal">
                  {slot.time}
                </span>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPrayerTimes;
