"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Users,
  MessageSquare,
  PlusCircle,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Modal from "../shared/Modal";

const TeacherOverview = () => {
  // মডাল স্টেট ম্যানেজমেন্ট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const stats = [
    {
      id: 1,
      label: "আমার কোর্স",
      value: 2,
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      id: 2,
      label: "মোট শিক্ষার্থী",
      value: 84,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: 3,
      label: "নতুন প্রশ্ন",
      value: 12,
      icon: MessageSquare,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const currentCourses = [
    {
      id: 1,
      name: "সহীহ তিলাওয়াত ও তাজবিদ",
      students: 45,
      status: "Online",
      time: "আজ সন্ধ্যা ৭:০০",
    },
    {
      id: 2,
      name: "হাদিস পরিচিতি",
      students: 39,
      status: "Online",
      time: "আগামীকাল বিকাল ৪:০০",
    },
  ];

  // ম্যানেজ বাটনে ক্লিক করলে মডাল ওপেন করার ফাংশন
  const handleManageClick = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-[#F9FBFA] ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#105D38]">
            শিক্ষক প্যানেল
          </h1>
          <p className="text-sm md:text-base text-neutral-500">
            স্বাগতম ওস্তাদ! আপনার ড্যাশবোর্ড চেক করুন।
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-[#C5A059] text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md active:bg-[#b38f4d]"
        >
          <PlusCircle size={20} />
          নতুন কোর্স
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white p-4 md:p-6 rounded-2xl border border-neutral-100 shadow-sm ${idx === 2 ? "col-span-2 md:col-span-1" : ""}`}
          >
            <stat.icon className={`${stat.color} mb-2 md:mb-4`} size={24} />
            <h3 className="text-2xl md:text-4xl font-extrabold text-neutral-800">
              <CountUp end={stat.value} duration={2} />
            </h3>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg md:text-xl font-bold text-neutral-800">
            পরিচালিত কোর্স
          </h2>
          <button className="text-[#105D38] text-xs md:text-sm font-semibold flex items-center gap-1">
            সবগুলো <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white border border-neutral-100 p-4 rounded-2xl shadow-sm active:bg-neutral-50 transition-colors flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="max-w-[80%]">
                  <h3 className="text-base md:text-lg font-bold text-neutral-800 leading-tight">
                    {course.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Users size={12} /> {course.students} জন
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      {course.status}
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-neutral-50 rounded-xl">
                  <BookOpen size={18} className="text-[#C5A059]" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-50 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
                  <Calendar size={14} className="text-[#105D38]" />
                  <span>{course.time}</span>
                </div>
                <button
                  onClick={() => handleManageClick(course)}
                  className="text-xs md:text-sm font-bold text-[#105D38] flex items-center"
                >
                  ম্যানেজ <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- Mobile UI Focused Modal --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="ক্লাস শিডিউল পরিবর্তন"
      >
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-xs font-bold text-emerald-700 mb-1">
              নির্বাচিত কোর্স:
            </p>
            <h4 className="text-lg font-bold text-neutral-800">
              {selectedCourse?.name}
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-neutral-700 block mb-2 px-1 flex items-center gap-2">
                <Clock size={16} className="text-[#C5A059]" /> নতুন সময় নির্ধারণ
              </label>
              <input
                type="text"
                defaultValue={selectedCourse?.time}
                placeholder="উদা: আজ রাত ৯:০০"
                className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium text-neutral-800"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-neutral-700 block mb-2 px-1 flex items-center gap-2">
                <MessageSquare size={16} className="text-[#C5A059]" />{" "}
                শিক্ষার্থীদের জন্য বার্তা (ঐচ্ছিক)
              </label>
              <textarea
                rows={3}
                placeholder="সময় পরিবর্তনের কারণ বা আজকের বিশেষ নির্দেশনা..."
                className="w-full px-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium text-neutral-800"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button className="w-full py-4 bg-[#105D38] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform">
              <CheckCircle2 size={20} /> আপডেট নিশ্চিত করুন
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-4 bg-neutral-100 text-neutral-600 rounded-2xl font-bold active:scale-[0.98] transition-transform"
            >
              এখন নয়
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherOverview;
