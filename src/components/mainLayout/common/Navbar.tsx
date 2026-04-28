"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  University,
  HandHeart,
  User,
  BellRing,
} from "lucide-react";
import { motion} from "framer-motion";

/* ---------------- NAV DATA ---------------- */
const navItems = [
  { name: "হোম", href: "/", icon: Home },
  { name: "শিক্ষা", href: "/education", icon: University },
  { name: "লাইব্রেরি", href: "/library", icon: BookOpen },
  { name: "নোটিশ", href: "/notices", icon: BellRing },
  { name: "দান", href: "/donation", icon: HandHeart },
  { name: "প্রোফাইল", href: "/profile", icon: User },
];

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  /* ---------------- SCROLL LOGIC ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const diff = currentY - lastScrollY.current;

          // ৮ পিক্সেলের কম স্ক্রল হলে ইগনোর করবে (Smoothness এর জন্য)
          if (Math.abs(diff) < 8) {
            ticking.current = false;
            return;
          }

          // নিচে স্ক্রল করলে হাইড হবে, উপরে করলে শো হবে
          if (diff > 0 && currentY > 80) {
            setShowNavbar(false);
          } else {
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

  return (
    <>
      {/* MAIN NAV WRAPPER */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showNavbar ? 0 : -100 }} // নেভবারের হাইট অনুযায়ী অ্যাডজাস্ট করুন
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
        }}
        className="fixed top-0 left-0 w-full z-40 will-change-transform shadow-md"
      >
        {/* HEADER CONTAINER */}
        <div className="bg-[#14281D] mt-16 lg:mt-18">
          {/* TOP NAV / MENU BAR */}
          <nav className="bg-green-50 border-b border-black/5">
            <div className="max-w-screen-xl mx-auto grid grid-cols-6 h-14">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center justify-center text-[#14281D] hover:bg-green-200/50 transition-all relative group"
                  >
                    <Icon size={20} strokeWidth={2.5} />
                    <span className="text-[10px] sm:text-[11px] font-bold mt-1">
                      {item.name}
                    </span>

                    {/* Active Indicator Hover Effect */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#14281D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </motion.div>
      
      {/* নেভবারটি ফিক্সড হওয়ার কারণে কন্টেন্ট যাতে ঢেকে না যায় সেজন্য স্পেসার */}
      <div className="h-14"></div>
    </>
  );
}