import React from "react";
import HeroSection from "@/src/components/mainLayout/home/HeroSection";
import Course from "@/src/components/LandingPageLayout/Course/Course";
import Academic from "@/src/components/LandingPageLayout/Academic/Academic";
import AmaderTeacher from "@/src/components/LandingPageLayout/AmaderTeacher/AmaderTeacher";
import SectionHeading from "@/src/components/shared/SectionHeading";

/* ── COMPONENTS ── */

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

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const Icons = {
  BookOpen: () => (
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
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  Quran: () => (
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
    </svg>
  ),
  Pen: () => (
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
        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z"
      />
    </svg>
  ),
  GradCap: () => (
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
};

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
      <section className="bg-[#f0f7f0] px-5 py-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(7)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-green-700 inline-block"
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-3">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-sm text-gray-600 leading-6 mb-5 max-w-xs md:max-w-xl mx-auto">
            দারুল ইসলাম ইনস্টিটিউট ইসলামী শিক্ষা ও আধুনিক শিক্ষার সমন্বয় ঘটিয়ে
            নৈতিক, একাডেমিক ও মানবিক গুণাবলি বিকাশে প্রতিজ্ঞাবদ্ধ।
          </p>
          <button className="bg-green-700 hover:bg-green-800 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-full">
            আরো পড়ুন
          </button>
        </div>
      </section>

      {/* ── COURSES ── */}
      <Course />

      {/* ── ACADEMIC DEPARTMENTS ── */}

      <Academic />

      {/* ── TEACHERS ── */}
      <AmaderTeacher />

      {/* ── 1. ADMISSION INFO ── */}
      <section className="px-5 py-10 max-w-xl mx-auto text-center">
        <SectionHeading>ভর্তি তথ্য</SectionHeading>
        <div className="space-y-3.5 text-left inline-block mb-8">
          {[
            "ভর্তি হতে অনলাইন ফরম পূরণ করুন",
            "প্রয়োজনীয় কাগজপত্র জমা দিন",
            "ভর্তি পরীক্ষা (প্রয়োজ্য ক্ষেত্রে)",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckIcon />
              <span className="text-sm md:text-base text-gray-700">{text}</span>
            </div>
          ))}
        </div>
        <div>
          <PrimaryButton>এখনই আবেদন করুন</PrimaryButton>
        </div>
      </section>

      {/* ── 2. NOTICE BOARD ── */}
      <section className="bg-white px-5 py-10 max-w-4xl mx-auto rounded-2xl shadow-sm border border-gray-100 mb-10">
        <SectionHeading>নোটিশ বোর্ড</SectionHeading>
        <div className="space-y-1.5 mb-8">
          {[
            {
              title: "বার্ষিক পরীক্ষা ২০২৪ এর সময়সূচি প্রকাশ",
              date: "20 May 2024",
            },
            { title: "নতুন সেশনের ভর্তি শুরু", date: "18 May 2024" },
            { title: "ঈদুল ফিতরের ছুটি সংক্রান্ত নোটিশ", date: "15 May 2024" },
          ].map((notice, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0 px-1"
            >
              <p className="text-sm md:text-base text-gray-800 flex-1">
                {notice.title}
              </p>
              <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                {notice.date}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <PrimaryButton>সব নোটিশ দেখুন</PrimaryButton>
        </div>
      </section>

      {/* ── 3. GALLERY ── */}
      <section className="px-5 py-10 max-w-6xl mx-auto text-center">
        <SectionHeading>গ্যালারি</SectionHeading>
        {/* Mobile: 1 col, md+: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            "https://i.ibb.co/FVTN0wM/group.jpg",
            "https://i.ibb.co/ZJp5fC5/classroom.jpg",
            "https://i.ibb.co/0yH0H4s/building.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-xl overflow-hidden shadow-md border-4 border-white ring-1 ring-gray-100"
            >
              <img
                src={src}
                alt={`Gallery Image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div>
          <PrimaryButton>সব ছবি দেখুন</PrimaryButton>
        </div>
      </section>

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
    </main>
  );
}
