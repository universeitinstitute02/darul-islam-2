"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { courses } from "@/src/lib/data";

export default function CourseDetails() {
  const params = useParams();

  // ⚠️ important fix
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="p-10 text-center">
        <p>কোর্স পাওয়া যায়নি</p>
        <Link href="/">
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
            ফিরে যান
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <img src={course.image} className="w-full h-72 object-cover" />

        <div className="p-8 space-y-4">
          <h1 className="text-3xl font-black text-green-800">{course.title}</h1>

          <p className="text-gray-600">{course.description}</p>

          <div className="flex gap-4 text-sm text-gray-500">
            <span>সময়: {course.duration}</span>
            <span>শিক্ষার্থী: {course.studentsCount}</span>
          </div>

          <p className="text-xl font-bold text-green-700">{course.price}</p>

          <Link href="/education">
            <button className="mt-4 px-6 py-3 bg-green-700 text-white rounded-xl cursor-pointer">
              ← ফিরে যান
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
