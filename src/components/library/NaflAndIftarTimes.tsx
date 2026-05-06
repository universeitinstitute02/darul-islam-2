"use client";

import React from "react";
import {
  Sun,
  CloudSun,
  Moon,
  Landmark,
  ExternalLink,
  Info,
  Clock,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface NaflTimeItem {
  icon: LucideIcon;
  name: string;
  time: string;
  extra?: string;
}

const NaflAndIftarTimes = () => {
  const naflTimes: NaflTimeItem[] = [
    { icon: Sun, name: "দুহা (চাশত)", time: "০৫:৩৮ - ১১:৫২" },
    { icon: Landmark, name: "যাওয়াল শুরু", time: "১১:৫৭" },
    { icon: CloudSun, name: "আওয়াবিন", time: "মাগরিবের পর - ০৭:৪৯" },
    {
      icon: Moon,
      name: "তাহাজ্জুদ",
      time: "ইশার পর - ০৪:০০",
      extra: "রাতের শেষ ১/৩ শুরু: ১২:৫০",
    },
  ];

  const toBn = (str: string): string =>
    str.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);

  return (
    <div className="w-full bg-gray-50 px-3 sm:px-4 py-8 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
        {/* Sahri, Iftar & Countdown Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "শেষ সাহরি",
              time: "০৪:০০",
              icon: Clock,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "ইফতারের সময়",
              time: "০৬:২৯",
              icon: Sun,
              color: "text-orange-600",
              bg: "bg-orange-50",
            },
            {
              label: "ইফতারের বাকি",
              time: "০৩:৪৩:২৮",
              icon: Info,
              color: "text-rose-600",
              bg: "bg-rose-50",
              isCountdown: true,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm border border-emerald-100/50 flex items-center gap-4"
            >
              <span
                className={`p-3 sm:p-4 ${item.bg} ${item.color} rounded-2xl shrink-0`}
              >
                <item.icon size={24} />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest truncate">
                  {item.label}
                </span>
                <span
                  className={`text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter truncate ${item.isCountdown ? "text-rose-600 font-mono" : "text-emerald-950"}`}
                >
                  {toBn(item.time)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Nafl Prayer Section */}
        <div className="bg-emerald-950 rounded-[2.5rem] p-5 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-white/5">
          {/* Background Decor */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none" />

          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="min-w-0">
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight truncate">
                নফল সালাতের সময়
              </h4>
              <div className="h-1 w-10 bg-emerald-500 mt-2 rounded-full" />
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 bg-white/5 rounded-xl border border-white/10 text-emerald-400 shrink-0 ml-2"
            >
              <ExternalLink size={18} />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
            {naflTimes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center sm:justify-between gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-3 bg-emerald-800/50 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                    <item.icon size={22} className="sm:size-[24px]" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-sm sm:text-base lg:text-xl text-emerald-50 truncate">
                      {item.name}
                    </h5>
                    {item.extra && (
                      <p className="text-[9px] sm:text-[11px] text-emerald-400/60 font-medium truncate">
                        {toBn(item.extra)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 ml-auto">
                  <span className="text-xs sm:text-sm lg:text-lg font-mono font-black text-emerald-400 bg-emerald-400/10 px-2 sm:px-3 py-1 rounded-lg whitespace-nowrap">
                    {toBn(item.time)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-center gap-2 text-emerald-900/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest py-2 text-center">
          <Info size={14} className="shrink-0 text-emerald-500/50" />
          <span className="leading-tight">চাঁদ দেখা সাপেক্ষে পরিবর্তনীয়</span>
        </div>
      </div>
    </div>
  );
};

export default NaflAndIftarTimes;
