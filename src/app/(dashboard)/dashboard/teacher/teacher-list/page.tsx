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
  Loader2,
  CheckCircle2,
  XCircle,
  Briefcase,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const TeacherList = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // States
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchTeachers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://darulislam-server-v2.vercel.app/api/users/admin/all-users?role=teacher",
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
  }, [token]);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const filteredTeachers = teachers.filter((t) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      t.name?.toLowerCase().includes(searchStr) ||
      t.email?.toLowerCase().includes(searchStr) ||
      t.profileData?.department?.name?.toLowerCase().includes(searchStr)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentItems = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#105D38] w-10 h-10" />
        <p className="text-sm font-bold text-neutral-500">
          শিক্ষক তালিকা লোড হচ্ছে...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 md:mt-8 space-y-6 pb-12 px-2 md:px-0 font-sans">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-neutral-800 flex items-center gap-2">
            <span className="p-2 bg-emerald-50 rounded-lg text-[#105D38]">
              <UserCheck size={20} />
            </span>
            সম্মানিত শিক্ষকবৃন্দ
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-medium">
            মোট {teachers.length} জন নিবন্ধিত শিক্ষক পাওয়া গেছে
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="নাম বা বিভাগ খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#105D38] outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Teacher Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {currentItems.map((teacher) => (
            <motion.div
              key={teacher._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Top Profile Area */}
              <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${teacher.name}`}
                      className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-white shadow-md object-cover"
                      alt={teacher.name}
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-white ${teacher.profileData?.isApproved ? "bg-green-500" : "bg-amber-500"}`}
                    >
                      {teacher.profileData?.isApproved ? (
                        <CheckCircle2 size={10} className="text-white" />
                      ) : (
                        <XCircle size={10} className="text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-neutral-800 leading-tight">
                      {teacher.profileData?.teacherNameBn || teacher.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-medium mt-1 lowercase">
                      {teacher.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Info */}
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
                      {teacher.profileData?.designation || "শিক্ষক"} •{" "}
                      {teacher.profileData?.department?.name || "সাধারণ"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${teacher.profileData?.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {teacher.profileData?.isApproved
                      ? "Approved"
                      : "Pending Approval"}
                  </span>
                  <p className="text-[10px] font-bold text-neutral-400 italic">
                    ID: ...{teacher._id.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 flex gap-2">
                <button className="flex-1 py-3 bg-white border border-neutral-100 rounded-2xl text-[#105D38] hover:bg-[#105D38] hover:text-white transition-all duration-300 text-xs font-black flex items-center justify-center gap-2">
                  <Mail size={14} /> ইমেইল
                </button>
                <button className="flex-1 py-3 bg-neutral-900 text-white rounded-2xl hover:bg-neutral-800 transition-all duration-300 text-xs font-black flex items-center justify-center gap-2 shadow-lg">
                  <MessageCircle size={14} /> যোগাযোগ
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Data State */}
      {!loading && filteredTeachers.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <p className="text-neutral-400 font-bold">কোন শিক্ষক পাওয়া যায়নি!</p>
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100">
          <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">
            পেজ {currentPage} / {totalPages}
          </p>
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-neutral-100 shadow-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-neutral-50 rounded-xl disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
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
