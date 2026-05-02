"use client";
import React, { useState } from "react";
import { Search, Filter, BookOpen, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const EducationHero = ({ searchTerm, onSearchChange }: HeroProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    "হিফজুল কুরআন বিভাগ",
    "নূরানী ও নাজেরা বিভাগ",
    "কিতাব বিভাগ",
    "উর্দু ও ফারসি সাহিত্য",
    "ফ্রি কোর্সসমূহ",
  ];

  return (
    <div className="relative w-full bg-[#105D38] overflow-hidden rounded-b-[2rem] lg:rounded-b-[3.5rem] mb-8">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/5 rounded-full -ml-16 -mb-16 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 pt-20 pb-12 lg:pt-28 lg:pb-16 relative z-10">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 px-3 py-1 rounded-full text-white text-[10px] md:text-xs backdrop-blur-md"
          >
            <BookOpen size={14} className="text-green-300" />
            <span>আধুনিক শিক্ষার এক অনন্য মাধ্যম</span>
          </motion.div>

          <motion.h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            আমাদের সকল <span className="text-green-300">শিক্ষামূলক</span> কোর্স
          </motion.h1>

          <motion.div className="max-w-2xl mx-auto mt-6 relative">
            <div className="bg-white p-1.5 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-1.5">
              {/* Search Input */}
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="সার্চ করুন..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg focus:outline-none text-sm text-gray-700 bg-gray-50 border-transparent focus:bg-white focus:border-green-100 border-2 transition-all"
                />
              </div>

              <div className="flex w-full md:w-auto gap-1.5">
                {/* Filter Button with Dropdown */}
                <div className="relative flex-1 md:flex-none">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-full flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm transition-all"
                  >
                    <Filter size={16} />
                    ফিল্টার
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 py-2 overflow-hidden"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              onSearchChange(cat);
                              setIsFilterOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-[#105D38] transition-colors font-medium"
                          >
                            {cat}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-1">
                          <button
                            onClick={() => {
                              onSearchChange("");
                              setIsFilterOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 font-bold"
                          >
                            ফিল্টার মুছুন
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button className="flex-1 md:flex-none bg-[#105D38] hover:bg-black text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all">
                  সার্চ
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap justify-center gap-3 mt-3 text-white/60 text-[11px] md:text-xs">
              <span className="font-semibold uppercase tracking-wider opacity-80">
                জনপ্রিয়:
              </span>
              {["হিফজুল কুরআন", "আরবি সাহিত্য", "তাফসীর"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearchChange(tag)}
                  className="hover:text-green-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EducationHero;
