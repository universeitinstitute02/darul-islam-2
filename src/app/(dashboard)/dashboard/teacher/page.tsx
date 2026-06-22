import React from "react";
import {
  User,
  Calendar,
  Mail,
  Phone,
  BookOpen,
  Users,
  Percent,
  FileText,
  ClipboardList,
  CheckSquare,
  GraduationCap,
  Bell,
  Folder,
  Scale,
  HelpCircle,
  CheckCircle,
  XCircle,
  ShieldAlert,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 text-gray-800 antialiased selection:bg-emerald-100">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* --- Profile Section --- */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-2">
            {/* Profile Image & Status */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-28 h-28 rounded-full border-4 border-gray-100 shadow-inner bg-gray-200 overflow-hidden flex items-center justify-center">
                {/* Placeholder avatar logic. Replace 'src' with actual path if needed */}
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                অনলাইনে আছেন
              </span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  মাওলানা আব্দুল্লাহ আল মামুন
                </h1>
                <p className="text-emerald-700 font-medium text-sm mt-0.5">
                  কুরআন বিভাগ - সিনিয়র শিক্ষক
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-gray-700">
                      শিক্ষক আইডি:
                    </strong>{" "}
                    DIIT-2023-017
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-gray-700">
                      যোগদানের তারিখ:
                    </strong>{" "}
                    ০১ জানুয়ারি, ২০২৩
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 break-all">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-gray-700">
                      ইমেইল:
                    </strong>{" "}
                    abdullah@diit.edu.bd
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong className="font-semibold text-gray-700">
                      মোবাইল:
                    </strong>{" "}
                    ০১৭১২-৩৪৫৬৭৮
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Quick Stats Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {[
            {
              label: "আজকের ক্লাস",
              value: "০৬",
              icon: Users,
              color: "text-emerald-600 bg-emerald-50",
            },
            {
              label: "মোট শিক্ষার্থী",
              value: "১২৮",
              icon: User,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "উপস্থিতির হার",
              value: "৯৫%",
              icon: Percent,
              color: "text-orange-600 bg-orange-50",
            },
            {
              label: "চলমান কোর্স",
              value: "০৪",
              icon: BookOpen,
              color: "text-purple-600 bg-purple-50",
            },
            {
              label: "বেতন স্ট্যাটাস",
              value: "আসন্ন",
              icon: FileText,
              color: "text-teal-600 bg-teal-50",
              colSpan: "col-span-2 sm:col-span-4 md:col-span-1",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center justify-center transition-all hover:shadow-md ${stat.colSpan || ""}`}
            >
              <div className={`p-2.5 rounded-xl ${stat.color} mb-2`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-xs text-gray-500 font-medium mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* --- Main Menu / মূল মেনু --- */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3.5 px-1">
            মূল মেনু
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                title: "আমার ক্লাসসমূহ",
                icon: BookOpen,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "সিলেবাস ও পাঠ পরিকল্পনা",
                icon: ClipboardList,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "উপস্থিতি ব্যবস্থাপনা",
                icon: CheckSquare,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "পরীক্ষা ও ফলাফল",
                icon: GraduationCap,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "নোটিশ বোর্ড",
                icon: Bell,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "ফাইল ও ডকুমেন্টস",
                icon: Folder,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "নীতিমালা ও আইন",
                icon: Scale,
                color: "text-emerald-600 bg-emerald-50",
              },
              {
                title: "সাহায্য ও সাপোর্ট",
                icon: HelpCircle,
                color: "text-emerald-600 bg-emerald-50",
              },
            ].map((item, idx) => (
              <button
                key={idx}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col items-center justify-center text-center group"
              >
                <div className="p-3 rounded-xl bg-gray-50 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors mb-3">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-emerald-900 transition-colors px-1 line-clamp-2">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Rules & Guidelines Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* করণীয় (Do's) */}
          <div className="bg-white rounded-xl border border-emerald-100 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-emerald-800">করণীয়</h3>
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <ul className="mt-3 space-y-2 text-xs font-medium text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span> সময়মতো
                  ক্লাস নেওয়া
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span>{" "}
                  শিক্ষার্থীদের সাথে উত্তম আচরণ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span> সিলেবাস
                  অনুসরণ করা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span> উপস্থিতি
                  আপডেট করা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">●</span> অভিভাবকদের
                  সাথে যোগাযোগ রাখা
                </li>
              </ul>
            </div>
            <div className="p-3 bg-emerald-50/50 border-t border-emerald-50 text-center">
              <button className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition">
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>

          {/* নিষেধ (Don'ts) */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-rose-800">নিষেধ</h3>
                <XCircle className="w-5 h-5 text-rose-500" />
              </div>
              <ul className="mt-3 space-y-2 text-xs font-medium text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">●</span> শিক্ষার্থীদের
                  অপমান করা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">●</span> অনুমতি ছাড়া
                  ক্লাস বাতিল করা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">●</span> প্রতিষ্ঠানের
                  ভাবমূর্তি ক্ষুণ্ন করা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">----</span> ব্যক্তিগত
                  প্রচারণা করা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-0.5">●</span> গোপন তথ্য
                  প্রকাশ করা
                </li>
              </ul>
            </div>
            <div className="p-3 bg-rose-50/30 border-t border-rose-50 text-center">
              <button className="text-xs font-bold text-rose-700 hover:text-rose-900 transition">
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>

          {/* আইন ও বিধিমালা (Rules) */}
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-blue-800">আইন ও বিধিমালা</h3>
                <ShieldAlert className="w-5 h-5 text-blue-500" />
              </div>
              <ul className="mt-3 space-y-2 text-xs font-medium text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">●</span> শিক্ষক
                  আচরণবিধি
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">●</span> ছুটির নিয়ম
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">●</span> শাস্তিমূলক
                  ব্যবস্থা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">●</span> অভিযোগ
                  নীতিমালা
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">●</span> তথ্য গোপনীয়তা
                  নীতি
                </li>
              </ul>
            </div>
            <div className="p-3 bg-blue-50/30 border-t border-blue-50 text-center">
              <button className="text-xs font-bold text-blue-700 hover:text-blue-900 transition">
                বিস্তারিত দেখুন
              </button>
            </div>
          </div>
        </div>

        {/* --- Hadith Quote Section --- */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-5 md:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          {/* Subtle background overlay to mimic structure/mosque pattern vibe if needed */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent hidden sm:block"></div>

          <div className="relative z-10 space-y-3">
            <span className="text-emerald-300 font-bold text-xs tracking-wide uppercase bg-emerald-900/50 px-2.5 py-1 rounded-md border border-emerald-700/50 inline-block">
              আজকের হাদিস
            </span>

            <div className="space-y-2">
              <p
                className="text-right font-serif text-lg md:text-xl text-emerald-100 tracking-wide dir-rtl"
                dir="rtl"
              >
                إِنَّمَا بُعِثْتُ لِأُتَمِّمَ مَكَارِمَ الْأَخْلَاقِ
              </p>
              <p className="text-xs md:text-sm font-medium leading-relaxed text-gray-200">
                “আমি উত্তম চরিত্র পূর্ণ করার জন্য প্রেরিত হয়েছি।”
                <span className="text-emerald-300 block sm:inline sm:ml-2 font-normal text-[11px]">
                  (সহীহ বুখারী: ৬১১৫)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
