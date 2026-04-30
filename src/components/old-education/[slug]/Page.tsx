"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
export const courses = [
  {
    title: "হিফযুল কুরআন",
    slug: "hifzul-quran",
    category: "কুরআন",
    level: "Beginner",
    duration: "২ বছর",
    studentsCount: 120,
    description: "তাজবীদ সহ সম্পূর্ণ কুরআন মুখস্থ করার কোর্স",
    price: "ফ্রি",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800",
  },
  {
    title: "আলিম কোর্স",
    slug: "alim-course",
    category: "হাদিস",
    level: "Advanced",
    duration: "৬ বছর",
    studentsCount: 200,
    description: "হাদিস, ফিকহ, তাফসির ও আরবি ভাষার পূর্ণাঙ্গ কোর্স",
    price: "৫০০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800",
  },
  {
    title: "আরবি ভাষা কোর্স",
    slug: "arabic-language",
    category: "আরবি",
    level: "Intermediate",
    duration: "১ বছর",
    studentsCount: 90,
    description: "গ্রামার ও স্পোকেন আরবি শেখানো হয়",
    price: "৩০০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
  },
  {
    title: "ফিকহুল ইবাদাত",
    slug: "fiqh-course",
    category: "ফিকহ",
    level: "Beginner",
    duration: "১ বছর",
    studentsCount: 70,
    description: "তাহারাহ, সালাত, সিয়ামসহ ফিকহ শিক্ষা",
    price: "২৫০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
  },
  {
    title: "তাফসিরুল কুরআন",
    slug: "tafsir-course",
    category: "তাফসির",
    level: "Advanced",
    duration: "২ বছর",
    studentsCount: 60,
    description: "কুরআনের গভীর ব্যাখ্যা ও বিশ্লেষণ",
    price: "৪০০৳/মাস",
    image:
      "https://images.unsplash.com/photo-1591608516485-aeecb8f0c7f6?q=80&w=800",
  },
];

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
