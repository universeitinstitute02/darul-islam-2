"use client"

import { useState } from "react"
import { 
  HandHeart, 
  Clock, 
  Smartphone, 
  Building2, 
  CreditCard, 
  Calculator, 
  Droplets, 
  BookMarked, 
  Building, 
  Users,
  ArrowRight,
  Info,
  CheckCircle2

} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const presets = ["৫০০", "১০০০", "২০০০", "৫০০০"]

const paymentMethods = [
  { id: "bkash", name: "বিকাশ", icon: Smartphone, color: "text-pink-600" },
  { id: "nagad", name: "নগদ", icon: Smartphone, color: "text-orange-600" },
  { id: "rocket", name: "রকেট", icon: Smartphone, color: "text-purple-600" },
  { id: "bank", name: "ব্যাংক", icon: Building2, color: "text-blue-800" },
  { id: "card", name: "কার্ড", icon: CreditCard, color: "text-gray-700" },
]

const causes = [
  {
    title: "মসজিদ নির্মাণ",
    desc: "আমাদের নতুন মসজিদ নির্মাণে আপনার সাহায্য প্রয়োজন। প্রতিটি টাকা সদাকাহ জারিয়াহ।",
    progress: 42,
    goal: "২৫,০০,০০০৳",
    image: "https://images.unsplash.com/photo-1596720426673-e47744396391?q=80&w=1972&auto=format&fit=crop",
    icon: Building

  },
  {
    title: "এতিম স্পনসর",
    desc: "মাসিক ১,২০০ টাকায় একটি এতিম শিশুর শিক্ষা, খাদ্য ও বাসস্থানের ব্যবস্থা করুন।",
    count: "৮৪ জন",
    goal: "মাসিক ১,২০০৳",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    icon: Users
  },
  {
    title: "কূপ খনন",
    desc: "সুদূর পল্লীতে বিশুদ্ধ পানির ব্যবস্থা করুন। একটি কূপ চিরকালীন সদাকাহ।",
    progress: 68,
    goal: "৮০,০০০৳",
    image: "https://images.unsplash.com/photo-1582213713303-9257ac978839?q=80&w=2070&auto=format&fit=crop",
    icon: Droplets
  },
  {
    title: "কুরআন বিতরণ",
    desc: "মাত্র ৩০০ টাকায় একটি পবিত্র কুরআন শরীফ বিতরণ করুন। সদাকায়ে জারিয়ার মাধ্যম।",
    count: "২,৩৪০ কপি",
    goal: "প্রতি কপি ৩০০৳",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
    icon: BookMarked
  }
]

