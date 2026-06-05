"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import { FolderPlus, FolderTree, Plus, Loader2, Layers, X } from "lucide-react";
import Swal from "sweetalert2";
import CategoryCard from "@/src/components/dashboard/admin/categories/CategoryCard";
import { AVAILABLE_ICONS } from "@/src/config/icons";

type TCategory = {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  subCategories: any[];
  courseCount?: number;
};

type CategoryFormData = {
  name: string;
  icon: string;
  description: string;
  displayOrder: number;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [isFormOpenMobile, setIsFormOpenMobile] = useState(false); // মোবাইল ফর্ম টগল স্টেট
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { icon: "BookOpen", displayOrder: 0, description: "" },
  });

  const selectedMainIcon = watch("icon");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/categories");
      if (res.data) setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setCreating(true);
      const res = await axiosSecure.post("/categories", {
        ...data,
        isActive: true,
      });
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "বিভাগ সফলভাবে তৈরি হয়েছে!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        reset({ name: "", icon: "BookOpen", description: "", displayOrder: 0 });
        setIsFormOpenMobile(false); // সফলভাবে তৈরি হলে মোবাইলে ফর্ম বন্ধ হবে
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ হয়েছে",
        text: "বিভাগ তৈরি করা যায়নি।",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleEditCategory = async (id: string, currentName: string) => {
    Swal.fire({
      title: "প্রধান বিভাগের নাম পরিবর্তন",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "আপডেট",
      cancelButtonText: "বাতিল",
      confirmButtonColor: "#105D38",
      inputValidator: (value) => {
        if (!value) return "নাম খালি রাখা যাবে না!";
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.put(`/categories/${id}`, {
            name: result.value,
          });
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "সফলভাবে আপডেট হয়েছে",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchCategories();
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "আপডেট ব্যর্থ হয়েছে" });
        }
      }
    });
  };

  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই বিভাগের অধীনে থাকা সকল সাব-ক্যাটাগরিও মুছে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "বাতিল",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/categories/${id}`);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "ডিলিট হয়েছে!",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchCategories();
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "মুছে ফেলা যায়নি" });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-neutral-50/50 relative">
      {/* Top Banner Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/60 pb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-neutral-800 tracking-tight flex items-center gap-2">
            <Layers className="text-[#105D38]" size={24} /> বিভাগ ও কোর্স
            ম্যানেজমেন্ট
          </h1>
          <p className="text-xs font-semibold text-neutral-500 mt-1">
            প্রধান ক্যাটাগরি এবং উপ-ক্যাটাগরি (Sub-categories) নিয়ন্ত্রণ প্যানেল
          </p>
        </div>

        {/* Mobile Action Button - Only visible on small screens to toggle the collapse view */}
        <button
          onClick={() => setIsFormOpenMobile(!isFormOpenMobile)}
          className="flex lg:hidden items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 bg-[#105D38] hover:bg-green-800 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          {isFormOpenMobile ? <X size={16} /> : <Plus size={16} />}
          {isFormOpenMobile ? "ফর্ম বন্ধ করুন" : "নতুন প্রধান বিভাগ তৈরি করুন"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Create Form Sidebar Wrapper Layout */}
        <div
          className={`
          w-full lg:w-1/3 bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs lg:sticky lg:top-4 lg:block
          ${isFormOpenMobile ? "block" : "hidden"}
        `}
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <div className="flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-[#105D38]" />
              <h2 className="font-black text-sm text-neutral-700">
                নতুন প্রধান বিভাগ যুক্ত করুন
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsFormOpenMobile(false)}
              className="lg:hidden p-1 hover:bg-neutral-100 rounded-md text-neutral-400 hover:text-neutral-600"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-500">
                বিভাগের নাম
              </label>
              <input
                {...register("name", { required: "বিভাগের নাম আবশ্যক" })}
                placeholder="যেমন: কুরআন বিভাগ"
                className="w-full border border-neutral-200 bg-neutral-50/30 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#105D38] focus:bg-white transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-[11px] font-bold mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-neutral-500">
                  আইকন নির্বাচন
                </label>
                <div className="relative flex items-center">
                  <select
                    {...register("icon", { required: "আইকন আবশ্যক" })}
                    className="w-full border border-neutral-200 bg-neutral-50/30 rounded-xl pl-8 pr-2 py-2.5 text-xs font-bold outline-none focus:border-[#105D38] focus:bg-white appearance-none cursor-pointer transition-all"
                  >
                    {Object.keys(AVAILABLE_ICONS).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-2.5 pointer-events-none text-[#105D38]">
                    {React.createElement(
                      AVAILABLE_ICONS[selectedMainIcon] ||
                        AVAILABLE_ICONS.BookOpen,
                      { className: "w-3.5 h-3.5" },
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500">
                  ক্রমিক নম্বর
                </label>
                <input
                  type="number"
                  {...register("displayOrder", { valueAsNumber: true })}
                  className="w-full border border-neutral-200 bg-neutral-50/30 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#105D38] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-500">
                সংক্ষিপ্ত বিবরণ
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="বিভাগ সম্পর্কিত সংক্ষিপ্ত তথ্য..."
                className="w-full border border-neutral-200 bg-neutral-50/30 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#105D38] transition-all leading-relaxed"
              />
            </div>

            <button
              disabled={creating}
              className="w-full bg-[#105D38] hover:bg-green-800 text-white py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xs"
            >
              {creating ? (
                <>
                  {" "}
                  <Loader2 className="w-4 h-4 animate-spin" /> সংরক্ষণ
                  হচ্ছে...{" "}
                </>
              ) : (
                <>
                  {" "}
                  <Plus className="w-4 h-4" /> নতুন বিভাগ সংরক্ষণ করুন{" "}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Categories List View Container Module */}
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FolderTree className="w-5 h-5 text-neutral-600" />
            <h2 className="font-black text-sm text-neutral-700">
              বর্তমান বিভাগ তালিকা ({categories.length})
            </h2>
          </div>

          {loading ? (
            <div className="bg-white border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 text-xs font-bold text-neutral-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#105D38]" /> ডাটা
              লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center text-xs font-bold text-neutral-400 shadow-inner">
              কোনো বিভাগ পাওয়া যায়নি। নতুন বিভাগ তৈরি করতে উপরের বাটনে চাপ দিন।
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  refresh={fetchCategories}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
