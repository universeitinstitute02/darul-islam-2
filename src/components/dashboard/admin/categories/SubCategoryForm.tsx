"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Loader2 } from "lucide-react";
import { AVAILABLE_ICONS } from "@/src/config/icons";

type SubCategoryFormProps = {
  categoryName: string;
  onAddSub: (name: string, icon: string, description: string) => Promise<void>;
};

type SubFormData = {
  name: string;
  icon: string;
  description: string;
};

export default function SubCategoryForm({
  categoryName,
  onAddSub,
}: SubCategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm<SubFormData>({
    defaultValues: { icon: "BookOpen", description: "" },
  });

  const selectedIcon = watch("icon");

  const onSubmit = async (data: SubFormData) => {
    setLoading(true);
    await onAddSub(data.name, data.icon, data.description);
    reset({ name: "", icon: "BookOpen", description: "" });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 bg-neutral-50/60 border border-neutral-100 p-4 rounded-xl mt-3"
    >
      <span className="text-[11px] font-black text-neutral-500 uppercase tracking-wider block">
        নতুন উপ-বিভাগ ফর্ম ({categoryName})
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* উপ-বিভাগের নাম */}
        <div className="space-y-1">
          <input
            {...register("name", {
              required: true,
              setValueAs: (v) => v.trim(),
            })}
            placeholder="উপ-বিভাগের নাম (যেমন: তিলাওয়াত)"
            className="w-full border border-neutral-200 bg-white rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#105D38] transition-all"
          />
        </div>

        {/* ডাইনামিক ভিজ্যুয়াল আইকন ড্রপডাউন */}
        <div className="relative flex items-center">
          <select
            {...register("icon", { required: true })}
            className="w-full border border-neutral-200 bg-white rounded-xl pl-9 pr-3 py-2.5 text-xs font-bold outline-none focus:border-[#105D38] appearance-none cursor-pointer transition-all"
          >
            {Object.keys(AVAILABLE_ICONS).map((iconKey) => (
              <option key={iconKey} value={iconKey}>
                {iconKey}
              </option>
            ))}
          </select>
          {/* লাইভ আইকন প্রিভিউ বামপাশে */}
          <div className="absolute left-3 pointer-events-none text-neutral-500">
            {React.createElement(
              AVAILABLE_ICONS[selectedIcon] || AVAILABLE_ICONS.BookOpen,
              { className: "w-4 h-4" },
            )}
          </div>
          <div className="absolute right-3 pointer-events-none text-neutral-400 text-[10px]">
            ▼
          </div>
        </div>

        {/* সংক্ষিপ্ত বিবরণ */}
        <div className="space-y-1">
          <input
            {...register("description")}
            placeholder="সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)"
            className="w-full border border-neutral-200 bg-white rounded-xl px-3 py-2.5 text-xs font-bold outline-none focus:border-[#105D38] transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="bg-neutral-800 hover:bg-neutral-900 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 w-full sm:w-auto transition-all disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> যুক্ত হচ্ছে...
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" /> উপ-বিভাগ যোগ করুন
            </>
          )}
        </button>
      </div>
    </form>
  );
}