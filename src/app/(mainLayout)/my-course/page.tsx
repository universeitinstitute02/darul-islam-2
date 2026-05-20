"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Clock,
  PlayCircle,
  BarChart3,
  Loader2,
  CheckCircle,
  Search,
  Sparkles,
} from "lucide-react";

interface Highlight {
  label: string;
  value: string;
}

interface CourseDetails {
  fullTitle: string;
  description: string;
  batchInfo: string;
  highlights: Highlight[];
}

interface EnrolledCourse {
  id: number;
  title: string;
  image: string;
  details: CourseDetails;
}

const MyCoursesPage = () => {
  const [myCourses, setMyCourses] = useState<EnrolledCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/education.json");
        const data = await response.json();

        if (data?.freeCoursesData?.courses) {
          setMyCourses(data.freeCoursesData.courses);
        }
      } catch (error) {
        console.error("Error fetching demo courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const filteredCourses = myCourses.filter((course) =>
    course.details.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 pt-16 lg:pt-18 font-sans">
      {/* 🟢 Premium Dark/Green Carbon Fiber Style Header */}
      <div className="bg-gradient-to-br from-[#0d4d2e] via-[#052214] to-black text-white p-6 pt-12 pb-24 rounded-b-[2rem] lg:rounded-b-[4rem] shadow-xl relative overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-[#105D38]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-72 h-72 bg-black/40 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-[#105D38] bg-white/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 w-fit shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span>স্টুডেন্ট ড্যাশবোর্ড</span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-black tracking-tight flex items-center gap-2">
              <GraduationCap className="text-white" size={32} />
              আমার এনরোল করা কোর্সসমূহ
            </h1>
            <p className="text-slate-300 text-xs lg:text-sm mt-1 font-medium">
              আপনার চলমান কোর্সগুলোর প্রোগ্রেস ও ক্লাস শিডিউল এখানে ট্র্যাক
              করুন।
            </p>
          </div>

          {/* Premium Glass Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="কোর্সের নাম দিয়ে খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#105D38] transition-all"
            />
          </div>
        </div>
      </div>

      {/* 🎴 Course Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] shadow-sm border border-neutral-100 max-w-sm mx-auto">
            <Loader2 className="animate-spin text-[#105D38] mb-3" size={32} />
            <p className="text-xs font-bold text-slate-400">
              কোর্স ডাটা লোড হচ্ছে...
            </p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const totalClasses =
                course.id % 2 === 0 ? "২৪টি ক্লাস" : "৩৬টি ক্লাস";
              const mockProgress =
                course.id === 1
                  ? 65
                  : course.id === 2
                    ? 40
                    : course.id === 3
                      ? 90
                      : 15;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-[2rem] border border-neutral-100 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Course Card Thumbnail */}
                  <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={course.image}
                      alt={course.details.fullTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Enrolled Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-[#105D38] text-white font-bold text-[10px] rounded-lg shadow-md">
                      <CheckCircle size={11} />
                      <span>চলমান</span>
                    </div>
                  </div>

                  {/* Card Content Core */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#105D38] bg-[#105D38]/5 px-2.5 py-1 rounded-md inline-block">
                        {course.details.batchInfo.split(" ")[0]}
                      </span>

                      <h3 className="text-base font-black text-slate-800 line-clamp-2 group-hover:text-[#105D38] transition-colors leading-snug">
                        {course.details.fullTitle}
                      </h3>
                    </div>

                    {/* Info Row (Total Class & Timing) */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-50 text-slate-500 text-xs font-bold">
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-slate-400" />
                        <span>{totalClasses}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" />
                        <span>
                          {course.details.highlights[0]?.value || "৩ মাস"}
                        </span>
                      </div>
                    </div>

                    {/* Custom Progress Bar Block */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1">
                          <BarChart3 size={12} /> প্রোগ্রেস
                        </span>
                        <span className="text-slate-700 font-bold">
                          {mockProgress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#105D38] rounded-full transition-all duration-500"
                          style={{ width: `${mockProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Enter Course Classroom Button */}
                  <div className="p-4 bg-slate-50/50 border-t border-neutral-100 shrink-0">
                    <Link
                      href={`/my-course/${course.id}`}
                      className="w-full py-3 bg-slate-950 hover:bg-[#105D38] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <PlayCircle
                        size={15}
                        className="group-hover/btn:scale-110 transition-transform"
                      />
                      <span>ক্লাসরুমে প্রবেশ করুন</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm text-center max-w-sm mx-auto border border-neutral-100">
            <BookOpen className="text-slate-300 mb-2" size={32} />
            <h4 className="text-sm font-black text-slate-700">
              কোনো কোর্স পাওয়া যায়নি
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;
