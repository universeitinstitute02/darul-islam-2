"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import {
  FolderPlus,
  FolderTree,
  Plus,
  Loader2,
  Edit3,
  Trash2,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

type TCategory = {
  _id: string;
  name: string;
  subCategories: {
    _id: string;
    name: string;
  }[];
};

type CategoryFormData = {
  name: string;
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>();

  // 🔄 ১. সব ক্যাটাগরি ফেচ করা
  const fetchCategories = async () => {
    setLoading(true);
    try {
      // আপনার আগের এন্ডপয়েন্টটি ঠিক করে /api/categories বা আপনার ব্যাকএন্ড রাউটে দেওয়া হলো
      const res = await axiosSecure.get("/categories");
      if (res.data) {
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ➕ ২. মেইন ক্যাটাগরি তৈরি করা
  const onSubmit = async (data: CategoryFormData) => {
    try {
      setCreating(true);
      const res = await axiosSecure.post("/categories", data);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Category Created!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Failed to create category" });
    } finally {
      setCreating(false);
    }
  };

  // ✏️ ৩. মেইন ক্যাটাগরির নাম এডিট করা
  const handleEditCategory = async (id: string, currentName: string) => {
    Swal.fire({
      title: "Update Category Name",
      input: "text",
      inputValue: currentName,
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#16a34a",
      inputValidator: (value) => {
        if (!value) return "Category name cannot be empty!";
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
              title: "Updated successfully!",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchCategories();
          }
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: "error", title: "Update failed" });
        }
      }
    });
  };

  // 🗑️ ৪. মেইন ক্যাটাগরি ডিলিট করা
  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "All subcategories under this category will also be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/categories/${id}`);
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchCategories();
          }
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: "error", title: "Delete failed" });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Category Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create, edit, and manage categories and sub-categories
        </p>
      </div>

      {/* Create Category */}
      <div className="bg-white rounded-3xl border p-5 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <FolderPlus className="w-5 h-5 text-green-600" />
          <h2 className="font-bold text-lg">Create Main Category</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name", { required: "Category name is required" })}
              placeholder="Enter category name"
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <button
            disabled={creating}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {creating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Category
              </>
            )}
          </button>
        </form>
      </div>

      {/* Category List */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-5">
          <FolderTree className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-lg">
            Categories ({categories.length})
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-10 flex items-center justify-center gap-2 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> Loading
            Categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white border rounded-3xl p-10 text-center text-gray-400">
            No category found
          </div>
        ) : (
          <div className="grid gap-5">
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
  );
}

/* ==========================================================================
   📂 CategoryCard Component (মেইন ক্যাটাগরি এবং এর সাব-ক্যাটাগরি হ্যান্ডেলার)
   ========================================================================== */
function CategoryCard({
  category,
  refresh,
  onEdit,
  onDelete,
}: {
  category: TCategory;
  refresh: () => void;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  // 🌿 ১. সাব-ক্যাটাগরি যুক্ত করা
  const addSubCategory = async (data: { name: string }) => {
    try {
      setLoading(true);
      const res = await axiosSecure.put(
        `/categories/${category._id}/sub-category`,
        data,
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Sub-category Added!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        refresh();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Failed to add sub-category" });
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ ২. নির্দিষ্ট সাব-ক্যাটাগরি ডিলিট করা
  const handleDeleteSubCategory = async (subId: string) => {
    Swal.fire({
      title: "Remove Sub-category?",
      text: "Are you sure you want to remove this sub-category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/categories/${category._id}/sub-category/${subId}`,
          );
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Sub-category removed!",
              timer: 1500,
              showConfirmButton: false,
            });
            refresh();
          }
        } catch (error) {
          console.error(error);
          Swal.fire({ icon: "error", title: "Failed to delete sub-category" });
        }
      }
    });
  };

  return (
    <div className="bg-white border rounded-3xl p-5 md:p-6 shadow-sm group hover:border-gray-300 transition-all">
      {/* Category Details with Edit and Delete Action Buttons */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-lg md:text-xl text-gray-800">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {category.subCategories?.length || 0} Sub Categories
          </p>
        </div>

        {/* এডিট ও ডিলিট বাটন */}
        <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category._id, category.name)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            title="Edit Category Name"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Delete Category"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub Categories Tags List */}
      <div className="flex flex-wrap gap-2 mb-6">
        {category.subCategories?.length > 0 ? (
          category.subCategories.map((sub) => (
            <span
              key={sub._id}
              className="bg-green-50 text-green-700 border border-green-100 pl-3 pr-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 group/tag hover:bg-green-100/60 transition-all"
            >
              {sub.name}
              <button
                onClick={() => handleDeleteSubCategory(sub._id)}
                className="text-green-600/60 hover:text-red-500 rounded-md p-0.5 transition-colors"
                title="Delete subcategory"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <p className="text-gray-400 text-xs italic">
            No Sub Categories added yet.
          </p>
        )}
      </div>

      {/* Add Sub Category In Main Category Form */}
      <form
        onSubmit={handleSubmit(addSubCategory)}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          {...register("name", { required: true })}
          placeholder={`Add new sub category to ${category.name}`}
          className="flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/60"
        />

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 min-w-[160px] transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              Add Sub Category
            </>
          )}
        </button>
      </form>
    </div>
  );
}
