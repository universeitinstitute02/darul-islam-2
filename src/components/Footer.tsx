"use client"

import Link from "next/link"
import { 
  Facebook, 
  Youtube, 
  Linkedin,
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Send,
  Twitter,
  Instagram
} from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-primary text-secondary pt-24 pb-12 px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />
      
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          {/* About Section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-premium group-hover:rotate-6 transition-transform">
                <span className="text-primary font-black text-2xl">DI</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xl leading-none">দারুল ইসলাম</span>
                <span className="text-accent text-[10px] uppercase font-bold tracking-widest">Institute</span>
              </div>
            </Link>
            <p className="text-sm font-medium leading-relaxed opacity-60 max-w-xs">
              একটি আধুনিক ও উন্নত ইসলামি শিক্ষাপ্রতিষ্ঠান যা কুরআন ও সুন্নাহর ভিত্তিতে জীবন গড়ার নিরলস প্রচেষ্টা চালিয়ে যাচ্ছে। আমাদের লক্ষ্য একটি আদর্শ সমাজ গঠন।
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, color: "#1877F2" },
                { Icon: Youtube, color: "#FF0000" },
                { Icon: Twitter, color: "#1DA1F2" },
                { Icon: Instagram, color: "#E4405F" }
              ].map(({ Icon, color }, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all overflow-hidden relative group"
                >
                  <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ backgroundColor: color }} />
                  <Icon size={18} className="relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8 lg:pl-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
              <div className="w-6 h-0.5 bg-accent" /> দ্রুত লিঙ্ক
            </h3>
            <ul className="space-y-4">
              {[
                { name: "আমাদের সম্পর্কে", href: "/about/history" },
                { name: "কোর্সসমূহ", href: "/courses" },
                { name: "ইসলামিক লাইব্রেরি", href: "/library" },
                { name: "দান প্রকল্প", href: "/donation" },
                { name: "যোগাযোগ", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-3 text-sm font-bold opacity-40 hover:opacity-100 hover:text-accent transition-all group">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments/Information */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
              <div className="w-6 h-0.5 bg-accent" /> তথ্য ও সাহায্য
            </h3>
            <ul className="space-y-4">
              {[
                "নোটিশ বোর্ড",
                "ভর্তির নির্দেশিকা",
                "সচরাচর জিজ্ঞাসা (FAQ)",
                "শিক্ষার্থী পোর্টাল",
                "ক্যারিয়ার"
              ].map((item) => (
                <li key={item}>
                  <button className="flex items-center gap-3 text-sm font-bold opacity-40 hover:opacity-100 hover:text-accent transition-all group">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent scale-50 group-hover:scale-100 transition-transform" /> {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
              <div className="w-6 h-0.5 bg-accent" /> যোগাযোগ
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-accent">
                  <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tighter text-white/40">ঠিকানা</p>
                  <span className="text-sm font-bold leading-relaxed">ঢাকা ১২২১, বাংলাদেশ। (বিস্তারিত ঠিকানা এখানে বসবে)</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-accent">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tighter text-white/40">ফোন</p>
                  <span className="text-sm font-bold">+৮৮০ ১৭০০-০০০০০০</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-accent">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-tighter text-white/40">ইমেইল</p>
                  <span className="text-sm font-bold">info@darulislam.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              Darul Islam Institute Premium Experience
            </p>
            <p className="text-xs font-bold opacity-30">
              © ২০২৬ সকল স্বত্ব সংরক্ষিত। ডিজাইন ও ডেভেলপমেন্ট বাই টিম ডিআই।
            </p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-xl">
            <Link href="/privacy" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-accent transition-colors">প্রাইভেসি পলিসি</Link>
            <div className="w-px bg-white/10" />
            <Link href="/terms" className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-accent transition-colors">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
