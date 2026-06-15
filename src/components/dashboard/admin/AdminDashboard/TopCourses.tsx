"use client";
import { Star, Users } from "lucide-react";

const courses = [
  { title: "Quran Recitation & Tajweed Mastery", instructor: "Sh. Abdullah Karim", students: 3420, rating: 4.9, revenue: "$28,400", level: "All Levels", emoji: "📖" },
  { title: "Complete Arabic Language Course", instructor: "Dr. Layla Hassan", students: 2180, rating: 4.8, revenue: "$19,200", level: "Beginner", emoji: "🔤" },
  { title: "Foundations of Islamic Jurisprudence", instructor: "Sh. Omar Rashid", students: 1840, rating: 4.7, revenue: "$16,800", level: "Intermediate", emoji: "⚖️" },
  { title: "Seerah: Life of the Prophet ﷺ", instructor: "Dr. Amina Siddiq", students: 1620, rating: 4.9, revenue: "$14,100", level: "All Levels", emoji: "🌙" },
  { title: "Hadith Sciences & Methodology", instructor: "Sh. Tariq Ibrahim", students: 1290, rating: 4.6, revenue: "$11,400", level: "Advanced", emoji: "📜" },
];

const levelStyle: Record<string, { bg: string; color: string }> = {
  "All Levels": { bg: "rgba(27,67,50,0.09)", color: "#1B4332" },
  "Beginner": { bg: "rgba(212,160,23,0.12)", color: "#B45309" },
  "Intermediate": { bg: "rgba(59,130,246,0.1)", color: "#1D4ED8" },
  "Advanced": { bg: "rgba(239,68,68,0.08)", color: "#DC2626" },
};

export default function TopCourses() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-bold text-base" style={{ color: "#1C1917" }}>Top Performing Courses</h3>
          <p className="text-xs mt-0.5" style={{ color: "#52796F" }}>By enrollment & revenue</p>
        </div>
        <button className="text-xs font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "#FAF7F0", color: "#1B4332" }}>View All</button>
      </div>

      <div className="space-y-3">
        {courses.map((c) => {
          const ls = levelStyle[c.level] || levelStyle["All Levels"];
          return (
            <div key={c.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              style={{ border: "1px solid rgba(27,67,50,0.06)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(27,67,50,0.06)" }}>
                {c.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: "#1C1917" }}>{c.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{c.instructor}</div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#52796F" }}>
                    <Users size={11} />{c.students.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#D4A017" }}>
                    <Star size={11} fill="#D4A017" />{c.rating}
                  </span>
                  <span className="badge text-xs" style={{ background: ls.bg, color: ls.color, padding: "2px 8px" }}>
                    {c.level}
                  </span>
                </div>
              </div>
              <div className="text-sm font-bold flex-shrink-0" style={{ color: "#1B4332" }}>{c.revenue}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}