"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Plus, Trash2, Eye, UploadCloud, Loader2, Edit, X } from "lucide-react";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";

export default function HeroSliderTab({ pageName }: { pageName: string }) {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingSlide, setEditingSlide] = useState<any | null>(null);

  // TanStack Query দিয়ে স্লাইডার লিস্ট ফেচ করা
  const { data: sliders = [], isLoading } = useQuery({
    queryKey: ["adminSliders", pageName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/content/sliders`, {
        withCredentials: true,
      });
      return res.data.filter((slide: any) => slide.pageName === pageName);
    },
  });

  // নতুন স্লাইডার ক্রিয়েট মিউটেশন
  const createMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiosSecure.post(`/content/sliders`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSliders"] });
      Swal.fire("সফল!", "নতুন স্লাইড যুক্ত হয়েছে।", "success");
      closeFormHandler();
    },
  });

  // স্লাইডার আপডেট মিউটেশন
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      return await axiosSecure.put(`/content/sliders/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSliders"] });
      Swal.fire("সফল!", "স্লাইডারটি সফলভাবে আপডেট হয়েছে।", "success");
      closeFormHandler();
    },
  });

  // স্লাইডার ডিলিট মিউটেশন
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axiosSecure.delete(`/content/sliders/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminSliders"] });
      Swal.fire(
        "ডিলিট হয়েছে!",
        "স্লাইডারটি সফলভাবে মুছে ফেলা হয়েছে।",
        "success",
      );
    },
  });

  const closeFormHandler = () => {
    setIsOpenForm(false);
    setEditingSlide(null);
    setSelectedFile(null);
  };

  const handleEditClick = (slide: any) => {
    setEditingSlide(slide);
    setIsOpenForm(true);
    setSelectedFile(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile && !editingSlide)
      return Swal.fire(
        "ত্রুটি",
        "একটি ব্যাকগ্রাউন্ড ছবি সিলেক্ট করুন",
        "error",
      );

    const formData = new FormData(e.currentTarget);
    formData.append("pageName", pageName);

    if (editingSlide) {
      updateMutation.mutate({ id: editingSlide._id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই স্লাইডটি ওয়েবসাইট থেকে মুছে ফেলা হবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0B5D3B",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "বাতিল",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-black text-neutral-700 uppercase tracking-wider">
          {pageName} পেজ স্লাইডার সমূহ
        </h3>
        <button
          onClick={() => {
            if (isOpenForm) closeFormHandler();
            else setIsOpenForm(true);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl shadow-md transition-all cursor-pointer ${
            isOpenForm
              ? "bg-red-800 hover:bg-red-700 text-white"
              : "bg-[#0B5D3B] hover:bg-green-800 text-white"
          }`}
        >
          {isOpenForm ? <X size={16} /> : <Plus size={16} />}
          {isOpenForm ? "ফর্ম বন্ধ করুন" : "নতুন স্লাইড যোগ করুন"}
        </button>
      </div>

      {isOpenForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              ব্যাজ টেক্সট
            </label>
            <input
              name="badgeText"
              defaultValue={
                editingSlide ? editingSlide.badgeText : "ভর্তি চলছে"
              }
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              মূল শিরোনাম (Title) *
            </label>
            <input
              name="title"
              required
              defaultValue={editingSlide ? editingSlide.title : ""}
              placeholder="যেমন: শুদ্ধভাবে কুরআন শিক্ষা"
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              উপ-শিরোনাম (Subtitle)
            </label>
            <input
              name="subtitle"
              defaultValue={editingSlide ? editingSlide.subtitle : ""}
              placeholder="যেমন: সহজ পদ্ধতিতে তাজবীদসহ কুরআন শিক্ষা ও হিফজ প্রোগ্রাম"
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              প্রথম বাটন টেক্সট
            </label>
            <input
              name="primaryBtnText"
              defaultValue={
                editingSlide
                  ? editingSlide.primaryBtnText
                  : "ভর্তি হতে ক্লিক করুন"
              }
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              first বাটন লিংক
            </label>
            <input
              name="primaryBtnLink"
              defaultValue={
                editingSlide ? editingSlide.primaryBtnLink : "/admission"
              }
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              দ্বিটিয় বাটন টেক্সট
            </label>
            <input
              name="secondaryBtnText"
              defaultValue={
                editingSlide ? editingSlide.secondaryBtnText : "কোর্সসমূহ দেখুন"
              }
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-neutral-500 uppercase">
              দ্বিটিয় বাটন লিংক
            </label>
            <input
              name="secondaryBtnLink"
              defaultValue={
                editingSlide ? editingSlide.secondaryBtnLink : "/education"
              }
              className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-sm outline-none font-bold"
            />
          </div>

          <div className="md:col-span-2 border-2 border-dashed border-neutral-300 rounded-xl p-4 flex flex-col items-center justify-center bg-white cursor-pointer relative hover:border-[#0B5D3B] transition-all">
            <input
              type="file"
              name="image"
              required={!editingSlide}
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <UploadCloud className="text-neutral-400" size={32} />
            <span className="text-xs font-bold text-neutral-500 mt-2">
              {selectedFile
                ? selectedFile.name
                : editingSlide
                  ? "নতুন ছবি আপলোড করতে এখানে ক্লিক করুন (ঐচ্ছিক)"
                  : "স্লাইডারের ব্যাকগ্রাউন্ড ছবি আপলোড করুন"}
            </span>
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
            className="md:col-span-2 p-3.5 cursor-pointer bg-[#C8A44D] text-white font-black text-sm rounded-xl hover:bg-amber-700 shadow transition-all flex justify-center items-center gap-2"
          >
            {(createMutation.isPending || updateMutation.isPending) && (
              <Loader2 className="animate-spin" size={18} />
            )}{" "}
            {editingSlide ? "আপডেট করুন" : "সাবমিট করুন"}
          </button>
        </form>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-[#0B5D3B]" size={36} />
        </div>
      ) : (
        <div className="overflow-x-auto border border-neutral-100 rounded-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-50 text-neutral-500 font-black text-xs border-b">
                <th className="p-4">ছবি</th>
                <th className="p-4">শিরোনাম</th>
                <th className="p-4">ব্যাজ</th>
                <th className="p-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y font-bold text-neutral-700">
              {sliders.map((slide: any) => (
                <tr key={slide._id} className="hover:bg-neutral-50/50">
                  <td className="p-4">
                    <img
                      src={slide.image}
                      alt=""
                      className="w-16 h-10 object-cover rounded-lg border shadow-sm"
                    />
                  </td>
                  <td className="p-4 max-w-xs truncate">{slide.title}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs">
                      {slide.badgeText}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => handleEditClick(slide)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(slide._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
