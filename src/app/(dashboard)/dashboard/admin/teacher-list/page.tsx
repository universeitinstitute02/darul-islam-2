"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Search,
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
  X,
  Phone,
  BookOpen,
  User,
  Edit,
  Trash2, // 👈 Added for Delete Action
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

  // Modal States
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false); // 👈 Added for single user fetch loading

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    designation: "",
    experience: "",
    phone: "",
  });

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

  // Fetch Teachers with Dynamic Server-Side Query Params (Updated for Company API Structure)
  const fetchTeachers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("role", "teacher"); // 👈 Explicitly setting role=teacher as requested
      if (searchTerm) queryParams.append("search", searchTerm);
      if (statusFilter) queryParams.append("status", statusFilter);
      if (deptFilter) queryParams.append("department", deptFilter);
      if (expFilter) queryParams.append("experience", expFilter);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admin/all-users?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await res.json();

      // Supporting both direct array response or standard success/data response wrapping
      if (result.success) {
        setTeachers(result.data || []);
      } else if (Array.isArray(result)) {
        setTeachers(result);
      } else if (result.users) {
        setTeachers(result.users);
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
        text: "शिक्षকের প্রোফাইল আইডি খুঁজে পাওয়া যায়নি।",
        confirmButtonColor: "#0B5D3B",
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
      confirmButtonColor: "#0B5D3B",
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
              confirmButtonColor: "#0B5D3B",
            });
            fetchTeachers();
            if (
              selectedTeacher &&
              (selectedTeacher._id === teacherProfileId ||
                selectedTeacher.profileData?._id === teacherProfileId)
            ) {
              setSelectedTeacher((prev: any) => ({
                ...prev,
                isApproved: true,
              }));
            }
          } else {
            const errData = await res.json();
            throw new Error(errData.message || "Approval process failed");
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ব্যর্থ হয়েছে",
            text: error.message || "অনুমোদন করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
            confirmButtonColor: "#0B5D3B",
          });
        }
      }
    });
  };

  // User Delete Handler 👈 Newly Added based on Company API Docs
  const handleDeleteUser = async (userID: string, name: string) => {
    Swal.fire({
      icon: "warning",
      title: "মুছে ফেলার নিশ্চিতকরণ",
      text: `আপনি কি নিশ্চিতভাবে শিক্ষক ${name}-এর অ্যাকাউন্ট মুছে ফেলতে চান?`,
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/admin/delete-user/${userID}`,
            {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "ডিলিট সম্পন্ন",
              text: "ব্যবহারকারীর অ্যাকাউন্টটি সফলভাবে মুছে ফেলা হয়েছে।",
              confirmButtonColor: "#0B5D3B",
            });
            fetchTeachers();
          } else {
            throw new Error("Failed to delete user");
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ব্যর্থ হয়েছে",
            text: "অ্যাকাউন্টটি মুছে ফেলা সম্ভব হয়নি। আবার চেষ্টা করুন।",
            confirmButtonColor: "#0B5D3B",
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
        confirmButtonColor: "#0B5D3B",
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
      confirmButtonColor: "#0B5D3B",
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
        title: "নম্বর পাওয়া যায়নি",
        text: "দুঃখিত, এই শিক্ষকের মোবাইল নম্বর পাওয়া যায়নি।",
        confirmButtonColor: "#0B5D3B",
      });
      return;
    }
    Swal.fire({
      icon: "question",
      title: "কল করবেন?",
      text: `আপনি কি শিক্ষক ${name}-এর নম্বরে কল করতে চান?`,
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, কল করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#0B5D3B",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `tel:${phone}`;
      }
    });
  };

  // Modal Open Handler 👈 Dynamically Integrated with Single User Get API
  const openDetailsModal = async (teacher: any) => {
    const userID = teacher._id || teacher.user?._id;
    setIsModalOpen(true);
    setModalLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admin/user/${userID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await res.json();
      if (res.ok) {
        setSelectedTeacher(result.data || result);
      } else {
        setSelectedTeacher(teacher); // Fallback to raw card data if single API fails
      }
    } catch (err) {
      setSelectedTeacher(teacher);
    } finally {
      setModalLoading(false);
    }
  };

  // Edit Modal Open Handler
  const openEditModal = (teacher: any) => {
    setSelectedTeacher(teacher);
    setEditFormData({
      name: teacher.name || teacher.profileData?.teacherNameBn || "",
      designation:
        teacher.designation || teacher.profileData?.designation || "",
      experience: teacher.experience || teacher.profileData?.experience || "",
      phone: teacher.phone || teacher.profileData?.phone || "",
    });
    setIsEditModalOpen(true);
  };

  // Edit Submit Handler 👈 Completely Synchronized with Company PUT Endpoint
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userID = selectedTeacher._id || selectedTeacher.user?._id;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admin/update-user/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editFormData),
        },
      );

      if (res.ok) {
        setIsEditModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "সম্পাদনা সফল হয়েছে",
          text: "তথ্যগুলো সফলভাবে আপডেট করা হয়েছে।",
          confirmButtonColor: "#0B5D3B",
        });
        fetchTeachers(); // Refresh table data
      } else {
        throw new Error("Failed to update teacher data");
      }
    } catch (error: any) {
      setIsEditModalOpen(false);
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "তথ্য আপডেট করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
        confirmButtonColor: "#0B5D3B",
      });
    }
  };

  return (
    <div className="mt-4 md:mt-8 space-y-6 pb-12 px-2 md:px-0 font-sans">
      {/* Dynamic Header & Advanced Control Panel */}
      <div className="flex flex-col gap-6 bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm">
        {/* Top Row: Title and Professional Status Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-neutral-800 flex items-center gap-2">
              <span className="p-2 bg-emerald-50 rounded-lg text-[#0B5D3B]">
                <UserCheck size={20} />
              </span>
              নিয়ন্ত্রিত শিক্ষকবৃন্দ
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">
              মোট {teachers.length} জন শিক্ষক পাওয়া গেছে
            </p>
          </div>

          {/* Right Action Block: Status Tab Switcher */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-1 bg-neutral-100/80 p-1.5 rounded-2xl shadow-inner">
              <button
                type="button"
                onClick={() => setStatusFilter("")}
                className={`px-5 py-2 cursor-pointer text-xs font-bold rounded-xl transition-all duration-300 ${
                  statusFilter === ""
                    ? "bg-white text-[#0B5D3B] shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("approved")}
                className={`px-5 py-2 cursor-pointer text-xs font-bold rounded-xl transition-all duration-300 ${
                  statusFilter === "approved"
                    ? "bg-white text-[#0B5D3B] shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Approved
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("pending")}
                className={`px-5 py-2 cursor-pointer text-xs font-bold rounded-xl transition-all duration-300 ${
                  statusFilter === "pending"
                    ? "bg-white text-[#0B5D3B] shadow-sm"
                    : "text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Rest of Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-50 pt-4">
          {/* 1. Name/Email Search - Server Filter Triggered via UseEffect */}
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
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
            />
          </div>

          {/* 2. Department Dropdown */}
          <div className="relative w-full">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none appearance-none cursor-pointer text-neutral-600"
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
              className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none appearance-none cursor-pointer text-neutral-600"
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
                teacher.name || teacher.profileData?.teacherNameBn;
              const teacherPhone = teacher.phone || teacher.profileData?.phone;
              const teacherImage =
                teacher.profileImage ||
                teacher.user?.profileImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacherName || "Teacher"}`;
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
                        <div className="relative shrink-0 w-16 h-16">
                          <Image
                            src={teacherImage}
                            alt={teacherName || "Teacher"}
                            width={64}
                            height={64}
                            className="rounded-2xl bg-emerald-50 border-2 border-white shadow-md object-cover w-16 h-16"
                            unoptimized={teacherImage.startsWith(
                              "https://api.dicebear.com",
                            )}
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
                            {teacher.email || teacher.user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Action Controls for Admin */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(teacher)}
                          className="p-2 bg-neutral-50 hover:bg-emerald-50 text-neutral-400 hover:text-[#0B5D3B] rounded-xl transition-all duration-300 cursor-pointer border border-neutral-100"
                          title="তথ্য পরিবর্তন করুন"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteUser(teacher._id, teacherName)
                          }
                          className="p-2 bg-neutral-50 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer border border-neutral-100"
                          title="অ্যাকাউন্ট ডিলিট করুন"
                        >
                          <Trash2 size={14} />
                        </button>
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

                      {/* Separation between Badge and Action Button */}
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
                      onClick={() => openDetailsModal(teacher)}
                      className="flex-1 py-3 bg-white border border-neutral-100 rounded-2xl text-[#0B5D3B] hover:bg-[#0B5D3B] hover:text-white transition-all duration-300 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <User size={14} /> ডিটেইলস
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

      {/* TEACHER DETAILS MODAL SEGMENT (Integrated with single API loading loop) */}
      <AnimatePresence>
        {isModalOpen && selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl border border-neutral-100 relative z-10 max-h-[90vh] flex flex-col font-sans"
            >
              <div className="absolute right-5 top-5 z-20">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {modalLoading ? (
                <div className="p-20 flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                  <div className="flex flex-col items-center text-center space-y-3 pt-4">
                    <div className="relative w-24 h-24">
                      <Image
                        src={
                          selectedTeacher.profileImage ||
                          selectedTeacher.user?.profileImage ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedTeacher.name || "Teacher"}`
                        }
                        alt={selectedTeacher.name || "Teacher"}
                        width={96}
                        height={96}
                        className="rounded-[2rem] border-4 border-emerald-50 shadow-md object-cover w-24 h-24"
                        unoptimized={true}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-neutral-800">
                        {selectedTeacher.name ||
                          selectedTeacher.profileData?.teacherNameBn}
                      </h3>
                      <p className="text-xs text-neutral-400 font-bold tracking-wide mt-0.5 uppercase text-emerald-700">
                        {selectedTeacher.designation || "শিক্ষক"}
                      </p>
                    </div>

                    <span
                      className={`text-[10px] font-black uppercase px-4 py-1 rounded-full ${
                        (selectedTeacher.isApproved ??
                        selectedTeacher.profileData?.isApproved)
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {(selectedTeacher.isApproved ??
                      selectedTeacher.profileData?.isApproved)
                        ? "Verified Account"
                        : "Pending Verification"}
                    </span>
                  </div>

                  <hr className="border-neutral-100" />

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                      বিস্তারিত তথ্যাবলী
                    </h4>

                    <div className="grid grid-cols-1 gap-3.5">
                      <div className="flex items-center gap-3.5 bg-neutral-50/70 p-3.5 rounded-2xl border border-neutral-100">
                        <div className="p-2.5 bg-white text-emerald-600 rounded-xl shadow-sm shrink-0">
                          <BookOpen size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">
                            বিভাগ / সাবজেক্ট
                          </p>
                          <p className="text-xs font-bold text-neutral-700 truncate">
                            {selectedTeacher.department?.name || "সাধারণ বিভাগ"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 bg-neutral-50/70 p-3.5 rounded-2xl border border-neutral-100">
                        <div className="p-2.5 bg-white text-amber-600 rounded-xl shadow-sm shrink-0">
                          <Clock size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">
                            টিচিং অভিজ্ঞতা
                          </p>
                          <p className="text-xs font-bold text-neutral-700">
                            {selectedTeacher.experience || "নতুন শিক্ষক"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 bg-neutral-50/70 p-3.5 rounded-2xl border border-neutral-100">
                        <div className="p-2.5 bg-white text-blue-600 rounded-xl shadow-sm shrink-0">
                          <Mail size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">
                            ইমেইল ঠিকানা
                          </p>
                          <p className="text-xs font-bold text-neutral-700 break-all lowercase">
                            {selectedTeacher.email ||
                              selectedTeacher.user?.email ||
                              "মেইল নেই"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 bg-neutral-50/70 p-3.5 rounded-2xl border border-neutral-100">
                        <div className="p-2.5 bg-white text-green-600 rounded-xl shadow-sm shrink-0">
                          <Phone size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-neutral-400 font-bold uppercase">
                            ফোন নম্বর
                          </p>
                          <p className="text-xs font-bold text-neutral-700">
                            {selectedTeacher.phone ||
                              selectedTeacher.profileData?.phone ||
                              "নম্বর নেই"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT FORM MODAL SEGMENT */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border border-neutral-100 relative z-10 p-6 md:p-8 font-sans"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-neutral-800 flex items-center gap-2">
                  <Edit size={18} className="text-[#0B5D3B]" /> শিক্ষক তথ্য
                  পরিবর্তন
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-500"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    শিক্ষকের নাম
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    পদবী
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.designation}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        designation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    অভিজ্ঞতা
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.experience}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        experience: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1">
                    ফোন নম্বর
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 hover:cursor-pointer py-3 bg-neutral-100 text-neutral-600 rounded-xl text-xs font-bold hover:bg-neutral-200 transition-all"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 hover:cursor-pointer py-3 bg-[#0B5D3B] text-white rounded-xl text-xs font-black hover:bg-[#0c462a] transition-all shadow-md"
                  >
                    হালনাগাদ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherList;
