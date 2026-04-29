"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type Priority = "urgent" | "important" | "general";

interface Notice {
  id: string;
  title: string;
  body: string;
  priority: Priority;
  course: string;
  postedAt: Date;
  pinned: boolean;
}

/* ─────────────────────────────────────────
   MOCK COURSES
───────────────────────────────────────── */
const COURSES = [
  "All Courses",
  "MERN Stack Development",
  "Frontend with React",
  "UI/UX Design Fundamentals",
];

/* ─────────────────────────────────────────
   PRIORITY CONFIG
───────────────────────────────────────── */
const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  urgent: {
    label: "Urgent",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
  },
  important: {
    label: "Important",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  general: {
    label: "General",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-400",
  },
};

/* ─────────────────────────────────────────
   MOCK INITIAL NOTICES
───────────────────────────────────────── */
const INITIAL_NOTICES: Notice[] = [
  {
    id: "n1",
    title: "Class rescheduled — Friday session moved to Saturday",
    body: "This Friday's MERN class will be held on Saturday at the same time (8:00 PM). Please update your calendars accordingly.",
    priority: "urgent",
    course: "MERN Stack Development",
    postedAt: new Date(Date.now() - 1000 * 60 * 30),
    pinned: true,
  },
  {
    id: "n2",
    title: "Assignment submission deadline extended",
    body: "The React component assignment deadline has been extended to next Wednesday. Make sure to submit via the portal.",
    priority: "important",
    course: "Frontend with React",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    pinned: false,
  },
  {
    id: "n3",
    title: "New resource materials uploaded to drive",
    body: "Chapter 5–7 slides and reading materials are now available in the shared Google Drive folder. Link shared in class group.",
    priority: "general",
    course: "All Courses",
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    pinned: false,
  },
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/* ─────────────────────────────────────────
   NOTICE CARD
───────────────────────────────────────── */
function NoticeCard({
  notice,
  onDelete,
  onPin,
}: {
  notice: Notice;
  onDelete: (id: string) => void;
  onPin: (id: string) => void;
}) {
  const [removing, setRemoving] = useState(false);
  const cfg = PRIORITY_CONFIG[notice.priority];

  const handleDelete = () => {
    setRemoving(true);
    setTimeout(() => onDelete(notice.id), 350);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border overflow-hidden
                  shadow-sm hover:shadow-md transition-all duration-300
                  ${cfg.border} ${removing ? "opacity-0 scale-95 translate-y-2" : "opacity-100 scale-100"}`}
      style={{ transition: "opacity .35s ease, transform .35s ease, box-shadow .2s" }}
    >
      {/* Left accent stripe */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${cfg.dot}`}
      />

      <div className="pl-5 pr-4 py-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            {notice.pinned && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                </svg>
                Pinned
              </span>
            )}
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}
            >
              {cfg.label}
            </span>
            <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
              {notice.course}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
            <button
              onClick={() => onPin(notice.id)}
              title={notice.pinned ? "Unpin" : "Pin"}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              title="Delete"
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1.5">
          {notice.title}
        </h3>

        {/* Body */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {notice.body}
        </p>

        {/* Footer */}
        <p className="text-[11px] text-slate-400 mt-3 font-mono">
          {timeAgo(notice.postedAt)}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   POST NOTICE MODAL
───────────────────────────────────────── */
function PostModal({ onClose, onPost }: { onClose: () => void; onPost: (n: Notice) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState<Priority>("general");
  const [course, setCourse] = useState(COURSES[0]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const validate = () => {
    const e: { title?: string; body?: string } = {};
    if (!title.trim()) e.title = "Title is required";
    if (!body.trim()) e.body = "Notice content is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    // ── Replace with real API call ──
    // await fetch("/api/notices", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ title, body, priority, course }),
    // });

    await new Promise((r) => setTimeout(r, 800));

    const newNotice: Notice = {
      id: `n${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      priority,
      course,
      postedAt: new Date(),
      pinned: false,
    };

    onPost(newNotice);
    setSubmitting(false);
    onClose();
  };

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-modal">
        {/* Modal header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Post a Notice
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Students will see this immediately
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Priority selector */}
          <div>
            <label className="field-label">Priority</label>
            <div className="flex gap-2 mt-1.5">
              {(Object.keys(PRIORITY_CONFIG) as Priority[]).map((p) => {
                const cfg = PRIORITY_CONFIG[p];
                return (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-150
                                ${priority === p ? `${cfg.bg} ${cfg.color} ${cfg.border}` : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
                  >
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${cfg.dot}`} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course selector */}
          <div>
            <label className="field-label">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="mt-1.5 w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-medium
                         focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
            >
              {COURSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="field-label">Notice Title</label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })); }}
              placeholder="e.g. Class rescheduled to Saturday"
              className={`mt-1.5 w-full h-10 px-3 rounded-xl border bg-slate-50 text-xs text-slate-800 
                          placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all
                          ${errors.title ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-indigo-300 focus:border-indigo-400"}`}
            />
            {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="field-label">Notice Content</label>
            <textarea
              value={body}
              onChange={(e) => { setBody(e.target.value); setErrors((prev) => ({ ...prev, body: undefined })); }}
              placeholder="Write the full notice here…"
              rows={4}
              className={`mt-1.5 w-full px-3 py-2.5 rounded-xl border bg-slate-50 text-xs text-slate-800 leading-relaxed
                          placeholder:text-slate-300 resize-none focus:outline-none focus:ring-2 transition-all
                          ${errors.body ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-indigo-300 focus:border-indigo-400"}`}
            />
            {errors.body && <p className="text-[11px] text-red-500 mt-1">{errors.body}</p>}
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 pb-6 flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600
                       hover:bg-slate-50 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 h-10 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2
                       bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600
                       disabled:opacity-60 transition-all duration-200 active:scale-[0.98]"
          >
            {submitting ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Posting…
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Post Notice
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
export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [filterCourse, setFilterCourse] = useState("All Courses");
  const [justPosted, setJustPosted] = useState(false);

  const handlePost = (n: Notice) => {
    setNotices((prev) => [n, ...prev]);
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 2500);
  };

  const handleDelete = (id: string) => {
    setTimeout(() => setNotices((prev) => prev.filter((n) => n.id !== id)), 360);
  };

  const handlePin = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const sorted = [...notices].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.postedAt.getTime() - a.postedAt.getTime();
  });

  const filtered = sorted.filter((n) => {
    const matchP = filterPriority === "all" || n.priority === filterPriority;
    const matchC = filterCourse === "All Courses" || n.course === filterCourse || n.course === "All Courses";
    return matchP && matchC;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        .field-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #94a3b8;
        }

        /* Noise/grain texture overlay */
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-anim {
          opacity: 0;
          animation: fadeUp 0.4s ease forwards;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal { animation: modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        @keyframes toastIn {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .toast { animation: toastIn 0.3s ease forwards; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Toast */}
      {justPosted && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] toast">
          <div className="flex items-center gap-2.5 bg-slate-900 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-xl">
            <span className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Notice posted — students notified!
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <PostModal onClose={() => setShowModal(false)} onPost={handlePost} />
      )}

      <div className="min-h-screen bg-slate-50 grain relative">
        {/* Decorative blobs */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />
        <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3 z-0" />

        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">


          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600 mb-2">
                Instructor Portal
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Notice{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  Board
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Post announcements — students see them instantly across all devices.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] font-medium text-slate-400">
                {notices.length} notice{notices.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500
                           hover:from-indigo-600 hover:to-violet-600 text-white text-xs font-semibold
                           px-3.5 py-2 rounded-xl transition-all duration-200 active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Post Notice
              </button>
            </div>
          </div>


          {/* ── Stats strip ── */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {[
              {
                label: "Total",
                value: notices.length,
                color: "from-indigo-50 to-violet-50",
                text: "text-indigo-700",
              },
              {
                label: "Urgent",
                value: notices.filter((n) => n.priority === "urgent").length,
                color: "from-red-50 to-rose-50",
                text: "text-red-700",
              },
              {
                label: "Pinned",
                value: notices.filter((n) => n.pinned).length,
                color: "from-amber-50 to-yellow-50",
                text: "text-amber-700",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`bg-gradient-to-br ${s.color} rounded-2xl px-4 py-3 border border-white shadow-sm`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {s.label}
                </p>
                <p className={`text-2xl font-extrabold ${s.text} leading-tight`}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Filters ── */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {/* Priority filter */}
            <div className="flex gap-1.5 bg-white border border-slate-200 rounded-xl p-1">
              {(["all", "urgent", "important", "general"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all duration-150
                              ${filterPriority === p
                                ? "bg-slate-900 text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-700"}`}
                >
                  {p === "all" ? "All" : p}
                </button>
              ))}
            </div>

            {/* Course filter */}
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="h-9 px-3 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold text-slate-600
                         focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            >
              {COURSES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* ── Notice list ── */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-400">No notices yet</p>
              <p className="text-xs text-slate-300 mt-1">Post your first notice above</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((notice, i) => (
                <div
                  key={notice.id}
                  className="card-anim"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <NoticeCard
                    notice={notice}
                    onDelete={handleDelete}
                    onPin={handlePin}
                  />
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-[11px] text-slate-300 font-mono mt-12">
            classlink · notice board
          </p>
        </main>
      </div>
    </>
  );
}