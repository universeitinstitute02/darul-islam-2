"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Book,
  Clock,
  HelpCircle,
  FileText,
  Award,
  Shield,
  Users,
  Calendar,
  Trophy,
  Video,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import Link from "next/link";

// ইমেজ অনুযায়ী সঠিক আইকন ম্যাপিং
const iconMap = {
  tilawat: BookOpen,
  tajweed: Sparkles,
  hifz: Book,
  tafseer: FileText,
  noorani: BookOpen,
  deeni: Shield,
  aqeedah: Users,
  akhlak: Shield,
  afterAsr: Clock,
  masaala: HelpCircle,
  dua: Users,
  nesab: FileText,
  syllabus: FileText,
  exam: FileText,
  certificate: Award,
  kitabStudy: BookOpen,
  explanation: Users,
  talim: Book,
  ilm: Sparkles,
  event: Calendar,
  competition: Trophy,
  seminar: Video,
  culture: Users,
};

const sectionsData = [
  {
    id: 1,
    title: "কুরআন বিভাগ",
    image:
      "https://images.unsplash.com/photo-1609599006353-e629f1d50218?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        id: "c1",
        title: "তিলাওয়াত",
        icon: "tilawat",
        details:
          "সহীহ-শুদ্ধভাবে কুরআন তিলাওয়াত শেখার বিস্তারিত কোর্স মডিউল ও তারতীল শিক্ষা।",
      },
      {
        id: "c2",
        title: "তাজভীদ",
        icon: "tajweed",
        details:
          "মাখরাজ, সিফাত ও ওয়াকফের নিয়মাবলী সহ কুরআন উচ্চারণের বিশুদ্ধ নিয়ম।",
      },
      {
        id: "c3",
        title: "হিফজ",
        icon: "hifz",
        details:
          "কুরআন মাজীদ সম্পূর্ণ বা আংশিক হিফজ করার আধুনিক ও সুবিন্যস্ত নাজেরা-হিফজ পরিকল্পনা।",
      },
      {
        id: "c4",
        title: "তাফসীর",
        icon: "tafseer",
        details:
          "গুরুত্বপূর্ণ সূরা ও আয়াতসমূহের শানে নুযুল, শব্দার্থ ও বিস্তারিত সমসাময়িক ব্যাখ্যা।",
      },
      // ৫ নম্বর আইটেম ("আরো দেখুন" টেস্ট করার জন্য)
      {
        id: "c5",
        title: "নাজেরা ও কায়দা",
        icon: "tilawat",
        details:
          "প্রাথমিক স্তরের শিক্ষার্থীদের জন্য দেখে দেখে দ্রুত ও নির্ভুলভাবে কুরআন পড়ার যোগ্যতা অর্জন।",
      },
    ],
  },
  {
    id: 2,
    title: "ইসলামিক স্কুল",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        id: "s1",
        title: "নুরানী শিক্ষা",
        icon: "noorani",
        details:
          "ছোট সোনামণিদের জন্য সহজ ও আকর্ষণীয় পদ্ধতিতে দ্বীনী শিক্ষার হাতেখড়ি।",
      },
      {
        id: "s2",
        title: "দ্বীনী শিক্ষা",
        icon: "deeni",
        details:
          "প্রাথমিক ইসলামিক জ্ঞান, আকাইদ এবং মৌলিক ফরয ইবাদতের ব্যবহারিক নিয়মাবলী।",
      },
      {
        id: "s3",
        title: "আকীদাহ",
        icon: "aqeedah",
        details:
          "আহলে সুন্নাত ওয়াল জামায়াত অনুযায়ী সঠিক ও বিশুদ্ধ বিশ্বাসের বুনিয়াদি পাঠ।",
      },
      {
        id: "s4",
        title: "আখলাক",
        icon: "akhlak",
        details:
          "উত্তম চরিত্র গঠন, দৈনন্দিন আদব-কায়দা, সুন্নতী জিন্দেগী ও নৈতিকতা শিক্ষা।",
      },
    ],
  },
  {
    id: 3,
    title: "আফটার স্কুল মাহতাব",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        id: "a1",
        title: "বাদ আসর ক্লাস",
        icon: "afterAsr",
        details:
          "সাধারণ স্কুলগামী শিক্ষার্থীদের জন্য আসরের পর বিশেষ দ্বীনী ও নৈতিক শিক্ষার ক্লাস।",
      },
      {
        id: "a2",
        title: "দ্বীনী শিক্ষা",
        icon: "deeni",
        details:
          "ব্যস্ত জীবনের মাঝেও দৈনন্দিন প্রয়োজনীয় মাসআলা ও সুন্নাত সমূহের সঠিক অনুশীলন।",
      },
      {
        id: "a3",
        title: "মাসআলা-মাসাইল",
        icon: "masaala",
        details:
          "পবিত্রতা, সালাত, সাওম এবং প্রাত্যহিক জীবনের অতি প্রয়োজনীয় শরয়ী সমাধান।",
      },
      {
        id: "a4",
        title: "দোয়া ও আমল",
        icon: "dua",
        details:
          "ঘুম থেকে ওঠা থেকে শুরু করে ঘুমাতে যাওয়া পর্যন্ত সব মাসনূন দোয়া ও জিকির মুখস্থকরণ।",
      },
    ],
  },
  {
    id: 4,
    title: "মাদানী নেসাব",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        id: "m1",
        title: "নেসাব কোর্স",
        icon: "nesab",
        details:
          "আরবি ভাষা, সাহিত্য ও উচ্চতর ইসলামিক স্টাডিজের সুপরিকল্পিত নেসাব।",
      },
      {
        id: "m2",
        title: "সিলেবাস ভিত্তিক",
        icon: "syllabus",
        details:
          "ধাপভিত্তিক সাজানো আধুনিক বিশ্বের সাথে সমন্বিত যুগোপযোগী পাঠ্যক্রম।",
      },
      {
        id: "m3",
        title: "পরীক্ষা ব্যবস্থা",
        icon: "exam",
        details:
          "শিক্ষার্থীদের মেধা ও যোগ্যতা মূল্যায়নে ধারাবাহিক সাপ্তাহিক, মাসিক ও চূড়ান্ত পরীক্ষা।",
      },
      {
        id: "m4",
        title: "সনদ প্রদান",
        icon: "certificate",
        details:
          "কোর্স সফলভাবে সমাপ্তির পর মেধার ভিত্তিতে প্রাতিষ্ঠানিক স্বীকৃতি ও সার্টিফিকেট প্রদান।",
      },
    ],
  },
  {
    id: 5,
    title: "কিতাব বিভাগ",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        id: "k1",
        title: "কিতাব অধ্যয়ন",
        icon: "kitabStudy",
        details:
          "হাদীস, ফিকহ, উসূলে ফিকহ ও আকীদার মূল আরবী কিতাবসমূহের নিবিড় পাঠদান।",
      },
      {
        id: "k2",
        title: "ব্যাখ্যা ক্লাস",
        icon: "explanation",
        details:
          "কঠিন ইবারত (টেক্সট) ও জটিল মাসআলাসমূহের সহজ সরল ও গবেষণাধর্মী ব্যাখ্যা।",
      },
      {
        id: "k3",
        title: "তালিমুল কিতাব",
        icon: "talim",
        details:
          "শুদ্ধ উচ্চারণে ও ব্যাকরণগতভাবে নির্ভুল উপায়ে আরবী কিতাব পড়ার যোগ্যতা তৈরি।",
      },
      {
        id: "k4",
        title: "ইলম চর্চা",
        icon: "ilm",
        details:
          "ইসলামিক গভীর জ্ঞান অর্জন ও সমসাময়িক আধুনিক সমস্যার শরয়ী সমাধান নিয়ে উচ্চতর গবেষণা।",
      },
    ],
  },
  {
    id: 6,
    title: "ইসলামিক কালচারাল",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
    items: [
      {
        id: "cu1",
        title: "ইসলামিক অনুষ্ঠান",
        icon: "event",
        details:
          "বিভিন্ন গুরুত্বপূর্ণ ইসলামিক দিবস, সীরাতুন্নবী ও তাৎপর্যপূর্ণ আলোচনা সভা আয়োজন।",
      },
      {
        id: "cu2",
        title: "প্রতিযোগিতা",
        icon: "competition",
        details:
          "শিক্ষার্থীদের সুপ্ত প্রতিভা বিকাশে কেরাত, গজল, কুইজ ও তাৎক্ষণিক বক্তৃতা প্রতিযোগিতা।",
      },
      {
        id: "cu3",
        title: "সেমিনার",
        icon: "seminar",
        details:
          "নৈতিক অবক্ষয় রোধে এবং সমসাময়িক জীবনমুখী ও ক্যারিয়ার বিষয়ক বিশেষ সেমিনার।",
      },
      {
        id: "cu4",
        title: "সাংস্কৃতিক কার্যক্রম",
        icon: "culture",
        details:
          "অপসংস্কৃতির বিপরীতে সুস্থ ও পজিটিভ ইসলামিক সংস্কৃতির বিকাশে নানামুখী উদ্যোগ।",
      },
    ],
  },
];

