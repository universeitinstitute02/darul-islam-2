import React from "react";
import HeroSection from "@/src/components/mainLayout/home/HeroSection";
import { Quote, User, GraduationCap, School, Book, PenTool, CheckCircle2 } from "lucide-react";

/* ── UI COMPONENTS ── */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center">
    <h2 className="text-2xl md:text-4xl font-bold text-green-800 inline-block relative">
      {children}
      <span className="block h-1 bg-green-700 mt-2 mx-auto w-1/2 rounded-full shadow-sm" />
    </h2>
  </div>
);

const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-green-700 hover:bg-green-800 transition-all active:scale-95 text-white text-sm md:text-base font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-green-200">
    {children}
  </button>
);

/* ── ICONS ── */

const Features = {
  Teacher: () => (
    <User className="h-10 w-10" />
  ),
  Mosque: () => (
    <School className="h-10 w-10" />
  ),
  Graduation: () => (
    <GraduationCap className="h-10 w-10" />
  ),
  Online: () => (
    <PenTool className="h-10 w-10" />
  ),
};

const QuoteIcon = () => (
  <Quote className="h-8 w-8 text-green-200" />
);

const Icons = {
  BookOpen: () => (
    <Book className="h-10 w-10 text-green-700" />
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
    <PenTool className="h-10 w-10 text-green-700" />
  ),
  GradCap: () => (
    <GraduationCap className="h-10 w-10 text-green-700" />
  ),
};

/* ── MAIN PAGE ── */

