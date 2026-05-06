import React from "react";
import HeroSection from "@/src/components/mainLayout/home/HeroSection";
import Course from "@/src/components/LandingPageLayout/Course/Course";
import Academic from "@/src/components/LandingPageLayout/Academic/Academic";
import AmaderTeacher from "@/src/components/LandingPageLayout/AmaderTeacher/AmaderTeacher";
import AboutHome from "@/src/components/mainLayout/home/AboutHome";
import SectionHeading from "@/src/components/shared/SectionHeading";
import StudentSlider from "@/src/components/LandingPageLayout/BestStudents/BestStudents";
import DonationSection from "@/src/components/LandingPageLayout/DonationSection/DonationSection";
import ContactSection from "@/src/components/LandingPageLayout/ContactSection/ContactSection";
import AdmissionInfo from "@/src/components/LandingPageLayout/AddmissionDoc/AddmissionInfo";
import NoticeBoard from "@/src/components/LandingPageLayout/Notice/Notice";
import GallerySection from "@/src/components/LandingPageLayout/GallerySection/GallerySection";

/* ── ICONS ── */
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-green-600"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);
const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-green-700 hover:bg-green-800 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md">
    {children}
  </button>
);
const Features = {
  Teacher: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-green-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  Mosque: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-green-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  Graduation: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-green-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l6.16-3.422A12.083 12.083 0 0112 21a12.083 12.083 0 01-6.16-3.422L12 14z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 9v5" />
    </svg>
  ),
  Online: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 text-green-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};
const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-300"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

/* ── MAIN PAGE ── */
export default function Home() {
  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      {/* Hero Section with Slides */}
      <HeroSection />

      {/* ── ABOUT SECTION ── */}
      <AboutHome />

      {/* ── COURSES ── */}
      <Course />

      {/* ── ACADEMIC DEPARTMENTS ── */}

      <Academic />

      {/* ── TEACHERS ── */}
      <AmaderTeacher />

      {/* ── STUDENTS ── */}
      <StudentSlider />

      {/* ── 1. ADMISSION INFO ── */}
      <AdmissionInfo />
      {/* ── 2. NOTICE BOARD ── */}
      <NoticeBoard />

      {/* ── 3. GALLERY ── */}
      <GallerySection />

      {/* ── 4. WHY CHOOSE US ── */}
      <section className="bg-white px-5 py-12 max-w-6xl mx-auto mb-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            কেন আমাদের বেছে নিবেন?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
            দারুল ইসলাম ইনস্টিটিউট নৈতিক ও আধুনিক শিক্ষার এক অনন্য সমন্বয়।
          </p>
        </div>
        {/* Mobile: 2 cols, md+: 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Features.Teacher />, title: "অভিজ্ঞ শিক্ষক" },
            { icon: <Features.Mosque />, title: "ইসলামিক পরিবেশ" },
            { icon: <Features.Graduation />, title: "মানসম্মত শিক্ষা" },
            { icon: <Features.Online />, title: "অনলাইন সুবিধা" },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 bg-[#f8faf8] p-5 rounded-2xl border border-green-50 shadow-inner"
            >
              <div className="p-3 bg-white rounded-full shadow-md border border-gray-50">
                {feature.icon}
              </div>
              <p className="text-sm md:text-base font-semibold text-green-900 leading-tight">
                {feature.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TESTIMONIALS ── */}
      <section className="px-5 py-12 max-w-6xl mx-auto">
        <SectionHeading>অভিভাবক ও শিক্ষার্থীদের মতামত</SectionHeading>
        {/* Mobile: 1 col, md+: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              quote:
                "দারুল ইসলাম ইনস্টিটিউট আমার সন্তানের জন্য সেরা প্রতিষ্ঠান।",
              name: "মোঃ রফিকুল ইসলাম",
              role: "অভিভাবক",
            },
            {
              quote: "এখানে পড়ে আমার দ্বীন ও সাধারণ জ্ঞান অনেক উন্নত হয়েছে।",
              name: "আরিফ বিন সাদ",
              role: "শিক্ষার্থী",
            },
            {
              quote: "শিক্ষকরা খুব যত্নশীল এবং সহযোগী।",
              name: "সাদিয়া আক্তার",
              role: "অভিভাবক",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="absolute -top-3 -left-3 opacity-30 group-hover:opacity-100 transition-opacity">
                <QuoteIcon />
              </div>
              <div className="flex-1 text-gray-700 leading-relaxed pt-2">
                <span className="text-6xl text-green-500 font-serif leading-none float-left mr-1 mt-[-10px]">
                  “
                </span>
                {testimonial.quote}
              </div>
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <p className="text-sm font-bold text-gray-900">
                  -{testimonial.name}
                </p>
                <p className="text-xs text-green-700">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Donation section */}
      <DonationSection />

      {/* Contact and Map section */}
      <ContactSection />
    </main>
  );
}
