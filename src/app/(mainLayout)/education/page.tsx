"use client";
import React, { useEffect, useState } from "react";
import CourseSection from "@/src/components/shared/EducationSectionShare";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import EducationHero from "@/src/components/EducationHero/EducationHero";
import { getAllCourses } from "@/src/lib/data";

const EducationPage = () => {
  const [data, setData] = useState<any[] | null>(null);
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

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        লোড হচ্ছে...
      </div>
    );

  const educationData = data.slice(0, 1);

  const educationData2 = data.slice(1, 3);

  const freeCoursesData = data.find((item) =>
    item.category.includes("ফ্রি কোর্স"),
  );

  const bundleCoursesData = data.find((item) =>
    item.category.includes("বান্ডেল কোর্স"),
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

  const filteredEducationData = filterBySearch(educationData);
  const filteredEducationData2 = filterBySearch(educationData2);

  const fadeInVariant = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <EducationHero searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Section 1: Academic/Featured Sections */}
      <div className="max-w-6xl mx-auto px-4 pt-4 lg:pt-7 space-y-20">
        {filteredEducationData.length > 0 ? (
          filteredEducationData.map((section, idx) => (
            <motion.div
              key={idx}
              {...fadeInVariant}
              className="relative border-2 border-neutral-100 bg-white rounded-[2rem] p-6 md:p-10 shadow-sm"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8 py-2.5 border-2 border-neutral-50 rounded-2xl shadow-sm z-20">
                <h2 className="text-[#105D38] font-black text-xs md:text-base whitespace-nowrap uppercase tracking-wider">
                  {section.category}
                </h2>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 lg:gap-8 justify-items-center mt-2">
                {section.courses.map((course: any, cIdx: number) => (
                  <Link
                    href={`/education/${course.id}`}
                    key={cIdx}
                    className="w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group cursor-pointer w-full aspect-square rounded-2xl overflow-hidden shadow-md transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-[#105D38] bg-gradient-to-br from-[#105D38] via-[#0d4d2e] to-black opacity-95" />
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                      <div className="relative h-full flex items-center justify-center p-3">
                        <p className="text-white text-[10px] md:text-[13px] font-black text-center leading-tight drop-shadow-md">
                          {course.title}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-neutral-200">
            <p className="text-neutral-400 font-bold">
              "{searchTerm}" নামে কোনো কোর্স পাওয়া যায়নি!
            </p>
          </div>
        )}
      </div>

      {/* Section: Bundle Courses (প্রিমিয়াম কোর্সের ঠিক উপরে) */}
      {bundleCoursesData && (
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <motion.div {...fadeInVariant}>
            <CourseSection
              section={{
                ...bundleCoursesData,
                courses: bundleCoursesData.courses.filter((c: any) =>
                  c.title.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Section 2: Other Course Sections (Includes Premium) */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-12 lg:pt-16 space-y-20">
        {filteredEducationData2.map((section, idx) => (
          <motion.div key={idx} {...fadeInVariant}>
            <CourseSection section={section} />
          </motion.div>
        ))}
      </div>

      {/* Section 3: Free Courses Section */}
      {freeCoursesData && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            {...fadeInVariant}
            className="relative border-2 border-neutral-100 bg-white rounded-[2rem] p-4 md:p-8 shadow-sm"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-6 py-2 border-2 border-neutral-100 rounded-xl shadow-sm z-10">
              <h2 className="text-[#105D38] font-black text-sm md:text-lg whitespace-nowrap">
                {freeCoursesData.category}
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
                        <p className="text-[#105D38] font-black text-sm md:text-lg">
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
