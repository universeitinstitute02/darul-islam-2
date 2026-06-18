"use client";

import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import {
  FolderPlus,
  FolderTree,
  Plus,
  Loader2,
  Layers,
  X,
  Upload,
  Edit3,
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TCategory | null>(
    null,
  );
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

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

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      setEditPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    if (!imageFile) {
      return Swal.fire({
        icon: "warning",
        title: "তথ্য প্রয়োজন",
        text: "দয়া করে একটি ইমেজ সিলেক্ট করুন।",
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "বিভাগ তৈরি হয়েছে!",
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
      Swal.fire({
        icon: "error",
        title: "ব্যর্থ হয়েছে",
        text: "বিভাগ তৈরি করা যায়নি।",
      });
    } finally {
      setCreating(false);
    }
  };

  const openEditModal = (category: TCategory) => {
    setEditingCategory(category);
    setEditPreviewUrl(category.image);
    setEditImageFile(null);
    setIsEditModalOpen(true);
  };

  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCategory) return;

    const formData = new FormData();
    const nameValue = (
      document.getElementById("edit-cat-name") as HTMLInputElement
    ).value;
    const descValue = (
      document.getElementById("edit-cat-desc") as HTMLTextAreaElement
    ).value;

    if (!nameValue.trim())
      return Swal.fire({
        icon: "warning",
        title: "নাম প্রয়োজন",
        text: "বিভাগের নাম খালি রাখা যাবে না।",
      });

    try {
      setEditLoading(true);
      formData.append("name", nameValue);
      formData.append("isMainCategoryQuery", "true");
      formData.append("description", descValue);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      const res = await axiosSecure.put(
        `/categories/${editingCategory._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "সফলভাবে আপডেট হয়েছে",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditModalOpen(false);
        fetchCategories();
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "আপডেট ব্যর্থ হয়েছে" });
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই বিভাগের অধীনে থাকা সকল সাব-ক্যাটাগরিও মুছে যাবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/categories/${id}`);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "ডিলিট হয়েছে!",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchCategories();
          }
        } catch (error) {
          Swal.fire({ icon: "error", title: "মুছে ফেলা যায়নি" });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-slate-50/50 antialiased">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/40 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-neutral-800 tracking-tight flex items-center gap-2">
            <Layers className="text-[#0B5D3B]" size={22} /> বিভাগ ও কোর্স
            প্যানেল
          </h1>
          <p className="text-xs text-neutral-400 font-medium">
            প্রধান ক্যাটাগরি এবং উপ-ক্যাটাগরি নিয়ন্ত্রণ প্যানেল
          </p>
        </div>
        <button
          onClick={() => setIsFormOpenMobile(!isFormOpenMobile)}
          className="flex lg:hidden items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-[#0B5D3B] hover:bg-[#094731] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
        >
          {isFormOpenMobile ? <X size={14} /> : <Plus size={14} />}{" "}
          {isFormOpenMobile ? "ফর্ম বন্ধ করুন" : "নতুন ক্যাটাগরি"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left Side: Create Form */}
        <div
          className={`w-full lg:w-1/3 bg-white rounded-2xl border border-neutral-200/60 p-5 shadow-xs lg:sticky lg:top-24 ${isFormOpenMobile ? "block" : "hidden lg:block"}`}
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-100">
            <FolderPlus size={16} className="text-[#0B5D3B]" />
            <h2 className="text-xs font-black text-neutral-800 uppercase tracking-wider">
              নতুন প্রধান বিভাগ যুক্ত করুন
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-500 uppercase">
                বিভাগের নাম
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="যেমন: কুরআন বিভাগ"
                className="w-full border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none focus:border-[#0B5D3B] transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-500 uppercase">
                বিভাগের ইমেজ
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border border-dashed border-neutral-200 rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-neutral-50/20 hover:bg-neutral-50/50 transition-colors"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-xs text-neutral-400 font-bold">
                    <Upload
                      className="mx-auto mb-1.5 text-[#0B5D3B]"
                      size={18}
                    />
                    ইমেজ সিলেক্ট করুন
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
              <label className="text-[11px] font-bold text-neutral-500 uppercase">
                সংক্ষিপ্ত বিবরণ
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="বিভাগ সম্পর্কিত তথ্য দিন..."
                className="w-full border border-neutral-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#0B5D3B] transition-colors"
              />
            </div>
            <button
              disabled={creating}
              className="w-full bg-[#0B5D3B] hover:bg-[#094731] text-white py-3 rounded-xl font-black text-xs transition-colors shadow-2xs"
            >
              {creating ? "সংরক্ষণ হচ্ছে..." : "নতুন বিভাগ সংরক্ষণ করুন"}
            </button>
          </form>
        </div>

        {/* Right Side: Grid Card List */}
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <FolderTree size={16} className="text-neutral-500" />
            <h2 className="text-xs font-black text-neutral-600 uppercase tracking-wider">
              বর্তমান বিভাগ তালিকা ({categories.length})
            </h2>
          </div>
          {loading ? (
            <div className="text-center py-20 text-xs font-bold text-neutral-400">
              লোড হচ্ছে...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  refresh={fetchCategories}
                  onEdit={() => openEditModal(category)}
                  onDelete={handleDeleteCategory}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🔹 মডার্ন ক্যাটাগরি কুয়েরি এডিট মোডাল উইন্ডো */}
      <AnimatePresence>
        {isEditModalOpen && editingCategory && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative border border-neutral-100"
            >
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 p-1 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 mb-4">
                <Edit3 className="text-[#0B5D3B]" size={16} />
                <h3 className="font-black text-xs uppercase tracking-wider text-neutral-800">
                  প্রধান বিভাগ এডিট করুন
                </h3>
              </div>

              <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase">
                    বিভাগের নাম *
                  </label>
                  <input
                    id="edit-cat-name"
                    type="text"
                    defaultValue={editingCategory.name}
                    className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase">
                    বিভাগের কভার ইমেজ
                  </label>
                  <div
                    onClick={() => editFileInputRef.current?.click()}
                    className="relative border border-dashed border-neutral-200 rounded-xl aspect-video flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-neutral-50/50 group"
                  >
                    {editPreviewUrl ? (
                      <img
                        src={editPreviewUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                      <Upload size={12} /> নতুন ছবি আপলোড
                    </div>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase">
                    সংক্ষিপ্ত বিবরণ
                  </label>
                  <textarea
                    id="edit-cat-desc"
                    rows={3}
                    defaultValue={editingCategory.description || ""}
                    className="w-full border border-neutral-200 rounded-xl p-3 text-xs font-bold outline-none focus:border-[#0B5D3B]"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-neutral-100 pt-3.5 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 text-xs font-bold rounded-xl transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="px-5 py-2 bg-[#0B5D3B] hover:bg-[#094731] text-white text-xs font-black rounded-xl shadow-xs transition-colors"
                  >
                    {editLoading ? "আপডেট হচ্ছে..." : "পরিবর্তন সেভ করুন"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}