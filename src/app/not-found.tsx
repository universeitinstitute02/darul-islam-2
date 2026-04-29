"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-6">
      <div className="w-full max-w-lg text-center">
        
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-green-100 shadow-xl rounded-3xl p-12">
          
          {/* Badge */}
          <div className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-green-100 text-green-700">
            Error 404
          </div>

          {/* Big 404 */}
          <h1 className="text-6xl font-extrabold text-green-700 mb-4 tracking-tight">
            404
          </h1>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">
            Page not found
          </h2>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            The page you’re looking for might have been removed, renamed, or is
            temporarily unavailable. Please check the URL or return home.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 rounded-xl border border-green-200 text-green-700 font-medium hover:bg-green-50 transition"
            >
              ← Go Back
            </button>

            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition shadow-md"
            >
              Go Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-green-700/60 mt-6">
          Need help? Contact support anytime.
        </p>
      </div>
    </div>
  );
}