export default function Home() {
  return (
    <main
      className="min-h-screen bg-[#fafafb] pb-16"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      {/* Hero Section with Slides */}
      <HeroSection />

      {/* ── ABOUT SECTION ── */}
      <section className="bg-gradient-to-b from-[#f0f7f0] to-white px-5 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-green-900 mb-6">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
            দারুল ইসলাম ইনস্টিটিউট ইসলামী শিক্ষা ও আধুনিক শিক্ষার এক অনন্য সমন্বয়। আমরা বিশ্বাস করি একনিষ্ঠ দ্বীনি শিক্ষা ও আধুনিক জ্ঞানই পারে একটি উন্নত জাতি গঠন করতে। নৈতিকতা, একাডেমিক শ্রেষ্ঠত্ব ও মানবিক গুণাবলি বিকাশে আমরা বদ্ধপরিকর।
          </p>
          <button className="bg-green-700 hover:bg-green-800 transition-all active:scale-95 text-white text-lg font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-green-200">
            বিস্তারিত জানুন
          </button>
        </div>
      </section>

      {/* ── ACADEMIC DEPARTMENTS ── */}
      <section className="px-5 py-20 max-w-7xl mx-auto">
        <SectionHeading>একাডেমিক বিভাগ</SectionHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-16">
          {[
            {
              icon: <Icons.BookOpen />,
              title: "নূরানী বিভাগ",
              sub: "সহজ ও শুদ্ধ কুরআন শিক্ষা",
              color: "bg-blue-50 border-blue-100"
            },
            {
              icon: <Icons.Quran />,
              title: "হিফজ বিভাগ",
              sub: "তাজবীদসহ হিফজুল কুরআন",
              color: "bg-green-50 border-green-100"
            },
            { 
              icon: <Icons.Pen />, 
              title: "কিতাব বিভাগ", 
              sub: "মৌলিক ও উচ্চতর দ্বীনি শিক্ষা",
              color: "bg-amber-50 border-amber-100"
            },
            {
              icon: <Icons.GradCap />,
              title: "সাধারণ শিক্ষা",
              sub: "আধুনিক ও মানসম্মত স্কুলিং",
              color: "bg-purple-50 border-purple-100"
            },
          ].map((d, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group"
            >
              <div className={`flex items-center justify-center w-24 h-24 rounded-2xl border-2 ${d.color} group-hover:scale-110 transition-transform`}>
                {d.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-800">
                {d.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium leading-tight">{d.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEACHERS ── */}
      <section className="bg-white px-5 py-20 border-y border-gray-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>আমাদের অভিজ্ঞ শিক্ষকবৃন্দ</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {[
              { name: "মুফতি আব্দুল্লাহ", role: "হাদিস বিশেষজ্ঞ", image: "https://i.ibb.co/FVTN0wM/group.jpg" },
              { name: "মাওলানা ইমরান", role: "কুরআন বিশেষজ্ঞ", image: "https://i.ibb.co/ZJp5fC5/classroom.jpg" },
              { name: "মুফতি সাইফুল ইসলাম", role: "আরবি ভাষা বিশেষজ্ঞ", image: "https://i.ibb.co/0yH0H4s/building.jpg" },
            ].map((t, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 bg-[#f8faf8] p-8 rounded-[40px] border border-green-50 shadow-inner group"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-8 border-white overflow-hidden shadow-xl group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-green-700">
                    <User size={64} />
                  </div>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {t.name}
                  </h4>
                  <p className="text-green-700 font-bold uppercase tracking-wider text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <PrimaryButton>সকল শিক্ষক দেখুন</PrimaryButton>
          </div>
        </div>
      </section>

      {/* ── ADMISSION INFO ── */}
      <section className="px-5 py-24 max-w-5xl mx-auto text-center">
        <div className="bg-green-900 rounded-[50px] p-10 md:p-20 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
          
          <h2 className="text-3xl md:text-5xl font-black mb-6">ভর্তি তথ্য ২০২৬</h2>
          <p className="text-green-100 text-lg mb-12 opacity-90">সহজ ৩টি ধাপে আপনার ভর্তি প্রক্রিয়া সম্পন্ন করুন</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative z-10">
            {[
              { t: "ফরম পূরণ", d: "অনলাইনে ফরম পূরণ করুন" },
              { t: "কাগজপত্র", d: "প্রয়োজনীয় নথি জমা দিন" },
              { t: "ভর্তি নিশ্চিত", d: "সাক্ষাৎকার ও ফি প্রদান" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white text-green-900 rounded-2xl flex items-center justify-center font-black text-2xl mb-4 shadow-lg">
                  {i+1}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.t}</h3>
                <p className="text-sm text-green-200">{item.d}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <button className="bg-white text-green-900 hover:bg-green-50 transition-all font-black px-10 py-4 rounded-2xl shadow-xl">
              এখনই আবেদন করুন
            </button>
            <button className="border-2 border-white/30 hover:bg-white/10 transition-all text-white font-bold px-10 py-4 rounded-2xl">
              ভর্তি গাইডলাইন
            </button>
          </div>
        </div>
      </section>

      {/* ── NOTICE BOARD ── */}
      <section className="px-5 py-20 max-w-5xl mx-auto">
        <SectionHeading>নোটিশ বোর্ড</SectionHeading>
        <div className="mt-12 bg-white rounded-[32px] overflow-hidden shadow-xl border border-gray-100">
          <div className="bg-green-800 px-8 py-4 flex items-center justify-between">
            <span className="text-white font-bold">সর্বশেষ আপডেট</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/30" />)}
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              {
                title: "বার্ষিক পরীক্ষা ২০২৪ এর সময়সূচি প্রকাশ",
                date: "20 May 2024",
                tag: "জরুরী"
              },
              { title: "নতুন সেশনের ভর্তি শুরু", date: "18 May 2024", tag: "নতুন" },
              { title: "ঈদুল ফিতরের ছুটি সংক্রান্ত নোটিশ", date: "15 May 2024", tag: "নোটিশ" },
            ].map((notice, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 p-6 md:p-8 hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                   <div className="hidden md:flex w-12 h-12 bg-green-50 text-green-700 rounded-xl items-center justify-center group-hover:bg-green-700 group-hover:text-white transition-colors">
                     <Book size={20} />
                   </div>
                   <div>
                    <p className="text-lg font-bold text-gray-800 mb-1">
                      {notice.title}
                    </p>
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase">{notice.tag}</span>
                   </div>
                </div>
                <p className="text-sm text-gray-400 font-bold whitespace-nowrap">
                  {notice.date}
                </p>
              </div>
            ))}
          </div>
          <div className="p-8 bg-gray-50/50 text-center">
            <button className="text-green-700 font-black hover:underline flex items-center justify-center gap-2 mx-auto">
              সকল নোটিশ দেখুন <PenTool size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="px-5 py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading>ফটো গ্যালারি</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-12">
            {[
              "https://i.ibb.co/FVTN0wM/group.jpg",
              "https://i.ibb.co/ZJp5fC5/classroom.jpg",
              "https://i.ibb.co/0yH0H4s/building.jpg",
              "https://i.ibb.co/FVTN0wM/group.jpg",
              "https://i.ibb.co/ZJp5fC5/classroom.jpg",
              "https://i.ibb.co/0yH0H4s/building.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-900 scale-0 group-hover:scale-100 transition-transform">
                    <CheckCircle2 />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PrimaryButton>গ্যালারি দেখুন</PrimaryButton>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-green-50 px-5 py-24 rounded-[60px] mx-5 my-10 border border-green-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            কেন আমাদের বেছে নিবেন?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
            দারুল ইসলাম ইনস্টিটিউট নৈতিক ও আধুনিক শিক্ষার এক অনন্য সমন্বয় যা শিক্ষার্থীদের আদর্শ মানুষ হিসেবে গড়ে তোলে।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Features.Teacher />, title: "অভিজ্ঞ শিক্ষক", d: "দেশসেরা ওলামা ও অভিজ্ঞ শিক্ষকমণ্ডলী" },
              { icon: <Features.Mosque />, title: "ইসলামিক পরিবেশ", d: "সুন্নাহ ভিত্তিক আদর্শ জীবনচর্চা" },
              { icon: <Features.Graduation />, title: "মানসম্মত শিক্ষা", d: "আধুনিক ও দ্বীনি শিক্ষার সমন্বয়" },
              { icon: <Features.Online />, title: "অনলাইন সুবিধা", d: "ডিজিটাল লার্নিং ও প্রগ্রেস মনিটরিং" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-5 bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-20 h-20 bg-green-900 text-white rounded-3xl flex items-center justify-center shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-5 py-24 max-w-7xl mx-auto">
        <SectionHeading>অভিভাবক ও শিক্ষার্থীদের মতামত</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              quote:
                "দারুল ইসলাম ইনস্টিটিউট আমার সন্তানের জন্য সেরা প্রতিষ্ঠান। এখানকার পড়াশোনার মান এবং পরিবেশ অত্যন্ত চমৎকার।",
              name: "মোঃ রফিকুল ইসলাম",
              role: "অভিভাবক",
            },
            {
              quote: "এখানে পড়ে আমার দ্বীন ও সাধারণ জ্ঞান অনেক উন্নত হয়েছে। আমি নিজেকে একজন ভালো মানুষ হিসেবে গড়ে তোলার সাহস পেয়েছি।",
              name: "আরিফ বিন সাদ",
              role: "শিক্ষার্থী",
            },
            {
              quote: "শিক্ষকরা খুব যত্নশীল এবং সহযোগী। তারা প্রতিটি শিক্ষার্থীর ব্যক্তিগত উন্নতির দিকে খেয়াল রাখেন।",
              name: "সাদিয়া আক্তার",
              role: "অভিভাবক",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[48px] shadow-xl border border-gray-50 flex flex-col gap-8 relative group hover:border-green-200 transition-all"
            >
              <div className="absolute top-8 right-10 opacity-10 group-hover:opacity-30 transition-opacity">
                <QuoteIcon />
              </div>
              <div className="flex-1 text-lg text-gray-700 leading-relaxed pt-4 italic">
                {testimonial.quote}
              </div>
              <div className="border-t border-gray-100 pt-8 mt-auto flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-green-900 text-white flex items-center justify-center font-black text-xl shadow-lg">
                  {testimonial.name[0]}
                </div>
                <div>
                  <h5 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm text-green-700 font-bold uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
