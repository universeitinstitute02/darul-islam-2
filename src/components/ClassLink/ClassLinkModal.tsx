"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AVAILABLE_COURSES = [
  {
    id: "69ee2a120e5ff598adfb2916",
    name: "দর্সে আল কুরআন (সহজ তাফসির)",
    category: "Islamic Studies",
  },
  {
    id: "69ee2a120e5ff598adfb2917",
    name: "আরবি ভাষা শিক্ষা (Advanced Grammar)",
    category: "Language",
  },
  {
    id: "69ee2a120e5ff598adfb2918",
    name: "ইসলামিক ফাইন্যান্স ও ব্যাংকিং গাইডলাইন",
    category: "Shariah",
  },
  {
    id: "69ee2a120e5ff598adfb2919",
    name: "সহ সহজ তাজবীদ ও কুরআন তিলাওয়াত কোর্স",
    category: "Quran",
  },
  {
    id: "69ee2a120e5ff598adfb2920",
    name: "সীরাত-উন-নবী (সাঃ) ও ইসলামিক ইতিহাস",
    category: "History",
  },
];

export default function ClassLinkModal({
  isOpen,
  onClose,
  editData,
}: {
  isOpen: boolean;
  onClose: () => void;
  editData?: any | null;
}) {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    course: editData?.course?._id || AVAILABLE_COURSES[0].id,
    classTitle: editData?.classTitle || "",
    link: editData?.link || "",
    classDate: editData?.classDate ? editData.classDate.split("T")[0] : "",
    startTime: editData?.startTime || "",
    endTime: editData?.endTime || "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        course: editData?.course?._id || AVAILABLE_COURSES[0].id,
        classTitle: editData?.classTitle || "",
        link: editData?.link || "",
        classDate: editData?.classDate ? editData.classDate.split("T")[0] : "",
        startTime: editData?.startTime || "",
        endTime: editData?.endTime || "",
      });
    }
  }, [isOpen, editData]);

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await axiosSecure.post(
        "/class-links/teacher/add-link",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-links-teacher"] });
      Swal.fire({
        title: "অসাধারণ!",
        text: "ক্লাস লিঙ্কটি সফলভাবে তৈরি ও পোস্ট করা হয়েছে।",
        icon: "success",
        confirmButtonColor: "#10B981",
        confirmButtonText: "ঠিক আছে",
      });
      onClose();
    },
    onError: (err: any) => {
      const errMsg =
        err?.response?.data?.message || "লিঙ্ক তৈরি করতে ব্যর্থ হয়েছে।";
      Swal.fire({
        title: "ব্যর্থ হয়েছে!",
        text: errMsg,
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await axiosSecure.put(
        `/class-links/teacher/update-link/${id}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-links-teacher"] });
      Swal.fire({
        title: "আপডেট সফল!",
        text: "ক্লাস লিঙ্কটি সফলভাবে আপডেট করা হয়েছে।",
        icon: "success",
        confirmButtonColor: "#3B82F6",
        confirmButtonText: "ধন্যবাদ",
      });
      onClose();
    },
    onError: (err: any) => {
      const errMsg = err?.response?.data?.message || "আপডেট করতে ব্যর্থ হয়েছে";
      Swal.fire({
        title: "ভুল হয়েছে!",
        text: errMsg,
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      const updatePayload = {
        classTitle: formData.classTitle,
        link: formData.link,
        classDate: formData.classDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
      };
      updateMutation.mutate({ id: editData._id, payload: updatePayload });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300 animate-fadeIn">
      {/* Container Card */}
      <div className="bg-white w-full max-w-lg rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col transform transition-all duration-300 scale-95 animate-scaleUp">
        {/* Modal Header */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {editData ? "Update Class Link" : "Post New Class Link"}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              {editData
                ? "Modify existing active virtual link"
                : "Fill details to broadcast live class link"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-all duration-200 active:scale-90 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Choose Course */}
            {!editData && (
              <div className="col-span-2 group">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block transition-colors group-focus-within:text-emerald-500">
                  Choose Course
                </label>
                <select
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  className="w-full mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700 font-semibold cursor-pointer"
                >
                  {AVAILABLE_COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.category})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Class Title */}
            <div className="col-span-2 group">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block transition-colors group-focus-within:text-emerald-500">
                Class Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Class 05: Express Routing"
                value={formData.classTitle}
                onChange={(e) =>
                  setFormData({ ...formData, classTitle: e.target.value })
                }
                className="w-full mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800"
              />
            </div>

            {/* Class Date */}
            <div className="col-span-2 sm:col-span-1 group">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block transition-colors group-focus-within:text-emerald-500">
                Class Date
              </label>
              <input
                type="date"
                required
                value={formData.classDate}
                onChange={(e) =>
                  setFormData({ ...formData, classDate: e.target.value })
                }
                className="w-full mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 cursor-text"
              />
            </div>

            {/* Start Time */}
            <div className="col-span-1 group">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block transition-colors group-focus-within:text-emerald-500">
                Start Time
              </label>
              <input
                type="time"
                required
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                className="w-full mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 cursor-text"
              />
            </div>

            {/* End Time - 💡 FIX: col-span-2 থেকে পরিবর্তন করে col-span-1 করা হয়েছে */}
            <div className="col-span-1 group">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block transition-colors group-focus-within:text-emerald-500">
                End Time
              </label>
              <input
                type="time"
                required
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                className="w-full mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-slate-800 cursor-text"
              />
            </div>

            {/* Meeting Link */}
            <div className="col-span-2 group">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block transition-colors group-focus-within:text-emerald-500">
                Meeting Link (URL)
              </label>
              <input
                type="url"
                required
                placeholder="https://meet.google.com/..."
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full mt-4 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center shadow-lg gap-2 ${
              editData
                ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/10"
                : "bg-slate-900 hover:bg-slate-800 shadow-slate-900/10"
            }`}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>প্রক্রিয়াধীন...</span>
              </>
            ) : editData ? (
              "Save & Update Link"
            ) : (
              "Create & Broadcast Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
