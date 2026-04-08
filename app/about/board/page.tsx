"use client"

import { motion } from "framer-motion"
import { Users, ShieldCheck, Award, Briefcase, GraduationCap, Facebook, Linkedin, Mail } from "lucide-react"

const boardMembers = [
  {
    name: "শায়খ ড. আব্দুল্লাহ বিন জাফর",
    role: "চেয়ারম্যান",
    qualification: "পিএইচডি (মদিনা ইসলামি বিশ্ববিদ্যালয়)",
    experience: "২০+ বছরের শিক্ষকতা ও প্রশাসনিক অভিজ্ঞতা",
    bio: "ইসলামি শিক্ষা ব্যবস্থার আধুনিকায়ন ও প্রসারে তার অবদান অবিস্মরণীয়।"
  },
  {
    name: "মাওলানা মোহাম্মদ উল্লাহ",
    role: "ভাইস চেয়ারম্যান",
    qualification: "এমএ (ইসলামিক স্টাডিজ), ঢাকা বিশ্ববিদ্যালয়",
    experience: "সাবেক প্রিন্সিপাল, জামিয়া আরাবিয়া",
    bio: "হাদীস ও ফিকহ শাস্ত্রের একজন অনন্য গবেষক।"
  },
  {
    name: "প্রকৌশলী হাসান মাহমুদ",
    role: "সেক্রেটারি জেনারেল",
    qualification: "বিএসসি ইন সিভিল ইঞ্জিনিয়ারিং (বুয়েট)",
    experience: "১৫ বছরের প্রাতিষ্ঠানিক ব্যবস্থাপনা দক্ষতা",
    bio: "প্রতিষ্ঠানের পরিকাঠামো ও আধুনিক ব্যবস্থাপনা নিশ্চিত করেন।"
  },
  {
    name: "ড. শামীমা আক্তার",
    role: "শিক্ষা উপদেষ্টা",
    qualification: "পিএইচডি ইন এডুকেশন",
    experience: "সাবেক অধ্যাপক, ইডেন কলেজ",
    bio: "নারী শিক্ষা ও আধুনিক শিক্ষা কারিকুলাম প্রণয়নে পারদর্শী।"
  }
]

export default function BoardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-[#14281D] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <ShieldCheck size={40} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-black">পরিচালনা পর্ষদ</h1>
            <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">অভিজ্ঞ ও নিবেদিতপ্রাণ নেতৃত্ব</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-16 space-y-24">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl lg:text-5xl font-black text-[#14281D]">আমাদের অভিভাবকবৃন্দ</h2>
          <p className="text-lg text-[#14281D]/60 font-medium leading-relaxed">
            দারুল ইসলাম ইনস্টিটিউটের লক্ষ্য ও উদ্দেশ্য বাস্তবায়নে আমাদের পরিচালনা পর্ষদ নিরলসভাবে কাজ করে যাচ্ছেন। দেশবরেণ্য আলেম ও দক্ষ প্রশাসকদের সমন্বয়ে গঠিত এই পর্ষদ প্রতিষ্ঠানের প্রতিটি পদক্ষেপে সঠিক দিকনির্দেশনা প্রদান করেন।
          </p>
        </div>

        {/* Board Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {boardMembers.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[3rem] shadow-2xl border border-[#14281D]/5 group hover:border-[#87F56] transition-all"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="shrink-0 w-32 h-32 bg-[#14281D]/5 rounded-3xl border-4 border-[#87F56]/20 flex items-center justify-center text-[#14281D] group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all duration-300">
                  <Users size={64} />
                </div>
                <div className="space-y-4 text-center md:text-left flex-1">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-[#87F56]/10 text-[#14281D] px-3 py-1 rounded-full mb-2 inline-block">
                      {member.role}
                    </span>
                    <h3 className="text-2xl font-black text-[#14281D]">{member.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#14281D]/60">
                      <GraduationCap size={16} className="text-amber-600" /> {member.qualification}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#14281D]/60">
                      <Briefcase size={16} className="text-amber-600" /> {member.experience}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-[#14281D]/50 leading-relaxed italic border-l-4 border-[#87F56] pl-4">
                    "{member.bio}"
                  </p>

                  <div className="flex justify-center md:justify-start gap-4 pt-2">
                    <button className="w-8 h-8 rounded-full bg-[#14281D]/5 flex items-center justify-center text-[#14281D] hover:bg-[#14281D] hover:text-white transition-all">
                      <Facebook size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#14281D]/5 flex items-center justify-center text-[#14281D] hover:bg-[#14281D] hover:text-white transition-all">
                      <Linkedin size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-[#14281D]/5 flex items-center justify-center text-[#14281D] hover:bg-[#14281D] hover:text-white transition-all">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Commitment */}
        <section className="bg-[#14281D] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 text-white/5">
            <Award size={150} />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-5xl font-black text-white">আমাদের অঙ্গীকার</h2>
            <p className="text-lg text-[#E2D4B9]/80 font-medium leading-relaxed">
              আমরা প্রতিশ্রুতিবদ্ধ যে দারুল ইসলাম ইনস্টিটিউট হবে একটি আধুনিক ও সুশৃঙ্খল বিদ্যাপীঠ, যেখানে প্রতিটি শিক্ষার্থী তার মেধা ও চরিত্রের সর্বোচ্চ বিকাশ ঘটানোর সুযোগ পাবে ইনশাআল্লাহ।
            </p>
            <div className="w-24 h-1 bg-[#87F56] mx-auto rounded-full" />
          </div>
        </section>
      </main>
    </div>
  )
}
