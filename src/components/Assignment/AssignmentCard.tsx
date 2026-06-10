"use client";

import React from "react";
import {
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { SubmissionType } from "@/src/app/(dashboard)/dashboard/teacher/assignment/page";
import Image from "next/image";

interface CardProps {
  submission: SubmissionType;
  idx: number;
  onEvaluate: (submission: SubmissionType) => void;
}

const AssignmentCard = ({ submission, idx, onEvaluate }: CardProps) => {
  const viewImages = (images: string[]) => {
    if (!images || images.length === 0) {
      Swal.fire({ text: "কোনো ইমেজ ফাইল জমা দেওয়া হয়নি।", icon: "info" });
      return;
    }

    Swal.fire({
      title: "শিক্ষার্থীর খাতার ছবিসমূহ",
      html: `
        <div class="flex flex-col gap-4 max-h-[60vh] overflow-y-auto p-2">
          ${images
            .map(
              (img, i) => `
            <div class="border rounded-xl overflow-hidden bg-slate-50">
              <p class="text-[10px] text-slate-400 py-1 bg-slate-100">পৃষ্ঠা নম্বর: ${i + 1}</p>
              <img src="${img}" class="w-full object-contain h-auto max-h-[500px]" alt="Page ${i + 1}"/>
            </div>
          `,
            )
            .join("")}
        </div>
      `,
      confirmButtonText: "বন্ধ করুন",
      confirmButtonColor: "#64748B",
      customClass: { popup: "rounded-[2rem] max-w-xl w-full" },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white border border-neutral-100 p-4 rounded-2xl shadow-sm relative overflow-hidden flex flex-col justify-between"
    >
      {/* Status Ribbon */}
      <div
        className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[9px] font-extrabold uppercase tracking-wide ${
          submission.status === "pending"
            ? "bg-orange-50 text-orange-600 border-l border-b border-orange-100"
            : "bg-emerald-50 text-emerald-700 border-l border-b border-emerald-100"
        }`}
      >
        {submission.status === "pending" ? "রিভিউ বাকি" : "করা হয়েছে"}
      </div>

      {/* Student Profile Info */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <div className="w-9 h-9 bg-neutral-50 border border-neutral-200 rounded-full flex items-center justify-center text-[#0B5D3B] overflow-hidden">
            {submission.student?.profilePicture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${submission.student.profilePicture}`}
                alt="student"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "";
                }}
              />
            ) : (
              <User size={18} />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-0.5">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {submission.course?.name || "জেনারেল কোর্স"}
          </span>
          <h3 className="font-extrabold text-neutral-800 text-sm md:text-base leading-snug truncate mt-1">
            {submission.assignment?.title}
          </h3>
          <p className="text-[11px] text-neutral-400 font-medium">
            শিক্ষার্থী:{" "}
            <span className="font-bold text-neutral-600">
              {submission.student?.name}
            </span>
          </p>
        </div>
      </div>

      {/* Student Notes Panel */}
      {submission.studentNotes && (
        <div className="mt-3 bg-neutral-50/80 rounded-xl p-2.5 border border-dashed border-neutral-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            💡 শিক্ষার্থীর নোট:
          </p>
          <p
            className="text-xs text-slate-600 mt-0.5 font-medium line-clamp-2"
            title={submission.studentNotes}
          >
            "{submission.studentNotes}"
          </p>
        </div>
      )}

      {/* Graded Summary */}
      {submission.status === "reviewed" && (
        <div className="mt-3 bg-emerald-50/40 rounded-xl p-2.5 border border-emerald-100/80 flex flex-col gap-0.5">
          <p className="text-xs font-black text-slate-700">
            📊 প্রাপ্ত স্কোর:{" "}
            <span className="text-emerald-600 text-sm font-black">
              {submission.marksObtained}
            </span>{" "}
            / {submission.assignment?.totalMarks}
          </p>
          {submission.instructorFeedback && (
            <p className="text-[11px] text-neutral-500 font-medium italic">
              "<b>মন্তব্য:</b> {submission.instructorFeedback}"
            </p>
          )}
        </div>
      )}

      {/* Bottom Grid Info */}
      <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-neutral-100">
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-neutral-400 font-semibold">
          <Clock size={12} />
          <span>সাবমিট করা হয়েছে</span>
        </div>

        <div className="flex items-center gap-1.5">
          {submission.status === "pending" ? (
            <span className="text-[10px] sm:text-xs text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <AlertCircle size={10} /> পেন্ডিং
            </span>
          ) : (
            <span className="text-[10px] sm:text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <CheckCircle size={10} /> গ্র্যাডেড
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={() => viewImages(submission.submittedImages)}
          className="h-9 bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <Eye size={13} /> ফাইল দেখুন (
          {submission.submittedImages?.length || 0})
        </button>
        <button
          onClick={() => onEvaluate(submission)}
          className={`h-9 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
            submission.status === "pending"
              ? "bg-[#0B5D3B] text-white hover:bg-green-800"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
          }`}
        >
          {submission.status === "pending" ? "মূল্যায়ন করুন" : "আপডেট করুন"}
          {submission.status === "pending" && <ArrowRight size={13} />}
        </button>
      </div>
    </motion.div>
  );
};

export default AssignmentCard;
