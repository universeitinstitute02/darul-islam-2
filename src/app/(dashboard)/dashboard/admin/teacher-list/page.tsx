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
  Trash2,
  GraduationCap,
  Calendar,
  IdCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";
import Swal from "sweetalert2";

const TeacherList = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [teachers, setTeachers] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [expFilter, setExpFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    teacherNameBn: "",
    designation: "",
    experience: "",
    qualifications: "",
    departmentId: "",
  });

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

  const fetchTeachers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("role", "teacher");
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

  const handleApproveTeacher = async (
    teacherProfileId: string,
    teacherName: string,
  ) => {
    if (!teacherProfileId) {
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "শিক্ষকের প্রোফাইল আইডি খুঁজে পাওয়া যায়নি।",
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
            setIsModalOpen(false);
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
              text: "ব্যবহারকারীর অ্যাকাউন্টটি সফলভাবে মুছে ফেলা হয়েছে।",
              confirmButtonColor: "#0B5D3B",
            });
            fetchTeachers();
            setIsModalOpen(false);
          } else {
            throw new Error("Failed to delete user");
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ব্যর্থ হয়েছে",
            text: "অ্যাকাউন্টটি মুছে ফেলা সম্ভব হয়নি। আবার চেষ্টা করুন।",
            confirmButtonColor: "#0B5D3B",
          });
        }
      }
    });
  };

  const handleCallClick = (phone: string, name: string) => {
    if (!phone || phone === "N/A") {
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

  const openDetailsModal = async (teacher: any) => {
    const userID = teacher._id || teacher.user?._id || teacher.user;
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
        setSelectedTeacher(teacher);
      }
    } catch (err) {
      setSelectedTeacher(teacher);
    } finally {
      setModalLoading(false);
    }
  };

  const openEditModal = (teacher: any) => {
    setSelectedTeacher(teacher);

    const profile = teacher.profileData || teacher;
    const userContext =
      teacher.user && typeof teacher.user === "object" ? teacher.user : teacher;

    setEditFormData({
      name: teacher.name || userContext.name || "",
      email: teacher.email || userContext.email || "",
      phone: teacher.phone || userContext.phone || profile.phone || "",
      teacherNameBn: profile.teacherNameBn || "",
      designation: profile.designation || "",
      experience: profile.experience || "",
      qualifications: profile.qualifications || "",
      departmentId: profile.department?._id || profile.department || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userID =
      selectedTeacher._id || selectedTeacher.user?._id || selectedTeacher.user;

    try {
      const profilePayload = {
        teacherNameBn: editFormData.teacherNameBn,
        designation: editFormData.designation,
        experience: editFormData.experience,
        qualifications: editFormData.qualifications,
        department: editFormData.departmentId || null,
      };

      const formData = new FormData();
      formData.append("name", editFormData.name);
      formData.append("email", editFormData.email);
      formData.append("phone", editFormData.phone);
      formData.append("profileData", JSON.stringify(profilePayload));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/admin/update-user/${userID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
        fetchTeachers();
      } else {
        throw new Error("Failed to update teacher data");
      }
    } catch (error: any) {
      setIsEditModalOpen(false);
      Swal.fire({
        icon: "error",
        title: "ত্রুটি",
        text: "তথ্য আপডেট করা সম্ভব হয়নি। আবার চেষ্টা করুন।",
        confirmButtonColor: "#0B5D3B",
      });
    }
  };

  const filteredTeachers = teachers.filter((teacher: any) => {
    const profile = teacher.profileData || teacher;
    const itemApproved = profile?.isApproved === true;

    if (statusFilter === "approved") return itemApproved;
    if (statusFilter === "pending") return !itemApproved;
    return true;
  });

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentItems = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mt-4 md:mt-8 space-y-6 pb-12 px-2 md:px-0 font-sans">
      <div className="flex flex-col gap-6 bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-neutral-800 flex items-center gap-2">
              <span className="p-2 bg-emerald-50 rounded-lg text-[#0B5D3B]">
                <UserCheck size={20} />
              </span>
              নিয়ন্ত্রিত শিক্ষকবৃন্দ
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">
              মোট {filteredTeachers.length} জন শিক্ষক পাওয়া গেছে
            </p>
          </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-50 pt-4">
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

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {currentItems.map((teacher: any) => {
              const profile = teacher.profileData || teacher;
              const userContext =
                teacher.user && typeof teacher.user === "object"
                  ? teacher.user
                  : teacher;
              const teacherName =
                teacher.name ||
                userContext.name ||
                profile.teacherNameBn ||
                "Teacher";
              const teacherPhone =
                teacher.phone || userContext.phone || profile.phone || "N/A";
              const teacherImage =
                teacher.profileImage ||
                userContext.profileImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${teacherName}`;
              const isApproved = profile?.isApproved === true;

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
                    <div className="p-6 pb-4 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0 w-16 h-16">
                          <Image
                            src={teacherImage}
                            alt={teacherName}
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
                            {teacher.email || userContext.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(teacher)}
                          className="p-2 bg-neutral-50 hover:bg-emerald-50 text-neutral-400 hover:text-[#0B5D3B] rounded-xl transition-all duration-300 cursor-pointer border border-neutral-100"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteUser(
                              teacher._id || userContext._id,
                              teacherName,
                            )
                          }
                          className="p-2 bg-neutral-50 hover:bg-red-50 text-neutral-400 hover:text-red-600 rounded-xl transition-all duration-300 cursor-pointer border border-neutral-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

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
                            {profile.designation || "শিক্ষক"} •{" "}
                            {profile.department?.name || "সাধারণ"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-amber-600">
                          <Clock size={14} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                            শিক্ষক অভিজ্ঞতা
                          </p>
                          <p className="text-xs font-bold text-neutral-700">
                            {profile.experience || "তথ্য নেই"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                        <span
                          className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {isApproved ? "Approved" : "Pending Verification"}
                        </span>

                        {!isApproved && (
                          <button
                            type="button"
                            onClick={() =>
                              handleApproveTeacher(
                                profile._id || teacher._id,
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

      {!loading && filteredTeachers.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-neutral-400 font-bold">
            কোন শিক্ষক পাওয়া যায়নি!
          </p>
        </div>
      )}

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

      {/* DETAILED VIEW MODAL COMPONENT (Structured matching image_2ced7d.jpg format with professional emerald highlights) */}
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
              className="bg-white rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-2xl border border-neutral-100 relative z-10 max-h-[95vh] flex flex-col font-sans"
            >
              {/* Top Title Action Header Ribbon */}
              <div className="p-5 px-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                <div className="flex items-center gap-2 text-neutral-800 font-black text-sm md:text-base">
                  <span className="p-1.5 bg-emerald-50 rounded-md text-[#0B5D3B]">
                    <UserCheck size={16} />
                  </span>
                  শিক্ষক বৃত্তান্ত ও বিস্তারিত তথ্য
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-neutral-200 rounded-full text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {modalLoading ? (
                <div className="p-24 flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="overflow-y-auto p-6 space-y-6">
                  {/* Identity Header Plate Block */}
                  {(() => {
                    const profile =
                      selectedTeacher.profileData || selectedTeacher;
                    const userContext =
                      selectedTeacher.user &&
                      typeof selectedTeacher.user === "object"
                        ? selectedTeacher.user
                        : selectedTeacher;
                    const nameEn =
                      selectedTeacher.name || userContext.name || "N/A";
                    const nameBn = profile.teacherNameBn || "N/A";
                    const fallbackInitials =
                      nameEn
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase() || "TR";
                    const imgUrl =
                      selectedTeacher.profileImage || userContext.profileImage;
                    const isApproved = profile?.isApproved === true;

                    return (
                      <>
                        <div className="p-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative">
                          <div className="relative w-20 h-20 shrink-0">
                            {imgUrl ? (
                              <Image
                                src={imgUrl}
                                alt={nameEn}
                                width={80}
                                height={80}
                                className="rounded-2xl border-2 border-white shadow-sm object-cover w-20 h-20"
                                unoptimized={true}
                              />
                            ) : (
                              <div className="w-20 h-20 rounded-2xl bg-[#0B5D3B] text-white flex items-center justify-center font-black text-xl shadow-sm">
                                {fallbackInitials}
                              </div>
                            )}
                          </div>

                          <div className="space-y-1 mt-1 flex-1">
                            <h3 className="text-base font-black text-neutral-800 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                              {nameEn}
                              <span
                                className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full ${isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                              >
                                {isApproved ? "Approved" : "Pending"}
                              </span>
                            </h3>
                            <p className="text-xs text-neutral-500 font-bold">
                              {nameBn}
                            </p>
                            <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-1.5">
                              <span className="text-[10px] font-bold bg-emerald-50 text-[#0B5D3B] border border-emerald-100/60 px-2.5 py-0.5 rounded-md">
                                {profile.designation || "শিক্ষক"}
                              </span>
                              <span className="text-[10px] font-bold bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-md">
                                {profile.department?.name || "সাধারণ বিভাগ"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Parameter Column Matrices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                          {/* Left Column Section: Communication Tracks */}
                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-[#0B5D3B] border-b border-neutral-100 pb-2 uppercase tracking-wider">
                              যোগাযোগের মাধ্যম
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2 text-xs font-bold">
                                <span className="text-neutral-400 shrink-0 w-20">
                                  ইমেইল:
                                </span>
                                <span className="text-neutral-700 break-all lowercase font-medium">
                                  {selectedTeacher.email ||
                                    userContext.email ||
                                    "N/A"}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 text-xs font-bold">
                                <span className="text-neutral-400 shrink-0 w-20">
                                  মোবাইল:
                                </span>
                                <span className="text-neutral-700 font-medium">
                                  {selectedTeacher.phone ||
                                    userContext.phone ||
                                    profile.phone ||
                                    "N/A"}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 text-xs font-bold">
                                <span className="text-neutral-400 shrink-0 w-20 flex items-center gap-1">
                                  <Calendar size={12} /> তৈরি সময়:
                                </span>
                                <span className="text-neutral-700 font-medium">
                                  {selectedTeacher.createdAt
                                    ? new Date(
                                        selectedTeacher.createdAt,
                                      ).toLocaleDateString("bn-BD")
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Column Section: Professional Institutional Data */}
                          <div className="space-y-4">
                            <h4 className="text-xs font-black text-[#0B5D3B] border-b border-neutral-100 pb-2 uppercase tracking-wider">
                              প্রাতিষ্ঠানিক ও শিক্ষাগত তথ্য
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2 text-xs font-bold">
                                <span className="text-neutral-400 shrink-0 w-24">
                                  অভিজ্ঞতা:
                                </span>
                                <span className="text-neutral-700 font-medium">
                                  {profile.experience || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 text-xs font-bold">
                                <span className="text-neutral-400 shrink-0 w-24">
                                  শিক্ষাগত যোগ্যতা:
                                </span>
                                <span className="text-neutral-700 font-medium">
                                  {profile.qualifications || "N/A"}
                                </span>
                              </div>
                              <div className="flex items-start gap-2 text-xs font-bold">
                                <span className="text-neutral-400 shrink-0 w-24 flex items-center gap-1">
                                  <IdCard size={12} /> Profile ID:
                                </span>
                                <span className="text-neutral-400 font-mono text-[10px] break-all select-all font-medium">
                                  {profile._id || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row Management Action Footer Strip within Modal Context */}
                        <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/30 p-4 -mx-6 -mb-6">
                          <div className="text-[10px] font-mono text-neutral-400">
                            Teacher DB_ID:{" "}
                            {userContext._id || selectedTeacher._id}
                          </div>
                          <div className="flex items-center gap-2">
                            {!isApproved && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleApproveTeacher(
                                    profile._id || selectedTeacher._id,
                                    nameEn,
                                  )
                                }
                                className="px-4 py-2 bg-amber-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <UserPlus size={14} /> Approve Profile
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setIsModalOpen(false);
                                openEditModal(selectedTeacher);
                              }}
                              className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                            >
                              Edit Profile
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteUser(
                                  userContext._id || selectedTeacher._id,
                                  nameEn,
                                )
                              }
                              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
                            >
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
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
              className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl border border-neutral-100 relative z-10 flex flex-col font-sans"
            >
              <div className="bg-[#0B5D3B] p-6 text-white relative">
                <h3 className="text-lg font-black flex flex-col gap-0.5">
                  শিক্ষক তথ্য পরিবর্তন
                  <span className="text-[10px] font-medium opacity-75 uppercase tracking-wider">
                    FILL STANDARD VALIDATION FIELDS
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form
                onSubmit={handleEditSubmit}
                className="p-6 md:p-8 space-y-5 overflow-y-auto max-h-[75vh]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                      ব্যবহারকারীর নাম (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="उदा: Abu Bakar"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                      শিক্ষকের নাম (বাংলা)
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.teacherNameBn}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          teacherNameBn: e.target.value,
                        })
                      }
                      placeholder="उदा: মাওলানা আবু বকর"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                      ইমেইল ঠিকানা
                    </label>
                    <input
                      type="email"
                      required
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      placeholder="teacher@example.com"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
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
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
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
                      placeholder="उदा: সিনিয়র লেকচারার"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                      অভিজ্ঞতা বিবরণ
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
                      placeholder="उदा: ১০ বছরের অভিজ্ঞতা"
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                    বিভাগ নির্বাচন করুন
                  </label>
                  <select
                    value={editFormData.departmentId}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        departmentId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] outline-none cursor-pointer text-neutral-600"
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                    শিক্ষাগত যোগ্যতা
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.qualifications}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        qualifications: e.target.value,
                      })
                    }
                    placeholder="उदा: কামিল (হাদিস), এম.এ"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                  />
                </div>

                <div className="pt-4 flex gap-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-3 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-xs font-bold hover:bg-neutral-50 transition-all text-center"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#0B5D3B] text-white rounded-xl text-xs font-black hover:bg-[#0c462a] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={14} /> তথ্য সংরক্ষণ করুন
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