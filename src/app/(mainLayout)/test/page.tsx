"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import useUser from "../../hooks/useUser";
import {
  Loader2,
  Video,
  Calendar,
  Clock,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const TestClassLinksPage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user } = useUser();

  // ফিল্টার স্টেট টেস্ট করার জন্য
  const [selectedFilterType, setSelectedFilterType] = useState<
    "none" | "single" | "multi"
  >("none");

  // টেস্ট ডেমো কোর্স আইডি (আপনার ডাটাবেজ অনুযায়ী এগুলো পরিবর্তন করতে পারেন)
  const demoCourseId1 = "66461a2b3c4d5e6f7a8b9c02";
  const demoCourseId2 = "66461a2b3c4d5e6f7a8b9c03"; // কাল্পনিক দ্বিতীয় আইডি

  // ডাইনামিক ইউআরএল জেনারেট করার লজিক
  const getQueryString = () => {
    if (selectedFilterType === "single") return `?courseIds=${demoCourseId1}`;
    if (selectedFilterType === "multi")
      return `?courseIds=${demoCourseId1},${demoCourseId2}`;
    return "";
  };

  // TanStack Query দিয়ে API কল
  const {
    data: classData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    // ফিল্টার টাইপ চেঞ্জ হলে যেন কুয়েরি আবার রান হয় তার জন্য queryKey-তে রাখা হয়েছে
    queryKey: ["studentLiveClassLinksTest", selectedFilterType],
    queryFn: async () => {
      const url = `/class-links/student/my-links${getQueryString()}`;
      const res = await axiosSecure.get(url);
      return res.data; // আশা করা হচ্ছে response-এ { totalCount: X, data: [...] } আসবে
    },
    enabled: !!user, // ইউজার লগইন থাকলে কল হবে
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 🟢 টেস্ট কন্ট্রোল প্যানেল */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-xl font-black text-gray-800 mb-2">
            🎯 API লাইভ টেস্টিং ড্যাশবোর্ড
          </h1>
          <p className="text-xs text-gray-500 mb-4">
            এন্ডপয়েন্ট:{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono">
              /class-links/student/my-links{getQueryString()}
            </code>
          </p>

          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedFilterType("none")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedFilterType === "none"
                    ? "bg-[#105D38] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                সব ক্লাস (No Filter)
              </button>

              <button
                onClick={() => setSelectedFilterType("single")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedFilterType === "single"
                    ? "bg-[#105D38] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                সিঙ্গেল কোর্স ফিল্টার (১টি আইডি)
              </button>

              <button
                onClick={() => setSelectedFilterType("multi")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedFilterType === "multi"
                    ? "bg-[#105D38] text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                মাল্টি কোর্স ফিল্টার (২টি আইডি)
              </button>
            </div>

            <button
              onClick={() => refetch()}
              className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 text-gray-700 flex items-center gap-1.5 text-xs font-bold"
              title="ম্যানুয়াল রিফ্রেশ"
            >
              <RefreshCw
                size={14}
                className={isLoading ? "animate-spin" : ""}
              />
              রিফ্রেশ
            </button>
          </div>
        </div>

        {/* 🔵 রেসপন্স সামারি ও স্ট্যাটাস */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-400">
                টোটাল ডেটা কাউন্ট (totalCount)
              </p>
              <h3 className="text-2xl font-black text-gray-800">
                {classData?.totalCount ?? 0} টি
              </h3>
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-xs font-medium text-gray-400">
              কারেন্ট টেস্ট ইউজার
            </p>
            <h3 className="text-sm font-bold text-gray-700 truncate mt-1">
              {user ? `${user.name} (${user.role})` : "ইউজার লোড হচ্ছে না..."}
            </h3>
          </div>
        </div>

        {/* 🟡 মূল UI টেস্ট রেন্ডারিং */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-base font-bold text-gray-800 mb-4 border-b pb-2">
            🖥️ ব্রাউজার UI প্রিভিউ
          </h2>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400">
              <Loader2 className="animate-spin text-[#105D38]" size={28} />
              <p className="text-sm font-bold">
                সার্ভার থেকে লাইভ ডাটা আনা হচ্ছে...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-red-500 gap-2 bg-red-50 rounded-xl border border-red-200">
              <AlertCircle size={32} />
              <p className="text-sm font-bold">API রিকোয়েস্টে এরর এসেছে!</p>
              <p className="text-xs opacity-80">
                {(error as any)?.message || "সার্ভার রেসপন্স করেনি"}
              </p>
            </div>
          ) : classData?.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classData.data.map((item: any) => (
                <div
                  key={item._id}
                  className="p-4 bg-emerald-50/30 rounded-xl border border-emerald-100 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                        {item.course?.title || "কোর্সের নাম নেই"}
                      </span>
                      <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-emerald-700 shadow-sm">
                        <Video size={14} />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-gray-800 line-clamp-2">
                        {item.classTitle}
                      </h4>
                      <div className="flex gap-3 mt-2 text-gray-500 text-[11px] font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {item.classDate
                            ? new Date(item.classDate).toLocaleDateString(
                                "bn-BD",
                              )
                            : "N/A"}
                        </span>
                        <span className="flex items-center gap-1 text-gray-700 font-bold">
                          <Clock size={12} />
                          {item.startTime} - {item.endTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ইন্সট্রাক্টর পার্ট টেস্ট */}
                  <div className="flex items-center gap-2 pt-2 border-t border-emerald-100/60">
                    {item.instructor?.profilePicture && (
                      <img
                        src={item.instructor.profilePicture}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover bg-gray-200"
                        onError={(e) => {
                          // ইমেজ পাথ লোকাল বা ভুল হলে প্লেসহোল্ডার দেখাবে
                          (e.target as HTMLImageElement).src =
                            "https://avatars.githubusercontent.com/u/198446517?v=4";
                        }}
                      />
                    )}
                    <p className="text-[11px] font-bold text-gray-600">
                      শিক্ষক: {item.instructor?.name || "অজানা শিক্ষক"}
                    </p>
                  </div>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-[#105D38] hover:bg-[#0c462a] text-white font-bold text-xs rounded-xl shadow-sm text-center block transition-all"
                  >
                    লাইভ ক্লাসে জয়েন করুন
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <AlertCircle size={28} />
              <p className="text-xs font-bold text-gray-500">
                এই ফিল্টারে কোনো লাইভ ক্লাস খুঁজে পাওয়া যায়নি (Empty Array)।
              </p>
            </div>
          )}
        </div>

        {/* 🟣 র-রেসপন্স জেসন ভিউয়ার */}
        <div className="bg-gray-900 text-gray-200 p-4 rounded-2xl shadow-inner font-mono text-xs overflow-x-auto max-h-96">
          <p className="text-gray-400 mb-2 pb-1 border-b border-gray-800 text-[11px] font-bold">
            📋 Raw API JSON Response:
          </p>
          <pre>
            {JSON.stringify(
              classData || { message: "No data loaded yet" },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestClassLinksPage;
