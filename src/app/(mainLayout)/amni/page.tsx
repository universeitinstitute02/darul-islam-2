import React from 'react';

/* ── UI COMPONENTS ── */

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center mb-6">
    <h2 className="text-xl md:text-3xl font-bold text-green-800 inline-block relative">
      {children}
      <span className="block h-0.5 bg-green-700 mt-1 mx-auto w-3/4 rounded-full" />
    </h2>
  </div>
);

const PrimaryButton = ({ children }: { children: React.ReactNode }) => (
  <button className="bg-green-700 hover:bg-green-800 transition-all active:scale-95 text-white text-sm md:text-base font-semibold px-6 md:px-10 py-2.5 md:py-3 rounded-full shadow-md">
    {children}
  </button>
);

/* ── ICONS ── */

const Icons = {
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Dept: {
    Book: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    Quran: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} /></svg>,
    Pen: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z" /></svg>,
    Grad: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21a12.083 12.083 0 01-6.16-3.422L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 9v5" /></svg>
  }
};

/* ── DATA ── */

const departments = [
  { icon: <Icons.Dept.Book />, title: "নূরানী বিভাগ", sub: "নূরানী শিক্ষা" },
  { icon: <Icons.Dept.Quran />, title: "হিফজ বিভাগ", sub: "বিভাগীয় কুরআন" },
  { icon: <Icons.Dept.Pen />, title: "কিতাব বিভাগ", sub: "দীনি শিক্ষা" },
  { icon: <Icons.Dept.Grad />, title: "সাধারণ শিক্ষা", sub: "আধুনিক শিক্ষা" },
];

const notices = [
  { title: "বার্ষিক পরীক্ষা ২০২৪ এর সময়সূচি প্রকাশ", date: "20 May 2024" },
  { title: "নতুন সেশনের ভর্তি শুরু", date: "18 May 2024" },
  { title: "ঈদুল ফিতরের ছুটি সংক্রান্ত নোটিশ", date: "15 May 2024" },
];

