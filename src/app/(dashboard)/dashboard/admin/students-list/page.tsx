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
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

// TypeScript Interfaces
interface StudentProfile {
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
  const itemsPerPage = 6;

  const {
    data: students = [],
    isLoading: isDataLoading,
    error,
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

      <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-slate-50/50 min-h-screen selection:bg-emerald-500 selection:text-white">
        {/* হেডার সেকশন */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-emerald-600 shrink-0" />
              শিক্ষার্থী ব্যবস্থাপনা (Student Control)
            </h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              দারুল ইসলামের সকল নিবন্ধিত ছাত্র-ছাত্রীদের তালিকা ও প্রোফাইল
              ডাটাবেজ।
            </p>
          </div>

          {/* টোটাল কাউন্টার কার্ড */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm min-w-[200px] self-start md:self-auto">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                মোট শিক্ষার্থী
              </p>
              <h3 className="text-2xl font-bold text-slate-800">
                {students.length} জন
              </h3>
            </div>
          </div>
        </section>

        {/* সার্চ ও ফিল্টার বার */}
        <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="নাম, বাংলা নাম, ইমেইল বা ফোন নম্বর দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700"
            />
          </div>
          <div className="text-xs text-slate-400 w-full md:w-auto text-left md:text-right font-medium">
            সর্বমোট {totalItems} জনের মধ্যে {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, totalItems)} দেখানো হচ্ছে
          </div>
        </section>

        {/* এরর স্টেট হ্যান্ডলিং */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl text-center text-sm font-medium">
            সার্ভার থেকে ডাটা লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে রিফ্রেশ করুন।
          </div>
        )}

        {/* স্টুডেন্ট গ্রিড/লিস্ট */}
        <section>
          {currentStudents.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
              <ShieldAlert className="h-12 w-12 text-amber-500 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">
                কোনো শিক্ষার্থীর তথ্য পাওয়া যায়নি!
              </p>
              <p className="text-slate-400 text-xs mt-1">
                অনুগ্রহ করে সঠিক বানানে বা অন্য কি-ওয়ার্ড দিয়ে চেষ্টা করুন।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentStudents.map((student) => (
                <article
                  key={student._id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* ইমেজ এবং বেসিক আইডেন্টিটি */}
                    <div className="flex items-start gap-4">
                      <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                        <Image
                          src={
                            student.profileImage ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`
                          }
                          alt={`${student.name}-এর প্রোফাইল ছবি`}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          <UserCheck className="h-3 w-3" /> Student
                        </span>
                        <h2 className="font-bold text-slate-800 text-base truncate group-hover:text-emerald-600 transition-colors">
                          {student.profileData?.studentNameBn || student.name}
                        </h2>
                        <p className="text-xs text-slate-400 truncate">
                          {student.name}
                        </p>
                      </div>
                    </div>

                    {/* কন্টাক্ট ও কোর্স ইনফো */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-sm text-slate-600">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate text-xs text-slate-500">
                          {student.email}
                        </span>
                      </div>
                      {student.phone && (
                        <div className="flex items-center gap-2.5">
                          <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <span className="text-xs text-slate-500">
                            {student.phone}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2.5">
                        <GraduationCap className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50/60 px-2 py-0.5 rounded-md">
                          {student.profileData?.classLevel || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* অ্যাকশন বাটন */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="w-full bg-slate-50 hover:cursor-pointer hover:bg-emerald-600 hover:text-white text-slate-700 transition-all font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-200 hover:border-emerald-600 shadow-sm"
                    >
                      <Eye className="h-4 w-4" /> বিস্তারিত প্রোফাইল দেখুন
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 🔹 পিওর এবং রেসপন্সিভ পেজিয়েশন UI */}
        {totalPages > 1 && (
          <nav
            className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6 rounded-2xl shadow-sm"
            aria-label="Pagination"
          >
            {/* মোবাইল ভিউ বাটন */}
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

            {/* ডেস্কটপ ভিউ বাটন গ্রিড */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  পৃষ্ঠা{" "}
                  <span className="font-semibold text-slate-800">
                    {currentPage}
                  </span>{" "}
                  /{" "}
                  <span className="font-semibold text-slate-800">
                    {totalPages}
                  </span>
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
                    className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
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
                        className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold w-9 h-9 transition-all ${
                          currentPage === pageNum
                            ? "bg-emerald-600 text-white shadow-sm"
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
                    className="inline-flex items-center rounded-xl border border-slate-300 bg-white p-2 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* 🔮 Details Popup / Modal */}
        {selectedStudent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl border border-slate-100 relative">
              {/* মোডাল হেডার */}
              <div className="sticky top-0 bg-white border-b border-slate-100 p-5 flex items-center justify-between z-10">
                <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-emerald-600" /> শিক্ষার্থী
                  বৃত্তান্ত ও বিস্তারিত তথ্য
                </h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 hover:cursor-pointer hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* মোডাল বডি */}
              <div className="p-6 space-y-6">
                {/* মেইন প্রোফাইল কার্ড */}
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-white border border-slate-200 shrink-0">
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
                  <div className="text-center sm:text-left space-y-1 min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-slate-800 truncate">
                      {selectedStudent.profileData?.studentNameBn ||
                        selectedStudent.name}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {selectedStudent.name}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-medium">
                        {selectedStudent.profileData?.classLevel || "General"}
                      </span>
                      {selectedStudent.profileData?.district && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{" "}
                          {selectedStudent.profileData.district}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* গ্রিড ইনফরমেশন */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* কন্টাক্ট ডিটেইলস */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">
                      যোগাযোগের মাধ্যম
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-600 truncate">
                        <strong className="text-slate-700">ইমেইল:</strong>{" "}
                        {selectedStudent.email}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-700">মোবাইল:</strong>{" "}
                        {selectedStudent.phone || "N/A"}
                      </p>
                      <p className="text-slate-600 flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <strong className="text-slate-700">
                          ভর্তির সময়:
                        </strong>{" "}
                        {selectedStudent.createdAt
                          ? new Date(
                              selectedStudent.createdAt,
                            ).toLocaleDateString("bn-BD")
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* পারিবারিক তথ্য */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">
                      অভিভাবক ও পারিবারিক তথ্য
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-600">
                        <strong className="text-slate-700">পিতার নাম:</strong>{" "}
                        {selectedStudent.profileData?.fatherName || "N/A"}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-700">মাতার নাম:</strong>{" "}
                        {selectedStudent.profileData?.motherName || "N/A"}
                      </p>
                      <p className="text-slate-600">
                        <strong className="text-slate-700">
                          গার্ডিয়ান মোবাইল:
                        </strong>{" "}
                        {selectedStudent.profileData?.guardianPhone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ফুল অ্যাড্রেস */}
                {selectedStudent.profileData?.address && (
                  <div className="space-y-2 bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> বর্তমান ও স্থায়ী ঠিকানা
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedStudent.profileData.address}
                    </p>
                  </div>
                )}

                {/* এনরোলড কোর্স সমূহ */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">
                    অধ্যয়নরত কোর্সসমূহ (
                    {selectedStudent.profileData?.enrolledCourses?.length || 0})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.profileData?.enrolledCourses &&
                    selectedStudent.profileData.enrolledCourses.length > 0 ? (
                      selectedStudent.profileData.enrolledCourses.map(
                        (course, index) => (
                          <span
                            key={index}
                            className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium px-3 py-1 rounded-xl"
                          >
                            📚 {course}
                          </span>
                        ),
                      )
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        কোনো কোর্সে এনরোল করা নেই
                      </p>
                    )}
                  </div>
                </div>

                {/* ইউজার আইডি রেফারেন্স */}
                <div className="text-[10px] text-slate-300 text-right font-mono">
                  Student DB_ID: {selectedStudent._id}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
