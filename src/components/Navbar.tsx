"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Home, 
  BookOpen, 
  University, 
  HandHeart, 
  User, 
  Menu, 
  X,
  ChevronRight,
  Book,
  FileText,
  Users,
  Settings,
  Info,
  History,
  Target,

  UserCheck,
  Video,
  Image as ImageIcon,
  LogIn,
  UserPlus
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../lib/utils"

const navItems = [
  { name: "হোম", href: "/", icon: Home },
  { name: "শিক্ষা", href: "/education", icon: University },
  { name: "লাইব্রেরি", href: "/library", icon: BookOpen },
  { name: "নোটিশ", href: "/notices", icon: FileText },
  { name: "দান", href: "/donation", icon: HandHeart },
  { name: "প্রোফাইল", href: "/profile", icon: User },
]

const drawerMenuItems = [
  { name: "হোম", href: "/", icon: Home },
  { 
    name: "আমাদের সম্পর্কে", 
    submenu: [
      { name: "ইতিহাস", href: "/about/history", icon: History },
      { name: "লক্ষ্য ও উদ্দেশ্য", href: "/about/mission", icon: Target },
      { name: "পরিচালনা পর্ষদ", href: "/about/board", icon: UserCheck },
    ] 
  },
  { 
    name: "একাডেমিক বিবরণ", 
    submenu: [
      { name: "শিক্ষক প্রোফাইল", href: "/teachers", icon: Users },
      { name: "একাডেমিক", href: "/education", icon: University },

      { name: "ভর্তি ফর্ম", href: "/admission", icon: FileText },
      { name: "নোটিশ বোর্ড", href: "/notices", icon: FileText },
    ] 
  },
  { 
    name: "বিভাগসমূহ", 
    submenu: [
      { name: "কোর্স সমূহ", href: "/courses", icon: Book },
      { name: "দাওয়াহ", href: "/dawah", icon: Users },
    ] 
  },
  { name: "দান", href: "/donation", icon: HandHeart },
  { name: "যোগাযোগ", href: "/contact", icon: Info },

  { 
    name: "গ্যালারি", 
    submenu: [
      { name: "চিত্র গ্যালারি", href: "/gallery/photos", icon: ImageIcon },
      { name: "ভিডিও গ্যালারি", href: "/gallery/videos", icon: Video },
    ] 
  },
  { 
    name: "অ্যাকাউন্ট", 
    submenu: [
      { name: "লগইন", href: "/login", icon: LogIn },
      { name: "রেজিস্ট্রেশন", href: "/register", icon: UserPlus },
      { name: "প্রোফাইল", href: "/profile", icon: User },
      { name: "সেটিংস", href: "/profile", icon: Settings },
    ] 
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  return (
    <>
      {/* Header Bar */}
      <header className="bg-[#14281D] z-[60]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 border-b border-white/10 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-[#14281D] font-bold text-xl">DI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight lg:text-2xl">দারুল ইসলাম ইনস্টিটিউট</span>
              <span className="text-white/60 text-[10px] uppercase tracking-widest hidden lg:block">Darul Islam Institute</span>
            </div>
          </Link>

          <button 
            onClick={() => setIsOpen(true)}
            className="text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors lg:p-3"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* 6 Icon Nav (Desktop/Mobile overlay) */}
        <nav className="bg-green-100 border-b border-black/5">
          <div className="max-w-screen-xl mx-auto grid grid-cols-6 h-12">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="flex flex-col items-center justify-center text-[#14281D] hover:bg-black/5 transition-colors relative group"
                >
                  <Icon size={20} className="mb-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold">{item.name}</span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#14281D] scale-x-0 group-hover:scale-x-75 transition-transform" />
                </Link>
              )
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
            />

            {/* Drawer */}
            <motion.aside 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#E2D4B9] z-[80] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="bg-[#14281D] p-5 flex items-center justify-between border-b-2 border-[#30360E]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E2D4B9] rounded-full flex items-center justify-center">
                    <span className="text-[#14281D] font-bold">DI</span>
                  </div>
                  <span className="text-[#E2D4B9] font-bold text-lg">মেনু</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[#E2D4B9] hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer List */}
              <div className="flex-1 overflow-y-auto py-4 px-2">
                <ul className="space-y-1">
                  {drawerMenuItems.map((item) => (
                    <li key={item.name} className="overflow-hidden">
                      {item.submenu ? (
                        <>
                          <button 
                            onClick={() => toggleSubmenu(item.name)}
                            className={cn(
                              "w-full flex items-center justify-between p-3 rounded-lg font-bold text-[#14281D] transition-all",
                              openSubmenu === item.name ? "bg-white/40 border-l-4 border-[#14281D]" : "bg-white/10 hover:bg-white/20"
                            )}
                          >
                            <span>{item.name}</span>
                            <motion.div
                              animate={{ rotate: openSubmenu === item.name ? 90 : 0 }}
                            >
                              <ChevronRight size={18} />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-4 pl-2 mt-1 border-l-2 border-dashed border-[#14281D]/30 space-y-1"
                              >
                                {item.submenu.map((sub) => {
                                  const SubIcon = sub.icon
                                  return (
                                    <li key={sub.name}>
                                      <Link 
                                        href={sub.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 text-sm font-medium text-[#14281D]/80 hover:text-[#14281D] hover:bg-white/20 rounded-md transition-colors"
                                      >
                                        <SubIcon size={16} />
                                        {sub.name}
                                      </Link>
                                    </li>
                                  )
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link 
                          href={item.href || "#"}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-3 rounded-lg font-bold text-[#14281D] bg-white/10 hover:bg-white/20 transition-all border-l-4 border-[#30360E]"
                        >
                          {item.icon && <item.icon size={18} />}
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-[#14281D]/5 rounded-xl border border-[#14281D]/10">
                  <p className="text-[10px] text-[#14281D]/60 uppercase font-bold text-center">Darul Islam Institute v1.0</p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
