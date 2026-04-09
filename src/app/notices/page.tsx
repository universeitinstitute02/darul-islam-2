"use client"

import { useState } from "react"
import { 
  Megaphone, 
  Search, 
  Clock, 
  Newspaper, 
  CalendarCheck, 
  PenSquare, 
  Moon, 
  BookOpen, 
  Star, 
  ChevronRight, 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  FileText,
  Building2,
  CheckCircle2,
  Calendar
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["All", "Admission", "Exam", "Holiday", "Event", "Result"]

const notices = [
  {
    id: 1,
    category: "Admission",
    title: "New admission open 1446 AH",
    desc: "Hifz, Alim & Arabic programs. Register online now for the upcoming academic year.",
    time: "2 days ago",
    icon: CalendarCheck,
    color: "amber",
    body: `
      <p class="text-lg font-black text-[#14281D]">📢 Darul Islam Institute announces admissions for 1446 AH.</p>
      <div class="my-6 bg-[#FFFCDC] p-6 rounded-3xl border border-amber-200">
        <ul class="space-y-2 text-sm font-bold opacity-70">
          <li>• Hifz-ul-Quran (2 years)</li>
          <li>• Alim course (6 years)</li>
          <li>• Ifta specialization</li>
          <li>• Arabic language diploma</li>
        </ul>
      </div>
      <p class="font-medium leading-relaxed">🗓️ Last date: 15th Sha'ban. 📍 Walk-in interviews from Sunday to Thursday, 9am–12pm. Please bring required documents (national ID, previous certificates, photos).</p>
      <div class="bg-[#14281D] text-[#E2D4B9] p-4 rounded-2xl mt-6 flex items-center gap-3">
        <Clock size={20} className="text-[#87F56]" />
        <span class="text-sm font-black">Contact: admission@darulislam.edu</span>
      </div>
    `
  },
  {
    id: 2,
    category: "Exam",
    title: "Annual exam schedule 2025",
    desc: "Timetable for all classes published. Check dates and guidelines for the final assessments.",
    time: "5 days ago",
    icon: PenSquare,
    color: "blue",
    body: `
      <p class="text-lg font-black text-[#14281D]">📋 Examination timetable for all classes has been released.</p>
      <div class="grid grid-cols-1 gap-3 my-6">
        <div class="bg-white border-2 border-blue-100 p-4 rounded-2xl flex justify-between items-center">
            <span class="font-black">Hifz (Oral)</span>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">5th March</span>
        </div>
        <div class="bg-white border-2 border-blue-100 p-4 rounded-2xl flex justify-between items-center">
            <span class="font-black">Alim Year 1</span>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">7th March</span>
        </div>
        <div class="bg-white border-2 border-blue-100 p-4 rounded-2xl flex justify-between items-center">
            <span class="font-black">Arabic Intensive</span>
            <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">10th March</span>
        </div>
      </div>
      <p class="text-sm font-medium leading-relaxed opacity-60">Full schedule can be collected from the administration office or downloaded from the student portal.</p>
    `
  },
  {
    id: 3,
    category: "Holiday",
    title: "Eid al-Fitr vacation notice",
    desc: "Institute will remain closed for the festive break. Wishing you a blessed Eid.",
    time: "1 week ago",
    icon: Moon,
    color: "green",
    body: `
      <p class="text-lg font-black text-[#14281D]">🌙 Darul Islam Institute will remain closed from 27th Ramadan to 5th Shawwal on account of Eid al-Fitr.</p>
      <p class="mt-4 font-medium leading-relaxed">Classes will resume on 6th Shawwal. We wish all our students and faculty a joyful and blessed Eid with their families.</p>
      <div class="mt-6 bg-green-50 p-6 rounded-3xl border border-green-100 flex items-center gap-4">
        <Star className="text-green-600 shrink-0" />
        <p class="text-sm font-black text-green-800">Eid program at the main mosque: 7:30 AM. All are invited.</p>
      </div>
    `
  }
]

export default function NoticesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedNotice, setSelectedNotice] = useState<typeof notices[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotices = notices.filter(n => 
    (activeCategory === "All" || n.category === activeCategory) &&
    (n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-32 lg:h-40 bg-gradient-to-r from-emerald-800 to-teal-900 flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <Megaphone size={28} />
          </div>
          <div>
            <h1 className="text-xl lg:text-3xl font-black">ঘোষণা ও নোটিশ</h1>
            <p className="text-xs font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-0.5">দারুল ইসলাম ইনস্টিটিউটের সর্বশেষ আপডেট</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedNotice ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Search & Filters */}
              <div className="space-y-6">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="নোটিশ খুঁজুন..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white p-5 pl-14 rounded-3xl shadow-xl border border-[#14281D]/5 focus:border-[#14281D]/20 outline-none font-bold transition-all"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#14281D]/20 group-focus-within:text-[#14281D] transition-colors" size={24} />
                </div>

                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-full font-bold whitespace-nowrap transition-all border ${
                        activeCategory === cat 
                          ? "bg-[#14281D] text-[#E2D4B9] border-[#14281D] shadow-lg" 
                          : "bg-white text-[#14281D]/60 border-[#14281D]/5 hover:bg-white/80 shadow-md"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notice List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4">
                  <h3 className="text-lg font-black text-[#14281D] flex items-center gap-3">
                    <Newspaper className="text-amber-600" /> সাম্প্রতিক নোটিশসমূহ
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-[#14281D]/5 text-[#14281D]/40 px-3 py-1.5 rounded-full border border-[#14281D]/5">
                    {filteredNotices.length} টি নোটিশ
                  </span>
                </div>

                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, i) => (
                    <motion.div 
                      key={notice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedNotice(notice)}
                      className="bg-white p-6 rounded-[2rem] shadow-lg border border-[#14281D]/5 flex gap-6 items-center cursor-pointer group hover:border-[#14281D]/20 hover:shadow-2xl transition-all"
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                        notice.color === "amber" ? "bg-amber-100 text-amber-600" :
                        notice.color === "blue" ? "bg-blue-100 text-blue-600" :
                        "bg-green-100 text-green-600"
                      } group-hover:scale-110`}>
                        <notice.icon size={28} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-[#14281D]/5 px-3 py-1 rounded-full text-[#14281D]/40">{notice.category}</span>
                          <span className="text-[10px] font-bold text-[#14281D]/30 flex items-center gap-1"><Clock size={10} /> {notice.time}</span>
                        </div>
                        <h4 className="text-lg font-black text-[#14281D] group-hover:text-amber-600 transition-colors">{notice.title}</h4>
                        <p className="text-xs font-medium text-[#14281D]/50 line-clamp-1">{notice.desc}</p>
                      </div>
                      <ChevronRight className="text-[#14281D]/20 group-hover:text-[#14281D] group-hover:translate-x-1 transition-all" size={24} />
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white/50 p-12 rounded-[2rem] border-2 border-dashed border-[#14281D]/10 text-center space-y-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <FileText className="text-[#14281D]/20" />
                    </div>
                    <p className="text-sm font-bold text-[#14281D]/40">কোন নোটিশ পাওয়া যায়নি</p>
                  </div>
                )}
              </div>

              {/* Prayer Times Banner */}
              <section className="bg-[#14281D] rounded-[2.5rem] p-8 text-[#E2D4B9] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 text-white/5 rotate-12">
                  <Building2 size={120} />
                </div>
                <div className="flex items-center gap-4 shrink-0 relative z-10">
                  <div className="w-14 h-14 bg-[#87F56] text-[#14281D] rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black">আজকের নামাজের সময়</h4>
                    <p className="text-xs font-bold opacity-60 uppercase tracking-widest mt-1">ঢাকা ও পার্শ্ববর্তী এলাকা</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 flex-1 relative z-10 w-full text-center">
                  {[
                    { n: "ফজর", t: "৫:১২" },
                    { n: "যুহর", t: "১২:৩০" },
                    { n: "আসর", t: "৩:৪৫" },
                    { n: "মাগরিব", t: "৬:০২" },
                    { n: "ইশা", t: "৭:৩০" },
                  ].map((p, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-black opacity-40 uppercase mb-1">{p.n}</p>
                      <p className="font-black text-lg">{p.t}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#14281D] hover:scale-110 active:scale-95 transition-all"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-black text-[#14281D]">নোটিশ বিস্তারিত</h2>
              </div>

              {/* Content Card */}
              <div className="bg-white rounded-[3rem] shadow-2xl border border-[#14281D]/5 overflow-hidden">
                <div className={`p-10 flex items-center gap-6 border-b border-[#14281D]/5 ${
                  selectedNotice.color === "amber" ? "bg-amber-50/50" :
                  selectedNotice.color === "blue" ? "bg-blue-50/50" :
                  "bg-green-50/50"
                }`}>
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg ${
                    selectedNotice.color === "amber" ? "bg-amber-100 text-amber-600" :
                    selectedNotice.color === "blue" ? "bg-blue-100 text-blue-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    <selectedNotice.icon size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl lg:text-3xl font-black text-[#14281D] leading-tight">{selectedNotice.title}</h3>
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-black uppercase tracking-widest bg-[#14281D]/5 px-4 py-1.5 rounded-full text-[#14281D]/40">{selectedNotice.category}</span>
                       <span className="text-xs font-bold text-[#14281D]/30 flex items-center gap-2"><Clock size={14} /> {selectedNotice.time}</span>
                    </div>
                  </div>
                </div>

                <div className="p-10">
                   <div 
                    className="prose prose-slate max-w-none prose-sm font-medium leading-relaxed text-[#14281D]/80"
                    dangerouslySetInnerHTML={{ __html: selectedNotice.body }}
                   />

                   <div className="mt-12 pt-8 border-t border-[#14281D]/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-2 text-[10px] font-black text-[#14281D]/30 uppercase tracking-widest">
                        <CheckCircle2 size={14} /> Published by Admin · 200 views
                      </div>
                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-[#14281D] text-[#E2D4B9] rounded-2xl font-black text-sm shadow-xl hover:-translate-y-1 transition-all">
                          <Bookmark size={16} /> সংরক্ষণ করুন
                        </button>
                        <button className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#14281D]/10 text-[#14281D] rounded-2xl font-black text-sm hover:bg-secondary transition-colors">
                          <Share2 size={16} /> শেয়ার করুন
                        </button>
                      </div>
                   </div>
                </div>
              </div>

              {/* Related/Recent */}
              <section className="space-y-6">
                <h3 className="text-lg font-black text-[#14281D] flex items-center gap-3">
                  <Calendar className="text-amber-600" /> অন্যান্য সাম্প্রতিক নোটিশ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notices.filter(n => n.id !== selectedNotice.id).map(n => (
                    <div 
                      key={n.id}
                      onClick={() => setSelectedNotice(n)}
                      className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl flex justify-between items-center border border-[#14281D]/5 cursor-pointer hover:bg-white transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <n.icon size={18} className="text-[#14281D]/40" />
                        <span className="text-sm font-bold text-[#14281D]">{n.title}</span>
                      </div>
                      <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-tighter">{n.time}</span>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