export default function EduCategories() {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeItem, setActiveItem] = useState(null);

  const toggleExpand = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <div className="bg-gradient-to-b from-[#f4fbf7] to-[#fcfdfd] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-100 selection:text-emerald-950">
      {/* প্রফেশনাল হেডার সেকশন */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-[#0f5132] font-semibold text-sm sm:text-base shadow-sm mb-4">
          📖 আমাদের একাডেমিক শিক্ষা ব্যবস্থা
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          দ্বীনী শিক্ষার একটি সুবিন্যস্ত এবং আধুনিক রূপরেখা
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
          বিভাগ অনুযায়ী আমাদের সকল কোর্সসমূহ এমনভাবে সাজানো হয়েছে যা একজন
          শিক্ষার্থীকে আদেশ ও নৈতিক শিক্ষায় উন্নত করবে।
        </p>
      </div>

      {/* মেইন রেসপন্সিভ গ্রিড (Mobile: 1, Tablet: 2, Desktop: 3) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sectionsData.map((section) => {
          const isExpanded = expandedSections[section.id];
          const displayedItems = isExpanded
            ? section.items
            : section.items.slice(0, 4);
          const hasMore = section.items.length > 4;

          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 overflow-hidden"
            >
              <div>
                {/* কার্ড ব্যানার ইমেজ (Overlay কালার দিয়ে Eye-catching করা হয়েছে) */}
                <div className="h-44 w-full relative overflow-hidden bg-gradient-to-t from-[#064e3b] to-emerald-950/80">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                </div>

                {/* সেকশন টাইটেল (ছবি ও কার্ডের মাঝে প্রফেশনাল ওভারল্যাপ) */}
                <div className="text-center -mt-6 relative z-10 px-4">
                  <span className="bg-white text-[#115e59] font-bold px-6 py-2.5 rounded-xl shadow-md border border-emerald-50 text-base sm:text-lg inline-block tracking-wide">
                    {section.title}
                  </span>
                </div>

                {/* সাব-কার্ড বা ইনার আইটেমগুলোর ২ কলাম গ্রিড */}
                <div className="p-5 sm:p-6 grid grid-cols-2 gap-3.5 mt-3">
                  {displayedItems.map((item) => {
                    const IconComponent = iconMap[item.icon] || BookOpen;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveItem(item)}
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-xl border  bg-slate-50/60 border-green-200 hover:border-green-500 text-center sm:text-left transition-all duration-200 group/item cursor-pointer active:scale-95"
                      >
                        {/* আইকন বক্স */}
                        <div className="p-2 rounded-lg bg-white border border-slate-200/60 text-slate-600 group-hover/item:border-emerald-200 group-hover/item:text-emerald-600 shadow-xs transition-colors shrink-0">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        {/* টাইটেল */}
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover/item:text-emerald-900 leading-tight">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* কার্ড ফুটার সেকশন: বিস্তারিত এবং আরো দেখুন বাটন */}
              {/* কার্ড ফুটার সেকশন: বিস্তারিত এবং আরো দেখুন বাটন */}
              <div className="px-6 pb-6 pt-0 flex flex-col gap-3">
                {/* বিস্তারিত দেখুন বাটন (প্রত্যেক কার্ডের জন্য) */}
                <Link
                  href={{
                    pathname: "/education-details",
                    query: { data: JSON.stringify(section) }, // পুরো section অবজেক্টকে stringify করে পাঠানো হচ্ছে
                  }}
                  className="w-full text-center bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all duration-150 cursor-pointer active:scale-98"
                >
                  বিস্তারিত দেখুন
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* প্রিমিয়াম ব্লার-এফেক্ট মোডাল (Popup) */}
      {activeItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-emerald-50 transform transition-all animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            {/* মোডাল ডেকোরেশন লাইন */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-600"></div>

            <div className="flex justify-between items-start mb-4 mt-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  📌
                </span>
                {activeItem.title}
              </h3>
              <button
                onClick={() => setActiveItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {activeItem.details}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveItem(null)}
                className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
              >
                ঠিক আছে, বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
