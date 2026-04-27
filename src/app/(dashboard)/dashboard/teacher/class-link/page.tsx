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
}

interface PostedHistory {
  courseTitle: string;
  url: string;
  date: string;
  time: string;
}

/* ─────────────────────────────────────────
   MOCK DATA & HISTORY
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

const WEEKLY_HISTORY: PostedHistory[] = [
  {
    courseTitle: "MERN Stack Development",
    url: "https://meet.google.com/abc-defg-hij",
    date: "25 Apr 2026",
    time: "08:05 PM",
  },
  {
    courseTitle: "Frontend with React",
    url: "https://meet.google.com/xyz-pqr-stu",
    date: "26 Apr 2026",
    time: "06:10 PM",
  },
];

/* ─────────────────────────────────────────
   MODAL COMPONENT
───────────────────────────────────────── */
function HistoryModal({ isOpen, onClose, history }: { isOpen: boolean; onClose: () => void; history: PostedHistory[] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Weekly Posted Links</h3>
            <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">Activities from this week</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="overflow-y-auto p-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                <th className="pb-4 font-bold">Course Title</th>
                <th className="pb-4 font-bold">Meeting Link</th>
                <th className="pb-4 font-bold text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((item, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="py-5 pr-4">
                    <p className="text-sm font-bold text-slate-800">{item.courseTitle}</p>
                  </td>
                  <td className="py-5 pr-4">
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-emerald-600 hover:text-emerald-700 underline underline-offset-4 decoration-emerald-200 block truncate max-w-[200px]">
                      {item.url.replace("https://", "")}
                    </a>
                  </td>
                  <td className="py-5 text-right">
                    <p className="text-xs font-bold text-slate-700">{item.date}</p>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">{item.time}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && <div className="text-center py-12 text-slate-400 text-sm italic font-medium">No links posted this week yet.</div>}
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-100 text-center">
          <button onClick={onClose} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Close History</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COURSE CARD (Original Design)
───────────────────────────────────────── */
function CourseCard({ course, index }: { course: Course; index: number }) {
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "posted">("idle");

  const handlePost = async () => {
    if (!link.trim()) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("posted");
    setTimeout(() => { setStatus("idle"); setLink(""); }, 3000);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${course.accentFrom}, ${course.accentTo})` }} />
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{course.icon}</span>
            <h2 className="text-base font-semibold text-slate-800 leading-snug">{course.title}</h2>
          </div>
          <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${course.tagColor}`}>{course.tag}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{ label: "Students", value: course.students }, { label: "Date", value: "Today" }, { label: "Time", value: course.time }].map((m) => (
            <div key={m.label} className={`flex flex-col gap-0.5 bg-slate-50 rounded-xl px-3 py-2.5 ${m.label === "Time" ? "col-span-3 sm:col-span-1" : ""}`}>
              <span className="text-[10px] font-semibold uppercase text-slate-400">{m.label}</span>
              <span className="text-xs font-medium text-slate-700 font-mono">{m.value}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Google Meet Link..."
                className="w-full h-10 pl-4 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono focus:outline-none focus:ring-2 transition-all"
                style={{ "--tw-ring-color": `${course.accentFrom}66` } as any}
              />
            </div>
            <button
              onClick={handlePost}
              disabled={status === "loading"}
              className="h-10 px-4 rounded-xl text-xs font-semibold text-white transition-all min-w-[88px]"
              style={{ background: status === "posted" ? "#0d9488" : `linear-gradient(135deg, ${course.accentFrom}, ${course.accentTo})` }}
            >
              {status === "loading" ? "..." : status === "posted" ? "Posted!" : "Post Link"}
            </button>
          </div>
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
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "week" | "month">("all");

  const filteredCourses = useMemo(() => {
    const now = new Date();
    return COURSES.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const courseDate = new Date(c.createdAt);
      let matchesTime = true;

      if (timeFilter === "today") matchesTime = courseDate.toDateString() === now.toDateString();
      else if (timeFilter === "week") matchesTime = courseDate >= new Date(now.setDate(now.getDate() - 7));
      else if (timeFilter === "month") matchesTime = courseDate >= new Date(now.setMonth(now.getMonth() - 1));

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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-600 mb-2">Instructor Dashboard</p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Class Link <span className="text-emerald-500">Management</span></h1>
            </div>
            
            {/* Post Link Button - Opens Modal */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Post Link History
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
            <div className="relative flex-1">
              <input 
                type="text"
                placeholder="Search your courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
              />
              <svg className="absolute left-3 top-3 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          {/* Modal Implementation */}
          <HistoryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            history={WEEKLY_HISTORY} 
          />
        </main>
      </div>
    </>
  );
}