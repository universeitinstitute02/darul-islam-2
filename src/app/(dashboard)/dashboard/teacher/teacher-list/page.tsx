"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  Mail,
  MessageCircle,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Briefcase,
  UserPlus,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";
import Swal from "sweetalert2";

const TeacherList = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Data States
  const [teachers, setTeachers] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch Departments for Filter Dropdown
  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        );
        const data = await res.json();
        if (Array.isArray(data)) setDepartments(data);
      } catch (err) {
        console.error("Failed to fetch departments:", err);
      }
    };
    fetchDepts();
  }, []);

  // Fetch Teachers with Dynamic Server-Side Query Params
  const fetchTeachers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append("search", searchTerm);
      if (statusFilter) queryParams.append("status", statusFilter);
      if (deptFilter) queryParams.append("department", deptFilter);
      if (expFilter) queryParams.append("experience", expFilter);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admin/all-users?role=teacher&${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await res.json();
      if (result.success) {
        setTeachers(result.data);
      }
    } catch (error) {
      console.error("Teacher fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, [token, searchTerm, statusFilter, deptFilter, expFilter]);

  useEffect(() => {
    fetchTeachers();
    setCurrentPage(1);
  }, [fetchTeachers]);

  // Approval Mutation Handler
  const handleApproveTeacher = async (
    teacherProfileId: string,
    teacherName: string,
  ) => {
    if (!teacherProfileId) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "শিক্ষকের প্রোফাইল আইডি খুঁজে পাওয়া যায়নি।",
        confirmButtonColor: "#105D38",
      });
      return;
    }

    Swal.fire({
      icon: "warning",
      title: "অনুমোদন নিশ্চিতকরণ",
      text: `আপনি কি শিক্ষক ${teacherName}-কে অনুমোদন (Approve) করতে চান?`,
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, অনুমোদন করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#105D38",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/teachers/${teacherProfileId}/approve`,
            {
              method: "PUT",
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "সফল হয়েছে",
              text: "শিক্ষক প্রোফাইলটি সফলভাবে অনুমোদন করা হয়েছে।",
              confirmButtonColor: "#105D38",
            });
            fetchTeachers();
          } else {
            const errData = await res.json();
            throw new Error(errData.message || "Approval process failed");
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ব্যর্থ হয়েছে",
            text: error.message || "অনুমোদন করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
            confirmButtonColor: "#105D38",
          });
        }
      }
    });
  };

  // Client-side slices for pagination
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const currentItems = teachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEmailClick = (email: string, name: string) => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "ইমেইল পাওয়া যায়নি",
        text: "দুঃখিত, এই শিক্ষকের ইমেইল এড্রেস পাওয়া যায়নি।",
        confirmButtonColor: "#105D38",
      });
      return;
    }
    Swal.fire({
      icon: "question",
      title: "ইমেইল করবেন?",
      text: `আপনি কি শিক্ষক ${name}-কে মেইল করতে চান?`,
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, মেইল করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#105D38",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `mailto:${email}`;
      }
    });
  };

  const handleCallClick = (phone: string, name: string) => {
    if (!phone) {
      Swal.fire({
        icon: "error",
        title: "নাম্বার পাওয়া যায়নি",
        text: "দুঃখিত, এই শিক্ষকের মোবাইল নাম্বার পাওয়া যায়নি।",
        confirmButtonColor: "#105D38",
      });
      return;
    }
    Swal.fire({
      icon: "question",
      title: "কল করবেন?",
      text: `আপনি কি শিক্ষক ${name}-এর নাম্বারে কল করতে চান?`,
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, কল করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#105D38",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `tel:${phone}`;
      }
    });
  };

  return (
    <div className="mt-4 md:mt-8 space-y-6 pb-12 px-2 md:px-0 font-sans">
      {/* Dynamic Header & Advanced Control Panel */}
      {/* Dynamic Header & Advanced Control Panel */}
      <div className="flex flex-col gap-6 bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm">
        {/* Top Row: Title and Professional Status Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-neutral-800 flex items-center gap-2">
              <span className="p-2 bg-emerald-50 rounded-lg text-[#105D38]">
                <UserCheck size={20} />
              </span>
              নিয়ন্ত্রিত শিক্ষকবৃন্দ
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">
              মোট {teachers.length} জন শিক্ষক পাওয়া গেছে
            </p>
          </div>

          {/* 🌟 Image Matched Status Tab Switcher */}
          <div className="flex items-center gap-1 bg-neutral-100/80 p-1.5 rounded-2xl w-fit self-start md:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setStatusFilter("")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                statusFilter === ""
                  ? "bg-white text-[#105D38] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("approved")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                statusFilter === "approved"
                  ? "bg-white text-[#105D38] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Approved
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("pending")}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${
                statusFilter === "pending"
                  ? "bg-white text-[#105D38] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Pending
            </button>
          </div>
        </div>

        {/* Bottom Row: Rest of Filters Grid (Clean and Balanced) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-50 pt-4">
          {/* 1. Name/Email Search */}
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম বা ইমেইল খুঁজুন..."
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#105D38] focus:bg-white outline-none transition-all"
            />
          </div>

          {/* 2. Department Dropdown */}
          <div className="relative w-full">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#105D38] outline-none appearance-none cursor-pointer text-neutral-600"
            >
              <option value="">সকল বিভাগ</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
              ▼
            </div>
          </div>

          {/* 3. Experience Dropdown */}
          <div className="relative w-full">
            <select
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#105D38] outline-none appearance-none cursor-pointer text-neutral-600"
            >
              <option value="">অভিজ্ঞতা (সব)</option>
              <option value="১ বছর">১ বছর</option>
              <option value="২ বছর">২ বছর</option>
              <option value="৩ বছর">৩ বছর</option>
              <option value="৫ বছর">৫ বছর</option>
              <option value="১০ বছর">১০ বছরের বেশি</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[10px]">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {currentItems.map((teacher) => {
              const teacherName =
                teacher.profileData?.teacherNameBn || teacher.name;
              const teacherPhone = teacher.profileData?.phone || teacher.phone;
              const teacherImage =
                teacher.user?.profileImage ||
                teacher.profileImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.name}`;
              const isApproved =
                teacher.isApproved ?? teacher.profileData?.isApproved;

              return (
                <motion.div
                  key={teacher._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    {/* Top Identity Block */}
                    <div className="p-6 pb-4 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <img
                            src={teacherImage}
                            className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-white shadow-md object-cover"
                            alt={teacherName}
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${isApproved ? "bg-green-500" : "bg-amber-500"}`}
                          >
                            {isApproved ? (
                              <CheckCircle2 size={10} className="text-white" />
                            ) : (
                              <XCircle size={10} className="text-white" />
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-base font-black text-neutral-800 leading-tight">
                            {teacherName}
                          </h4>
                          <p className="text-xs text-neutral-400 font-medium mt-1 lowercase break-all">
                            {teacher.user?.email || teacher.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meta Parameters Content Block */}
                    <div className="px-6 py-4 bg-neutral-50/50 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-emerald-600">
                          <Briefcase size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            পদবী ও বিভাগ
                          </p>
                          <p className="text-xs font-bold text-neutral-700">
                            {teacher.designation ||
                              teacher.profileData?.designation ||
                              "শিক্ষক"}{" "}
                            •{" "}
                            {teacher.department?.name ||
                              teacher.profileData?.department?.name ||
                              "সাধারণ"}
                          </p>
                        </div>
                      </div>

                      {/* Experience Info Tag */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-amber-600">
                          <Clock size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            শিক্ষক অভিজ্ঞতা
                          </p>
                          <p className="text-xs font-bold text-neutral-700">
                            {teacher.experience ||
                              teacher.profileData?.experience ||
                              "তথ্য নেই"}
                          </p>
                        </div>
                      </div>

                      {/* Separation between Badge and Action Button (Senior UX standard) */}
                      <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                        <span
                          className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                            isApproved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {isApproved ? "Approved" : "Pending Verification"}
                        </span>

                        {/* Interactive Mutation Action Button Trigger */}
                        {!isApproved && (
                          <button
                            type="button"
                            onClick={() =>
                              handleApproveTeacher(
                                teacher._id || teacher.profileData?._id,
                                teacherName,
                              )
                            }
                            className="text-[11px] font-black text-white bg-amber-600 hover:bg-emerald-700 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1 transition-all"
                          >
                            <UserPlus size={12} /> Approve Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Operational Footer Communication Nodes */}
                  <div className="p-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleEmailClick(
                          teacher.user?.email || teacher.email,
                          teacherName,
                        )
                      }
                      className="flex-1 py-3 bg-white border border-neutral-100 rounded-2xl text-[#105D38] hover:bg-[#105D38] hover:text-white transition-all duration-300 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail size={14} /> ইমেইল
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCallClick(teacherPhone, teacherName)}
                      className="flex-1 py-3 bg-neutral-900 text-white rounded-2xl hover:bg-neutral-800 transition-all duration-300 text-xs font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle size={14} /> যোগাযোগ
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Empty Result Boundary */}
      {!loading && teachers.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-neutral-400 font-bold">
            কোন শিক্ষক পাওয়া যায়নি!
          </p>
        </div>
      )}

      {/* Pagination Segment */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100">
          <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">
            পেজ {currentPage} / {totalPages}
          </p>
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-neutral-100 shadow-sm">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-neutral-50 rounded-xl disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-neutral-50 rounded-xl disabled:opacity-20 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;
