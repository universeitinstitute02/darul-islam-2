"use client";

import { useState, useEffect, useMemo } from "react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Course {
  id: number;
  title: string;
  students: number;
  time: string;
  tag: string;
  tagColor: string;
  accentFrom: string;
  accentTo: string;
  icon: string;
  createdAt: Date;
  currentLink?: string; // Added to store current link for copying
}

interface PostedHistory {
  courseTitle: string;
  url: string;
  date: string;
  time: string;
}

/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const COURSES: Course[] = [
  {
    id: 1,
    title: "MERN Stack Development",
    students: 120,
    time: "8:00 PM – 9:30 PM",
    tag: "Backend",
    tagColor: "bg-emerald-100 text-emerald-700",
    accentFrom: "#10b981",
    accentTo: "#34d399",
    icon: "⚙️",
    createdAt: new Date(),
    currentLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: 2,
    title: "Frontend with React",
    students: 80,
    time: "6:00 PM – 7:30 PM",
    tag: "Frontend",
    tagColor: "bg-sky-100 text-sky-700",
    accentFrom: "#0ea5e9",
    accentTo: "#38bdf8",
    icon: "🎨",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    currentLink: "https://meet.google.com/xyz-pqr-stu",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    students: 65,
    time: "4:00 PM – 5:30 PM",
    tag: "Design",
    tagColor: "bg-violet-100 text-violet-700",
    accentFrom: "#8b5cf6",
    accentTo: "#a78bfa",
    icon: "✏️",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

/* ─────────────────────────────────────────
   POST LINK MODAL (NEW FORM)
───────────────────────────────────────── */
function PostLinkModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Post New Class Link
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">
              Share meeting details with students
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                Course Name
              </label>
              <select
                required
                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                Batch No
              </label>
              <input
                type="text"
                placeholder="e.g. B-42"
                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                Class Date
              </label>
              <input
                type="date"
                required
                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                Class Time
              </label>
              <input
                type="time"
                required
                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                Label / Comment
              </label>
              <input
                type="text"
                placeholder="e.g. Revision Class"
                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="col-span-2">
              <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                Meeting Link (URL)
              </label>
              <input
                type="url"
                required
                placeholder="https://meet.google.com/..."
                className="w-full mt-1.5 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Posting..." : "Create & Post Link"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COURSE CARD (COPY VERSION)
───────────────────────────────────────── */
function CourseCard({ course }: { course: Course }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!course.currentLink) return;
    navigator.clipboard.writeText(course.currentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${course.accentFrom}, ${course.accentTo})`,
        }}
      />
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{course.icon}</span>
            <h2 className="text-base font-semibold text-slate-800 leading-snug">
              {course.title}
            </h2>
          </div>
          <span
            className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${course.tagColor}`}
          >
            {course.tag}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Students", value: course.students },
            { label: "Date", value: "Today" },
            { label: "Time", value: course.time },
          ].map((m) => (
            <div
              key={m.label}
              className={`flex flex-col gap-0.5 bg-slate-50 rounded-xl px-3 py-2.5 ${m.label === "Time" ? "col-span-3 sm:col-span-1" : ""}`}
            >
              <span className="text-[10px] font-semibold uppercase text-slate-400">
                {m.label}
              </span>
              <span className="text-xs font-medium text-slate-700 font-mono">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100" />

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
              Active Link
            </p>
            <p className="text-xs font-mono text-slate-500 truncate">
              {course.currentLink
                ? course.currentLink.replace("https://", "")
                : "No link active"}
            </p>
          </div>
          <button
            onClick={handleCopy}
            disabled={!course.currentLink}
            className={`h-11 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50"
            }`}
          >
            {copied ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ClassLinkPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");

  const filteredCourses = useMemo(() => {
    const now = new Date();
    return COURSES.filter((c) => {
      const matchesSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const courseDate = new Date(c.createdAt);
      let matchesTime = true;

      if (timeFilter === "today")
        matchesTime = courseDate.toDateString() === now.toDateString();
      else if (timeFilter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesTime = courseDate >= weekAgo;
      } else if (timeFilter === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        matchesTime = courseDate >= monthAgo;
      }

      return matchesSearch && matchesTime;
    });
  }, [search, timeFilter]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono&display=swap');
        body { font-family: 'Sora', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .dot-bg { background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px); background-size: 28px 28px; }
      `}</style>

      <div className="min-h-screen bg-slate-50 dot-bg">
        <main className="max-w-6xl mx-auto px-4 py-10">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-2">
                Instructor Dashboard
              </p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Class Link <span className="text-emerald-500">Management</span>
              </h1>
            </div>

            {/* Post Link Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl cursor-pointer text-sm font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl hover:shadow-emerald-900/10 active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Post Link
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search your courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
              />
              <svg
                className="absolute left-3 top-3 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-600 outline-none cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <PostLinkModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </main>
      </div>
    </>
  );
}
