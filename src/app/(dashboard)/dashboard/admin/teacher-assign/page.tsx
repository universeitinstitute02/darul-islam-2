"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Layers,
  UserPlus,
  X,
  CheckCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// 📝 ডামি ডাটা টাইপ ডিফাইন
interface Course {
  id: string;
  image: string;
  title: string;
  fee: number;
  duration: string;
  totalClasses: number;
  assignedTeacherId: string;
}

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  expertise: string;
}

// 📊 ডামি ডাটা (আপনার রিয়েল API-এর সাথে কানেক্ট করে নেবেন)
const initialCourses: Course[] = [
  {
    id: "c1",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=60",
    title: "Advanced React & Next.js Masterclass",
    fee: 8500,
    duration: "4 Months",
    totalClasses: 36,
    assignedTeacherId: "t1",
  },
  {
    id: "c2",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60",
    title: "Full Stack MERN Web Development",
    fee: 12000,
    duration: "6 Months",
    totalClasses: 52,
    assignedTeacherId: "t2",
  },
  {
    id: "c3",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2029?w=500&auto=format&fit=crop&q=60",
    title: "UI/UX Design Fundamentals with Figma",
    fee: 6000,
    duration: "3 Months",
    totalClasses: 24,
    assignedTeacherId: "t3",
  },
];

const teachersList: Teacher[] = [
  {
    id: "t1",
    name: "Jhankar Mahbub",
    avatar: "https://i.pravatar.cc/150?img=33",
    expertise: "Senior Web Developer",
  },
  {
    id: "t2",
    name: "Anisul Islam",
    avatar: "https://i.pravatar.cc/150?img=68",
    expertise: "Software Engineer",
  },
  {
    id: "t3",
    name: "Sumit Saha",
    avatar: "https://i.pravatar.cc/150?img=12",
    expertise: "Lead UI/UX Designer",
  },
  {
    id: "t4",
    name: "HM Nayem",
    avatar: "https://i.pravatar.cc/150?img=47",
    expertise: "JavaScript Architect",
  },
];

export default function TeacherAssign() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  // 🎛️ পপআপ ওপেন করার হ্যান্ডেলার
  const openAssignModal = (course: Course) => {
    setSelectedCourse(course);
    setSelectedTeacherId(course.assignedTeacherId);
  };

  // 💾 টিচার অ্যাসাইন সেভ করার হ্যান্ডেলার
  const handleSaveAssign = () => {
    if (!selectedCourse) return;

    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === selectedCourse.id
          ? { ...c, assignedTeacherId: selectedTeacherId }
          : c,
      ),
    );

    // সফল নোটিফিকেশন ট্র্রিগার (এখানে সুন্দর UI বা টোস্ট ব্যবহার করা যায়)
    setSelectedCourse(null);
  };

  // সার্চিং লজিক
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/60 p-4 md:p-8 font-sans antialiased text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* 🌟 হেডার সেকশন */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-indigo-600" /> কোর্স
              ম্যানেজমেন্ট প্যানেল
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              কোর্স মড্যুল ট্র্যাক করুন এবং সহজে মেন্টর/টিচার অ্যাসাইন করুন।
            </p>
          </div>

          {/* 🔍 সার্চ ও ফিল্টার বার */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="কোর্সের নাম দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all shadow-xs"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors shadow-xs">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 📊 রেস্পনসিভ ডাটা টেবিল কন্টেইনার */}
        <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-100/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Course Info</th>
                  <th className="py-4 px-6">Course Fee</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Total Classes</th>
                  <th className="py-4 px-6">Assigned Instructor</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCourses.map((course, idx) => {
                  const currentTeacher = teachersList.find(
                    (t) => t.id === course.assignedTeacherId,
                  );

                  return (
                    <motion.tr
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* কোর্সের ইমেজ ও টাইটেল */}
                      <td className="py-4 px-6 min-w-[300px]">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shrink-0 relative shadow-inner">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                              {course.title}
                            </h4>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md mt-1">
                              ID: {course.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* কোর্স ফি */}
                      <td className="py-4 px-6 font-bold text-slate-700">
                        ৳{course.fee.toLocaleString("bn-BD")}
                      </td>

                      {/* সময়কাল */}
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-slate-400" />{" "}
                          {course.duration}
                        </div>
                      </td>

                      {/* মোট ক্লাস */}
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-slate-400" />{" "}
                          {course.totalClasses}টি ক্লাস
                        </div>
                      </td>

                      {/* অ্যাসাইন করা টিচার */}
                      <td className="py-4 px-6">
                        {currentTeacher ? (
                          <div className="flex items-center gap-3 bg-slate-50 py-1.5 pl-2 pr-3 rounded-2xl border border-slate-100 w-fit">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={currentTeacher.avatar}
                              alt={currentTeacher.name}
                              className="w-6 h-6 rounded-full border border-white"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                {currentTeacher.name}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                {currentTeacher.expertise}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-rose-500 font-medium bg-rose-50 px-2 py-1 rounded-md">
                            No Instructor Assigned
                          </span>
                        )}
                      </td>

                      {/* অ্যাকশন বাটন */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => openAssignModal(course)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md shadow-slate-900/10 hover:bg-indigo-600 hover:shadow-indigo-600/20 active:scale-95 transition-all"
                        >
                          <UserPlus className="w-3.5 h-3.5" /> Assign Teacher
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ডাটা না থাকলে এম্পটি স্টেট */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-medium italic">
              কোনো কোর্স খুঁজে পাওয়া যায়নি।
            </div>
          )}
        </div>
      </div>

      {/* 🔮 টিচার অ্যাসাইনমেন্ট অ্যানিমেটেড পপআপ (Modal) */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* ব্যাকড্রপ ব্লার শ্যাডো */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* মডাল মেইন কার্ড */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              {/* ক্লোজ বাটন */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-black text-slate-900">
                  Assign Instructor
                </h3>
              </div>

              {/* সিলেক্টেড কোর্স প্রিভিউ */}
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-6">
                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-1">
                  Selected Course
                </p>
                <h4 className="font-bold text-slate-800 text-sm leading-snug">
                  {selectedCourse.title}
                </h4>
                <div className="flex gap-4 mt-2 text-[11px] text-slate-500 font-semibold">
                  <p>ফি: ৳{selectedCourse.fee}</p>
                  <p>•</p>
                  <p>ক্লাস: {selectedCourse.totalClasses}টি</p>
                </div>
              </div>

              {/* ড্রপডাউন সিলেকশন এরিয়া */}
              <div className="mb-6">
                <label className="block text-xs font-black text-slate-600 mb-2 uppercase tracking-wide">
                  Select Instructor / Teacher
                </label>
                <div className="relative">
                  <select
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">কোনো শিক্ষক সিলেক্ট করা নেই</option>
                    {teachersList.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} — ({teacher.expertise})
                      </option>
                    ))}
                  </select>
                  {/* কাস্টম ড্রপডাউন অ্যারো */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* অ্যাকশন বাটনসমূহ */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAssign}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" /> Save Assignment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
