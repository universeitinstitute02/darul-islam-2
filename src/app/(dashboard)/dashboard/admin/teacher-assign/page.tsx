"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  BookOpen, 
  GraduationCap,
  UserPlus,
  X,
  CheckCircle,
  Search,
  RefreshCw,
  Trash2,
  Layers,
  User,
  CreditCard,
  Calendar,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Student {
  _id: string;
  name: string;
  email: string;
}

interface Course {
  _id: string;
  title: string;
  price: number;
}

interface Batch {
  _id: string;
  batchName: string;
  maxSeats: number;
  enrolledStudents: string[];
}

interface Teacher {
  _id: string;
  name: string;
  expertise?: string;
  email: string;
}

interface EnrollmentRequest {
  _id: string;
  student: Student;
  course: Course;
  batch: Batch;
  paymentDetails: {
    senderName: string;
    bkashNumber: string;
    transactionId: string;
    amountPaid: number;
  };
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function TeacherAssign() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] =
    useState<EnrollmentRequest | null>(null);

  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");

  const {
    data: enrollments = [],
    isLoading: enrollmentsLoading,
    refetch: refetchEnrollments,
    isFetching: enrollmentsFetching,
  } = useQuery({
    queryKey: ["adminEnrollments", statusFilter],
    queryFn: async (): Promise<EnrollmentRequest[]> => {
      const response = await axiosSecure.get(
        `/enrollments/admin/all?status=${statusFilter}`,
      );
      return response.data.data as EnrollmentRequest[];
    },
  });

  const { data: batches = [] } = useQuery({
    queryKey: ["courseBatches", selectedRequest?.course?._id],
    queryFn: async (): Promise<Batch[]> => {
      if (!selectedRequest?.course?._id) return [];
      const response = await axiosSecure.get(
        `/batches?course=${selectedRequest.course._id}&status=active`,
      );
      return response.data.data as Batch[];
    },
    enabled: !!selectedRequest?.course?._id,
  });

  const { data: teachers = [] } = useQuery({
    queryKey: ["teachersList"],
    queryFn: async (): Promise<Teacher[]> => {
      const response = await axiosSecure.get("/users/admin/all-users?role=teacher");
      return response.data.data as Teacher[];
    },
    enabled: !!selectedRequest,
  });

  useEffect(() => {
    if (batches.length > 0) {
      setSelectedBatchId(batches[0]._id);
    } else if (selectedRequest?.batch?._id) {
      setSelectedBatchId(selectedRequest.batch._id);
    }
  }, [batches, selectedRequest]);

  const approveMutation = useMutation({
    mutationFn: (payload: {
      id: string;
      teacherId: string | null;
      alternateBatchId: string;
    }) =>
      axiosSecure.put(`/enrollments/admin/approve/${payload.id}`, {
        teacherId: payload.teacherId,
        alternateBatchId: payload.alternateBatchId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminEnrollments"] });
      Swal.fire(
        "অনুমোদিত",
        "এনরোলমেন্ট সফলভাবে অনুমোদিত হয়েছে এবং আসন বরাদ্দ করা হয়েছে।",
        "success",
      );
      setSelectedRequest(null);
      setSelectedTeacherId("");
      setSelectedBatchId("");
    },
    onError: (error: any) => {
      Swal.fire(
        "ত্রুটি",
        error?.response?.data?.message || "Approve sequence failed",
        "error",
      );
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) =>
      axiosSecure.put(`/enrollments/admin/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminEnrollments"] });
      Swal.fire(
        "বাতিলকৃত",
        "এনরোলমেন্ট রিকোয়েস্টটি বাতিল করা হয়েছে।",
        "success",
      );
    },
    onError: (error: any) => {
      Swal.fire(
        "ত্রুটি",
        error?.response?.data?.message || "Reject sequence failed",
        "error",
      );
    },
  });

  const openAssignModal = (request: EnrollmentRequest) => {
    setSelectedRequest(request);
  };

  const handleSaveAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    if (!selectedBatchId) {
      return Swal.fire(
        "নির্দেশনা",
        "দয়া করে একটি নির্দিষ্ট ব্যাচ সিলেক্ট করুন।",
        "warning",
      );
    }

    approveMutation.mutate({
      id: selectedRequest._id,
      teacherId: selectedTeacherId || null,
      alternateBatchId: selectedBatchId,
    });
  };

  const handleRejectRequest = async (id: string) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই এনরোলমেন্ট পেমেন্ট রিকোয়েস্টটি বাতিল করতে চান?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#991b1b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "হ্যাঁ, বাতিল করুন",
      cancelButtonText: "ফেরত যান",
    });

    if (result.isConfirmed) {
      rejectMutation.mutate(id);
    }
  };

  const filteredRequests = enrollments.filter(
    (item) =>
      item.course?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paymentDetails?.transactionId
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full rounded-2xl min-h-screen bg-[#F5F0E8]/40 p-4 md:p-10 font-sans antialiased text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            {/* <span className="text-[10px] uppercase font-bold text-green-700 bg-green-50 px-3 py-1 rounded-md border border-green-200/50">
              Admin Control Only
            </span> */}
            <h1 className="text-2xl md:text-3xl font-black text-[#14281D] tracking-tight flex items-center gap-2 mt-2">
              <GraduationCap className="w-8 h-8 text-green-800" /> রিভিউ মডারেশন
              প্যানেল
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              শিক্ষার্থীদের সাবমিট করা কোর্স এনরোলমেন্ট পেমেন্ট ট্র্যাকার যাচাই
              করুন এবং ব্যাচ ও শিক্ষক এসাইন করুন।
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="কোর্স, নাম অথবা TxnID দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none transition-all shadow-xs"
              />
            </div>
            <button
              onClick={() => refetchEnrollments()}
              disabled={enrollmentsFetching}
              className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl active:scale-95 transition-all shadow-xs w-full sm:w-auto flex items-center justify-center"
            >
              <RefreshCw
                className={
                  enrollmentsFetching ? "animate-spin text-green-800" : ""
                }
                size={16}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-black/5 shadow-sm mb-6 max-w-md">
          {(["pending", "approved", "rejected"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black capitalize transition-all ${
                statusFilter === tab
                  ? "bg-green-800 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab === "pending"
                ? `পেন্ডিং (${filteredRequests.length})`
                : tab === "approved"
                  ? "অনুমোদিত"
                  : "বাতিলকৃত"}
            </button>
          ))}
        </div>

        {enrollmentsLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-black/5 shadow-sm">
            <RefreshCw className="animate-spin text-green-800 mb-2" size={32} />
            <p className="text-sm font-bold text-gray-500">
              এনরোলমেন্ট ডাটা লোড হচ্ছে...
            </p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-black/5 shadow-sm">
            <Layers className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-base font-bold text-gray-700">
              কোনো রেকর্ড খুঁজে পাওয়া যায়নি
            </h3>
            <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">
              বর্তমানে মডারেশনের জন্য কোনো ট্রানজেকশন ডাটা পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white rounded-[2rem] border border-black/5 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                        {item.student?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800 leading-tight text-sm md:text-base">
                          {item.student?.name || "Unknown Student"}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">
                          {item.student?.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-md ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : item.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status === "pending"
                        ? "পেন্ডিং"
                        : item.status === "approved"
                          ? "Approved"
                          : "Rejected"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-4">
                    <div className="flex items-start gap-2">
                      <BookOpen
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                        size={16}
                      />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          কোর্স
                        </p>
                        <p className="text-xs font-black text-gray-700 mt-0.5 line-clamp-1">
                          {item.course?.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers
                        className="text-gray-400 mt-0.5 flex-shrink-0"
                        size={16}
                      />
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          টার্গেট ব্যাচ
                        </p>
                        <p className="text-xs font-black text-gray-700 mt-0.5 line-clamp-1">
                          {item.batch?.batchName || "Not Assigned"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-gray-100 pb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">প্রেরক (Sender):</span>
                      <span className="text-gray-700">
                        {item.paymentDetails.senderName}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">বিকাশ নম্বর:</span>
                      <span className="text-gray-700">
                        {item.paymentDetails.bkashNumber}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">TxnID:</span>
                      <span className="text-green-800 font-mono tracking-wide uppercase">
                        {item.paymentDetails.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-bold bg-green-50/40 p-2 rounded-xl">
                      <span className="text-gray-500">পরিশোধিত অংক:</span>
                      <span className="text-green-900 font-black">
                        {item.paymentDetails.amountPaid} ৳
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2">
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <Calendar size={12} />{" "}
                    {new Date(item.createdAt).toLocaleString("bn-BD")}
                  </span>

                  {item.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRejectRequest(item._id)}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-red-50 border border-gray-200 text-red-600 font-bold text-xs rounded-xl transition-all active:scale-95"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Reject
                      </button>
                      <button
                        onClick={() => openAssignModal(item)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-800 hover:bg-green-900 text-white font-black text-xs rounded-xl shadow-sm transition-all active:scale-95"
                      >
                        <UserPlus className="w-3.5 h-3.5" /> Approve & Assign
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-black/5 overflow-hidden z-10"
            >
              <div className="bg-green-800 text-white p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">নিবন্ধন ও শিক্ষক এসাইন</h3>
                  <p className="text-[10px] text-white/60 tracking-wider font-bold uppercase mt-0.5">
                    Assign batch instructor context
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-3xl border border-slate-100 space-y-1.5 text-xs font-bold text-gray-600">
                  <p>
                    শিক্ষার্থী:{" "}
                    <span className="text-gray-800 font-black">
                      {selectedRequest.student?.name}
                    </span>
                  </p>
                  <p>
                    কোর্স:{" "}
                    <span className="text-gray-800 font-black">
                      {selectedRequest.course?.title}
                    </span>
                  </p>
                  <p>
                    পেমেন্ট পরিমাণ:{" "}
                    <span className="text-green-800 font-black">
                      ৳{selectedRequest.paymentDetails?.amountPaid}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleSaveAssign} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      ব্যাচ নির্বাচন (Select Batch)
                    </label>
                    <select
                      value={selectedBatchId}
                      onChange={(e) => setSelectedBatchId(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent focus:border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all cursor-pointer"
                      required
                    >
                      <option value="">কোনো ব্যাচ সিলেক্ট করা নেই</option>
                      {batches.map((batch) => (
                        <option key={batch._id} value={batch._id}>
                          {batch.batchName} — (আসন:{" "}
                          {batch.enrolledStudents?.length}/{batch.maxSeats})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      শিক্ষক নির্বাচন করুন (Select Instructor)
                    </label>
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent focus:border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all cursor-pointer"
                    >
                      <option value="">
                        শিক্ষক নিযুক্ত ছাড়া রাখুন / ব্যাচের ডিফল্ট
                      </option>
                      {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                          {teacher.name}{" "}
                          {teacher.expertise ? `— (${teacher.expertise})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedRequest(null)}
                      className="w-1/3 py-3.5 border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all text-xs"
                    >
                      বাতিল (Cancel)
                    </button>
                    <button
                      type="submit"
                      disabled={approveMutation.isPending}
                      className="w-2/3 py-3.5 bg-green-800 hover:bg-green-900 text-white font-black rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60"
                    >
                      {approveMutation.isPending ? (
                        <RefreshCw className="animate-spin" size={14} />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      অনুমোদন নিশ্চিত করুন
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}