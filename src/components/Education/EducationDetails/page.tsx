"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Calendar,
  Users,
  HelpCircle,
  Minus,
  Plus,
  GraduationCap,
  Star,
} from "lucide-react";

interface CardItem {
  id: number;
  text: string;
  iconName: "book" | "users" | "calendar" | "graduation";
}

interface TargetItem {
  id: number;
  text: string;
}

interface BatchItem {
  id: number;
  title: string;
  time: string;
  note: string;
}

interface CurriculumSection {
  id: string;
  title: string;
  duration: string;
  items: string[];
}

interface SisterCard {
  id: number;
  text: string;
  bgColor: string;
  emoji: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface TabsData {
  details: {
    id: string;
    label: string;
    icon: typeof BookOpen;
    title: string;
    cards: CardItem[];
    targetTitle: string;
    targets: TargetItem[];
  };
  schedule: {
    id: string;
    label: string;
    icon: typeof Clock;
    mainTitle: string;
    subtitle: string;
    batches: BatchItem[];
  };
  plan: {
    id: string;
    label: string;
    icon: typeof Calendar;
    curriculum: CurriculumSection[];
  };
  sisters: {
    id: string;
    label: string;
    icon: typeof Users;
    title: string;
    cards: SisterCard[];
  };
  faq: {
    id: string;
    label: string;
    icon: typeof HelpCircle;
    title: string;
    questions: FaqItem[];
  };
}

const tabsData: TabsData = {
  details: {
    id: "details",
    label: "কোর্স বিস্তারিত",
    icon: BookOpen,
    title: "আমাদের কোর্সের উদ্দেশ্য !!",
    cards: [
      {
        id: 1,
        text: "বিশ্বব্যাপী কুরআনের আলো ছড়িয়ে দিতে জেনারেল শিক্ষিত কর্মব্যস্ত মানুষকে সহীহ আকিদাহ ও কুরআন হাদিসের মর্মার্থ বুঝিয়ে দেয়া।",
        iconName: "book",
      },
      {
        id: 2,
        text: "সর্বোপরি ইলমের শাখায় বিচরণ করে দ্বীন কে আকড়ে ধরে জীবন পরিচালনা করা।",
        iconName: "users",
      },
      {
        id: 3,
        text: "একজন দায়িত্বশীল দ্বায়ীর ভূমিকা পালন করে নিজের পরিবার থেকে সমাজ পরিবর্তনে কার্যকরী ভূমিকা পালন করা।",
        iconName: "calendar",
      },
      {
        id: 4,
        text: "আলেম দের অন্তর থেকে মহব্বত করা এবং সব সময় তাদের প্রতি শ্রদ্ধা পোষণ করা এই চিন্তা করে যে তারা কতই না মেহনত করেন এই রাস্তায়।",
        iconName: "graduation",
      },
    ],
    targetTitle: "কোর্স টি কাদের জন্য?",
    targets: [
      {
        id: 1,
        text: "“জেনারেল শিক্ষিত বিভিন্ন পেশার মানুষ যারা ঘরে বসেই অভিজ্ঞ আলেম এর সহবতে দ্বীনি শিক্ষায় এলেম অর্জন করতে চান এবং সে অনুযায়ী আমল করতে চান।”",
      },
      {
        id: 2,
        text: "“মাদরাসার শিক্ষার্থী যারা দুনিয়াবি কর্মব্যস্ততার জন্য মাদরাসা শিক্ষা পরিপূর্ণ করতে পারেন নি এবং যারা অবসরে অনলাইনে কোর্স করার কথা ভাবছেন।”",
      },
      {
        id: 3,
        text: "“দুনিয়ার ব্যবস্থাপনা ও দ্বীনের হেফাজতের জন্য জাগতিক ও দ্বীনি শিক্ষার সমন্বয় প্রয়োজন। সময়ক্ষেপণ না করে আল্লাহর সন্তুষ্টি অর্জনের এই পথে আসুন।”",
      },
    ],
  },
  schedule: {
    id: "schedule",
    label: "কোর্স সময়সূচী",
    icon: Clock,
    mainTitle:
      "৬ই জুন ২০২৬ তারিখে নতুন ব্যাচের (১১তম) ওরিয়েন্টেশন ক্লাস হবে ইনশাআল্লাহ!",
    subtitle: "আমাদের তিনটি শিডিউল রয়েছেঃ সকাল, বিকাল এবং রাতের ব্যাচ।",
    batches: [
      {
        id: 1,
        title: "সকালের ব্যাচ:",
        time: "৫ টা ৫০ মিনিট থেকে ৬ টা ৫০ মিনিট",
        note: "বাংলাদেশ সময় – ফজরের সাথে সামঞ্জস্য",
      },
      {
        id: 2,
        title: "বিকালের ব্যাচ:",
        time: "৩ টা থেকে ৪ টা অবধি",
        note: "বাংলাদেশ সময়",
      },
      {
        id: 3,
        title: "রাতের ব্যাচ:",
        time: "৯ টা থেকে ১০টা অবধি",
        note: "বাংলাদেশ সময় – এশার সাথে সামঞ্জস্য",
      },
    ],
  },
  plan: {
    id: "plan",
    label: "৭ বছরের পরিকল্পনা",
    icon: Calendar,
    curriculum: [
      {
        id: "year1",
        title: "ফরজে আইন (১ম মাস)",
        duration: "৪ মাস",
        items: [
          "সহজ কুরআন শিক্ষা (তাজবীদসহ)।",
          "পূর্ণ কুরআনের নাজেরা শুদ্ধভাবে পড়তে পারা।",
          "এসো অর্থ বুঝে নামাজ পড়ি।",
          "আমলী সূরা ও মাসনূন দুআ মুখস্থ করণ।",
          "ঈমান ও ইসলামী আকীদা (মুতালায়া)।",
          "সিরাতে রাসূল ﷺ: আর-রাহীকুল মাখতূম (মুতালায়া)।",
          "তামরীনুল লুগাহ আল আরাবিয়্যাহ (প্রাথমিক আরবি ভাষা চর্চা)।",
          "আরবি হাতের লেখার কলাকৌশল।",
        ],
      },
      {
        id: "year2",
        title: "তরজমাতুল কুরআন (১ম বর্ষ)",
        duration: "৮ মাস",
        items: [
          "নির্বাচিত সূরাসমূহের ব্যাকরণগত বিশ্লেষণ ও শব্দার্থ।",
          "مৌলিক আরবি ব্যাকরণ (নাহু ও সরফ এর প্রাথমিক পাঠ)।",
          "দৈনন্দিন জীবনের প্রয়োজনীয় ফিকহী মাসআলা-মাসাইল।",
        ],
      },
      {
        id: "year3",
        title: "তরজমাতুল কুরআন (২য় বর্ষ)",
        duration: "১ বছর",
        items: [
          "কুরআন মাজীদের ধারাবাহিক তরজমা ও সংক্ষিপ্ত তাফসীর।",
          "আরবি সাহিত্য ও কথোপকথন (আল-ক্বিরাআতুর রাশিদাহ)।",
          "হাদিস শাস্ত্রের পরিচিতি ও আরবাঈন নববী।",
        ],
      },
      {
        id: "year4",
        title: "তরজমাতুল কুরআন (৩য় বর্ষ)",
        duration: "১ বছর",
        items: [
          "উচ্চতর ফিকহ (কুদূরী ও সমসাময়িক মাসআলা)।",
          "উসূলে ফিকহ ও উসূলে তাফসীরের বুনিয়াদি মূলনীতি।",
          "ইসলামী সংস্কৃতির বিকাশ ও দাওয়াহ কর্মপদ্ধতি।",
        ],
      },
    ],
  },
  sisters: {
    id: "sisters",
    label: "মেয়ে শিক্ষার্থীদের জন্য",
    icon: Users,
    title: "বোনদের দ্বীনি শিক্ষার বিশেষায়িত ও নিরাপদ অনলাইন মাধ্যম",
    cards: [
      {
        id: 1,
        text: "যেখানে সুযোগ্য ও অভিজ্ঞ আলেমা উস্তাযাগণ সরাসরি চমৎকার পরিবেশে পাঠদান করেন।",
        bgColor: "from-emerald-50 to-teal-50 border-emerald-100",
        emoji: "🧕",
      },
      {
        id: 2,
        text: "একাডেমিক সকল সহায়তায় সার্বক্ষণিক একজন ডেডিকেটেড নারী ব্যাচ কো-অর্ডিনেটর নিয়োজিত থাকেন।",
        bgColor: "from-blue-50 to-indigo-50 border-blue-100",
        emoji: "👩‍💼",
      },
      {
        id: 3,
        text: "এমনকি শরয়ী পর্দার সর্বোচ্চ গুরুত্ব বিবেচনা করে, পরীক্ষার সময়ও কোনো প্রকার ভিডিও চালু করার বাধ্যবাধকতা নেই।",
        bgColor: "from-rose-50 to-pink-50 border-rose-100",
        emoji: "🌸",
      },
      {
        id: 4,
        text: "আমাদের এখানে নারী শিক্ষার্থীদের জন্য রয়েছে সম্পূর্ণ স্বতন্ত্র, নিরাপদ ও শালীন অনলাইন ক্লাসরুম ব্যবস্থাপনা।",
        bgColor: "from-amber-50 to-orange-50 border-amber-100",
        emoji: "🛡️",
      },
    ],
  },
  faq: {
    id: "faq",
    label: "সচরাচর প্রশ্ন",
    icon: HelpCircle,
    title: "সচরাচর প্রশ্নগুলোর উত্তর",
    questions: [
      {
        id: "q1",
        question: "আপনাদের সার্টিফিকেট কি মান সম্মত ?",
        answer:
          "আলহামদুলিল্লাহ, আমাদের প্রতিষ্ঠান বাংলাদেশ সরকার কর্তৃক নিবন্ধিত ইকরা অনলাইন এরাবিক ও ইকরা দ্বীনি ফাউন্ডেশন দ্বারা পরিচালিত। курс শেষে উত্তীর্ণ শিক্ষার্থীদের প্রাতিষ্ঠানিক ও গ্রহণযোগ্য সার্টিফিকেট প্রদান করা হয় যা আপনার দ্বীনি যোগ্যতার একটি নির্ভরযোগ্য দলিল।",
      },
      {
        id: "q2",
        question: "কর্মব্যস্ত ব্যক্তিরা কীভাবে সময় মেলাবেন?",
        answer:
          "আমাদের ক্লাসগুলো সপ্তাহে নির্দিষ্ট দিনে এবং প্রতিদিন মাত্র ১ ঘণ্টা করে হয়ে থাকে। তাছাড়া চাকুরীজীবী ও ব্যবসায়ীদের জন্য সকাল ও রাতের বিশেষ শিডিউল রয়েছে, এবং কোনো কারণে লাইভ ক্লাস মিস হলে রেকর্ডেড ক্লাস দেখার চমৎকার ব্যাকআপ ব্যবস্থা রয়েছে।",
      },
      {
        id: "q3",
        question: "ভর্তি হওয়ার জন্য শিক্ষাগত যোগ্যতা কী প্রয়োজন?",
        answer:
          "এই কোর্সে ভর্তি হওয়ার জন্য কোনো পূর্ব মাদরাসা ব্যাকগ্রাউন্ডের প্রয়োজন নেই। যেকোনো জেনারেল শিক্ষিত ভাই ও বোন (স্কুল/কলেজ/বিশ্ববিদ্যালয় পড়ুয়া বা পাশ) ন্যূনতম বাংলা পড়তে ও লিখতে জানলেই এই ইলম অর্জনের সফরে অংশ নিতে পারবেন।",
      },
    ],
  },
};

export default function CourseTabsSection() {
  const [activeTab, setActiveTab] = useState<string>("details");

  const [openPlanSections, setOpenPlanSections] = useState<
    Record<string, boolean>
  >({ year1: true });
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({
    q1: true,
  });

  const togglePlan = (id: string) => {
    setOpenPlanSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  } as const;

  return (
    <section className="w-full mt-12 md:mt-20 border-t border-slate-100 pt-10 font-sans antialiased text-slate-800 my-10">
      {/* স্টিকি বাটন ট্যাব নেভিগেশন বার */}
      <div className="sticky top-16 md:top-20 z-20 bg-white/95 backdrop-blur-md border border-amber-200 shadow-sm rounded-2xl max-w-5xl mx-auto mb-8">
        <div className="px-4 overflow-x-auto scrollbar-none">
          <div className="flex justify-start md:justify-center items-center gap-1.5 py-3 whitespace-nowrap">
            {Object.values(tabsData).map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all relative cursor-pointer ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <TabIcon className="w-4 h-4 shrink-0" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl bg-[#005f53] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ডাইনামিক কন্টেন্ট হোল্ডার */}
      <div className="max-w-5xl mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-100 shadow-xs min-h-[420px]">
          <AnimatePresence mode="wait">
            {/* ১. কোর্স বিস্তারিত ট্যাব */}
            {activeTab === "details" && (
              <motion.div
                key="details"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-12"
              >
                <div className="text-center">
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                    {tabsData.details.title}
                  </h2>
                </div>

                {/* ৪ কলামের প্রিমিয়াম কার্ড গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tabsData.details.cards.map((card, index) => {
                    // ইমেজ ৪পিক্সেল রুলস অনুযায়ী ব্যাকগ্রাউন্ড টোন ম্যাপিং
                    const bgColors = [
                      "bg-[#eefbf2] border-emerald-200/60",
                      "bg-[#edf7ff] border-blue-200/60",
                      "bg-[#e8fff8] border-teal-200/60",
                      "bg-[#fffbeb] border-amber-200/60",
                    ];

                    return (
                      <motion.div
                        whileHover={{ y: -6, scale: 1.01 }}
                        key={card.id}
                        className={`p-6 rounded-2xl border flex flex-col items-center justify-start text-center shadow-xs min-h-[290px] transition-all duration-300 ${
                          bgColors[index % 4]
                        }`}
                      >
                        {/* গ্রিন ব্র্যান্ড থিম আইকন বক্স */}
                        <div className="w-16 h-16 bg-[#005f53] rounded-2xl flex items-center justify-center shadow-md mb-6 shrink-0 transition-transform duration-300 hover:scale-105">
                          {card.iconName === "book" && (
                            <BookOpen className="w-7 h-7 text-white" />
                          )}
                          {card.iconName === "users" && (
                            <Users className="w-7 h-7 text-white" />
                          )}
                          {card.iconName === "calendar" && (
                            <Calendar className="w-7 h-7 text-white" />
                          )}
                          {card.iconName === "graduation" && (
                            <GraduationCap className="w-7 h-7 text-white" />
                          )}
                        </div>

                        <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed text-center px-1">
                          {card.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* টার্গেট ওডিয়েন্স সেকশন */}
                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-base md:text-lg font-black text-center text-slate-900 mb-6">
                    {tabsData.details.targetTitle}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {tabsData.details.targets.map((target) => (
                      <div
                        key={target.id}
                        className="bg-[#191e1b] text-amber-100/90 p-6 rounded-2xl border border-amber-500/10 flex items-center shadow-xs"
                      >
                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-center w-full italic">
                          {target.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ২. কোর্স সময়সূচী ট্যাব */}
            {activeTab === "schedule" && (
              <motion.div
                key="schedule"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-3xl mx-auto text-center space-y-8"
              >
                <div className="bg-gradient-to-tr from-emerald-50/70 via-white to-teal-50/70 border border-emerald-100/70 p-6 sm:p-8 rounded-3xl shadow-xs relative overflow-hidden">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto shadow-xs text-2xl mb-4">
                    ⏰
                  </div>
                  <h2 className="text-lg md:text-2xl font-black text-[#0f2942] leading-snug mb-3">
                    {tabsData.schedule.mainTitle}
                  </h2>
                  <p className="text-xs md:text-sm font-extrabold text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
                    {tabsData.schedule.subtitle}
                  </p>
                </div>

                <div className="space-y-3">
                  {tabsData.schedule.batches.map((batch) => (
                    <div
                      key={batch.id}
                      className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left px-6 hover:border-[#005f53] transition-all"
                    >
                      <div>
                        <span className="text-sm font-black text-slate-900 block sm:inline mr-2">
                          {batch.title}
                        </span>
                        <span className="text-sm font-bold text-slate-700">
                          {batch.time}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200 shrink-0 w-max">
                        {batch.note}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ৩. ৭ বছরের পরিকল্পনা ট্যাব */}
            {activeTab === "plan" && (
              <motion.div
                key="plan"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-3xl mx-auto space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-base md:text-lg font-black text-slate-900 flex items-center justify-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#005f53]" />
                    একাডেমিক সিলেবাস ও বর্ষভিত্তিক পরিকল্পনা
                  </h2>
                </div>

                {tabsData.plan.curriculum.map((section) => {
                  const isOpen = !!openPlanSections[section.id];
                  return (
                    <div
                      key={section.id}
                      className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white shadow-xs"
                    >
                      <button
                        onClick={() => togglePlan(section.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50/60 hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">📖</span>
                          <h3 className="text-sm md:text-base font-black text-slate-800">
                            {section.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                            {section.duration}
                          </span>
                          {isOpen ? (
                            <Minus className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Plus className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 border-t border-slate-100 bg-white">
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {section.items.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-xs md:text-sm text-slate-600 font-bold"
                                  >
                                    <Star className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 fill-amber-500" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* ৪. মেয়ে শিক্ষার্থীদের জন্য ট্যাব */}
            {activeTab === "sisters" && (
              <motion.div
                key="sisters"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                <div className="text-center">
                  <span className="bg-pink-50 border border-pink-100 text-pink-700 text-[11px] font-black px-3.5 py-1.5 rounded-full inline-block mb-2">
                    ফিমেল উইং বিশেষায়িত ক্লাসরুম
                  </span>
                  <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">
                    {tabsData.sisters.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {tabsData.sisters.cards.map((card) => (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      key={card.id}
                      className={`bg-gradient-to-r ${card.bgColor} p-5 rounded-2xl border flex items-start gap-4 shadow-xs`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl shadow-xs shrink-0 border border-slate-100">
                        {card.emoji}
                      </div>
                      <p className="text-xs md:text-sm font-bold text-slate-700 leading-relaxed pt-0.5">
                        {card.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ৫. সচরাচর প্রশ্ন ট্যাব */}
            {activeTab === "faq" && (
              <motion.div
                key="faq"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-2xl mx-auto space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-lg md:text-2xl font-black text-slate-900">
                    সচরাচর <span className="text-amber-500">প্রশ্নগুলোর</span>{" "}
                    উত্তর
                  </h2>
                </div>

                <div className="space-y-3">
                  {tabsData.faq.questions.map((faq, idx) => {
                    const isOpen = !!openFaqs[faq.id];
                    return (
                      <div
                        key={faq.id}
                        className="border border-slate-100 rounded-xl bg-slate-50/50 px-4"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-start justify-between text-left gap-4 py-4 group cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-sm font-black text-slate-400 mt-0.5">
                              {idx + 1}
                            </span>
                            <h3 className="text-xs md:text-sm font-black text-slate-800 group-hover:text-[#005f53] transition-colors">
                              {faq.question}
                            </h3>
                          </div>
                          <div
                            className={`p-1 rounded-full transition-all shrink-0 mt-0.5 ${
                              isOpen
                                ? "bg-[#005f53] text-white"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {isOpen ? (
                              <Minus className="w-3 h-3" />
                            ) : (
                              <Plus className="w-3 h-3" />
                            )}
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="pl-7 pr-2 pb-4 text-xs md:text-sm text-slate-600 leading-relaxed text-justify border-t border-slate-100 pt-3">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
