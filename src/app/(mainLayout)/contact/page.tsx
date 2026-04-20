"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFCDC]">
      {/* Hero Section */}
      <section className="relative h-48 lg:h-64 bg-[#14281D] flex items-end p-6 lg:p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
        <div className="relative z-10 w-full max-w-screen-xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-[#87F56] rounded-2xl flex items-center justify-center text-[#14281D] shadow-lg">
            <MessageSquare size={40} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-black">যোগাযোগ</h1>
            <p className="text-sm font-bold text-[#E2D4B9]/80 uppercase tracking-widest mt-1">আমাদের সাথে সংযুক্ত হোন</p>
          </div>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto w-full px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-[#14281D]/5 space-y-4"
            >
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-black text-[#14281D]">ঠিকানা</h3>
              <p className="text-sm font-medium text-[#14281D]/60 leading-relaxed">
                দারুল ইসলাম ইনস্টিটিউট ক্যাম্পাস,<br />
                বাড়ি নং-৪৫, রোড-০৭, ব্লক-ডি,<br />
                উত্তরা, ঢাকা-১২৩০।
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-[#14281D]/5 space-y-4"
            >
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-black text-[#14281D]">ফোন ও মোবাইল</h3>
              <p className="text-sm font-medium text-[#14281D]/60 leading-relaxed">
                হেল্পলাইন: ০১৭০০-০০০০০০<br />
                অফিস: ০২-৯৮৭৬৫৪৩
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-[#14281D]/5 space-y-4"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-black text-[#14281D]">ইমেইল</h3>
              <p className="text-sm font-medium text-[#14281D]/60 leading-relaxed">
                info@darulislam.com<br />
                admission@darulislam.com
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#14281D] p-8 rounded-3xl shadow-xl space-y-4 text-[#E2D4B9]"
            >
              <div className="w-12 h-12 bg-[#87F56] text-[#14281D] rounded-2xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-black text-white">অফিস সময়</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                শনিবার - বৃহস্পতিবার<br />
                সকাল ৯:০০ - বিকাল ৫:০০
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 lg:p-12 rounded-[3rem] shadow-2xl border-4 border-amber-50"
            >
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Send size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-[#14281D]">ধন্যবাদ!</h2>
                  <p className="text-lg text-[#14281D]/60 font-medium">আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#14281D] text-[#E2D4B9] px-8 py-3 rounded-2xl font-bold"
                  >
                    আবার পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-widest">আপনার নাম</label>
                      <input 
                        required
                        type="text" 
                        placeholder="নাম লিখুন"
                        className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-widest">মোবাইল নম্বর</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="০১৭XXXXXXXX"
                        className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-widest">ইমেইল (ঐচ্ছিক)</label>
                      <input 
                        type="email" 
                        placeholder="example@gmail.com"
                        className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-widest">বার্তার বিষয়</label>
                      <input 
                        required
                        type="text" 
                        placeholder="বিষয় লিখুন"
                        className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-sm font-black text-[#14281D]/60 uppercase tracking-widest">আপনার বার্তা</label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="এখানে আপনার বার্তা লিখুন..."
                        className="w-full bg-[#14281D]/5 p-4 rounded-2xl font-bold border-2 border-transparent focus:border-[#14281D]/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#14281D] text-[#E2D4B9] py-5 rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
                  >
                    বার্তা পাঠান <Send size={24} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 bg-white p-4 rounded-[2.5rem] shadow-xl border border-[#14281D]/5 h-64 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#E2D4B9]/20 flex flex-col items-center justify-center gap-4">
                <Globe size={48} className="text-[#14281D]/20" />
                <p className="text-[#14281D]/40 font-bold uppercase tracking-widest">Google Map Integration Here</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
