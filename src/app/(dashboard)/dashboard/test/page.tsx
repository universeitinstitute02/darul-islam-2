"use client";

import React, { useState, useEffect } from "react";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import {
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function DedicatedPatchTester() {
  const axiosSecure = useAxiosSecure();

  const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [marks, setMarks] = useState<number>(45);
  const [feedback, setFeedback] = useState(
    "মাশাআল্লাহ, আপনার উপস্থাপনা চমৎকার হয়েছে।",
  );

  // রিকোয়েস্ট ও রেসপন্স ট্র্যাকিং স্টেট
  const [loading, setLoading] = useState(false);
  const [fetchingIds, setFetchingIds] = useState(false);
  const [fullUrl, setFullUrl] = useState("");
  const [payloadSent, setPayloadSent] = useState<any>(null);
  const [successData, setSuccessData] = useState<any>(null);
  const [errorData, setErrorData] = useState<any>(null);

  // ১. পেজ লোড হলে অটোমেটিক রিয়েল আইডিগুলো নিয়ে আসার ফাংশন
  const fetchRealPendingIds = async () => {
    setFetchingIds(true);
    try {
      const res = await axiosSecure.get(
        "assignments/teacher/submissions?status=pending",
      );
      if (Array.isArray(res.data) && res.data.length > 0) {
        setPendingSubmissions(res.data);
        setSelectedId(res.data[0]._id); // প্রথম আইডিটি ডিফল্ট সিলেক্ট হবে
      } else {
        setPendingSubmissions([]);
        setSelectedId("");
      }
    } catch (err) {
      console.error("পেন্ডিং আইডি লোড করতে ব্যর্থ:", err);
    } finally {
      setFetchingIds(false);
    }
  };

  useEffect(() => {
    fetchRealPendingIds();
  }, []);

  // ২. শুধুমাত্র PATCH রিকোয়েস্ট ফায়ার করার কোর ফাংশন
  const handlePatchTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId.trim()) {
      alert("কোনো সাবমিশন আইডি সিলেক্ট বা ইনপুট করা হয়নি!");
      return;
    }

    setLoading(true);
    setSuccessData(null);
    setErrorData(null);

    const endpointPath = `assignments/teacher/evaluate/${selectedId.trim()}`;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://darulislam-server-v2.vercel.app/api";
    setFullUrl(`${baseUrl}/${endpointPath}`);

    const bodyData = {
      marksObtained: Number(marks),
      instructorFeedback: feedback,
    };
    setPayloadSent(bodyData);

    try {
      const res = await axiosSecure.patch(endpointPath, bodyData);
      setSuccessData(res.data);
      // সাকসেস হলে লিস্ট রিফ্রেশ করা যাতে মূল্যায়িত আইডি চলে যায়
      fetchRealPendingIds();
    } catch (err: any) {
      setErrorData({
        status: err?.response?.status || "❌ CORS / Network Blocked",
        statusText:
          err?.response?.statusText || "Preflight Rejected (OPTIONS failed)",
        message: err?.response?.data?.message || "সার্ভার রেসপন্স বডি ব্লকড।",
        rawError: err?.message || "Axios Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <div className="mb-6 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-indigo-900 flex items-center gap-2">
            🎯 PATCH Method Dedicated Debugger
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            অ্যাসাইনমেন্ট মূল্যায়ন (Evaluation API) টেস্ট করার একক উইন্ডো
          </p>
        </div>
        <button
          onClick={fetchRealPendingIds}
          disabled={fetchingIds}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={fetchingIds ? "animate-spin" : ""} />
          রিয়েল আইডি রিফ্রেশ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ফর্ম সেকশন */}
        <form
          onSubmit={handlePatchTest}
          className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-fit"
        >
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
            API Request Payload Config
          </h3>

          {/* আইডি সিলেকশন ড্রপডাউন বা ম্যানুয়াল ইনপুট */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-600">
              Submission ID (_id) *
            </label>
            {pendingSubmissions.length > 0 ? (
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50 text-slate-700 focus:ring-2 focus:ring-indigo-500"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {pendingSubmissions.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.student?.name || "Unknown"} (
                    {sub.assignment?.title?.substring(0, 12)}...)
                  </option>
                ))}
              </select>
            ) : (
              <div className="space-y-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-orange-200 rounded-xl text-xs font-mono bg-orange-50/50 text-slate-700 placeholder-slate-400"
                  placeholder="কোনো পেন্ডিং আইডি মেলেনি! ম্যানুয়ালি বসান..."
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                />
                <p className="text-[10px] text-orange-500 font-medium">
                  ⚠️ ডাটাবেজে কোনো পেন্ডিং অ্যাসাইনমেন্ট নেই অথবা GET রাউট অফ
                  আছে।
                </p>
              </div>
            )}
          </div>

          {/* মার্ক্স ও ফিডব্যাক ইনপুট */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600">
                marksObtained *
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-600">
                instructorFeedback
              </label>
              <textarea
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-700"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading || !selectedId}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Send size={13} />
            )}
            {loading
              ? "সার্ভার রেসপন্স চেক করা হচ্ছে..."
              : "ফায়ার করুন (PATCH)"}
          </button>
        </form>

        {/* টার্মিনাল / আউটপুট মনিটর */}
        <div className="md:col-span-7 bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-xl min-h-[350px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                Response Terminal
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* টার্গেট URL ও মেথড */}
            {fullUrl && (
              <div className="space-y-1 text-[11px]">
                <p className="text-indigo-400 font-bold">
                  📡 Target HTTP Configuration:
                </p>
                <p className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/50 break-all">
                  <span className="bg-indigo-500 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] mr-2">
                    PATCH
                  </span>
                  {fullUrl}
                </p>
              </div>
            )}

            {/* রিকোয়েস্ট বডি যা পাঠানো হয়েছে */}
            {payloadSent && (
              <div className="space-y-1 text-[11px]">
                <p className="text-slate-400 font-bold">
                  📦 Sent Request Body (JSON):
                </p>
                <pre className="bg-slate-950 p-2.5 rounded-lg text-amber-300 max-h-24 overflow-y-auto">
                  {JSON.stringify(payloadSent, null, 2)}
                </pre>
              </div>
            )}

            {/* কোনো অ্যাকশন না নেওয়া হলে প্রম্পট */}
            {!fullUrl && (
              <div className="text-slate-500 h-44 flex flex-col items-center justify-center text-center gap-2">
                <HelpCircle size={24} className="text-slate-700" />
                <span>বামদিকের ফর্মটি পূরণ করে সাবমিট বাটনে ক্লিক করুন।</span>
              </div>
            )}

            {/* গ্রিন সিগনাল / সাকসেস রেসপন্স */}
            {successData && (
              <div className="space-y-1.5 animate-fadeIn">
                <p className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> 🟢 SUCCESS (200 OK): CORS ও মেথড
                  সম্পূর্ণ সাকসেস!
                </p>
                <pre className="bg-emerald-950/40 border border-emerald-900 p-3 rounded-lg text-emerald-300 overflow-x-auto max-h-48 text-[11px]">
                  {JSON.stringify(successData, null, 2)}
                </pre>
              </div>
            )}

            {/* রেড সিগনাল / এরর রেসপন্স */}
            {errorData && (
              <div className="space-y-1.5 animate-fadeIn">
                <p className="text-red-400 font-bold flex items-center gap-1">
                  <AlertCircle size={14} /> 🔴 ERROR DETECTED:
                </p>
                <div className="bg-red-950/40 border border-red-900 p-3 rounded-lg text-red-300 space-y-1 text-[11px]">
                  <p>
                    <strong className="text-white">Status Code:</strong>{" "}
                    {errorData.status}
                  </p>
                  <p>
                    <strong className="text-white">Status Text:</strong>{" "}
                    {errorData.statusText}
                  </p>
                  <p>
                    <strong className="text-white">Reason:</strong>{" "}
                    {errorData.message}
                  </p>
                  <p className="text-slate-500 mt-1">
                    <strong className="text-slate-400">Axios String:</strong>{" "}
                    {errorData.rawError}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-600 border-t border-slate-800 pt-2 mt-4">
            📌 যদি টার্মিনালে <b>Status Code: ❌ CORS</b> দেখায়, তার মানে
            ব্যাকএন্ডের CORS পলিসিতে এখনও PATCH ব্লকেড রয়েছে।
          </div>
        </div>
      </div>
    </div>
  );
}
