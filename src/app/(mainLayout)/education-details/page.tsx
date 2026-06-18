"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Calendar, FileText, CheckCircle2 } from "lucide-react";
import CourseTabsDashboard from "@/src/components/Education/EducationDetails/page";
import TestimonialsSection from "@/src/components/Education/EducationTestimonial/EducationalTestimonial";
import Image from "next/image";
import Swal from "sweetalert2";
import useUserRole from "@/src/app/hooks/useUserRole"; // 🔹 ইউজার রোল ট্র্যাক করার হুক যুক্ত করা হয়েছে

function CourseDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, user } = useUserRole(); // 🔹 রোল ডিক্লেয়ারেশন

  const [courseId, setCourseId] = useState<string>(" ");
  const [courseTitle, setCourseTitle] = useState("একাডেমিক কোর্স");
  const [courseDetails, setCourseDetails] = useState<any>({
    subtitle: "কোর্স সম্পর্কে",
    description: "কোনো বিবরণ প্রদান করা হয়নি।",
    bannerImage:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
    regularPrice: 0,
    discountPrice: 0,
    monthlyFee: null,
    discountPercentage: 0,
    batchStartDate: "শীঘ্রই শুরু হবে",
    couponCode: "N/A",
    highlights: [],
  });

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        if (parsedData) {
          setCourseId(parsedData.id || parsedData._id || "");
          setCourseTitle(parsedData.title || "একাডেমিক কোর্স");

          const detailsObj = parsedData.details || {};

          setCourseDetails({
            title: parsedData.title || "একাডেমিক কোর্স",
            subtitle: "কোর্স সম্পর্কে",
            description:
              detailsObj.description || "এই কোর্সের কোনো বিবরণ পাওয়া যায়নি।",
            bannerImage:
              parsedData.image ||
              "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200&auto=format&fit=crop",
            regularPrice: detailsObj.oldAdmissionFee || 0,
            discountPrice: detailsObj.admissionFee || 0,
            monthlyFee: detailsObj.monthlyFee || null,
            discount: detailsObj.discount || 0,
            couponCode: detailsObj.coupon || "N/A",
            batchStartDate:
              detailsObj.batchInfo || "নতুন ব্যাচ শীঘ্রই শুরু হবে",
            classSchedule: detailsObj.batchInfo || "",
            highlights: detailsObj.highlights || [],
          });
        }
      } catch (error) {
        console.error("Error parsing section data:", error);
      }
    }
  }, [searchParams]);

  // 🔹 সিনিয়র হাইব্রিড ফ্লো প্রটেক্টেড রিডাইরেকশন হ্যান্ডলার
  const handleEnrollRedirect = () => {
    if (!courseId) return;

    // ১. ইউজার যদি লগইন না করে থাকে
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "লগইন আবশ্যক",
        text: "কোর্সে বুকিং বা ভর্তি হতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।",
        confirmButtonColor: "#0B5D3B",
      });
    }

    // ২. রোল যদি স্টুডেন্ট না হয়ে অন্য কিছু (Admin / Teacher) হয়
    if (role && role.toLowerCase() !== "student") {
      return Swal.fire({
        icon: "error",
        title: "অ্যাক্সেস অস্বীকৃত",
        text: "দুঃখিত, ওস্তাদ বা অ্যাডমিন প্যানেল অ্যাকাউন্ট থেকে কোর্সে ভর্তি হওয়া সম্ভব নয়। অনুগ্রহ করে একটি শিক্ষার্থী (Student) অ্যাকাউন্ট ব্যবহার করুন।",
        confirmButtonColor: "#d33",
      });
    }

    // ৩. কন্ডিশন পাস হলে সফল রিডাইরেক্ট
    router.push(`/education/enroll/${courseId}`);
  };

  return (
    <>
      <div className="bg-white min-h-screen pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6 lg:px-8 antialiased text-slate-800">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all mb-6 md:mb-8 border border-emerald-100/50 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            পূর্বের পেজে ফিরুন
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-amber-500 font-bold text-sm block mb-1">
                  {courseDetails.subtitle}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-[#0f2942] tracking-tight leading-tight mb-4">
                  {courseTitle}
                </h1>
              </div>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed text-justify">
                {courseDetails.description}
              </p>

              <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 md:h-72 shadow-xs bg-gradient-to-r from-emerald-900 to-teal-950 group">
                <Image
                  src={courseDetails.bannerImage}
                  alt={courseTitle}
                  fill
                  sizes="(max-w-7xl) 100vw, 1200px"
                  priority={true}
                  className="object-cover opacity-25 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>

                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-xs">
                  একাডেমিক
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
                    {courseTitle}
                  </h2>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold px-6 py-3 rounded-xl transition-all shadow-xs cursor-pointer text-sm">
                <FileText className="w-4 h-4" />
                পূর্ণাঙ্গ সিলেবাস ও কারিকুলাম দেখুন
              </button>
            </div>

            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <div className="bg-[#fffcf4] border border-[#f7e9cc] rounded-2xl p-6 shadow-xs relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-700 text-base font-bold">
                      ভর্তি ফি:
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-[#0f2942]">
                      ৳{courseDetails.discountPrice}
                    </span>
                    {courseDetails.regularPrice >
                      courseDetails.discountPrice && (
                      <span className="text-slate-400 line-through text-sm font-medium">
                        ৳{courseDetails.regularPrice}
                      </span>
                    )}
                  </div>

                  {courseDetails.discount > 0 && (
                    <span className="bg-[#0f2942] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {courseDetails.discount}% ছাড়!
                    </span>
                  )}
                </div>

                {courseDetails.monthlyFee ? (
                  <div className="text-sm font-bold text-slate-700 mb-4">
                    <span>মাসিক ফি: ৳{courseDetails.monthlyFee}</span>
                  </div>
                ) : null}

                {courseDetails.couponCode &&
                  courseDetails.couponCode !== "N/A" && (
                    <div className="border border-dashed border-slate-300 rounded-xl p-2 mb-6 flex justify-between items-center bg-white">
                      <span className="text-xs text-slate-500 font-medium pl-2">
                        কুপন কোড:{" "}
                        <span className="font-mono bg-amber-50 px-1.5 py-0.5 rounded text-amber-700 font-bold">
                          {courseDetails.couponCode}
                        </span>
                      </span>
                    </div>
                  )}

                <div className="space-y-3 mb-6">
                  {/* 🔹 প্রটেক্টেড বুকিং বাটন */}
                  <button
                    onClick={handleEnrollRedirect}
                    disabled={!courseId}
                    className="w-full bg-[#cca03a] hover:bg-[#b88f32] text-white font-bold text-base py-3 rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer text-center disabled:opacity-50"
                  >
                    যোগাযোগ ও বুকিং ফরম
                  </button>
                </div>

                <div className="pt-2 mb-6 flex flex-col gap-3">
                  <div className="text-xs font-bold text-slate-700">
                    ক্লাস সময়সূচী ও তথ্য:
                    <span className="text-slate-900 block mt-1 font-black">
                      {courseDetails.batchStartDate}
                    </span>
                  </div>
                </div>

                {courseDetails.highlights &&
                  courseDetails.highlights.length > 0 && (
                    <div className="border-t border-slate-200 pt-4">
                      <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-1.5">
                        কোর্স হাইলাইটস
                      </h3>
                      <ul className="space-y-2">
                        {courseDetails.highlights.map(
                          (highlight: any, idx: number) => (
                            <li
                              key={highlight._id || idx}
                              className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-medium"
                            >
                              <span className="text-amber-500 mt-0.5">★</span>
                              <span>
                                {highlight.label}: {highlight.value}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseTabsDashboard courseData={courseDetails} />
    </>
  );
}

export default function CourseDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-24 font-bold text-slate-600">
          লোড হচ্ছে...
        </div>
      }
    >
      <CourseDetailsContent />
      <TestimonialsSection />
    </Suspense>
  );
}