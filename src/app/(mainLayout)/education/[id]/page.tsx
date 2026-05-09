"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Star, Tag, Copy, Check } from "lucide-react";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // সরাসরি আপনার লোকাল JSON ফাইল থেকে ডাটা ফেচ করা হচ্ছে
    fetch("/education.json")
      .then((res) => res.json())
      .then((data) => {
        let foundCourse = null;

        // ১. freeCoursesData এর ভেতরে খোঁজা
        foundCourse = data.freeCoursesData.courses.find(
          (c: any) => String(c.id) === id,
        );
        if (foundCourse) foundCourse.category = data.freeCoursesData.category;

        // ২. educationData এর ভেতরে খোঁজা
        if (!foundCourse) {
          data.educationData.forEach((section: any) => {
            const match = section.courses.find((c: any) => String(c.id) === id);
            if (match) foundCourse = { ...match, category: section.category };
          });
        }

        // ৩. educationData2 এর ভেতরে খোঁজা
        if (!foundCourse) {
          data.educationData2.forEach((section: any) => {
            const match = section.courses.find((c: any) => String(c.id) === id);
            if (match) foundCourse = { ...match, category: section.category };
          });
        }

        setCourse(foundCourse);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        লোড হচ্ছে...
      </div>
    );

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-red-500">কোর্সটি পাওয়া যায়নি!</h2>
        <Link
          href="/education"
          className="text-[#105D38] border-b border-[#105D38] flex items-center gap-2"
        >
          <ArrowLeft size={18} /> কোর্সে ফিরে যান
        </Link>
      </div>
    );
  }

  const { details, image, category, title, price } = course;

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20">
      {/* টপ নেভিগেশন */}
      <div className="bg-white border-b sticky top-0 z-30 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs font-bold">
          <Link
            href="/education"
            className="text-neutral-500 hover:text-[#105D38]"
          >
            এডুকেশন
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-[#105D38] line-clamp-1">
            {details?.fullTitle || title}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* কন্টেন্ট এরিয়া */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="bg-[#105D38]/10 text-[#105D38] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                {category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-neutral-800 leading-tight">
                {details?.fullTitle || title}
              </h1>
              <p className="text-neutral-600 text-lg leading-relaxed">
                {details?.description ||
                  "কোর্সটি সম্পর্কে বিস্তারিত শীঘ্রই আসছে..."}
              </p>
            </div>

            {image && (
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          {/* সাইডবার (পেমেন্ট কার্ড) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-xl space-y-6">
              <div>
                <p className="text-sm font-bold text-neutral-400 mb-1">
                  কোর্স ফি
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-[#105D38]">
                    {details?.admissionFee === 0 || !price
                      ? "ফ্রি!"
                      : `৳${details?.admissionFee || price}`}
                  </span>
                  {details?.oldAdmissionFee > 0 && (
                    <span className="text-neutral-300 line-through text-lg">
                      ৳{details.oldAdmissionFee}
                    </span>
                  )}
                </div>
              </div>

              <button className="w-full bg-[#105D38] text-white font-black py-5 rounded-2xl hover:bg-[#0d4d2e] transition-all shadow-lg shadow-[#105D38]/20 text-lg">
                এখনই ভর্তি হবো
              </button>

              {details?.highlights && (
                <div className="pt-6 border-t border-dashed">
                  <p className="text-sm font-black text-neutral-800 mb-4 uppercase tracking-widest">
                    কি কি থাকছে
                  </p>
                  <ul className="space-y-4">
                    {details.highlights.map((h: any, i: number) => (
                      <li key={i} className="flex gap-3 text-sm items-start">
                        <div className="bg-amber-100 p-1 rounded-md">
                          <Star
                            size={14}
                            className="text-amber-600 fill-amber-600"
                          />
                        </div>
                        <span className="font-medium text-neutral-600 leading-snug">
                          <strong className="text-neutral-900">
                            {h.label}:
                          </strong>{" "}
                          {h.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
