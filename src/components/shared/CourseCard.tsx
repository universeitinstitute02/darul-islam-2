"use client";
import React from "react";
import { Clock, Edit3, Trash2, Tag } from "lucide-react";
import { motion } from "framer-motion";

const CourseCard = ({
  course,
  idx,
  onEdit,
  onDelete,
}: {
  course: any;
  idx: number;
  onEdit: (course: any) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white rounded-2xl md:rounded-3xl border border-neutral-100 shadow-sm overflow-hidden group hover:shadow-md transition-all flex flex-col h-full"
    >
      {/* Thumbnail Area */}
      <div className="relative h-32 md:h-48 overflow-hidden bg-gray-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className="bg-emerald-600 text-white text-[8px] md:text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 rounded font-bold uppercase">
            {course.courseType}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 right-2 md:right-4 text-white">
          <h3 className="font-bold text-xs md:text-lg leading-tight line-clamp-1">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-6 flex flex-col flex-grow space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm font-black text-neutral-800">
            ৳{course.price}
          </span>
          <span className="text-[10px] md:text-xs text-neutral-500 flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 pt-1 mt-auto">
          <button
            onClick={() => onEdit(course)}
            className="w-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg font-bold text-[10px] md:text-xs flex items-center justify-center gap-1 hover:bg-emerald-100 transition-colors"
          >
            <Edit3 size={12} /> এডিট
          </button>

          <button
            onClick={() => onDelete(course._id)}
            className="w-full py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold text-[10px] md:text-xs flex items-center justify-center gap-1 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={12} /> ডিলিট
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
