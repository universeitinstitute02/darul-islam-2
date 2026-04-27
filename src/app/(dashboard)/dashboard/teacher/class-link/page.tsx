"use client";

import { useState, useEffect } from "react";

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
}

interface PostedLink {
  url: string;
  time: string;
}

/* ─────────────────────────────────────────
   MOCK DATA  (replace with real API data)
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
  },
];

/* ─────────────────────────────────────────
   COURSE CARD
───────────────────────────────────────── */
function CourseCard({ course, index }: { course: Course; index: number }) {
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "posted">("idle");
  const [lastPosted, setLastPosted] = useState<PostedLink | null>(null);
  const [shake, setShake] = useState(false);

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const handlePost = async () => {
    if (!link.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setStatus("loading");

    // ── Replace with real API call ──
    // await fetch("/api/post-link", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ courseId: course.id, link }),
    // });

    await new Promise((r) => setTimeout(r, 900)); // simulated delay

    setStatus("posted");
    setLastPosted({
      url: link,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 
                 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient accent bar */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${course.accentFrom}, ${course.accentTo})`,
        }}
      />

      {/* Faint background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(600px at 50% -100px, ${course.accentFrom}12, transparent 70%)`,
        }}
      />

      <div className="p-6 flex flex-col gap-5 relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{course.icon}</span>
            <h2 className="text-base font-semibold text-slate-800 leading-snug">
              {course.title}
            </h2>
          </div>
          <span
            className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide ${course.tagColor}`}
          >
            {course.tag}
          </span>
        </div>

        {/* Meta chips */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Students", value: `${course.students}` },
            { label: "Date", value: today },
            { label: "Time", value: course.time },
          ].map((m) => (
            <div
              key={m.label}
              className={`flex flex-col gap-0.5 bg-slate-50 rounded-xl px-3 py-2.5 ${
                m.label === "Time" ? "col-span-3 sm:col-span-1" : ""
              }`}
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {m.label}
              </span>
              <span className="text-xs font-medium text-slate-700 font-mono">
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Link input section */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Google Meet Link
          </label>
          <div
            className={`flex gap-2 items-center transition-transform duration-150 ${
              shake ? "animate-shake" : ""
            }`}
          >
            <div className="relative flex-1">
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50
                           text-xs font-mono text-slate-700 placeholder:text-slate-300
                           focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                style={
                  {
                    "--tw-ring-color": `${course.accentFrom}66`,
                  } as React.CSSProperties
                }
              />
              {/* Link icon */}
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>

            <button
              onClick={handlePost}
              disabled={status === "loading"}
              className="h-10 px-4 rounded-xl text-xs font-semibold text-white transition-all duration-200
                         active:scale-95 disabled:opacity-60 shrink-0 min-w-[88px] flex items-center justify-center gap-1.5"
              style={{
                background:
                  status === "posted"
                    ? "#0d9488"
                    : `linear-gradient(135deg, ${course.accentFrom}, ${course.accentTo})`,
              }}
            >
              {status === "loading" && (
                <svg
                  className="w-3.5 h-3.5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              )}
              {status === "posted" && (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
              {status === "idle" && "Post Link"}
              {status === "loading" && "Posting…"}
              {status === "posted" && "Posted!"}
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: status === "posted" ? "100%" : "0%",
                background: `linear-gradient(90deg, ${course.accentFrom}, ${course.accentTo})`,
              }}
            />
          </div>

          {/* Last posted info */}
          {lastPosted && (
            <p className="text-[11px] text-slate-400 font-mono truncate">
              ✓ Posted {lastPosted.time} · {lastPosted.url}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */
function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-4 shadow-sm">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: `${color}18` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="text-xl font-bold text-slate-800 leading-tight">{value}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ClassLinkPage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const totalStudents = COURSES.reduce((s, c) => s + c.students, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        body { font-family: 'Sora', sans-serif; }

        .font-mono { font-family: 'JetBrains Mono', monospace; }

        /* Dot grid background */
        .dot-bg {
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* Card fade-in on load */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-anim {
          opacity: 0;
          animation: fadeUp 0.5s ease forwards;
        }

        /* Shake animation for empty input */
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-6px); }
          40%,80%  { transform: translateX(6px); }
        }
        .animate-shake { animation: shake 0.4s ease; }

        /* Live clock pulse */
        @keyframes pulse-dot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .pulse-dot { animation: pulse-dot 1.4s ease infinite; }
      `}</style>

      {/* Page wrapper */}
      <div className="min-h-screen bg-slate-50 dot-bg font-sans">

        {/* ── Top nav bar ── */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-100 px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">CL</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 tracking-tight">
                ClassLink
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              Live · {time}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                IN
              </div>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          {/* Hero heading */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600 mb-2">
                Instructor Dashboard
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Class Link{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                  Management
                </span>
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Distribute live class links — students get access instantly.
              </p>
            </div>

            <button className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-semibold
                               bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-700 
                               transition-colors duration-200 shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Course
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <StatCard label="Total Courses" value={COURSES.length} icon="📚" color="#10b981" />
            <StatCard label="Students" value={totalStudents} icon="👥" color="#0ea5e9" />
            <div className="col-span-2 sm:col-span-1">
              <StatCard label="Today" value={new Date().toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})} icon="📅" color="#8b5cf6" />
            </div>
          </div>

          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Active Courses
            </p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Course cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.map((course, i) => (
              <div key={course.id} className="card-anim" style={{ animationDelay: `${i * 120}ms` }}>
                <CourseCard course={course} index={i} />
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-[11px] text-slate-400 mt-12 tracking-wide">
            Links are distributed immediately to all enrolled students.
          </p>
        </main>
      </div>
    </>
  );
}