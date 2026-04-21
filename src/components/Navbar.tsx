"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  UserPlus,
  BellRing,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

/* ---------------- NAV DATA ---------------- */

const navItems = [
  { name: "হোম", href: "/", icon: Home },
  { name: "শিক্ষা", href: "/education", icon: University },
  { name: "লাইব্রেরি", href: "/library", icon: BookOpen },
  { name: "নোটিশ", href: "/notices", icon: BellRing },
  { name: "দান", href: "/donation", icon: HandHeart },
  { name: "প্রোফাইল", href: "/profile", icon: User },
];

const drawerMenuItems = [
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
      { name: "শিক্ষক প্রোফাইল", href: "/teachers", icon: Users },
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
      { name: "লগইন", href: "/login", icon: LogIn },
      { name: "রেজিস্ট্রেশন", href: "/register", icon: UserPlus },
      { name: "প্রোফাইল", href: "/profile", icon: User },
      { name: "সেটিংস", href: "/profile", icon: Settings },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  /* ---------------- SMOOTH SCROLL LOGIC ---------------- */
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const diff = currentY - lastScrollY.current;

          // ignore micro scroll (smooth UX)
          if (Math.abs(diff) < 8) {
            ticking.current = false;
            return;
          }

          // scroll down → hide
          if (diff > 0 && currentY > 120) {
            setShowNavbar(false);
          }

          // scroll up → show
          if (diff < 0) {
            setShowNavbar(true);
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <>
      {/* MAIN NAV WRAPPER */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -140 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 22,
          mass: 0.9,
        }}
        className="fixed top-0 left-0 w-full z-[60] will-change-transform"
      >
        {/* HEADER */}
        <header className="bg-[#14281D]">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 border-b border-white/10 lg:px-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-[#14281D] font-bold text-xl">DI</span>
              </div>

              <div className="flex flex-col">
                <span className="text-white font-bold text-lg lg:text-2xl">
                  দারুল ইসলাম ইনস্টিটিউট
                </span>
                <span className="text-white/60 text-[10px] hidden lg:block">
                  Darul Islam Institute
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="text-white bg-white/10 p-2 rounded-lg hover:bg-white/20 transition"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* TOP NAV */}
          <nav className="bg-green-100 border-b border-black/5">
            <div className="max-w-screen-xl mx-auto grid grid-cols-6 h-12">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center justify-center text-[#14281D] hover:bg-black/5 transition relative group"
                  >
                    <Icon size={20} />
                    <span className="text-[11px] font-bold">{item.name}</span>

                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#14281D] scale-x-0 group-hover:scale-x-75 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </nav>
        </header>
      </motion.div>

      {/* spacing */}
      <div className="h-[104px]" />

      {/* ---------------- DRAWER ---------------- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-[70]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#E2D4B9] z-[80] shadow-2xl"
            >
              {/* header */}
              <div className="bg-[#14281D] p-5 flex justify-between items-center">
                <span className="text-white font-bold">মেনু</span>
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-white" />
                </button>
              </div>

              {/* menu */}
              <div className="p-3 overflow-y-auto h-full">
                <ul className="space-y-2">
                  {drawerMenuItems.map((item) => (
                    <li key={item.name}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.name)}
                            className="w-full flex justify-between p-3 bg-white/20 rounded-lg font-bold"
                          >
                            {item.name}
                            <ChevronRight
                              className={`transition ${
                                openSubmenu === item.name ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {openSubmenu === item.name && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 border-l mt-2 space-y-2"
                              >
                                {item.submenu.map((sub) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <li key={sub.name}>
                                      <Link
                                        href={sub.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex gap-2 p-2 text-sm hover:bg-white/30 rounded"
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
                          className="flex gap-2 p-3 bg-white/10 rounded-lg font-bold"
                        >
                          {item.icon && <item.icon size={18} />}
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}