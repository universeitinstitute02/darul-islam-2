"use client";

import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import useUserRole from "@/src/app/hooks/useUserRole";
import {
  Search,
  UserCheck,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  MapPin,
  Users,
  ShieldAlert,
  X,
  Eye,
  Info,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  CheckCircle2,
  IdCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";
import Swal from "sweetalert2";

interface StudentProfile {
  _id?: string;
  studentNameBn?: string;
  classLevel?: string;
  fatherName?: string;
  motherName?: string;
  guardianPhone?: string;
  district?: string;
  address?: string;
  enrolledCourses?: string[];
}

interface Student {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  createdAt?: string;
  profileImage?: string;
  profileData?: StudentProfile;
}

export default function StudentManagement() {
  const axiosSecure = useAxiosSecure();
  const { isAdmin, isLoading: isRoleLoading } = useUserRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentNameBn: "",
    classLevel: "",
    fatherName: "",
    motherName: "",
    guardianPhone: "",
    address: "",
  });

  const itemsPerPage = 6;

  const {
    data: students = [],
    isLoading: isDataLoading,
    error,
    refetch,
  } = useQuery<Student[]>({
    queryKey: ["adminAllStudents"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/users/admin/all-users?role=student",
      );
      return response.data?.data || response.data || [];
    },
    enabled: !!isAdmin,
    staleTime: 3 * 60 * 1000,
  });

  const handleDeleteUser = async (userID: string, name: string) => {
    Swal.fire({
      icon: "warning",
      title: "মুছে ফেলার নিশ্চিতকরণ",
      text: `আপনি কি নিশ্চিতভাবে শিক্ষার্থী ${name}-এর অ্যাকাউন্ট মুছে ফেলতে চান?`,
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, ডিলিট করুন",
      cancelButtonText: "না",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/users/admin/delete-user/${userID}`,
          );
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "ডিলিট সম্পন্ন",
              text: "শিক্ষার্থীর অ্যাকাউন্টটি সফলভাবে মুছে ফেলা হয়েছে।",
              confirmButtonColor: "#0B5D3B",
            });
            refetch();
            setSelectedStudent(null);
          }
        } catch (err: any) {
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

  const openEditModal = (student: Student) => {
    const profile = student.profileData || {};
    setEditFormData({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      studentNameBn: profile.studentNameBn || "",
      classLevel: profile.classLevel || "",
      fatherName: profile.fatherName || "",
      motherName: profile.motherName || "",
      guardianPhone: profile.guardianPhone || "",
      address: profile.address || "",
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    try {
      const profilePayload = {
        studentNameBn: editFormData.studentNameBn,
        classLevel: editFormData.classLevel,
        fatherName: editFormData.fatherName,
        motherName: editFormData.motherName,
        guardianPhone: editFormData.guardianPhone,
        address: editFormData.address,
      };

      const formData = new FormData();
      formData.append("name", editFormData.name);
      formData.append("email", editFormData.email);
      formData.append("phone", editFormData.phone);
      formData.append("profileData", JSON.stringify(profilePayload));

      const res = await axiosSecure.put(
        `/users/admin/update-user/${selectedStudent._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.status === 200) {
        setIsEditModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "সম্পাদনা সফল হয়েছে",
          text: "তথ্যগুলো সফলভাবে আপডেট করা হয়েছে।",
          confirmButtonColor: "#0B5D3B",
        });
        refetch();
        setSelectedStudent(null);
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

  const filteredStudents = students.filter((student) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      student.name?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.phone?.includes(searchQuery) ||
      student.profileData?.studentNameBn?.includes(searchQuery)
    );
  });

  const totalItems = filteredStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (isRoleLoading || isDataLoading) {
    return (
      <div
        className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3"
        aria-live="polite"
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>শিক্ষার্থী ব্যবস্থাপনা | ড্যাশবোর্ড</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-slate-50/50 min-h-screen selection:bg-emerald-500 selection:text-white font-sans">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <span className="p-2 bg-emerald-50 rounded-xl text-[#0B5D3B]">
                <GraduationCap className="h-7 w-7 shrink-0" />
              </span>
              শিক্ষার্থী ব্যবস্থাপনা (Student Control)
            </h1>
            <p className="text-slate-500 mt-1 text-sm font-medium">
              দারুল ইসলামের সকল নিবন্ধিত ছাত্র-ছাত্রীদের তালিকা ও প্রোফাইল
              ডাটাবেজ।
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] p-4 flex items-center gap-4 shadow-sm min-w-[200px] self-start md:self-auto">
            <div className="p-3 bg-emerald-50 rounded-2xl text-[#0B5D3B]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                মোট শিক্ষার্থী
              </p>
              <h3 className="text-xl font-black text-slate-800">
                {students.length} জন
              </h3>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="নাম, বাংলা নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/20 focus:border-[#0B5D3B] transition-all text-slate-700"
            />
          </div>
          <div className="text-xs text-slate-400 w-full md:w-auto text-left md:text-right font-black tracking-wide uppercase">
            সর্বমোট {totalItems} জনের মধ্যে {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, totalItems)} দেখানো হচ্ছে
          </div>
        </section>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-center text-sm font-medium">
            সার্ভার থেকে ডাটা লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে রিফ্রেশ করুন।
          </div>
        )}

        <section>
          {currentStudents.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-[3rem] p-12 text-center">
              <ShieldAlert className="h-12 w-12 text-amber-500 mx-auto mb-3" />
              <p className="text-slate-600 font-bold">
                কোঁন শিক্ষার্থীর তথ্য পাওয়া যায়নি!
              </p>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                অনুগ্রহ করে সঠিক বানানে বা অন্য কি-ওয়ার্ড দিয়ে চেষ্টা করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentStudents.map((student) => {
                const studentName =
                  student.profileData?.studentNameBn || student.name;
                const studentImage =
                  student.profileImage ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`;

                return (
                  <article
                    key={student._id}
                    className="bg-white border border-slate-200 rounded-[2.5rem] p-5 shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-4">
                          <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-sm">
                            <Image
                              src={studentImage}
                              alt={studentName}
                              fill
                              sizes="56px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-[#0B5D3B] border border-emerald-100">
                              <UserCheck className="h-3 w-3" /> Student
                            </span>
                            <h2 className="font-black text-slate-800 text-base truncate group-hover:text-[#0B5D3B] transition-colors leading-tight pt-1">
                              {studentName}
                            </h2>
                            <p className="text-xs text-slate-400 font-medium truncate">
                              {student.name}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedStudent(student);
                            openEditModal(student);
                          }}
                          className="p-2 bg-neutral-50 hover:bg-emerald-50 text-neutral-400 hover:text-[#0B5D3B] rounded-xl transition-all border border-neutral-100 cursor-pointer"
                          title="তথ্য পরিবর্তন করুন"
                        >
                          <Edit size={14} />
                        </button>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-sm text-slate-600">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <span className="truncate text-xs font-medium text-slate-500 lowercase">
                            {student.email}
                          </span>
                        </div>
                        {student.phone && (
                          <div className="flex items-center gap-2.5">
                            <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-500">
                              {student.phone}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2.5">
                          <GraduationCap className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                            {student.profileData?.classLevel || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="w-full bg-slate-50 hover:cursor-pointer hover:bg-[#0B5D3B] hover:text-white text-slate-700 transition-all font-black py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 border border-slate-200 hover:border-[#0B5D3B] shadow-sm"
                      >
                        <Eye className="h-4 w-4" /> বিস্তারিত প্রোফাইল দেখুন
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <nav
            className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-sm"
            aria-label="Pagination"
          >
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                পূর্ববর্তী
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                পরবর্তী
              </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                  পৃষ্ঠা <span className="text-slate-800">{currentPage}</span> /{" "}
                  <span className="text-slate-800">{totalPages}</span>
                </p>
              </div>
              <div>
                <div
                  className="inline-flex -space-x-px rounded-xl gap-1"
                  aria-label="Pagination"
                >
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        aria-current={
                          currentPage === pageNum ? "page" : undefined
                        }
                        className={`inline-flex items-center justify-center rounded-xl text-xs font-black w-9 h-9 transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#0B5D3B] text-white shadow-sm"
                            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* DETAILS VIEW MODAL (Redesigned with professional Emerald/White layout matching image_2ced7d.jpg) */}
        <AnimatePresence>
          {selectedStudent && !isEditModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedStudent(null)}
                className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[2rem] w-full max-w-3xl overflow-hidden shadow-2xl border border-neutral-100 relative z-10 max-h-[95vh] flex flex-col font-sans"
              >
                <div className="p-5 px-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                  <div className="flex items-center gap-2 text-neutral-800 font-black text-sm md:text-base">
                    <span className="p-1.5 bg-emerald-50 rounded-md text-[#0B5D3B]">
                      <Info className="h-4 w-4" />
                    </span>
                    শিক্ষার্থী বৃত্তান্ত ও বিস্তারিত তথ্য
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1.5 hover:bg-neutral-200 rounded-full text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-6">
                  <div className="p-5 bg-neutral-50/50 border border-neutral-100 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-white border border-neutral-200 shrink-0 shadow-sm">
                      <Image
                        src={
                          selectedStudent.profileImage ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${selectedStudent.name}`
                        }
                        alt={selectedStudent.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="space-y-1 mt-1 flex-1 min-w-0">
                      <h3 className="text-base font-black text-slate-800 truncate">
                        {selectedStudent.profileData?.studentNameBn ||
                          selectedStudent.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold truncate">
                        {selectedStudent.name}
                      </p>
                      <div className="pt-1 flex flex-wrap justify-center sm:justify-start gap-1.5">
                        <span className="text-[10px] font-black bg-emerald-50 text-[#0B5D3B] border border-emerald-100/60 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {selectedStudent.profileData?.classLevel ||
                            "General Student"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#0B5D3B] border-b border-neutral-100 pb-2 uppercase tracking-wider">
                        যোগাযোগের মাধ্যম
                      </h4>
                      <div className="space-y-3 text-xs font-bold">
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-400 shrink-0 w-20">
                            ইমেইল:
                          </span>
                          <span className="text-neutral-700 break-all font-medium lowercase">
                            {selectedStudent.email}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-400 shrink-0 w-20">
                            মোবাইল:
                          </span>
                          <span className="text-neutral-700 font-medium">
                            {selectedStudent.phone || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-400 shrink-0 w-20 flex items-center gap-1">
                            <Calendar size={12} /> ভর্তি সময়:
                          </span>
                          <span className="text-neutral-700 font-medium">
                            {selectedStudent.createdAt
                              ? new Date(
                                  selectedStudent.createdAt,
                                ).toLocaleDateString("bn-BD")
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#0B5D3B] border-b border-neutral-100 pb-2 uppercase tracking-wider">
                        অভিভাবক ও পারিবারিক তথ্য
                      </h4>
                      <div className="space-y-3 text-xs font-bold">
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-400 shrink-0 w-24">
                            পিতার নাম:
                          </span>
                          <span className="text-neutral-700 font-medium">
                            {selectedStudent.profileData?.fatherName || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-400 shrink-0 w-24">
                            মাতার নাম:
                          </span>
                          <span className="text-neutral-700 font-medium">
                            {selectedStudent.profileData?.motherName || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-neutral-400 shrink-0 w-24">
                            গার্ডিয়ান মোবাইল:
                          </span>
                          <span className="text-neutral-700 font-medium">
                            {selectedStudent.profileData?.guardianPhone ||
                              "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedStudent.profileData?.address && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-[#0B5D3B] border-b border-neutral-100 pb-2 uppercase tracking-wider">
                        ঠিকানা বিবরণী
                      </h4>
                      <div className="bg-neutral-50/70 p-3.5 rounded-2xl border border-neutral-100 flex items-start gap-2.5 text-xs font-bold text-neutral-700 leading-relaxed font-medium">
                        <MapPin
                          size={14}
                          className="text-[#0B5D3B] shrink-0 mt-0.5"
                        />
                        {selectedStudent.profileData.address}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-[#0B5D3B] border-b border-neutral-100 pb-2 uppercase tracking-wider">
                      अধ্যয়নরত কোর্সসমূহ (
                      {selectedStudent.profileData?.enrolledCourses?.length ||
                        0}
                      )
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.profileData?.enrolledCourses &&
                      selectedStudent.profileData.enrolledCourses.length > 0 ? (
                        selectedStudent.profileData.enrolledCourses.map(
                          (course, index) => (
                            <span
                              key={index}
                              className="bg-emerald-50/60 text-[#0B5D3B] border border-emerald-100/60 text-[11px] font-bold px-3 py-1 rounded-xl"
                            >
                              📚 {course}
                            </span>
                          ),
                        )
                      ) : (
                        <p className="text-xs text-neutral-400 italic font-medium">
                          কোনো কোর্সে এনরোল করা নেই
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/30 p-4 -mx-6 -mb-6">
                    <div className="text-[10px] font-mono text-neutral-400">
                      Student DB_ID: {selectedStudent._id}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(selectedStudent)}
                        className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
                      >
                        Edit Profile
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteUser(
                            selectedStudent._id,
                            selectedStudent.name,
                          )
                        }
                        className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* EDIT MANAGEMENT MODAL */}
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
                    শিক্ষার্থী তথ্য পরিবর্তন
                    <span className="text-[10px] font-medium opacity-75 uppercase tracking-wider">
                      FILL STANDARD VALIDATION FIELDS
                    </span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
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
                        placeholder="उदा: Stuart Hopkins"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                        শিক্ষার্থীর নাম (বাংলা)
                      </label>
                      <input
                        type="text"
                        required
                        value={editFormData.studentNameBn}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            studentNameBn: e.target.value,
                          })
                        }
                        placeholder="उदा: স্টুয়ার্ট হপকিন্স"
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
                        placeholder="student@example.com"
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
                        শ্রেণী / লেভেল
                      </label>
                      <input
                        type="text"
                        required
                        value={editFormData.classLevel}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            classLevel: e.target.value,
                          })
                        }
                        placeholder="उदा: নবম শ্রেণী"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                        অভিভাবক মোবাইল নম্বর
                      </label>
                      <input
                        type="text"
                        required
                        value={editFormData.guardianPhone}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            guardianPhone: e.target.value,
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
                        পিতার নাম
                      </label>
                      <input
                        type="text"
                        required
                        value={editFormData.fatherName}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            fatherName: e.target.value,
                          })
                        }
                        placeholder="পিতার নাম লিখুন"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                        মাতার নাম
                      </label>
                      <input
                        type="text"
                        required
                        value={editFormData.motherName}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            motherName: e.target.value,
                          })
                        }
                        placeholder="মাতার নাম লিখুন"
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-500 mb-1.5">
                      ঠিকানা বিবরণী
                    </label>
                    <textarea
                      required
                      value={editFormData.address}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          address: e.target.value,
                        })
                      }
                      placeholder="বর্তমান ও স্থায়ী ঠিকানা লিখুন..."
                      rows={3}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#0B5D3B] focus:bg-white outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4 flex gap-4 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="flex-1 py-3 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-xs font-bold hover:bg-neutral-50 transition-all text-center cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#0B5D3B] text-white rounded-xl text-xs font-black hover:bg-[#0c462a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 size={14} /> তথ্য সংরক্ষণ করুন
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}