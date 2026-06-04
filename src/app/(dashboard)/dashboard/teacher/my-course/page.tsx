"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Info } from "lucide-react";

import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

interface ICourse {
  _id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  courseType: string;
  [key: string]: any;
}

const MyCourses = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const token = (session as any)?.accessToken;

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(
        "https://darulislam-server-v2.vercel.app/api/courses/teacher/my-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Courses could not be loaded");
      }

      const result = await response.json();

      const data = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : [];

      setCourses(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchCourses();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, token, fetchCourses]);

  const onEdit = (course: ICourse) => {
    router.push(`/dashboard/teacher/edit-course/${course._id}`);
  };

  if (status === "loading" || (loading && status === "authenticated")) {
    return (
      <div className="h-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 pb-12 px-2 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-800">
            আমার কোর্সসমূহ
          </h2>
          <p className="text-[10px] md:text-sm text-neutral-500">
            মোট {courses.length} টি কোর্স পরিচালনা করছেন
          </p>
        </div>
      </div>

      {/* Course List */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl md:rounded-3xl border border-neutral-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all flex flex-col h-full"
            >
              {/* Thumbnail */}
              <div className="relative h-32 md:h-52 overflow-hidden bg-gray-100">
                <Image
                  src={course.image || "/images/course-placeholder.jpg"}
                  alt={course.title || "Course"}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-2 left-2 md:top-4 md:left-4">
                  <span className="bg-emerald-600 text-white text-[8px] md:text-[10px] px-2 py-1 rounded font-bold uppercase">
                    {course.courseType || "Course"}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 text-white">
                  <h3 className="font-bold text-xs md:text-lg line-clamp-2">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 md:p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs md:text-base font-black text-neutral-800">
                    ৳{course.price || 0}
                  </span>

                  <span className="text-[10px] md:text-xs text-neutral-500 flex items-center gap-1">
                    <Clock size={12} />
                    {course.duration || "N/A"}
                  </span>
                </div>

                <div className="mt-auto">
                  <Link
                    href="/"
                    className="w-full py-2.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-emerald-200 transition-colors cursor-pointer"
                  >
                    <Info size={14} />
                    বিস্তারিত
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-neutral-200 rounded-[2rem] p-10 md:p-16 text-center">
          <div className="bg-neutral-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          <h3 className="text-lg md:text-xl font-bold text-neutral-800 mb-2">
            কোনো কোর্স পাওয়া যায়নি
          </h3>

          <p className="text-neutral-500 text-sm">
            এখনো কোনো কোর্স তৈরি করা হয়নি।
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
