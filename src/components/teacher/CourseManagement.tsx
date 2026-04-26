"use client";
import React from "react";
import {
  FileText,
  Video,
  FolderPlus,
  MoreVertical,
  Download,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

const CourseManagement = () => {
  const resources = [
    {
      id: 1,
      courseName: "সহীহ তিলাওয়াত ও তাজবিদ",
      totalFiles: 12,
      lastUpload: "২ দিন আগে",
      progress: 65,
    },
    {
      id: 2,
      courseName: "হাদিস পরিচিতি",
      totalFiles: 8,
      lastUpload: "৫ দিন আগে",
      progress: 40,
    },
  ];

  return (
    <div className="mt-10 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-800">
            কোর্স ও রিসোর্স কন্ট্রোল
          </h2>
          <p className="text-xs md:text-sm text-neutral-500">
            আপনার কোর্সের ম্যাটেরিয়াল ও ফাইল ম্যানেজ করুন
          </p>
        </div>
        <button className="p-2 bg-[#105D38]/10 text-[#105D38] rounded-full hover:bg-[#105D38]/20 transition-colors">
          <FolderPlus size={22} />
        </button>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {resources.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm overflow-hidden"
          >
            {/* Glossy Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full transform skew-x-12" />

            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-800 group-hover:text-[#105D38] transition-colors">
                    {item.courseName}
                  </h3>
                  <button className="text-neutral-400 hover:text-neutral-600">
                    <MoreVertical size={18} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] md:text-xs font-medium text-neutral-500">
                    <span>সিলেবাস প্রগ্রেস</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-[#C5A059] rounded-full"
                    />
                  </div>
                </div>

                {/* Resource Icons & Stats */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={14} />
                      </div>
                      <span className="text-xs font-semibold text-neutral-600">
                        {item.totalFiles} ফাইল
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                        <Video size={14} />
                      </div>
                      <span className="text-xs font-semibold text-neutral-600">
                        লাইভ রেকর্ড
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-400 italic">
                    আপডেট: {item.lastUpload}
                  </span>
                </div>

                {/* Action Buttons: Mobile Friendly */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className="flex items-center justify-center gap-2 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl active:scale-95 transition-transform">
                    <Download size={14} /> ডাউনলোড
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-neutral-200 text-neutral-700 text-xs font-bold rounded-xl active:scale-95 transition-transform hover:bg-neutral-50">
                    <ExternalLink size={14} /> ভিউ পেজ
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
