"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ApiTestPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://darulislam-server-v2.vercel.app/api/donations";

  // আপনার নেক্সট-অথ সেশন থেকে অটোমেটিক টোকেনটি নিয়ে নিবে
  const token = session?.accessToken || "YOUR_FALLBACK_TOKEN_IF_NOT_LOGGED_IN";

  const addLog = (message: string, data?: any) => {
    setLogs((prev) => [
      ...prev,
      `⏰ ${new Date().toLocaleTimeString()} - ${message}`,
      data ? JSON.stringify(data, null, 2) : "",
    ]);
  };

  const runTests = async () => {
    setLoading(true);
    setLogs([]);
    addLog("🚀 Testing Started...");

    const adminHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    let targetDonationId = "6662f592a104b2b456789abc"; // Fallback ID

    // === ১. Submit Donation (Public) ===
    try {
      addLog("⏳ 1. Submitting Public Donation (POST /)...");
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Donor Shams",
          phone: "01700000000",
          amount: 1500,
          method: "bkash",
          campaignSlug: "masjid-renovation",
          senderNumber: "01711223344",
          trxId:
            "TRX" + Math.random().toString(36).substring(2, 10).toUpperCase(),
          address: "Rangpur, Bangladesh",
        }),
      });
      const result = await res.json();
      addLog(`✅ Submit Response [Status: ${res.status}]`, result);
    } catch (err: any) {
      addLog(`❌ Submit Failed: ${err.message}`);
    }

    // === ২. Get Donation Logs (Admin) ===
    try {
      addLog("⏳ 2. Fetching Admin Logs (GET /admin/all?status=pending)...");
      const res = await fetch(`${BASE_URL}/admin/all?status=pending`, {
        method: "GET",
        headers: adminHeaders,
      });
      const result = await res.json();
      addLog(`✅ Get Logs Response [Status: ${res.status}]`, result);

      if (result.success && result.data?.length > 0) {
        targetDonationId = result.data[0]._id;
        addLog(
          `🎯 Dynamically picked dynamic ID for next steps: ${targetDonationId}`,
        );
      }
    } catch (err: any) {
      addLog(`❌ Get Logs Failed: ${err.message}`);
    }

    // === ৩. Approve Donation (Admin) ===
    try {
      addLog(
        `⏳ 3. Approving Donation (PUT /admin/approve/${targetDonationId})...`,
      );
      const res = await fetch(`${BASE_URL}/admin/approve/${targetDonationId}`, {
        method: "PUT",
        headers: adminHeaders,
      });
      const result = await res.json();
      addLog(`✅ Approve Response [Status: ${res.status}]`, result);
    } catch (err: any) {
      addLog(`❌ Approve Failed: ${err.message}`);
    }

    // === ৪. Reject Donation (Admin) ===
    try {
      addLog(
        `⏳ 4. Rejecting Donation (PUT /admin/reject/${targetDonationId})...`,
      );
      const res = await fetch(`${BASE_URL}/admin/reject/${targetDonationId}`, {
        method: "PUT",
        headers: adminHeaders,
      });
      const result = await res.json();
      addLog(`✅ Reject Response [Status: ${res.status}]`, result);
    } catch (err: any) {
      addLog(`❌ Reject Failed: ${err.message}`);
    }

    addLog("🏁 All API testing requests finished.");
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans bg-slate-900 text-slate-100 min-h-screen rounded-2xl my-5 shadow-2xl">
      <h1 className="text-2xl font-bold mb-2 text-emerald-400">
        Darul Islam API Live Tester
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Current Token Status:{" "}
        {session?.accessToken
          ? "🟢 Loaded from Session"
          : "🔴 Token missing (Log in first or insert manually)"}
      </p>

      <button
        onClick={runTests}
        disabled={loading}
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50"
      >
        {loading ? "Running Tests..." : "🚀 Run All API Tests"}
      </button>

      <div className="mt-8 bg-slate-950 p-5 rounded-xl border border-slate-800">
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-3">
          Console Logs:
        </h3>
        <pre className="whitespace-pre-wrap font-mono text-sm leading-6 text-slate-300 max-h-[500px] overflow-y-auto">
          {logs.length === 0
            ? "Click the button to generate test logs..."
            : logs.join("\n")}
        </pre>
      </div>
    </div>
  );
}
