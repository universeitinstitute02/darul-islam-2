"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
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
  UserPlus,
  BellRing,
  LucideIcon, // LucideIcon টাইপটি ইমপোর্ট করুন
} from "lucide-react";

// মেনু আইটেমের জন্য টাইপ ডিফাইন করা (TypeScript এরর এড়াতে)
interface SubmenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface MenuItem {
  name: string;
  href?: string;
  icon?: LucideIcon;
  submenu?: SubmenuItem[];
}

const drawerMenuItems: MenuItem[] = [
  { name: "হোম", href: "/", icon: Home },
  {
    name: "আমাদের সম্পর্কে",
    submenu: [
      { name: "ইতিহাস", href: "/about/history", icon: History },
      { name: "লক্ষ্য ও উদ্দেশ্য", href: "/about/mission", icon: Target },
      { name: "পরিচালনা পর্ষদ", href: "/about/board", icon: UserCheck },
    ],
  },
  {
    name: "একাডেমিক বিবরণ",
    submenu: [
      { name: "শিক্ষক প্রোফাইল", href: "/dashboard/teacher", icon: Users },
      { name: "একাডেমিক", href: "/education", icon: University },
      { name: "ভর্তি ফর্ম", href: "/admission", icon: FileText },
      { name: "নোটিশ বোর্ড", href: "/notices", icon: FileText },
    ],
  },
  {
    name: "বিভাগসমূহ",
    submenu: [
      { name: "কোর্স সমূহ", href: "/courses", icon: Book },
      { name: "দাওয়াহ", href: "/dawah", icon: Users },
    ],
  },
  { name: "দান", href: "/donation", icon: HandHeart },
  { name: "যোগাযোগ", href: "/contact", icon: Info },
  {
    name: "গ্যালারি",
    submenu: [
      { name: "চিত্র গ্যালারি", href: "/gallery/photos", icon: ImageIcon },
      { name: "ভিডিও গ্যালারি", href: "/gallery/videos", icon: Video },
    ],
  },
  {
    name: "অ্যাকাউন্ট",
    submenu: [
      { name: "লগইন", href: "/auth-dashboard/login", icon: LogIn },
      {
        name: "রেজিস্ট্রেশন",
        href: "/auth-dashboard/register",
        icon: UserPlus,
      },
      { name: "প্রোফাইল", href: "/profile", icon: User },
      { name: "সেটিংস", href: "/profile", icon: Settings },
    ],
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#14281D] shadow-md border-b border-white/10">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-[#14281D] font-bold text-xl">DI</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-bold text-lg lg:text-2xl">
              দারুল ইসলাম ইনস্টিটিউট
            </span>
            <span className="text-white/60 text-[10px] hidden lg:block uppercase tracking-wider">
              Darul Islam Institute
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/notice"
            className="text-white hover:text-yellow-400 transition"
          >
            <BellRing size={24} />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 transition active:scale-95"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#E2D4B9] z-[80] shadow-2xl flex flex-col text-left"
            >
              <div className="bg-[#14281D] p-5 flex justify-between items-center shrink-0">
                <span className="text-white font-bold text-lg">মেনু</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition"
                >
                  <X className="text-white" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1">
                <ul className="space-y-3">
                  {drawerMenuItems.map((item) => {
                    const Icon = item.icon; // বড় হাতের অক্ষরে ডিক্লেয়ার করা জরুরি
                    return (
                      <li key={item.name}>
                        {item.submenu ? (
                          <>
                            <button
                              onClick={() => toggleSubmenu(item.name)}
                              className="w-full flex justify-between items-center p-3 bg-[#14281D]/5 hover:bg-[#14281D]/10 rounded-lg font-bold text-[#14281D] transition text-left"
                            >
                              <span>{item.name}</span>
                              <ChevronRight
                                size={18}
                                className={`transition-transform duration-300 ${openSubmenu === item.name ? "rotate-90" : ""}`}
                              />
                            </button>
                            <AnimatePresence>
                              {openSubmenu === item.name && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="pl-4 border-l-2 border-[#14281D]/20 mt-2 space-y-1 overflow-hidden"
                                >
                                  {item.submenu.map((sub) => {
                                    const SubIcon = sub.icon;
                                    return (
                                      <li key={sub.name}>
                                        <Link
                                          href={sub.href}
                                          onClick={() => setIsOpen(false)}
                                          className="flex items-center gap-3 p-2.5 text-sm text-[#14281D]/80 hover:text-[#14281D] hover:bg-white/40 rounded-md transition"
                                        >
                                          <SubIcon size={16} />
                                          {sub.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href || "#"}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3 bg-[#14281D]/5 hover:bg-[#14281D]/10 rounded-lg font-bold text-[#14281D] transition"
                          >
                            {Icon && <Icon size={18} />}
                            {item.name}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
