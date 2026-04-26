"use client"

import Link from "next/link"
import { 
  Facebook, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Twitter,
  Instagram
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-green-50 pt-24 pb-12 px-6 lg:px-8 border-t border-green-700/30 relative overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-repeat" />

      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">

          {/* About */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <span className="text-green-900 font-black text-2xl">DI</span>
              </div>
              <div>
                <span className="text-white font-black text-xl">দারুল ইসলাম</span>
                <span className="block text-green-300 text-[10px] uppercase font-bold tracking-widest">Institute</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-green-100/70 max-w-xs">
              একটি আধুনিক ও উন্নত ইসলামি শিক্ষাপ্রতিষ্ঠান যা কুরআন ও সুন্নাহর ভিত্তিতে জীবন গড়ার নিরলস প্রচেষ্টা চালিয়ে যাচ্ছে।
            </p>

            <div className="flex gap-4">
              {[Facebook, Youtube, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-green-200 hover:bg-green-500 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-8 lg:pl-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
              <div className="w-6 h-0.5 bg-green-400" /> দ্রুত লিঙ্ক
            </h3>

            <ul className="space-y-4">
              {[
                { name: "আমাদের সম্পর্কে", href: "/about/history" },
                { name: "কোর্সসমূহ", href: "/courses" },
                { name: "লাইব্রেরি", href: "/library" },
                { name: "দান", href: "/donation" },
                { name: "যোগাযোগ", href: "/contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-3 text-sm font-bold text-green-100/60 hover:text-green-300 transition-all group">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
              <div className="w-6 h-0.5 bg-green-400" /> তথ্য ও সাহায্য
            </h3>

            <ul className="space-y-4">
              {[
                "নোটিশ বোর্ড",
                "ভর্তির নির্দেশিকা",
                "FAQ",
                "শিক্ষার্থী পোর্টাল",
                "ক্যারিয়ার"
              ].map((item) => (
                <li key={item}>
                  <button className="flex items-center gap-3 text-sm font-bold text-green-100/60 hover:text-green-300 transition-all group">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full scale-50 group-hover:scale-100 transition-transform" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
              <div className="w-6 h-0.5 bg-green-400" /> যোগাযোগ
            </h3>

            <ul className="space-y-6 text-green-100/80">
              <li className="flex gap-4">
                <MapPin className="text-green-400" size={18} />
                <span>ঢাকা ১২২১, বাংলাদেশ</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-green-400" size={18} />
                <span>+৮৮০ ১৭০০-০০০০০০</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-green-400" size={18} />
                <span>info@darulislam.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-20 pt-8 border-t border-green-700/30 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-xs text-green-200/40">
            © ২০২৬ দারুল ইসলাম — সকল স্বত্ব সংরক্ষিত
          </p>

          <div className="flex bg-white/5 rounded-xl overflow-hidden">
            <Link href="/privacy" className="px-4 py-2 text-xs text-green-200/50 hover:text-green-300">প্রাইভেসি</Link>
            <div className="w-px bg-white/10" />
            <Link href="/terms" className="px-4 py-2 text-xs text-green-200/50 hover:text-green-300">শর্তাবলী</Link>
          </div>

        </div>
      </div>
    </footer>
  )
}