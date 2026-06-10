"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import {
  FolderPlus,
  FolderTree,
  Plus,
  Loader2,
  Layers,
  X,
  Upload,
} from "lucide-react";
import Swal from "sweetalert2";
import CategoryCard from "@/src/components/dashboard/admin/categories/CategoryCard";

type TCategory = {
  _id: string;
  name: string;
  image: string;
  description?: string;
  isActive: boolean;
  subCategories: any[];
  courseCount?: number;
};

type CategoryFormData = {
  name: string;
  description: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [isFormOpenMobile, setIsFormOpenMobile] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { description: "" },
  });

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    if (!imageFile) {
      return Swal.fire({
        icon: "warning",
        title: "তথ্য প্রয়োজন",
        text: "দয়া করে বিভাগের জন্য একটি ইমেজ সিলেক্ট করুন।",
      });
    }

    try {
      setCreating(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("image", imageFile);
      formData.append("isActive", "true");

      const res = await axiosSecure.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        reset({ name: "", description: "" });
        setImageFile(null);
        setPreviewUrl(null);
        setIsFormOpenMobile(false);
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
      confirmButtonColor: "#0B5D3B",
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/60 pb-4">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-neutral-800 tracking-tight flex items-center gap-2">
            <Layers className="text-[#0B5D3B]" size={24} /> বিভাগ ও কোর্স
            ম্যানেজমেন্ট
          </h1>
          <p className="text-xs md:text-sm font-semibold text-neutral-500 mt-1">
            প্রধান ক্যাটাগরি এবং উপ-ক্যাটাগরি (Sub-categories) নিয়ন্ত্রণ
            প্যানেল
          </p>
        </div>

        <button
          onClick={() => setIsFormOpenMobile(!isFormOpenMobile)}
          className="flex lg:hidden items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 bg-[#0B5D3B] hover:bg-green-800 text-white text-xs font-black rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          {isFormOpenMobile ? <X size={16} /> : <Plus size={16} />}
          {isFormOpenMobile ? "ফর্ম বন্ধ করুন" : "নতুন প্রধান বিভাগ তৈরি করুন"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div
          className={`
          w-full lg:w-1/3 bg-white rounded-2xl border border-neutral-200/80 p-5 shadow-xs lg:sticky lg:top-4 lg:block
          ${isFormOpenMobile ? "block" : "hidden"}
        `}
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b">
            <div className="flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-[#0B5D3B]" />
              <h2 className="font-black text-sm">
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
              <label className="text-xs font-bold text-neutral-700">
                বিভাগের নাম
              </label>
              <input
                {...register("name", { required: "বিভাগের নাম আবশ্যক" })}
                placeholder="যেমন: কুরআন বিভাগ"
                className="w-full border border-neutral-200 bg-neutral-50/30 rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#0B5D3B] focus:bg-white transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-[11px] font-bold mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">
                বিভাগের ইমেজ (Category Image)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border border-dashed border-neutral-200 bg-neutral-50/30 rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-green-50/30 transition-all overflow-hidden group"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Upload className="w-5 h-5 text-[#0B5D3B] mb-1.5" />
                      <p className="text-xs text-neutral-700">
                      ইমেজ সিলেক্ট করুন
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">
                সংক্ষিপ্ত বিবরণ
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="বিভাগ সম্পর্কিত সংক্ষিপ্ত তথ্য..."
                className="w-full border border-neutral-200 bg-neutral-50/30 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#0B5D3B] transition-all leading-relaxed"
              />
            </div>

            <button
              disabled={creating}
              className="w-full bg-[#0B5D3B] hover:bg-green-800 text-white py-3 rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xs cursor-pointer"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> সংরক্ষণ হচ্ছে...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> নতুন বিভাগ সংরক্ষণ করুন
                </>
              )}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-2/3 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <FolderTree className="w-5 h-5 text-neutral-600" />
            <h2 className="font-black text-sm text-neutral-700">
              বর্তমান বিভাগ তালিকা ({categories.length})
            </h2>
          </div>

          {loading ? (
            <div className="bg-white border rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 text-xs font-bold text-neutral-500">
              <Loader2 className="w-8 h-8 animate-spin text-[#0B5D3B]" /> ডাটা
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
                  category={category as any}
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