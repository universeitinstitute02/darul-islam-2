"use client";

import { useState, useEffect, useRef } from "react";

const notices = [
  {
    slug: "exam-schedule-2026",
    title: "Final Exam Schedule প্রকাশ",
    date: "April 20, 2026",
    category: "academic",
    isNew: true,
    content:
      "Final exam schedule প্রকাশ করা হয়েছে। সকল শিক্ষার্থীকে নির্ধারিত সময় অনুযায়ী পরীক্ষায় অংশগ্রহণ করতে হবে। বিস্তারিত রুটিন ওয়েবসাইটে দেওয়া আছে। নির্ধারিত কক্ষে নির্ধারিত সময়ের ১৫ মিনিট আগে উপস্থিত থাকতে হবে।",
  },
  {
    slug: "eid-holiday",
    title: "Eid Holiday Notice",
    date: "April 18, 2026",
    category: "holiday",
    isNew: true,
    content:
      "Eid-ul-Fitr উপলক্ষে আগামী ৫ দিন সকল কার্যক্রম বন্ধ থাকবে। ক্লাস পুনরায় শুরু হবে নির্ধারিত সময় অনুযায়ী। সকলকে শুভ ঈদ মোবারক।",
  },
  {
    slug: "new-course-launch",
    title: "New MERN Stack Course Launch",
    date: "April 15, 2026",
    category: "course",
    isNew: false,
    content:
      "আমাদের নতুন MERN Stack কোর্স চালু হয়েছে। আগ্রহী শিক্ষার্থীরা দ্রুত রেজিস্ট্রেশন সম্পন্ন করুন। সীমিত সিট রয়েছে এবং আসন পূর্ণ হলে নিবন্ধন বন্ধ করা হবে।",
  },
  {
    slug: "maintenance",
    title: "Scheduled System Maintenance",
    date: "April 10, 2026",
    category: "system",
    isNew: false,
    content:
      "ওয়েবসাইট আপডেটের জন্য আগামী রাত ১২টা থেকে ৩টা পর্যন্ত সার্ভিস বন্ধ থাকবে। এই সময়ে কোনো লগইন বা ফর্ম সাবমিশন সম্ভব হবে না। অসুবিধার জন্য দুঃখিত।",
  },
];

const categoryMeta = {
  academic: {
    label: "Academic",
    accent: "#1d4ed8",
    light: "#eff6ff",
    text: "#1e3a8a",
    icon: "🎓",
  },
  holiday: {
    label: "Holiday",
    accent: "#15803d",
    light: "#f0fdf4",
    text: "#14532d",
    icon: "🌙",
  },
  course: {
    label: "Course",
    accent: "#b45309",
    light: "#fffbeb",
    text: "#78350f",
    icon: "🚀",
  },
  system: {
    label: "System",
    accent: "#475569",
    light: "#f8fafc",
    text: "#1e293b",
    icon: "⚙️",
  },
};

const FILTERS = ["All", "Academic", "Holiday", "Course", "System"];

function NoticeCard({ notice, onClick, index }) {
  const meta = categoryMeta[notice.category];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onClick={() => onClick(notice)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity 0.35s ease, transform 0.35s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        cursor: "pointer",
        background: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.10)";
        e.currentTarget.style.borderColor = meta.accent + "55";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Accent bar */}
      <div style={{ height: "4px", background: meta.accent }} />

      <div
        style={{
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: 1,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              background: meta.light,
              color: meta.text,
              padding: "3px 10px",
              borderRadius: "999px",
              border: `1px solid ${meta.accent}22`,
            }}
          >
            {meta.label}
          </span>
          {notice.isNew && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                background: "#fef9c3",
                color: "#854d0e",
                padding: "2px 8px",
                borderRadius: "999px",
                border: "1px solid #fde047",
              }}
            >
              NEW
            </span>
          )}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#0f172a",
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          {notice.title}
        </h2>

        {/* Excerpt */}
        <p
          style={{
            fontSize: "13px",
            color: "#64748b",
            lineHeight: 1.65,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {notice.content}
        </p>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "10px",
            borderTop: "1px solid #f1f5f9",
            marginTop: "auto",
          }}
        >
          <span style={{ fontSize: "11px", color: "#94a3b8" }}>
            {notice.date}
          </span>
          <span
            style={{ fontSize: "12px", fontWeight: 600, color: meta.accent }}
          >
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
}

function Modal({ notice, onClose }) {
  const overlayRef = useRef(null);
  const meta = categoryMeta[notice.category];

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          overflow: "hidden",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* Accent */}
        <div style={{ height: "5px", background: meta.accent }} />

        {/* Header */}
        <div
          style={{
            padding: "24px 28px 16px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: meta.light,
                  color: meta.text,
                  padding: "3px 10px",
                  borderRadius: "999px",
                  border: `1px solid ${meta.accent}22`,
                }}
              >
                {meta.label}
              </span>
              {notice.isNew && (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "#fef9c3",
                    color: "#854d0e",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    border: "1px solid #fde047",
                  }}
                >
                  NEW
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                color: "#64748b",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
              margin: "0 0 6px",
              lineHeight: 1.35,
            }}
          >
            {notice.title}
          </h2>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
            {notice.date}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 28px 24px" }}>
          <p
            style={{
              fontSize: "14px",
              color: "#475569",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            {notice.content}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 28px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            Dismiss
          </button>
          <button
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              background: meta.accent,
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            Share notice
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NoticePage() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? notices
      : notices.filter((n) => n.category === activeFilter.toLowerCase());

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        * { box-sizing: border-box; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "48px 20px 80px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#94a3b8",
                marginBottom: "6px",
              }}
            >
              Official announcements
            </p>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#0f172a",
                margin: "0 0 8px",
              }}
            >
              Notice Board
            </h1>
            <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
              {filtered.length} notice{filtered.length !== 1 ? "s" : ""} · Last
              updated April 20, 2026
            </p>
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "7px 18px",
                    borderRadius: "999px",
                    border: isActive ? "none" : "1px solid #e2e8f0",
                    background: isActive ? "#0f172a" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div
            style={{ borderTop: "1px solid #e2e8f0", marginBottom: "24px" }}
          />

          {/* Grid */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              No notices found in this category.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {filtered.map((notice, i) => (
                <NoticeCard
                  key={notice.slug}
                  notice={notice}
                  index={i}
                  onClick={setSelected}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <Modal notice={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
