"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  Loader2,
  Camera,
  User,
  Phone,
  Book,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

interface ProfileFormInput {
  name: string;
  phone: string;
  studentNameBn?: string;
  classLevel?: string;
  designation?: string;
  department?: string;
}

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useUser();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormInput>();

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || "",
        phone: user?.phone || "",
        studentNameBn:
          user?.profile?.studentNameBn || user?.studentNameBn || "",
        classLevel: user?.profile?.classLevel || user?.classLevel || "",
        designation: user?.profile?.designation || "",
        department:
          user?.profile?.department?._id || user?.profile?.department || "",
      });
      if (user?.profileImage) {
        setImagePreview(user.profileImage);
      }
    }
  }, [user, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosSecure.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      // ফিক্সড SweetAlert
      Swal.fire({
        icon: "success",
        title:
          "<span style='font-family: inherit; font-weight: 900; color: #105D38;'>সফল হয়েছে!</span>",
        html: "<p style='font-family: inherit; font-size: 14px; color: #4b5563;'>আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে! 🎉</p>",
        background: "#ffffff",
        confirmButtonColor: "#105D38",
        confirmButtonText: "ঠিক আছে",
        customClass: {
          popup:
            "rounded-[24px] shadow-[0_20px_50px_rgba(16,93,56,0.1)] border border-neutral-100",
          confirmButton:
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95",
        },
      });

      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "আপডেট করতে সমস্যা হয়েছে।";

      // ফিক্সড SweetAlert
      Swal.fire({
        icon: "error",
        title:
          "<span style='font-family: inherit; font-weight: 900; color: #dc2626;'>দুঃখিত!</span>",
        html: `<p style='font-family: inherit; font-size: 14px; color: #4b5563;'>${errorMessage}</p>`,
        background: "#ffffff",
        confirmButtonColor: "#dc2626",
        confirmButtonText: "আবার চেষ্টা করুন",
        customClass: {
          popup:
            "rounded-[24px] shadow-[0_20px_50px_rgba(220,38,38,0.08)] border border-neutral-100",
          confirmButton:
            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95",
        },
      });
    },
  });

  const onSubmit = (data: ProfileFormInput) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);

    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    let profileDetails = {};
    if (user?.role === "student") {
      profileDetails = {
        studentNameBn: data.studentNameBn,
        classLevel: data.classLevel,
      };
    } else if (user?.role === "teacher") {
      profileDetails = {
        designation: data.designation,
        department: data.department,
      };
    }

    formData.append("profileData", JSON.stringify(profileDetails));
    updateProfileMutation.mutate(formData);
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F5]">
        <Loader2 className="animate-spin text-[#105D38]" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5] pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex justify-start">
          <Link
            href="/student-profile"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 bg-white/80 backdrop-blur-md px-4 py-2 border border-neutral-200/60 rounded-full shadow-sm hover:text-[#105D38] hover:border-[#105D38]/30 transition-all active:scale-95"
          >
            <ArrowLeft size={14} /> ফিরে যান
          </Link>
        </div>

        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(16,93,56,0.05)] border border-neutral-100 overflow-hidden">
          <div className="bg-[#105D38] p-8 lg:p-10 text-white text-center relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />

            <h2 className="text-2xl lg:text-3xl font-black tracking-tight">
              আমার প্রোফাইল
            </h2>
            <p className="text-white/75 text-xs lg:text-sm mt-1.5 font-medium max-w-md mx-auto">
              আপনার ব্যক্তিগত তথ্য দেখুন এবং প্রয়োজন অনুযায়ী আপডেট করুন
            </p>

            <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              {user?.role === "teacher" ? "শিক্ষক" : "শিক্ষার্থী"}
            </span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 lg:p-10 space-y-8"
          >
            <div className="flex flex-col items-center justify-center group">
              <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-3xl overflow-hidden shadow-md border-4 border-white ring-4 ring-[#105D38]/5 transition-transform duration-300 group-hover:scale-105">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Avatar Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <User size={44} />
                  </div>
                )}

                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 inset-x-0 bg-neutral-900/80 backdrop-blur-sm text-white text-[10px] font-bold py-2 flex items-center justify-center gap-1 cursor-pointer opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Camera size={12} /> পরিবর্তন করুন
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <p className="text-neutral-400 text-[10px] mt-2.5 font-medium">
                JPG, PNG বা WEBP (সর্বোচ্চ ২ মেগাবাইট)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <User size={14} className="text-[#105D38]" /> নাম (ইংরেজি)
                </label>
                <input
                  type="text"
                  {...register("name", { required: "নাম দেওয়া আবশ্যক" })}
                  className={`w-full px-4 py-3 bg-neutral-50/50 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#105D38]/5 focus:border-[#105D38] ${
                    errors.name
                      ? "border-red-500 bg-red-50/10"
                      : "border-neutral-200"
                  }`}
                  placeholder="যেমন: Ariful Islam"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-medium pl-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                  <Phone size={14} className="text-[#105D38]" /> ফোন নম্বর
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "ফোন নম্বর দেওয়া আবশ্যক",
                  })}
                  className={`w-full px-4 py-3 bg-neutral-50/50 border rounded-xl text-sm font-medium transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#105D38]/5 focus:border-[#105D38] ${
                    errors.phone
                      ? "border-red-500 bg-red-50/10"
                      : "border-neutral-200"
                  }`}
                  placeholder="যেমন: 01899999999"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs font-medium pl-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 flex items-center gap-1.5">
                  <Mail size={14} /> ইমেইল এড্রেস (পরিবর্তনযোগ্য নয়)
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200/60 rounded-xl text-sm font-medium text-neutral-400 cursor-not-allowed select-none"
                />
              </div>

              {user?.role === "student" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                      <Book size={14} className="text-[#105D38]" /> নাম
                      (বাংলায়)
                    </label>
                    <input
                      type="text"
                      {...register("studentNameBn")}
                      className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm font-medium transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#105D38]/5 focus:border-[#105D38]"
                      placeholder="যেমন: আরিফুল ইসলাম"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                      <Book size={14} className="text-[#105D38]" /> ক্লাস লেভেল
                      / বিভাগ
                    </label>
                    <input
                      type="text"
                      {...register("classLevel")}
                      className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm font-medium transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#105D38]/5 focus:border-[#105D38]"
                      placeholder="যেমন: Class 10 / Level 3"
                    />
                  </div>
                </>
              )}

              {user?.role === "teacher" && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-[#105D38]" /> পদবী
                      (Designation)
                    </label>
                    <input
                      type="text"
                      {...register("designation")}
                      className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm font-medium transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#105D38]/5 focus:border-[#105D38]"
                      placeholder="যেমন: Senior Lecturer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-700 flex items-center gap-1.5">
                      <Briefcase size={14} className="text-[#105D38]" />{" "}
                      ডিপার্টমেন্ট আইডি
                    </label>
                    <input
                      type="text"
                      {...register("department")}
                      className="w-full px-4 py-3 bg-neutral-50/50 border border-neutral-200 rounded-xl text-sm font-medium transition-all focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#105D38]/5 focus:border-[#105D38]"
                      placeholder="যেমন: CATEGORY_ID"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="pt-5 border-t border-neutral-100 flex justify-end">
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#105D38] text-white rounded-xl text-sm font-bold shadow-[0_10px_20px_rgba(16,93,56,0.15)] hover:bg-[#0d4b2d] hover:shadow-[0_10px_25px_rgba(16,93,56,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed select-none"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    আপডেট হচ্ছে...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    প্রোফাইল আপডেট করুন
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
