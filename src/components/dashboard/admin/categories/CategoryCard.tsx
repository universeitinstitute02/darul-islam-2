"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import {
  Edit3,
  Trash2,
  X,
  Settings2,
  Upload,
  ChevronDown,
  ChevronUp,
  FolderKanban,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import SubCategoryForm from "./SubCategoryForm";
import { RenderIcon } from "@/src/config/icons";

type TSubCategory = {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  isActive: boolean;
  image?: string;
  fullTitle?: string;
  admissionFee?: number;
  oldAdmissionFee?: number;
  monthlyFee?: number;
  classSchedule?: string;
  highlights?: any[];
};

type TCategory = {
  _id: string;
  name: string;
  image: string;
  description?: string;
  isActive: boolean;
  subCategories: TSubCategory[];
  courseCount?: number;
};

type CategoryCardProps = {
  category: TCategory;
  refresh: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
};

export default function CategoryCard({
  category,
  refresh,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const axiosSecure = useAxiosSecure();

  // 🔹 ডাইনামিক অ্যাকর্ডিয়ন কলাপ্স প্যানেল স্টেট (Initial Closed)
  const [isExpanded, setIsExpanded] = useState(false);

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<TSubCategory | null>(null);
  const [subImageFile, setSubImageFile] = useState<File | null>(null);
  const [subPreviewUrl, setSubPreviewUrl] = useState<string | null>(null);
  const [subEditLoading, setSubEditLoading] = useState(false);
  const subModalFileRef = useRef<HTMLInputElement>(null);

  const handleAddSubCategory = async (subData: any, file: File | null) => {
    try {
      const updatedSubCategories = [
        ...(category.subCategories || []).map((sub) => ({ ...sub })),
        { ...subData, image: "", isActive: true },
      ];

      const formData = new FormData();
      formData.append("subCategories", JSON.stringify(updatedSubCategories));

      const res = await axiosSecure.put(
        `/categories/${category._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.status === 200 || res.data) {
        Swal.fire({
          icon: "success",
          title: "উপ-বিভাগ যুক্ত হয়েছে!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        refresh();
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "ব্যর্থ হয়েছে" });
    }
  };

  const openSubEditModal = (sub: TSubCategory) => {
    setEditingSub(sub);
    setSubPreviewUrl(sub.image || "");
    setSubImageFile(null);
    setIsSubModalOpen(true);
  };

  const handleUpdateSubCategory = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!editingSub) return;

    try {
      setSubEditLoading(true);

      const fullTitle = (
        document.getElementById("modal-sub-title") as HTMLInputElement
      ).value;
      const admissionFee =
        Number(
          (document.getElementById("modal-sub-fee") as HTMLInputElement).value,
        ) || 0;
      const monthlyFee =
        Number(
          (document.getElementById("modal-sub-monthly") as HTMLInputElement)
            .value,
        ) || 0;
      const classSchedule = (
        document.getElementById("modal-sub-schedule") as HTMLInputElement
      ).value;
      const description = (
        document.getElementById("modal-sub-desc") as HTMLTextAreaElement
      ).value;

      const updatedSubCategories = category.subCategories.map((sub) => {
        if (sub._id === editingSub._id) {
          return {
            ...sub,
            fullTitle,
            admissionFee,
            monthlyFee,
            classSchedule,
            description,
            isNewlyUploaded: subImageFile ? true : false,
          };
        }
        return { ...sub };
      });

      const formData = new FormData();
      formData.append("subCategories", JSON.stringify(updatedSubCategories));
      formData.append("isMainCategoryQuery", "false");

      if (subImageFile) {
        formData.append("image", subImageFile);
      }

      const res = await axiosSecure.put(
        `/categories/${category._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.status === 200 || res.data) {
        Swal.fire({
          icon: "success",
          title: "উপ-বিভাগ সফলভাবে আপডেট হয়েছে!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsSubModalOpen(false);
        refresh();
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "আপডেট ব্যর্থ হয়েছে" });
    } finally {
      setSubEditLoading(false);
    }
  };

  const handleDeleteSubCategory = async (subId: string) => {
    Swal.fire({
      title: "উপ-বিভাগটি মুছে ফেলবেন?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "হ্যাঁ, সরান",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedSubCategories = category.subCategories.filter(
            (sub) => sub._id !== subId,
          );
          const formData = new FormData();
          formData.append(
            "subCategories",
            JSON.stringify(updatedSubCategories),
          );

          const res = await axiosSecure.put(
            `/categories/${category._id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          );
          if (res.status === 200) refresh();
        } catch (error) {
          Swal.fire({ icon: "error", title: "ব্যর্থ হয়েছে" });
        }
      }
    });
  };

  return (
    <article className="bg-white border border-neutral-200/50 rounded-2xl shadow-2xs overflow-hidden transition-all duration-300 hover:shadow-xs">
      {/* 🔹 মেইন ক্যাটাগরি ভিউ (Initial Clean State) */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-white">
        <div className="flex gap-4 items-center min-w-0">
          <div className="relative w-14 h-12 rounded-xl overflow-hidden border border-neutral-100 shrink-0 bg-neutral-50 shadow-2xs">
            {category.image && (
              <Image
                src={category.image}
                alt=""
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="font-black text-sm md:text-base text-neutral-800 truncate">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-[11px] font-semibold text-neutral-400 truncate max-w-[280px] mt-0.5">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* কন্ট্রিবিউশন কন্ট্রোল বোতাম এবং প্যানেল কলাপ্স বাটন টগল */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-neutral-50 p-1 rounded-xl border border-neutral-100">
            <button
              onClick={onEdit}
              className="p-1.5 text-neutral-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
              title="এডিট"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(category._id)}
              className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
              title="মুছে ফেলুন"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200/60 hover:border-neutral-300 rounded-xl text-[11px] font-black tracking-wide transition-all select-none cursor-pointer ${
              isExpanded
                ? "bg-[#0B5D3B] border-[#0B5D3B] text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            <FolderKanban size={12} />
            <span>উপ-বিভাগ ({category.subCategories?.length || 0})</span>
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* 🔹 সিনিয়র কলাপ্সিবল সেকশন (স্মুথ এনিমেশন কার্যাবলী) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-neutral-100 bg-neutral-50/20"
          >
            <div className="p-5 space-y-5 bg-white">
              {/* উপ-বিভাগ গ্রিড ভিউ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {category.subCategories && category.subCategories.length > 0 ? (
                  category.subCategories.map((sub) => (
                    <div
                      key={sub._id}
                      className="group/sub relative bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200/40 p-2.5 rounded-xl flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-10 h-10 rounded-lg border border-neutral-100 bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-3xs">
                          {sub.image && sub.image.trim() !== "" ? (
                            <img
                              src={sub.image}
                              alt={sub.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-[#0B5D3B] p-1 border border-dashed rounded-lg">
                              <RenderIcon
                                name={sub.icon || "BookOpen"}
                                className="w-4 h-4"
                              />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xs font-black text-neutral-800 truncate">
                            {sub.name}
                          </h3>
                          <p className="text-[10px] font-bold text-[#0B5D3B] mt-0.5">
                            ভর্তি: ৳{sub.admissionFee}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => openSubEditModal(sub)}
                          className="text-neutral-400 hover:text-blue-600 p-1 rounded-md"
                        >
                          <Settings2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSubCategory(sub._id)}
                          className="text-neutral-300 hover:text-red-500 p-1 rounded-md"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 italic py-2 sm:col-span-2 px-1">
                    কোনো উপ-বিভাগ যুক্ত করা হয়নি।
                  </p>
                )}
              </div>

              {/* নতুন সাব-ক্যাটাগরি ফর্ম */}
              <SubCategoryForm
                categoryName={category.name}
                onAddSub={handleAddSubCategory}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Subcategory Edit Modal Window */}
      <AnimatePresence>
        {isSubModalOpen && editingSub && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-xl relative border border-neutral-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsSubModalOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-lg text-neutral-400"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                <Settings2 className="text-[#0B5D3B]" size={16} />
                <h3 className="font-black text-xs uppercase tracking-wider text-neutral-800">
                  "{editingSub.name}" কোর্স কারিকুলাম এডিট
                </h3>
              </div>

              <form
                onSubmit={handleUpdateSubCategory}
                className="space-y-4 text-left"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-600">
                    পূর্ণাঙ্গ ল্যান্ডিং শিরোনাম (Full Title)
                  </label>
                  <input
                    id="modal-sub-title"
                    type="text"
                    defaultValue={editingSub.fullTitle || editingSub.name}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-600">
                    কোর্সের কভার থাম্বনেইল ইমেজ
                  </label>
                  <div
                    onClick={() => {
                      subModalFileRef.current?.click();
                    }}
                    className="relative border border-dashed border-neutral-200 rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-neutral-50 group"
                  >
                    {subPreviewUrl ? (
                      <img
                        src={subPreviewUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-xs text-neutral-400 font-bold">
                        <Upload
                          size={16}
                          className="mx-auto text-[#0B5D3B] mb-1"
                        />
                        নতুন থাম্বনেইল আপলোড করুন
                      </div>
                    )}
                    {subPreviewUrl && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                        <Upload size={12} /> থাম্বনেইল ফটো পরিবর্তন করুন
                      </div>
                    )}
                    <input
                      type="file"
                      ref={subModalFileRef}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          setSubImageFile(f);
                          setSubPreviewUrl(URL.createObjectURL(f));
                        }
                      }}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-600">
                      ভর্তি ফি (৳)
                    </label>
                    <input
                      id="modal-sub-fee"
                      type="number"
                      defaultValue={editingSub.admissionFee || 0}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-xs font-bold outline-none text-[#0B5D3B]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-600">
                      মাসিক ফি (৳)
                    </label>
                    <input
                      id="modal-sub-monthly"
                      type="number"
                      defaultValue={editingSub.monthlyFee || 0}
                      className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-600">
                    ক্লাস রুটিন সময়সূচী
                  </label>
                  <input
                    id="modal-sub-schedule"
                    type="text"
                    defaultValue={editingSub.classSchedule || ""}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2 text-xs font-bold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-600">
                    কোর্সের বিবরণ
                  </label>
                  <textarea
                    id="modal-sub-desc"
                    rows={3}
                    defaultValue={editingSub.description || ""}
                    className="w-full border border-neutral-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-neutral-100 pt-3.5 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsSubModalOpen(false)}
                    className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={subEditLoading}
                    className="px-5 py-2 bg-neutral-900 text-white text-xs font-black rounded-xl shadow-xs transition-colors"
                  >
                    {subEditLoading ? "সংরক্ষণ হচ্ছে..." : "আপডেট করুন"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </article>
  );
}
