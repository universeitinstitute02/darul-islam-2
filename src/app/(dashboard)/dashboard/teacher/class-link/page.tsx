"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import useUserRole from "@/src/app/hooks/useUserRole";

// কম্পোনেন্ট ইম্পোর্টস
// কম্পোনেন্ট ইম্পোর্টস (আপনার সঠিক পাথ অনুযায়ী চেঞ্জ করে নিবেন)
import Toast from "@/src/components/ClassLink/Toast";
import ClassLinkModal from "@/src/components/ClassLink/ClassLinkModal";
import ClassLinkCard from "@/src/components/ClassLink/ClassLinkCard";

interface CoursePopulated {
  _id: string;
  name: string;
  category: string;
  banner: string;
}

interface ClassLink {
  _id: string;
  classTitle: string;
  link: string;
  classDate: string;
  startTime: string;
  endTime: string;
  course: CoursePopulated;
}

export default function ClassLinkPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ClassLink | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const axiosSecure = useAxiosSecure();

  const { isTeacher, isLoading: isUserLoading } = useUserRole();

  const {
    data: classLinks = [],
    isLoading: isLinksLoading,
    isError,
    error,
  } = useQuery<ClassLink[]>({
    queryKey: ["class-links-teacher"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/class-links/teacher/my-links");
      return data;
    },
    enabled: isUserLoading === false && isTeacher === true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isUserLoading || isTeacher === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-600">
            অথোরাইজেশন ভেরিফাই করা হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (isTeacher === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm text-center max-w-sm">
          <p className="text-red-500 font-bold text-base">
            🚫 অ্যাক্সেস ডিনাইড!
          </p>
          <p className="text-xs text-slate-500 mt-2">
            দুঃখিত, শুধুমাত্র রেজিস্টার্ড শিক্ষকরাই এই ড্যাশবোর্ড ম্যানেজমেন্ট
            পেজটি অ্যাক্সেস করতে পারবেন।
          </p>
        </div>
      </div>
    );
  }

  if (isLinksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-600">
            ক্লাস লিঙ্কগুলো লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center bg-white p-6 rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-500 font-bold">ডাটা লোড করতে সমস্যা হয়েছে</p>
          <p className="text-xs text-slate-500 mt-1">
            {(error as any)?.response?.data?.message ||
              (error as any)?.message ||
              "Error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-2">
              Instructor Dashboard
            </p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Class Link <span className="text-emerald-500">Management</span>
            </h1>
          </div>

          <button
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            Post Link
          </button>
        </div>

        {/* Dynamic Cards Grid */}
        {classLinks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-400 font-medium">
              এখনো কোনো ক্লাস লিঙ্ক পোস্ট করা হয়নি। উপরের বাটনে চাপ দিয়ে প্রথম
              লিঙ্ক তৈরি করুন।
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classLinks.map((link) => (
              <ClassLinkCard
                key={link._id}
                linkData={link}
                showToast={showToast}
                onEdit={(data) => {
                  setEditData(data);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Add / Edit Modal */}
        {isModalOpen && (
          <ClassLinkModal
            isOpen={isModalOpen}
            editData={editData}
            onClose={() => {
              setIsModalOpen(false);
              setEditData(null);
            }}
          />
        )}
      </main>
    </div>
  );
}