export default function DonationPage() {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("bkash")
  const [isCalculated, setIsCalculated] = useState(false)
  const [zakatInput, setZakatInput] = useState("")

  const handleCalculateZakat = () => {
    if (zakatInput) setIsCalculated(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-gradient-to-br from-[#14281D] to-[#30360E] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
              <HandHeart size={40} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-black">আল্লাহর পথে দান করুন</h1>
              <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">সদাকাহ • যাকাত • লিল্লাহ</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/5 max-w-md">
            <p className="text-xs lg:text-sm font-medium leading-relaxed italic opacity-90">
              “যারা আল্লাহর পথে ধনসম্পদ ব্যয় করে, তাদের উদাহরণ একটি শস্যদানা, যা সাতটি শীষ জন্মায়।” (সূরা বাকারা ২:২৬১)
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form & Info */}
        <div className="lg:col-span-12 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#14281D]/5 space-y-8"
            >
              <h2 className="text-2xl font-black text-[#14281D] flex items-center gap-3">
                <Clock className="text-amber-600" /> দ্রুত দান ফর্ম
              </h2>

              <div className="space-y-6">
                {/* Amount Presets */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#14281D]/60 uppercase tracking-wider">পরিমাণ নির্বাচন করুন</label>
                  <div className="flex flex-wrap gap-3">
                    {presets.map((p) => (
                      <button
                        key={p}
                        onClick={() => setAmount(p)}
                        className={`px-6 py-3 rounded-2xl font-black transition-all ${
                          amount === p 
                            ? "bg-[#14281D] text-[#E2D4B9] shadow-lg scale-105" 
                            : "bg-[#14281D]/5 text-[#14281D] hover:bg-[#14281D]/10"
                        }`}
                      >
                        {p}৳
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#14281D]/60 uppercase tracking-wider">অথবা নিজের পরিমাণ লিখুন</label>
                  <div className="relative group">
                    <input 
                      type="number" 
                      placeholder="যেমন: ৭৫০"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-[#14281D]/5 border-2 border-transparent focus:border-[#14281D]/20 outline-none p-4 rounded-2xl font-bold transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-xl text-[#14281D]/30 group-focus-within:text-[#14281D]">৳</div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[#14281D]/60 uppercase tracking-wider">পেমেন্ট পদ্ধতি</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {paymentMethods.map((m) => {
                      const Icon = m.icon
                      return (
                        <button
                          key={m.id}
                          onClick={() => setMethod(m.id)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                            method === m.id 
                              ? "bg-white border-[#14281D] shadow-xl" 
                              : "bg-white border-[#14281D]/5 hover:border-[#14281D]/20"
                          }`}
                        >
                          <Icon className={m.color} size={20} />
                          <span className="font-bold text-[#14281D] text-sm">{m.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <button className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all">
                  এখনই দান করুন <ArrowRight />
                </button>
              </div>
            </motion.div>

            {/* Payment Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#14281D] text-[#E2D4B9] p-8 rounded-[2.5rem] shadow-xl space-y-6 border border-white/5">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <Info className="text-[#87F56]" /> পেমেন্ট তথ্য
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest text-[#87F56]/60">বিকাশ (মার্চেন্ট)</p>
                    <p className="font-black text-lg">০১৭১২-৩৪৫৬৭৮</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest text-orange-400">নগদ</p>
                    <p className="font-black text-lg">০১৭৯৮-৭৬৫৪৩২</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1 sm:col-span-2">
                    <p className="text-[10px] uppercase font-bold text-white/40 tracking-widest text-blue-400">ইসলামি ব্যাংক পিএলসি</p>
                    <p className="font-black text-lg">A/C: ২০৫৫৬৭৮৯০১২৩</p>
                    <p className="text-[10px] font-bold text-white/40">রাউটিং: ১২৩৪৫৬৭৮৯</p>
                  </div>
                </div>
                <p className="text-xs font-medium text-white/40 italic">বিকাশ বা নগদ থেকে পেমেন্ট করতে 'Payment' অপশন ব্যবহার করুন।</p>
              </div>

              {/* Zakat Calculator Short */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-[#14281D]/5 space-y-4">
                <h3 className="text-lg font-black text-[#14281D] flex items-center gap-3">
                  <Calculator className="text-amber-600" /> যাকাত ক্যালকুলেটর
                </h3>
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    placeholder="সঞ্চয়ের পরিমাণ (টাকা)" 
                    value={zakatInput}
                    onChange={(e) => setZakatInput(e.target.value)}
                    className="flex-1 bg-[#14281D]/5 p-4 rounded-2xl font-bold outline-none border-2 border-transparent focus:border-[#14281D]/20 transition-all"
                  />
                  <button 
                    onClick={handleCalculateZakat}
                    className="bg-[#14281D] text-[#E2D4B9] px-6 rounded-2xl font-black text-sm"
                  >
                    নির্ণয়
                  </button>
                </div>
                <AnimatePresence>
                  {isCalculated && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-green-50 p-4 rounded-2xl border border-green-100 flex items-center gap-3"
                    >
                      <CheckCircle2 className="text-green-600 shrink-0" />
                      <p className="text-sm font-bold text-green-800">আপনার যাকাত: {(Number(zakatInput) * 0.025).toLocaleString()}৳</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Causes Grid */}
          <div className="space-y-8 pt-12">
            <h2 className="text-3xl font-black text-[#14281D] flex items-center gap-3">
              <HandHeart /> আপনার দান যেখানে যাবে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {causes.map((cause, i) => (
                <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#14281D]/5 group">
                  <div className="relative h-64">
                    <Image 
                      src={cause.image} 
                      alt={cause.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div className="bg-[#87F56] text-[#14281D] p-3 rounded-2xl shadow-lg">
                        <cause.icon size={24} />
                      </div>
                      <div className="text-white text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#87F56]">প্রয়োজন</p>
                        <p className="text-xl font-black">{cause.goal}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-2xl font-black text-[#14281D]">{cause.title}</h4>
                      <p className="text-sm font-medium text-[#14281D]/60 mt-2 leading-relaxed">
                        {cause.desc}
                      </p>
                    </div>

                    {cause.progress ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-black">
                          <span className="text-[#14281D]/40 uppercase tracking-widest">ফান্ড রাইজিং</span>
                          <span className="text-[#14281D]">{cause.progress}% সম্পন্ন</span>
                        </div>
                        <div className="w-full h-3 bg-[#14281D]/5 rounded-full overflow-hidden border border-[#14281D]/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${cause.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-green-500 to-[#14281D]" 
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#14281D]/5 p-4 rounded-2xl flex items-center justify-between">
                        <span className="text-xs font-black text-[#14281D]/40 uppercase tracking-widest">বর্তমানে সহায়তাপ্রাপ্ত</span>
                        <span className="font-black text-[#14281D]">{cause.count}</span>
                      </div>
                    )}

                    <button className="w-full bg-[#14281D]/5 text-[#14281D] py-4 rounded-2xl font-black group-hover:bg-[#14281D] group-hover:text-[#E2D4B9] transition-all duration-300">
                      অনুদান প্রদান করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
