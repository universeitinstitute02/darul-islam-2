"use client";

import React, { useState } from "react";
import { Layers, Image as ImageIcon, FileText, LayoutGrid } from "lucide-react";
import HeroSliderTab from "../../../../../components/dashboard/admin/content-control/HeroSliderTab";
import StaticSectionTab from "../../../../../components/dashboard/admin/content-control/StaticSectionTab";

export default function ContentControlPage() {
  const [activePage, setActivePage] = useState<"landing" | "shop" | "about">(
    "landing",
  );
  const [activeTab, setActiveTab] = useState<"slider" | "static">("slider");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* টপ হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-neutral-800 flex items-center gap-2">
            <Layers className="text-[#105D38]" size={28} /> কন্টেন্ট কন্ট্রোল
            প্যানেল
          </h1>
          <p className="text-sm font-bold text-neutral-400 mt-1">
            ওয়েবসাইটের বিভিন্ন পেজের কন্টেন্ট ও স্লাইডার কেন্দ্রীয়ভাবে নিয়ন্ত্রণ
            করুন
          </p>
        </div>

        {/* পেজ সিলেকশন ড্রপডাউন বাটন */}
        <div className="flex items-center gap-2 bg-neutral-50 p-1.5 rounded-xl border border-neutral-200">
          {(["landing", "shop", "about"] as const).map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                activePage === page
                  ? "bg-[#105D38] text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {page === "landing"
                ? "হোম পেজ"
                : page === "shop"
                  ? "শপ পেজ"
                  : "আমাদের সম্পর্কে"}
            </button>
          ))}
        </div>
      </div>

      {/* সাব-ট্যাব ন্যাভিগেশন */}
      <div className="flex border-b border-neutral-200 gap-6">
        <button
          onClick={() => setActiveTab("slider")}
          className={`pb-3 text-sm font-black flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "slider"
              ? "border-[#105D38] text-[#105D38]"
              : "border-transparent text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <ImageIcon size={18} /> হিরো স্লাইডার ম্যানেজমেন্ট
        </button>
        <button
          onClick={() => setActiveTab("static")}
          className={`pb-3 text-sm font-black flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "static"
              ? "border-[#105D38] text-[#105D38]"
              : "border-transparent text-neutral-400 hover:text-neutral-600"
          }`}
        >
          <FileText size={18} /> সেকশন কন্টেন্ট এডিটর
        </button>
      </div>

      {/* ডায়নামিক কন্টেন্ট রেন্ডারিং */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm min-h-[400px]">
        {activeTab === "slider" ? (
          <HeroSliderTab pageName={activePage} />
        ) : (
          <StaticSectionTab pageName={activePage} />
        )}
      </div>
    </div>
  );
}