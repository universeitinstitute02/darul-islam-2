"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import { ClipboardList, RefreshCw } from "lucide-react";
import Swal from "sweetalert2";
import AssignmentCard from "@/src/components/Assignment/AssignmentCard";

interface AssignmentDetails {
  _id: string;
  title: string;
  totalMarks: number;
}

interface StudentDetails {
  _id: string;
  name: string;
  profilePicture: string;
}

interface CourseDetails {
  _id: string;
  name: string;
  category: string;
}

export interface SubmissionType {
  _id: string;
  status: "pending" | "reviewed";
  studentNotes?: string;
  submittedImages: string[];
  assignment: AssignmentDetails;
  student: StudentDetails;
  course: CourseDetails;
  marksObtained?: number;
  instructorFeedback?: string;
}

const AssignmentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<"all" | "pending" | "reviewed">(
    "pending",
  );

  const {
    data: submissions = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<SubmissionType[]>({
    queryKey: ["teacher-submissions", activeTab],
    queryFn: async () => {
      const url =
        activeTab === "all"
          ? "assignments/teacher/submissions"
          : `assignments/teacher/submissions?status=${activeTab}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const evaluateMutation = useMutation({
    mutationFn: async ({
      id,
      marks,
      feedback,
    }: {
      id: string;
      marks: number;
      feedback: string;
    }) => {
      const res = await axiosSecure.patch(
        `assignments/teacher/evaluate/${id}`,
        {
          marksObtained: marks,
          instructorFeedback: feedback,
        },
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["teacher-submissions"] });
      Swal.fire({
        icon: "success",
        title: "সম্পন্ন হয়েছে!",
        text: data?.message || "শিক্ষার্থীর অ্যাসাইনমেন্ট গ্রেড করা হয়েছে।",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "rounded-[1.5rem]" },
      });
    },
    onError: (err: any) => {
      Swal.fire({
        icon: "error",
        title: "অ্যাকশন ব্যর্থ হয়েছে",
        text:
          err?.response?.data?.message ||
          "সেভ করা যায়নি। ব্যাকএন্ড রাউট চেক করুন।",
        customClass: { popup: "rounded-[1.5rem]" },
      });
    },
  });

  const handleEvaluate = (submission: SubmissionType) => {
    const totalMarks = submission.assignment?.totalMarks || 100;

    Swal.fire({
      title: `<span class="text-base font-bold text-slate-800">অ্যাসাইনমেন্ট মূল্যায়ন</span>`,
      html: `
        <div class="text-left font-sans space-y-3">
          <p class="text-xs text-slate-500 mb-2">সর্বমোট নম্বর: <b>${totalMarks}</b></p>
          <div>
            <label class="block text-xs font-semibold text-slate-600 mb-1">প্রাপ্ত নম্বর *</label>
            <input id="swal-marks" type="number" min="0" max="${totalMarks}" class="w-full px-3 py-2 border rounded-xl text-sm" value="${submission.marksObtained ?? ""}" placeholder="নম্বর লিখুন">
          </div>
          <div class="mt-3">
            <label class="block text-xs font-semibold text-slate-600 mb-1">শিক্ষকের মন্তব্য / ফিডব্যাক</label>
            <textarea id="swal-feedback" rows="3" class="w-full px-3 py-2 border rounded-xl text-sm" placeholder="মন্তব্য লিখুন...">${submission.instructorFeedback || ""}</textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "সাবমিট করুন",
      cancelButtonText: "বাতিল",
      confirmButtonColor: "#105D38",
      cancelButtonColor: "#64748B",
      customClass: { popup: "rounded-[2rem] p-6" },
      preConfirm: () => {
        const marksInput = (
          document.getElementById("swal-marks") as HTMLInputElement
        ).value;
        const feedbackInput = (
          document.getElementById("swal-feedback") as HTMLTextAreaElement
        ).value;

        if (!marksInput) {
          Swal.showValidationMessage("প্রাপ্ত নম্বর দেওয়া বাধ্যতামূলক!");
          return false;
        }

        const marks = parseFloat(marksInput);
        if (marks > totalMarks || marks < 0) {
          Swal.showValidationMessage(
            `নম্বর ০ থেকে ${totalMarks} এর মধ্যে হতে হবে!`,
          );
          return false;
        }

        return { marks, feedback: feedbackInput };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        evaluateMutation.mutate({
          id: submission._id,
          marks: result.value.marks,
          feedback: result.value.feedback,
        });
      }
    });
  };

  return (
    <div className="mt-8 space-y-6 pb-10 max-w-4xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-neutral-800 tracking-tight">
            অ্যাসাইনমেন্ট ও মূল্যায়ন
          </h2>
          <p className="text-xs md:text-sm font-medium text-neutral-500">
            শিক্ষার্থীদের জমা দেওয়া কাজগুলো চেক করুন এবং গ্রেড দিন
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="bg-neutral-50 hover:bg-neutral-100 p-2.5 rounded-xl transition-all border border-neutral-200 text-neutral-600 active:scale-95"
          title="রিফ্রেশ করুন"
        >
          <RefreshCw
            size={18}
            className={`${isLoading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* ট্যাব ফিল্টার বার */}
      <div className="flex bg-neutral-100 p-1 rounded-xl gap-1 w-full max-w-md">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "pending"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          ⏱️ রিভিউ বাকি
        </button>
        <button
          onClick={() => setActiveTab("reviewed")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "reviewed"
              ? "bg-white text-emerald-600 shadow-sm"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          ✅ মূল্যায়িত
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "all"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          📁 সব একসাথে
        </button>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="text-center py-12 bg-white rounded-2xl border border-neutral-100">
          <div className="w-8 h-8 border-4 border-[#105D38] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs text-neutral-400 font-medium">
            অ্যাসাইনমেন্টগুলো লোড হচ্ছে...
          </p>
        </div>
      )}

      {isError && (
        <div className="text-center py-8 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-semibold">
          ⚠️ ডাটা লোড করতে সমস্যা হয়েছে! দয়া করে ব্যাকএন্ড রাউট বা টোকেন চেক
          করুন।
        </div>
      )}

      {/* Assignment List */}
      {!isLoading && !isError && submissions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100 shadow-sm px-4">
          <div className="text-3xl mb-2">📭</div>
          <p className="text-neutral-400 font-bold text-xs sm:text-sm">
            এই ট্যাবে বর্তমানে কোনো অ্যাসাইনমেন্ট সাবমিশন নেই।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission, idx) => (
            <AssignmentCard
              key={submission._id}
              submission={submission}
              idx={idx}
              onEvaluate={handleEvaluate}
            />
          ))}
        </div>
      )}

      {/* Quick Summary Floating Bar */}
      <div className="bg-[#105D38] p-4 rounded-2xl flex items-center justify-between text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <ClipboardList size={18} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black">
              ডাটা সিঙ্ক মোড চালু আছে
            </h4>
            <p className="text-[10px] text-green-100/70 font-medium">
              মূল্যায়ন করার পর তালিকা স্বয়ংক্রিয়ভাবে আপডেট হবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentManagement;
