"use client";

import { useState, useEffect, useRef } from "react";

/* -------------------- TYPES -------------------- */
type Notice = {
  slug: string;
  title: string;
  date: string;
  category: "academic" | "holiday" | "course" | "system";
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
      "Final exam schedule প্রকাশ করা হয়েছে...",
  },
  {
    slug: "eid-holiday",
    title: "Eid Holiday Notice",
    date: "April 18, 2026",
    category: "holiday",
    isNew: true,
    content:
      "Eid-ul-Fitr উপলক্ষে আগামী ৫ দিন...",
  },
  {
    slug: "new-course-launch",
    title: "New MERN Stack Course Launch",
    date: "April 15, 2026",
    category: "course",
    isNew: false,
    content:
      "আমাদের নতুন MERN Stack কোর্স চালু হয়েছে...",
  },
  {
    slug: "maintenance",
    title: "Scheduled System Maintenance",
    date: "April 10, 2026",
    category: "system",
    isNew: false,
    content:
      "ওয়েবসাইট আপডেটের জন্য...",
  },
];

const categoryMeta = {
  academic: {
    label: "Academic",
    accent: "bg-blue-600",
    light: "bg-blue-50",
    text: "text-blue-900",
  },
  holiday: {
    label: "Holiday",
    accent: "bg-green-600",
    light: "bg-green-50",
    text: "text-green-900",
  },
  course: {
    label: "Course",
    accent: "bg-amber-600",
    light: "bg-amber-50",
    text: "text-amber-900",
  },
  system: {
    label: "System",
    accent: "bg-slate-600",
    light: "bg-slate-50",
    text: "text-slate-900",
  },
};

const FILTERS = ["All", "Academic", "Holiday", "Course", "System"];

/* -------------------- CARD -------------------- */
function NoticeCard({
  notice,
  onClick,
  index,
}: {
  notice: Notice;
  onClick: (n: Notice) => void;
  index: number;
}) {
  const meta = categoryMeta[notice.category];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onClick={() => onClick(notice)}
      className={`cursor-pointer bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      hover:-translate-y-1 hover:shadow-lg`}
    >
      <div className={`h-1 ${meta.accent}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Top */}
        <div className="flex justify-between items-center">
          <span
            className={`text-[10px] font-semibold uppercase px-3 py-1 rounded-full border ${meta.light} ${meta.text}`}
          >
            {meta.label}
          </span>

          {notice.isNew && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
              NEW
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-900 leading-snug">
          {notice.title}
        </h2>

        {/* Content */}
        <p className="text-sm text-slate-500 line-clamp-3 flex-1">
          {notice.content}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-auto">
          <span className="text-xs text-slate-400">{notice.date}</span>
          <span className="text-xs font-semibold text-slate-700">
            Read more →
          </span>
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
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const meta = categoryMeta[notice.category];

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-[fadeIn_.2s]">
        <div className={`h-1.5 ${meta.accent}`} />

        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between mb-3">
            <div className="flex gap-2 items-center">
              <span
                className={`text-[10px] font-semibold px-3 py-1 rounded-full border ${meta.light} ${meta.text}`}
              >
                {meta.label}
              </span>

              {notice.isNew && (
                <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full border">
                  NEW
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full border text-slate-500"
            >
              ×
            </button>
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            {notice.title}
          </h2>
          <p className="text-xs text-slate-400">{notice.date}</p>
        </div>

        {/* Body */}
        <div className="p-6 text-sm text-slate-600 leading-relaxed">
          {notice.content}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md"
          >
            Dismiss
          </button>
          <button
            className={`px-4 py-2 text-sm text-white rounded-md ${meta.accent}`}
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
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-5xl mx-auto px-5 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Official announcements
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Notice Board
          </h1>
          <p className="text-sm text-slate-500">
            {filtered.length} notice
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 text-sm rounded-full font-semibold border
              ${
                activeFilter === f
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((notice, i) => (
            <NoticeCard
              key={notice.slug}
              notice={notice}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>
      </div>

      {selected && (
        <Modal notice={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}