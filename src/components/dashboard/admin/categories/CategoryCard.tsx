"use client";

import React from "react";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import { Edit3, Trash2, CheckCircle, FileText, X } from "lucide-react";
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
  icon: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
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
          title: "উপ-বিভাগ যুক্ত হয়েছে!",
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
        title: "ব্যর্থ হয়েছে",
        text: "সাব-ক্যাটাগরি যুক্ত করা যায়নি।",
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
              title: "সরানো হয়েছে!",
              timer: 1500,
              showConfirmButton: false,
            });
            refresh();
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "অপারেশন ব্যর্থ হয়েছে" });
        }
      }
    });
  };

  return (
    <div className="bg-white border border-neutral-200/70 rounded-2xl p-4 sm:p-5 shadow-xs group hover:border-neutral-300 transition-all">
      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-neutral-100">
        <div className="min-w-0 flex gap-3 items-start">
          {/* মেইন ক্যাটাগরি লাইভ আইকন রেন্ডারিং */}
          <div className="p-3 bg-neutral-50 rounded-xl border text-[#105D38] shrink-0 mt-1">
            <RenderIcon name={category.icon} className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 bg-neutral-100 rounded-md text-[10px] font-bold text-neutral-500 border">
                ক্রম: {category.displayOrder}
              </span>
              {category.courseCount !== undefined && (
                <span className="px-2 py-0.5 bg-emerald-50 text-[#105D38] border border-emerald-100 rounded-md text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle size={10} /> {category.courseCount}টি প্রকাশিত
                  কোর্স
                </span>
              )}
            </div>
            <h3 className="font-black text-base sm:text-lg text-neutral-800 mt-1 truncate">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-[11px] font-bold text-neutral-400 mt-0.5 line-clamp-1">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(category._id, category.name)}
            className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* সাব ক্যাটাগরি মেটাডাটা লিস্ট উইথ আইকনস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {category.subCategories && category.subCategories.length > 0 ? (
          category.subCategories.map((sub) => (
            <div
              key={sub._id}
              className="group/sub relative bg-neutral-50/50 hover:bg-neutral-50 border border-neutral-200/60 p-2.5 rounded-xl flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-1.5 bg-white border rounded-lg text-neutral-600">
                  <RenderIcon
                    name={sub.icon || "BookOpen"}
                    className="w-3.5 h-3.5"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black text-neutral-700 truncate">
                    {sub.name}
                  </p>
                  {sub.description && (
                    <p className="text-[10px] font-semibold text-neutral-400 truncate max-w-[180px]">
                      {sub.description}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteSubCategory(sub._id)}
                className="text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-md p-1 transition-colors shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-neutral-400 text-xs font-semibold italic flex items-center gap-1 sm:col-span-2 py-2">
            <FileText size={14} /> কোনো উপ-বিভাগ বা সাব-ক্যাটাগরি যুক্ত করা
            হয়নি।
          </p>
        )}
      </div>

      <SubCategoryForm
        categoryName={category.name}
        onAddSub={handleAddSubCategory}
      />
    </div>
  );
}
