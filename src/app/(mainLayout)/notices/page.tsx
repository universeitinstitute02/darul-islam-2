"use client";

import { useState, useEffect, useRef } from "react";

/* -------------------- TYPES -------------------- */
type Category = "academic" | "holiday" | "course" | "system";

type Notice = {
  slug: string;
  title: string;
  date: string;
  category: Category;
  isNew: boolean;
  content: string;
};

/* -------------------- DATA -------------------- */
const notices: Notice[] = [
  {
    slug: "exam-schedule-2026",
    title: "Final Exam Schedule প্রকাশ",
    date: "April 20, 2026",
    category: "academic",
    isNew: true,
    content:
      "Final exam schedule প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে যথাসময়ে পরীক্ষায় অংশগ্রহণের অনুরোধ করা যাচ্ছে। বিস্তারিত সময়সূচি নোটিশ বোর্ড ও ওয়েবসাইটে পাওয়া যাবে।",
  },
  {
    slug: "eid-holiday",
    title: "Eid Holiday Notice",
    date: "April 18, 2026",
    category: "holiday",
    isNew: true,
    content:
      "Eid-ul-Fitr উপলক্ষে আগামী ৫ দিন সকল ক্লাস ও পরীক্ষা বন্ধ থাকবে। ছুটির পরে যথারীতি কার্যক্রম শুরু হবে। সকলকে ঈদের শুভেচ্ছা।",
  },
  {
    slug: "new-course-launch",
    title: "New MERN Stack Course Launch",
    date: "April 15, 2026",
    category: "course",
    isNew: false,
    content:
      "আমাদের নতুন MERN Stack কোর্স চালু হয়েছে। MongoDB, Express, React এবং Node.js সম্পর্কে গভীর জ্ঞান অর্জনের সুযোগ নিন। ভর্তির জন্য ওয়েবসাইট ভিজিট করুন।",
  },
  {
    slug: "maintenance",
    title: "Scheduled System Maintenance",
    date: "April 10, 2026",
    category: "system",
    isNew: false,
    content:
      "ওয়েবসাইট আপডেটের জন্য রাত ১২টা থেকে ভোর ৪টা পর্যন্ত সিস্টেম সাময়িকভাবে বন্ধ থাকবে। অসুবিধার জন্য আন্তরিকভাবে দুঃখিত।",
  },
];

/* -------------------- CATEGORY META -------------------- */
const categoryMeta: Record<
  Category,
  {
    label: string;
    stripe: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    btnBg: string;
  }
> = {
  academic: {
    label: "Academic",
    stripe: "bg-[#185FA5]",
    badgeBg: "bg-[#E6F1FB]",
    badgeText: "text-[#0C447C]",
    badgeBorder: "border-[#B5D4F4]",
    btnBg: "bg-[#185FA5]",
  },
  holiday: {
    label: "Holiday",
    stripe: "bg-[#3B6D11]",
    badgeBg: "bg-[#EAF3DE]",
    badgeText: "text-[#27500A]",
    badgeBorder: "border-[#C0DD97]",
    btnBg: "bg-[#3B6D11]",
  },
  course: {
    label: "Course",
    stripe: "bg-[#854F0B]",
    badgeBg: "bg-[#FAEEDA]",
    badgeText: "text-[#633806]",
    badgeBorder: "border-[#FAC775]",
    btnBg: "bg-[#854F0B]",
  },
  system: {
    label: "System",
    stripe: "bg-[#5F5E5A]",
    badgeBg: "bg-[#F1EFE8]",
    badgeText: "text-[#444441]",
    badgeBorder: "border-[#D3D1C7]",
    btnBg: "bg-[#5F5E5A]",
  },
};

const FILTERS = ["All", "Academic", "Holiday", "Course", "System"];

/* -------------------- BADGE -------------------- */
function CategoryBadge({ category }: { category: Category }) {
  const m = categoryMeta[category];
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full border
        ${m.badgeBg} ${m.badgeText} ${m.badgeBorder}`}
    >
      {m.label}
    </span>
  );
}

/* -------------------- NOTICE CARD (single-column row) -------------------- */
function NoticeCard({
  notice,
  onClick,
  index,
}: {
  notice: Notice;
  onClick: (n: Notice) => void;
  index: number;
}) {
  const m = categoryMeta[notice.category];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={() => onClick(notice)}
      className={`
        cursor-pointer bg-white rounded-xl border border-slate-200
        flex flex-row items-stretch overflow-hidden
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
        hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300
      `}
    >
      {/* Left color stripe */}
      <div className={`w-1 flex-shrink-0 ${m.stripe}`} />

      {/* Card body */}
      <div className="flex flex-1 items-center gap-4 px-4 py-3.5 min-w-0">
        {/* Left: meta + title + preview */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={notice.category} />
            {notice.isNew && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                New
              </span>
            )}
          </div>

          <h2 className="text-sm font-bold text-slate-900 leading-snug truncate font-serif">
            {notice.title}
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
            {notice.content}
          </p>
        </div>

        {/* Right: date + cta */}
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className="text-[11px] text-slate-400 whitespace-nowrap">
            {notice.date}
          </span>
          <span className="text-xs font-semibold text-slate-700">Read →</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------- MODAL -------------------- */
function Modal({
  notice,
  onClose,
}: {
  notice: Notice;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const m = categoryMeta[notice.category];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
    >
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_.2s_ease]">
        {/* Top stripe */}
        <div className={`h-1.5 ${m.stripe}`} />

        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-2 items-center">
              <CategoryBadge category={notice.category} />
              {notice.isNew && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  New
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 transition"
            >
              ×
            </button>
          </div>

          <h2 className="text-lg font-bold text-slate-900 leading-snug font-serif">
            {notice.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{notice.date}</p>
        </div>

        {/* Body */}
        <div className="p-5 text-sm text-slate-600 leading-relaxed max-h-60 overflow-y-auto">
          {notice.content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition"
          >
            Dismiss
          </button>
          <button
            className={`px-4 py-2 text-sm text-white rounded-lg font-medium ${m.btnBg} hover:opacity-90 transition`}
          >
            Share notice
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- PAGE -------------------- */
export default function NoticePage() {
  const [selected, setSelected] = useState<Notice | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? notices
      : notices.filter(
          (n) => n.category === activeFilter.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif leading-tight">
            Notice Board
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 text-xs rounded-full font-semibold border transition
                ${
                  activeFilter === f
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-slate-400 mb-4">
          {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Single-column list */}
        <div className="flex flex-col gap-2.5">
          {filtered.length > 0 ? (
            filtered.map((notice, i) => (
              <NoticeCard
                key={notice.slug}
                notice={notice}
                index={i}
                onClick={setSelected}
              />
            ))
          ) : (
            <p className="text-center py-12 text-slate-400 text-sm">
              No notices found for this category.
            </p>
          )}
        </div>
      </div>

      {selected && (
        <Modal notice={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}