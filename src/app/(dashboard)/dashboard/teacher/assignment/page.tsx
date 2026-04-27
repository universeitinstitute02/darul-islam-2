"use client";
import React from "react";
import {
  FileCheck,
  Clock,
  User,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const AssignmentManagement = () => {
  const assignments = [
    {
      id: 1,
      studentName: "আরিফ বিল্লাহ",
      assignmentTitle: "তাজবিদের নিয়মাবলী - পার্ট ১",
      submittedDate: "আজ দুপুর ২:৩০",
      status: "Pending",
      course: "সহীহ তিলাওয়াত",
    },
    {
      id: 2,
      studentName: "সালমান ফারসি",
      assignmentTitle: "হাদিসের প্রকারভেদ নোট",
      submittedDate: "গতকাল",
      status: "Graded",
      course: "হাদিস পরিচিতি",
    },
    {
      id: 3,
      studentName: "রাকিবা আক্তার",
      assignmentTitle: "মাখরাজ পরিচিতি ভিডিও",
      submittedDate: "৩ দিন আগে",
      status: "Pending",
      course: "সহীহ তিলাওয়াত",
    },
  ];

  return (
    <div className="mt-8 space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-800">
            অ্যাসাইনমেন্ট ও মূল্যায়ন
          </h2>
          <p className="text-xs md:text-sm text-neutral-500">
            শিক্ষার্থীদের জমা দেওয়া কাজগুলো রিভিউ করুন
          </p>
        </div>
        <div className="bg-[#C5A059]/10 text-[#C5A059] p-2 rounded-xl">
          <FileCheck size={22} />
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white border border-neutral-100 p-4 rounded-2xl shadow-sm relative overflow-hidden"
          >
            {/* Status Ribbon (Mobile Friendly) */}
            <div
              className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase ${
                task.status === "Pending"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.status === "Pending" ? "রিভিউ বাকি" : "মূল্যায়িত"}
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-[#105D38]">
                  <User size={20} />
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-neutral-800 text-sm md:text-base leading-tight">
                  {task.assignmentTitle}
                </h3>
                <p className="text-xs text-neutral-500 flex items-center gap-1">
                  <span className="font-semibold text-neutral-700">
                    {task.studentName}
                  </span>{" "}
                  • {task.course}
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-400">
                    <Clock size={12} /> {task.submittedDate}
                  </div>
                  {task.status === "Pending" ? (
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-orange-500 font-medium">
                      <AlertCircle size={12} /> চেক করা হয়নি
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-green-600 font-medium">
                      <CheckCircle size={12} /> গ্রেড দেওয়া হয়েছে
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons for Mobile */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-neutral-50">
              <button className="py-2.5 bg-neutral-50 text-neutral-700 text-xs font-bold rounded-xl active:scale-95 transition-all">
                ফাইল দেখুন
              </button>
              <button
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all ${
                  task.status === "Pending"
                    ? "bg-[#105D38] text-white shadow-md shadow-green-900/10"
                    : "bg-neutral-100 text-neutral-400 border border-neutral-200"
                }`}
              >
                {task.status === "Pending" ? "মূল্যায়ন করুন" : "সম্পন্ন"}
                {task.status === "Pending" && <ArrowRight size={14} />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Summary Bar */}
      <div className="bg-[#105D38] p-4 rounded-2xl flex items-center justify-between text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Send size={18} />
          </div>
          <div>
            <p className="text-[10px] text-green-100 opacity-80 uppercase tracking-wider font-bold">
              অপেক্ষমান
            </p>
            <h4 className="text-sm font-bold">৫টি অ্যাসাইনমেন্ট বাকি</h4>
          </div>
        </div>
        <button className="text-xs bg-white text-[#105D38] px-4 py-2 rounded-lg font-bold active:scale-90 transition-transform">
          সবগুলো দেখুন
        </button>
      </div>
    </div>
  );
};

export default AssignmentManagement;
