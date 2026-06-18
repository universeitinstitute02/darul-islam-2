"use client";

import React, { useEffect, useState } from "react";
import CourseSection from "@/src/components/shared/EducationSectionShare";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import EducationHero from "@/src/components/Education/EducationHero/EducationHero";
import EduCategories from "@/src/components/mainLayout/Educations/EduCategories";
import { getAllCourses } from "@/src/lib/data";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

const EducationPage = () => {
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllCourses();
        setData(result);
      } catch (err) {
        console.error("Error loading education data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return <LoadingSpinner fullScreen />;

  // 🔹 এপিআই রেসপন্সের অবজেক্ট থেকে কোর্স সেকশনগুলো আলাদা করা হলো
  const courseSections = data?.courseSections || [];

  const remainingSections = courseSections.filter(
    (item: any) =>
      !(item.categoryName && item.categoryName.includes("ফ্রি কোর্স")),
  );

  const freeCoursesData = courseSections.find(
    (item: any) =>
      item.categoryName && item.categoryName.includes("ফ্রি কোর্স"),
  );

  const filterBySearch = (sections: any[]) => {
    if (!sections) return [];
    return sections
      .map((section) => ({
        ...section,
        courses: section.courses.filter((course: any) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      }))
      .filter((section) => section.courses.length > 0);
  };

  const filteredEducationData2 = filterBySearch(remainingSections);

  const fadeInVariant = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <EducationHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <EduCategories />

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-12 lg:pt-16 space-y-20">
        {filteredEducationData2.map((section, idx) => (
          <motion.div key={idx} {...fadeInVariant}>
            <CourseSection section={section} />
          </motion.div>
        ))}
      </div>

      {freeCoursesData && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            {...fadeInVariant}
            className="relative border-2 border-neutral-100 bg-white rounded-[2rem] p-4 md:p-8 shadow-sm"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-6 py-2 border-2 border-neutral-100 rounded-xl shadow-sm z-10">
              <h2 className="text-[#0B5D3B] font-black text-sm md:text-lg whitespace-nowrap">
                {freeCoursesData.categoryName}
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
              {freeCoursesData.courses
                ?.filter((c: any) =>
                  c.title.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((course: any) => (
                  <Link href={`/education/${course.id}`} key={course.id}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="bg-[#F8F9FA] border border-neutral-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
                    >
                      <div className="relative aspect-video w-full bg-neutral-200">
                        {course.image ? (
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-neutral-500 italic px-2 text-center">
                            {course.title} (No Image)
                          </div>
                        )}
                      </div>

                      <div className="p-3 md:p-4 text-center">
                        <h3 className="text-[11px] md:text-[13px] font-bold text-neutral-600 line-clamp-1 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-[#0B5D3B] font-black text-sm md:text-lg">
                          {course.label || "ফ্রি"}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default EducationPage;