"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Save, Loader2, HelpCircle } from "lucide-react";

export default function StaticSectionTab({ pageName }: { pageName: string }) {
  const queryClient = useQueryClient();
  const [selectedSection, setSelectedSection] = useState<
    "about_summary" | "stats"
  >("about_summary");
  const [jsonInput, setJsonInput] = useState("");

  // সেকশনের কারেন্ট কন্টেন্ট ফেচ করা
  const { isLoading } = useQuery({
    queryKey: ["sectionContent", pageName, selectedSection],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/hero-sliders/page/${pageName}/section/${selectedSection}`,
      );
      setJsonInput(
        JSON.stringify(
          res.data.content || getDefaultJson(selectedSection),
          null,
          2,
        ),
      );
      return res.data;
    },
  });

  // কন্টেন্ট আপডেট মিউটেশন
  const updateMutation = useMutation({
    mutationFn: async (contentObj: any) => {
      return await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/hero-sliders/page/${pageName}/section/${selectedSection}`,
        { content: contentObj },
        { withCredentials: true },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sectionContent"] });
      Swal.fire("সংরক্ষিত!", "কন্টেন্ট সফলভাবে আপডেট হয়েছে।", "success");
    },
    onError: (err: any) => {
      Swal.fire(
        "ত্রুটি",
        err.response?.data?.message || "সংরক্ষণ করা যায়নি",
        "error",
      );
    },
  });

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      updateMutation.mutate(parsed);
    } catch (e) {
      Swal.fire(
        "ভুল ফরম্যাট",
        "আপনার JSON ফরম্যাটটি সঠিক নয়! দয়া করে কমা বা ব্র্যাকেট চেক করুন।",
        "error",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedSection("about_summary")}
            className={`px-4 py-2 text-xs font-black rounded-xl border transition-all ${
              selectedSection === "about_summary"
                ? "bg-[#C8A44D] text-white border-transparent"
                : "bg-white text-neutral-500 border-neutral-200"
            }`}
          >
            আমাদের সম্পর্কে (About)
          </button>
          <button
            onClick={() => setSelectedSection("stats")}
            className={`px-4 py-2 text-xs font-black rounded-xl border transition-all ${
              selectedSection === "stats"
                ? "bg-[#C8A44D] text-white border-transparent"
                : "bg-white text-neutral-500 border-neutral-200"
            }`}
          >
            পরিসংখ্যান কার্ড (Stats)
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0B5D3B] text-white font-black text-xs rounded-xl hover:bg-green-800 shadow transition-all ml-auto"
        >
          {updateMutation.isPending ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Save size={16} />
          )}
          কন্টেন্ট সংরক্ষণ করুন
        </button>
      </div>

      {/* এডিটর ব্লক */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <label className="text-xs font-black text-neutral-400 uppercase flex items-center gap-1">
            কন্টেন্ট JSON এডিটর
          </label>
          {isLoading ? (
            <div className="h-64 flex justify-center items-center bg-neutral-50 rounded-2xl border">
              <Loader2 className="animate-spin text-[#0B5D3B]" size={28} />
            </div>
          ) : (
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-80 p-4 bg-neutral-900 text-green-400 font-mono text-sm rounded-2xl outline-none focus:ring-2 focus:ring-[#0B5D3B] transition-all shadow-inner leading-relaxed"
            />
          )}
        </div>

        {/* হেল্প গাইড বক্স */}
        <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 flex flex-col gap-3">
          <h4 className="font-black text-green-800 text-sm flex items-center gap-1">
            <HelpCircle size={18} /> এডিটর গাইডলাইন
          </h4>
          <p className="text-xs font-bold text-neutral-600 leading-relaxed">
            এটি একটি ইন্ডাস্ট্রি লেভেল ডাইনামিক এডিটর। বামপাশের ইনপুটে আপনি যে
            টেক্সট বা ভ্যালু পরিবর্তন করবেন, তা সরাসরি হোম পেজে রিফ্লেক্ট হবে।
          </p>
          <div className="text-[11px] font-mono text-neutral-500 bg-white p-3 rounded-xl border">
            <strong>সতর্কতা:</strong> ডাবল কোটেশন (&quot;&quot;) এবং কমা (,) এর
            সঠিক ব্যবহার নিশ্চিত করুন যাতে ডাটাবেস ক্র্যাশ না করে।
          </div>
        </div>
      </div>
    </div>
  );
}

// ডিফল্ট স্ট্রাকচার জেনারেটর
function getDefaultJson(type: string) {
  if (type === "about_summary") {
    return {
      title: "আমাদের সম্পর্কে",
      description:
        "দারুল ইসলাম ইনস্টিটিউট ইসলামী শিক্ষা ও আধুনিক শিক্ষার সমন্বয় ঘটিয়ে...",
      primaryBtnText: "আরও পড়ুন",
      secondaryBtnText: "যোগাযোগ করুন",
    };
  }
  return {
    experienceCount: "১৫+",
    studentCount: "৫০০+",
    teacherCount: "৩০+",
  };
}