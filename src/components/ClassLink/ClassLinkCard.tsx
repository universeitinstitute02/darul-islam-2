"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import Swal from "sweetalert2";

interface CoursePopulated {
  _id: string;
  name: string;
  category: string;
  banner: string;
}

interface ClassLink {
  _id: string;
  classTitle: string;
  link: string;
  classDate: string;
  startTime: string;
  endTime: string;
  course: CoursePopulated;
}

export default function ClassLinkCard({
  linkData,
  onEdit,
  showToast,
}: {
  linkData: ClassLink;
  onEdit: (data: ClassLink) => void;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosSecure.delete(
        `/class-links/teacher/delete-link/${id}`,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["class-links-teacher"] });
      showToast(data?.message || "ক্লাস লিঙ্ক সফলভাবে ডিলিট হয়েছে", "success");
    },
    onError: (err: any) => {
      const errMsg =
        err?.response?.data?.message || "লিঙ্কটি ডিলিট করা যায়নি।";
      showToast(errMsg, "error");
    },
  });

  const handleCopy = () => {
    if (!linkData.link) return;
    navigator.clipboard.writeText(linkData.link);
    setCopied(true);
    showToast("লিঙ্কটি ক্লিপবোর্ডে কপি করা হয়েছে!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "ডিলিট করার পর এই ক্লাস লিঙ্কটি আর ফিরিয়ে আনা যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      cancelButtonText: "বাতিল করুন",
      customClass: {
        popup: "rounded-[2rem]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(linkData._id);
      }
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      {/* 💡 FIX: প্যাডিং মোবাইলে p-3 এবং বড় স্ক্রিনে p-6 করা হয়েছে যাতে জায়গা বাঁচে */}
      <div className="p-3 sm:p-6 flex flex-col gap-3 sm:gap-5 flex-1">
        {/* Header Content */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            {/* 💡 FIX: টেক্সট সাইজ মোবাইলের জন্য আরও ছোট করা হয়েছে */}
            <span className="text-[8px] sm:text-[10px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider truncate max-w-[80%]">
              {linkData.course?.category || "General"}
            </span>

            <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
            </span>
          </div>

          {/* 💡 FIX: লাইন-ক্ল্যাম্প এবং ফন্ট সাইজ কন্ট্রোল */}
          <h2 className="text-xs sm:text-base font-extrabold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-1 sm:line-clamp-2 mt-1">
            {linkData.classTitle}
          </h2>

          <p className="text-[10px] sm:text-xs text-slate-400 font-medium line-clamp-1">
            {linkData.course?.name || "Unknown Course"}
          </p>
        </div>

        {/* Date & Time Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3">
          {/* Date Segment */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-slate-50/80 rounded-xl p-1.5 sm:p-3 border border-slate-100">
            <span className="text-xs sm:text-sm">📅</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Date
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 truncate">
                {linkData.classDate
                  ? new Date(linkData.classDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
                <span className="hidden sm:inline">
                  {linkData.classDate
                    ? `, ${new Date(linkData.classDate).getFullYear()}`
                    : ""}
                </span>
              </span>
            </div>
          </div>

          {/* Time Segment */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-slate-50/80 rounded-xl p-1.5 sm:p-3 border border-slate-100">
            <span className="text-xs sm:text-sm">🕒</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Schedule
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 truncate">
                {linkData.startTime || "00:00"} - {linkData.endTime || "00:00"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-slate-100/80 my-0.5" />

        <div className="flex items-center justify-between gap-1.5 mt-auto">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`h-8 sm:h-11 flex-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black tracking-wide transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 shadow-sm active:scale-95 min-w-0 ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {copied ? (
              <span className="truncate">✓ Copied</span>
            ) : (
              <>
                <span className="text-xs sm:text-sm">🔗</span>
                <span className="truncate">Copy Link</span>
              </>
            )}
          </button>

          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(linkData)}
            className="h-8 w-8 sm:h-11 sm:px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-200 active:scale-95 flex items-center justify-center shrink-0"
            title="Edit Link"
          >
            ✏️
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={handleDeleteConfirm}
            disabled={deleteMutation.isPending}
            className="h-8 w-8 sm:h-11 sm:px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-200 disabled:opacity-50 active:scale-95 flex items-center justify-center shrink-0"
            title="Delete Link"
          >
            {deleteMutation.isPending ? (
              <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "🗑️"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
