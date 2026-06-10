"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface DonationFormData {
  title: string;
  slug: string;
  desc: string;
  image: FileList;
}

export default function AddDonationPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DonationFormData>();

  const title = watch("title");

  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      setValue("slug", slug);
    }
  }, [title, setValue]);

  const onSubmit = async (data: DonationFormData) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("desc", data.desc);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      console.log({
        title: data.title,
        slug: data.slug,
        desc: data.desc,
        image: data.image?.[0],
      });

      // await fetch("/api/donation-projects", {
      //   method: "POST",
      //   body: formData,
      // });

      alert("সফলভাবে সংরক্ষণ করা হয়েছে");

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          নতুন দান প্রকল্প যুক্ত করুন
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              প্রকল্পের নাম
            </label>

            <input
              type="text"
              placeholder="যেমন: দারুল ইসলাম ইনস্টিটিউটে দান করুন"
              {...register("title", {
                required: "প্রকল্পের নাম আবশ্যক",
              })}
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              প্রকল্পের বিস্তারিত
            </label>

            <textarea
              rows={6}
              placeholder="দান প্রকল্প সম্পর্কে বিস্তারিত লিখুন..."
              {...register("desc", {
                required: "বিস্তারিত তথ্য আবশ্যক",
              })}
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {errors.desc && (
              <p className="text-red-500 text-sm mt-1">{errors.desc.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              প্রকল্পের ছবি
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "একটি ছবি নির্বাচন করুন",
              })}
              className="w-full rounded-xl cursor-pointer border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-green-600 file:px-4 file:py-2 file:text-white hover:file:bg-green-700"
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl cursor-pointer bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            প্রকল্প সংরক্ষণ করুন
          </button>
        </form>
      </div>
    </div>
  );
}
