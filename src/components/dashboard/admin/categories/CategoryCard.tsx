"use client";

import React from "react";
import Image from "next/image";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import { Edit3, Trash2, CheckCircle, FileText, Layers, X } from "lucide-react";
import Swal from "sweetalert2";
import SubCategoryForm from "./SubCategoryForm";
import { RenderIcon } from "@/src/config/icons";

type TSubCategory = {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  isActive: boolean;
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
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

export default function CategoryCard({
  category,
  refresh,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const axiosSecure = useAxiosSecure();

  const handleAddSubCategory = async (
    subName: string,
    subIcon: string,
    subDesc: string,
  ) => {
    try {
      const updatedSubCategories = [
        ...(category.subCategories || []).map((sub) => ({
          name: sub.name,
          icon: sub.icon,
          description: sub.description,
          isActive: sub.isActive,
        })),
        { name: subName, icon: subIcon, description: subDesc, isActive: true },
      ];

      const res = await axiosSecure.put(`/categories/${category._id}`, {
        subCategories: updatedSubCategories,
      });

      if (res.status === 200) {
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
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ হয়েছে",
        text: "সাব-ক্যাটাগরি যুক্ত করা যায়নি।",
      });
    }
  };

  const handleDeleteSubCategory = async (subId: string) => {
    Swal.fire({
      title: "উপ-বিভাগটি মুছে ফেলবেন?",
      text: "এটি নিশ্চিত করলে সাব-ক্যাটাগরি তালিকা থেকে কন্টেন্টটি বাদ যাবে।",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "হ্যাঁ, সরান",
      cancelButtonText: "বাতিল",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedSubCategories = category.subCategories
            .filter((sub) => sub._id !== subId)
            .map((sub) => ({
              name: sub.name,
              icon: sub.icon,
              description: sub.description,
              isActive: sub.isActive,
            }));

          const res = await axiosSecure.put(`/categories/${category._id}`, {
            subCategories: updatedSubCategories,
          });

          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "সরানো হয়েছে!",
              timer: 1500,
              showConfirmButton: false,
            });
            refresh();
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "অপারেশন ব্যর্থ হয়েছে" });
        }
      }
    });
  };

  return (
    <article className="bg-white border border-neutral-200/70 rounded-2xl p-4 sm:p-5 shadow-xs group hover:border-neutral-300 transition-all">
      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-neutral-100">
        <div className="min-w-0 flex gap-4 items-start">
          {/* Next.js Optimized Image Handling Framework Container */}
          <div className="relative w-14 h-14 rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden shrink-0 shadow-xs">
            {category.image ? (
              <Image
                src={category.image}
                alt={`${category.name} থাম্বনেইল`}
                fill
                sizes="56px"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-emerald-50 text-[#0B5D3B]"
                aria-hidden="true"
              >
                <Layers className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {category.courseCount !== undefined && (
                <span className="px-2 py-0.5 bg-emerald-50 text-[#0B5D3B] border border-emerald-100 rounded-md text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle size={10} aria-hidden="true" />{" "}
                  {category.courseCount}টি প্রকাশিত কোর্স
                </span>
              )}
            </div>
            <h2 className="font-black text-base sm:text-lg text-neutral-800 mt-1 truncate">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-[11px] text-neutral-700 mt-0.5 line-clamp-1">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(category._id, category.name)}
            className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
            aria-label={`${category.name} নাম পরিবর্তন করুন`}
          >
            <Edit3 className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
            aria-label={`${category.name} বিভাগটি মুছে ফেলুন`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4"
        role="region"
        aria-label={`${category.name} উপ-বিভাগ তালিকা`}
      >
        {category.subCategories && category.subCategories.length > 0 ? (
          category.subCategories.map((sub) => (
            <div
              key={sub._id}
              className="group/sub relative bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200/60 p-2.5 rounded-xl flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="p-1.5 bg-white border rounded-lg text-neutral-600"
                  aria-hidden="true"
                >
                  <RenderIcon
                    name={sub.icon || "BookOpen"}
                    className="w-3.5 h-3.5"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-black truncate">
                    {sub.name}
                  </h3>
                  {sub.description && (
                    <p className="text-[10px] font-semibold text-neutral-700 truncate max-w-[180px]">
                      {sub.description}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteSubCategory(sub._id)}
                className="text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-md p-1 transition-colors shrink-0 cursor-pointer"
                aria-label={`${sub.name} উপ-বিভাগটি মুছে ফেলুন`}
              >
                <X className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-neutral-400 text-xs font-semibold italic flex items-center gap-1 sm:col-span-2 py-2">
            <FileText size={14} aria-hidden="true" /> কোনো উপ-বিভাগ বা
            সাব-ক্যাটাগরি যুক্ত করা হয়নি।
          </p>
        )}
      </div>

      <SubCategoryForm
        categoryName={category.name}
        onAddSub={handleAddSubCategory}
      />
    </article>
  );
}