/* ── MAIN PAGE ── */

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pb-10" style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>

      {/* 1. ABOUT SECTION */}
      <section className="bg-[#f0f7f0] px-5 py-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(7)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-green-700" />)}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-green-800 mb-3">আমাদের সম্পর্কে</h2>
          <p className="text-sm md:text-lg text-gray-600 leading-6 mb-6 max-w-xs md:max-w-xl mx-auto">
            দারুল ইসলাম ইনস্টিটিউট ইসলামী শিক্ষা ও আধুনিক শিক্ষার সমন্বয় ঘটিয়ে নৈতিক, একাডেমিক ও মানবিক গুণাবলি বিকাশে প্রতিজ্ঞাবদ্ধ।
          </p>
          <PrimaryButton>আরো পড়ুন</PrimaryButton>
        </div>
      </section>

      {/* 2. ACADEMIC DEPARTMENTS (Mobile: 4 cols | PC: 4 cols) */}
      <section className="px-5 py-10 max-w-6xl mx-auto">
        <SectionHeading>একাডেমিক বিভাগ</SectionHeading>
        <div className="grid grid-cols-4 gap-3 md:gap-8 mt-6">
          {departments.map((d, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 group">
              <div className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-xl border border-green-200 bg-white shadow-sm group-hover:shadow-md transition-shadow">
                {d.icon}
              </div>
              <p className="text-[10px] md:text-base font-bold text-gray-800 leading-tight">{d.title}</p>
              <p className="hidden md:block text-xs text-gray-500">{d.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ADMISSION INFO (Screenshots Section 1) */}
      <section className="px-5 py-10 max-w-xl mx-auto text-center border-t border-gray-100">
        <SectionHeading>ভর্তি তথ্য</SectionHeading>
        <div className="space-y-3 inline-block text-left mb-8">
          {["ভর্তি হতে অনলাইন ফরম পূরণ করুন", "প্রয়োজনীয় কাগজপত্র জমা দিন", "ভর্তি পরীক্ষা (প্রয়োজ্য ক্ষেত্রে)"].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <Icons.Check />
              <span className="text-sm md:text-lg text-gray-700">{text}</span>
            </div>
          ))}
        </div>
        <div className="block"><PrimaryButton>এখনই আবেদন করুন</PrimaryButton></div>
      </section>

      {/* 4. NOTICE BOARD (Screenshots Section 2) */}
      <section className="px-5 py-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100">
          <SectionHeading>নোটিশ বোর্ড</SectionHeading>
          <div className="space-y-1 mb-8">
            {notices.map((n, i) => (
              <div key={i} className="flex items-center justify-between gap-4 border-b border-gray-50 py-3.5 last:border-0">
                <p className="text-sm md:text-lg text-gray-800 truncate">{n.title}</p>
                <p className="text-[10px] md:text-sm text-gray-400 whitespace-nowrap">{n.date}</p>
              </div>
            ))}
          </div>
          <div className="text-center"><PrimaryButton>সব নোটিশ দেখুন</PrimaryButton></div>
        </div>
      </section>

      {/* 5. GALLERY (Screenshots Section 3) */}
      <section className="px-5 py-10 max-w-6xl mx-auto text-center">
        <SectionHeading>গ্যালারি</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[16/10] bg-gray-200 rounded-xl overflow-hidden border-4 border-white shadow-sm">
              <div className="w-full h-full flex items-center justify-center text-gray-400">ছবি {i}</div>
            </div>
          ))}
        </div>
        <PrimaryButton>সব ছবি দেখুন</PrimaryButton>
      </section>

      {/* 6. WHY CHOOSE US (Screenshots Section 4) */}
      <section className="bg-white px-5 py-12 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>কেন আমাদের বেছে নিবেন?</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10">
            {[
              { t: "অভিজ্ঞ শিক্ষক", i: "👨‍🏫" },
              { t: "ইসলামিক পরিবেশ", i: "🕌" },
              { t: "মানসম্মত শিক্ষা", i: "🎓" },
              { t: "অনলাইন সুবিধা", i: "💻" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-5 bg-[#f8faf8] rounded-2xl border border-green-50 shadow-inner">
                <span className="text-3xl mb-2">{item.i}</span>
                <p className="text-xs md:text-base font-bold text-green-900">{item.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (Screenshots Section 5) */}
      <section className="px-5 py-12 max-w-6xl mx-auto">
        <SectionHeading>অভিভাবক ও শিক্ষার্থীদের মতামত</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { q: "দারুল ইসলাম ইনস্টিটিউট আমার সন্তানের জন্য সেরা প্রতিষ্ঠান।", n: "মোঃ রফিকুল ইসলাম", r: "অভিভাবক" },
            { q: "এখানে পড়ে আমার দ্বীন ও সাধারণ জ্ঞান অনেক উন্নত হয়েছে।", n: "আরিফ বিন সাদ", r: "শিক্ষার্থী" },
            { q: "শিক্ষকরা খুব যত্নশীল এবং সহযোগী।", n: "সাদিয়া আক্তার", r: "অভিভাবক" },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-gray-50 flex flex-col">
              <span className="text-4xl text-green-200 font-serif mb-[-15px]">“</span>
              <p className="text-sm md:text-base text-gray-700 italic flex-1">{t.q}</p>
              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-sm font-bold text-gray-900">-{t.n}</p>
                <p className="text-[10px] text-green-700 font-semibold uppercase">{t.r}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 1. ADMISSION INFO ── */}
      <section className="px-5 py-10 max-w-xl mx-auto text-center">
        <SectionHeading>ভর্তি তথ্য</SectionHeading>
        <div className="space-y-3.5 text-left inline-block mb-8">
          {[
            "ভর্তি হতে অনলাইন ফরম পূরণ করুন",
            "প্রয়োজনীয় কাগজপত্র জমা দিন",
            "ভর্তি পরীক্ষা (প্রয়োজ্য ক্ষেত্রে)"
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
            { title: "বার্ষিক পরীক্ষা ২০২৪ এর সময়সূচি প্রকাশ", date: "20 May 2024" },
            { title: "নতুন সেশনের ভর্তি শুরু", date: "18 May 2024" },
            { title: "ঈদুল ফিতরের ছুটি সংক্রান্ত নোটিশ", date: "15 May 2024" },
          ].map((notice, i) => (
            <div key={i} className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0 px-1">
              <p className="text-sm md:text-base text-gray-800 flex-1">{notice.title}</p>
              <p className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{notice.date}</p>
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
            "https://i.ibb.co/0yH0H4s/building.jpg"
          ].map((src, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden shadow-md border-4 border-white ring-1 ring-gray-100">
              <img src={src} alt={`Gallery Image ${i+1}`} className="w-full h-full object-cover" />
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">কেন আমাদের বেছে নিবেন?</h2>
          <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">দারুল ইসলাম ইনস্টিটিউট নৈতিক ও আধুনিক শিক্ষার এক অনন্য সমন্বয়।</p>
        </div>
        {/* Mobile: 2 cols, md+: 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: <Features.Teacher />, title: "অভিজ্ঞ শিক্ষক" },
            { icon: <Features.Mosque />, title: "ইসলামিক পরিবেশ" },
            { icon: <Features.Graduation />, title: "মানসম্মত শিক্ষা" },
            { icon: <Features.Online />, title: "অনলাইন সুবিধা" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center gap-3 bg-[#f8faf8] p-5 rounded-2xl border border-green-50 shadow-inner">
              <div className="p-3 bg-white rounded-full shadow-md border border-gray-50">{feature.icon}</div>
              <p className="text-sm md:text-base font-semibold text-green-900 leading-tight">{feature.title}</p>
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
            { quote: "দারুল ইসলাম ইনস্টিটিউট আমার সন্তানের জন্য সেরা প্রতিষ্ঠান।", name: "মোঃ রফিকুল ইসলাম", role: "অভিভাবক" },
            { quote: "এখানে পড়ে আমার দ্বীন ও সাধারণ জ্ঞান অনেক উন্নত হয়েছে।", name: "আরিফ বিন সাদ", role: "শিক্ষার্থী" },
            { quote: "শিক্ষকরা খুব যত্নশীল এবং সহযোগী।", name: "সাদিয়া আক্তার", role: "অভিভাবক" },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute -top-3 -left-3 opacity-30 group-hover:opacity-100 transition-opacity"><QuoteIcon/></div>
              <div className="flex-1 text-gray-700 leading-relaxed pt-2">
                <span className="text-6xl text-green-500 font-serif leading-none float-left mr-1 mt-[-10px]">“</span>
                {testimonial.quote}
              </div>
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <p className="text-sm font-bold text-gray-900">-{testimonial.name}</p>
                <p className="text-xs text-green-700">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}