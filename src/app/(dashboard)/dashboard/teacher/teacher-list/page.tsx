"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Mail,
  MessageCircle,
  MoreVertical,
  Star,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  MailQuestion,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TeacherList = () => {
  const allTeachers = [
    {
      id: 1,
      name: "মাওলানা আব্দুল্লাহ আল মামুন",
      subject: "সহীহ তিলাওয়াত ও তাজবিদ",
      email: "abdullah@example.com",
      rating: 4.9,
      status: "Active",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    },
    {
      id: 2,
      name: "মুফতি ওসমান গনি",
      subject: "হাদিস পরিচিতি ও ফিকহ",
      email: "osman@example.com",
      rating: 4.8,
      status: "Active",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    },
    {
      id: 3,
      name: "শায়খ আবু বকর",
      subject: "আরবি ভাষা ও ব্যাকরণ",
      email: "bakari@example.com",
      rating: 5.0,
      status: "Inactive",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    },
    {
      id: 4,
      name: "মাওলানা জায়েদ",
      subject: "ফিকহ",
      email: "zayed@test.com",
      rating: 4.7,
      status: "Active",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    },
    {
      id: 5,
      name: "হাফেজ ইব্রাহিম",
      subject: "হিফজ",
      email: "ibrahim@test.com",
      rating: 4.9,
      status: "Active",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(
      (t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, allTeachers]);

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentItems = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mt-4 md:mt-8 space-y-6 pb-12 px-2 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black text-neutral-800 flex items-center gap-2">
            <span className="p-2 bg-emerald-50 rounded-lg text-[#105D38]">
              <UserCheck size={20} />
            </span>
            সদস্যবৃন্দ <span className="hidden md:inline">(শিক্ষক তালিকা)</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-medium italic">
            ইনস্টিটিউটের সকল শিক্ষকদের তথ্য ও রেটিং
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
              placeholder="নাম বা বিষয় খুঁজুন..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#105D38] outline-none transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-white border border-neutral-200 rounded-2xl text-neutral-600 hover:bg-neutral-50 shadow-sm transition-all text-sm font-bold">
            <Filter size={18} /> ফিল্টার
          </button>
        </div>
      </div>

      {/* Main View: Desktop Table & Mobile Cards */}
      <div className="w-full">
        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50/80 border-b border-neutral-100">
              <tr>
                <th className="p-5 text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">
                  শিক্ষকের তথ্য
                </th>
                <th className="p-5 text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">
                  বিষয়
                </th>
                <th className="p-5 text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">
                  রেটিং
                </th>
                <th className="p-5 text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">
                  স্ট্যাটাস
                </th>
                <th className="p-5 text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em] text-center">
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              <AnimatePresence mode="popLayout">
                {currentItems.map((teacher, idx) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={teacher.image}
                          className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 object-cover"
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-bold text-neutral-800">
                            {teacher.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-medium">
                            {teacher.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-bold text-neutral-600 italic">
                      "{teacher.subject}"
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-50 text-yellow-700 w-fit rounded-lg border border-yellow-100">
                        <Star size={12} className="fill-yellow-600" />
                        <span className="text-xs font-black">
                          {teacher.rating}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span
                        className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${teacher.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                      >
                        {teacher.status === "Active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-neutral-400 hover:text-[#105D38] hover:bg-white rounded-xl shadow-sm transition-all">
                          <Mail size={16} />
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-white rounded-xl shadow-sm transition-all">
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (Hidden on desktop) */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {currentItems.map((teacher) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-5 rounded-[2rem] border border-neutral-100 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={teacher.image}
                      className="w-14 h-14 rounded-2xl bg-emerald-50"
                      alt=""
                    />
                    <div>
                      <h4 className="text-sm font-black text-neutral-800">
                        {teacher.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        {teacher.email}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${teacher.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                  >
                    {teacher.status === "Active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 border-y border-neutral-50 py-3">
                  <div>
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">
                      বিষয়
                    </p>
                    <p className="text-[11px] font-bold text-neutral-700 leading-tight mt-1">
                      {teacher.subject}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-tighter">
                      রেটিং
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <Star
                        size={12}
                        className="fill-yellow-500 text-yellow-500"
                      />
                      <span className="text-xs font-black text-neutral-800">
                        {teacher.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-neutral-50 hover:bg-[#105D38] hover:text-white rounded-xl text-neutral-500 transition-all text-xs font-bold">
                    <Mail size={14} /> ইমেইল
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-neutral-50 hover:bg-blue-600 hover:text-white rounded-xl text-neutral-500 transition-all text-xs font-bold">
                    <MessageCircle size={14} /> মেসেজ
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">
          পেজ {currentPage} / {totalPages || 1}
        </p>

        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-neutral-100 shadow-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 hover:bg-neutral-50 rounded-xl disabled:opacity-20 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                  currentPage === i + 1
                    ? "bg-[#105D38] text-white shadow-lg"
                    : "text-neutral-400 hover:bg-neutral-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 hover:bg-neutral-50 rounded-xl disabled:opacity-20 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;
