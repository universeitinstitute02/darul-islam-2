"use client";
import React, { useEffect, useState, useCallback } from "react";
import { BookOpen, Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";
import CourseCard from "@/src/components/shared/CourseCard";
import EditCourseModal from "@/src/components/shared/EditCourseModal";

interface ICourse {
  _id: string;
  [key: string]: any;
}

const MyCourses = () => {
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      if (!response.ok) throw new Error("Courses could not be loaded");

      const result = await response.json();

      const data = Array.isArray(result) ? result : result.data || [];
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

  const handleDelete = async (courseId: string) => {
    const result = await Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "একবার ডিলিট করলে এটি আর ফিরে পাবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#105D38",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      cancelButtonText: "বাতিল",
    });

    if (result.isConfirmed && token) {
      try {
        const response = await fetch(
          `https://darulislam-server-v2.vercel.app/api/courses/teacher/delete-course/${courseId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.ok) {
          setCourses((prev) => prev.filter((c) => c._id !== courseId));
          Swal.fire(
            "ডিলিট হয়েছে!",
            "কোর্সটি সফলভাবে মুছে ফেলা হয়েছে।",
            "success",
          );
        } else {
          const err = await response.json();
          Swal.fire(
            "ব্যর্থ!",
            err.message || "ডিলিট করা সম্ভব হয়নি।",
            "error",
          );
        }
      } catch (error) {
        Swal.fire("এরর!", "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।", "error");
      }
    }
  };

  if (status === "loading" || (loading && status === "authenticated")) {
    return (
      <div className="h-64 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-emerald-600 w-10 h-10" />
        <p className="text-gray-500 font-medium font-sans">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 pb-12 px-2 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-800">
            আমার কোর্সসমূহ
          </h2>
          <p className="text-[10px] md:text-sm text-neutral-500">
            মোট {courses.length} টি কোর্স পরিচালনা করছেন
          </p>
        </div>
        <Link href="/dashboard/teacher/add-course">
          <button className="bg-[#105D38] hover:bg-[#0c4a2d] text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg transition-all">
            <Plus size={18} /> নতুন কোর্স
          </button>
        </Link>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
          {courses.map((course, idx) => (
            <CourseCard
              key={course._id} // এখন এটি আর এরর দেবে না
              course={course}
              idx={idx}
              onEdit={(c) => {
                setSelectedCourse(c);
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-neutral-100 rounded-[2.5rem] p-10 md:p-16 text-center">
          <div className="bg-neutral-50 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-200">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-neutral-800">
            কোনো কোর্স পাওয়া যায়নি
          </h3>
        </div>
      )}

      {selectedCourse && (
        <EditCourseModal
          isOpen={isModalOpen}
          course={selectedCourse}
          token={token}
          onClose={() => setIsModalOpen(false)}
          onUpdate={fetchCourses}
        />
      )}
    </div>
  );
};

export default MyCourses;
