"use client";
import React from "react";
import {
  BookOpen,
  Users,
  Clock,
  MoreVertical,
  ExternalLink,
  Plus,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const MyCourses = () => {
  const courses = [
    {
      id: 1,
      title: "সহীহ তিলাওয়াত ও তাজবিদ",
      totalLessons: 24,
      completedLessons: 14,
      students: 45,
      nextClass: "আজ রাত ৮:৩০",
      image:
        "https://images.unsplash.com/photo-1584281729155-3c9933058132?q=80&w=2070&auto=format&fit=crop",
      color: "bg-emerald-600",
    },
    {
      id: 2,
      title: "হাদিস পরিচিতি ও সংকলন",
      totalLessons: 18,
      completedLessons: 4,
      students: 39,
      nextClass: "আগামীকাল বিকাল ৪:০০",
      image:
        "https://images.unsplash.com/photo-1590076215667-875d4ef2d968?q=80&w=2070&auto=format&fit=crop",
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="mt-8 space-y-6 pb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">
            আমার কোর্সসমূহ
          </h2>
          <p className="text-xs md:text-sm text-neutral-500">
            আপনার পরিচালিত সকল কোর্সের তালিকা
          </p>
        </div>
        <button className="bg-[#105D38] hover:bg-[#0c4a2d] text-white p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-green-900/10">
          <Plus size={20} />
          <span className="hidden md:inline font-bold text-sm">নতুন ব্যাচ</span>
        </button>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, idx) => {
          const progress =
            (course.completedLessons / course.totalLessons) * 100;

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden group hover:shadow-md transition-all"
            >
              {/* Course Thumbnail */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30 mb-1 w-fit">
                    <PlayCircle size={12} /> {course.totalLessons} টি লেসন
                  </div>
                  <h3 className="font-bold text-lg leading-tight">
                    {course.title}
                  </h3>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase font-bold">
                        শিক্ষার্থী
                      </p>
                      <p className="text-xs font-bold text-neutral-800">
                        {course.students} জন
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase font-bold">
                        পরবর্তী ক্লাস
                      </p>
                      <p className="text-xs font-bold text-neutral-800">
                        {course.nextClass}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-neutral-500 uppercase tracking-wider">
                      সিলেবাস অগ্রগতি
                    </span>
                    <span className="text-[#105D38]">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-[#105D38] h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button className="flex-1 py-3 bg-[#F9FBFA] border border-neutral-200 text-neutral-700 rounded-xl font-bold text-xs hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2">
                    মডিউল এডিট
                  </button>
                  <button className="flex-1 py-3 bg-[#C5A059] text-white rounded-xl font-bold text-xs shadow-lg shadow-yellow-900/10 hover:bg-[#b38f4d] transition-all flex items-center justify-center gap-2">
                    লাইভ শুরু <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;
