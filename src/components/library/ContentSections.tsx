"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  Star,
  Search,
  NotebookText,
  NotebookPen,
} from "lucide-react";
import { PiMosqueDuotone } from "react-icons/pi";
import {
  FaBook,
  FaBookOpen,
  FaMoon,
  FaMosque,
  FaPrayingHands,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ─────────────── DATA ─────────────── */

const bannerSlides = [
  {
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=900",
    tag: "জ্ঞান",
    title: "যাকাত ও ফিতরা",
    subtitle: "ইসলামের অন্যতম স্তম্ভ সম্পর্কে জানুন",
  },
  {
    image: "https://images.unsplash.com/photo-1564769610726-59cead6a6f8f?w=900",
    tag: "আমল",
    title: "ঈদের সুন্নাহ",
    subtitle: "ঈদের দিনের সঠিক আমলসমূহ",
  },
  {
    image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=900",
    tag: "দু'আ",
    title: "রমাদানের বিশেষ দু'আ",
    subtitle: "প্রতিটি মুহূর্তের জন্য নির্বাচিত দু'আ",
  },
];

const ilmCategories = [
  {
    name: "কুরআন",
    slug: "quran",
    icon: <NotebookText size={24} />,
    color: "#1a4731",
    light: "#e8f5ee",

    banner: "আল্লাহর বাণী ও মানবজাতির জন্য পূর্ণাঙ্গ জীবন বিধান",

    title: "কুরআন শিক্ষা ও তাফসীর",

    subtitle:
      "পবিত্র কুরআনের তিলাওয়াত, তাফসীর, অনুবাদ ও গুরুত্বপূর্ণ বিষয়সমূহ নিয়ে সমৃদ্ধ সংগ্রহ",

    description:
      "এই বিভাগে পবিত্র কুরআনের বাংলা অনুবাদ, তাফসীর, তাজবীদ শিক্ষা এবং বিষয়ভিত্তিক আয়াতের ব্যাখ্যা সংরক্ষণ করা হয়েছে। শিক্ষার্থী ও সাধারণ পাঠক সহজেই এখান থেকে কুরআনের জ্ঞান অর্জন করতে পারবে।",

    totalBooks: 48,

    books: [
      "তাফসীরে ইবনে কাসীর",
      "তাফহীমুল কুরআন",
      "সহজ কুরআন শিক্ষা",
      "তাজবীদ শিক্ষা",
    ],
  },

  {
    name: "হাদীস",
    slug: "hadis",
    icon: <PiMosqueDuotone size={24} />,
    color: "#2d3a1e",
    light: "#edf0e8",

    banner: "রাসূল ﷺ এর জীবনাদর্শ ও গুরুত্বপূর্ণ হাদীসসমূহ",

    title: "হাদীস ও সুন্নাহ",

    subtitle:
      "সহীহ হাদীস, সুন্নাহ ও ইসলামী জীবন ব্যবস্থার গুরুত্বপূর্ণ নির্দেশনা",

    description:
      "এই বিভাগে সহীহ বুখারী, মুসলিম, তিরমিযীসহ বিভিন্ন হাদীস গ্রন্থ এবং রাসূল ﷺ এর জীবনাদর্শ সম্পর্কিত গুরুত্বপূর্ণ বইসমূহ সংরক্ষিত আছে।",

    totalBooks: 36,

    books: ["সহীহ বুখারী", "রিয়াদুস সালেহীন", "৪০ হাদীস", "শামায়েলে তিরমিযী"],
  },

  {
    name: "কিতাব",
    slug: "kitab",
    icon: <FaBook size={24} />,
    color: "#3b2a0f",
    light: "#f5ede0",

    banner: "ইসলামী জ্ঞানচর্চার জন্য নির্বাচিত গুরুত্বপূর্ণ কিতাবসমূহ",

    title: "ইসলামী কিতাব",

    subtitle:
      "আকীদা, ফিকহ, ইতিহাস ও ইসলামী জ্ঞানভিত্তিক বিভিন্ন কিতাবের সংগ্রহ",

    description:
      "এই বিভাগে আকীদা, ফিকহ, সীরাত, ইসলামী ইতিহাস এবং নৈতিক শিক্ষা সম্পর্কিত গুরুত্বপূর্ণ কিতাবসমূহ সংরক্ষণ করা হয়েছে।",

    totalBooks: 52,

    books: [
      "বেহেশতি জেওর",
      "ফাযায়েলে আমল",
      "আর-রাহীকুল মাখতুম",
      "আকীদাতুত তাহাবিয়া",
    ],
  },

  {
    name: "প্রবন্ধ",
    slug: "probondho",
    icon: <NotebookPen size={24} />,
    color: "#0f2b3b",
    light: "#e0edf5",

    banner: "সমসাময়িক ইসলামি চিন্তা ও গবেষণাভিত্তিক প্রবন্ধসমূহ",

    title: "ইসলামী প্রবন্ধ",

    subtitle:
      "দাওয়াহ, সমাজ, নৈতিকতা ও আধুনিক বিষয় নিয়ে ইসলামিক প্রবন্ধ সংগ্রহ",

    description:
      "এই বিভাগে সমসাময়িক বিভিন্ন ইসলামিক বিষয়, সমাজ সংস্কার, নৈতিকতা এবং মুসলিম উম্মাহর গুরুত্বপূর্ণ ইস্যু নিয়ে প্রবন্ধ সংরক্ষণ করা হয়েছে।",

    totalBooks: 27,

    books: [
      "ইসলাম ও আধুনিকতা",
      "তরুণদের করণীয়",
      "দাওয়াহর পদ্ধতি",
      "ইসলামী সমাজ ব্যবস্থা",
    ],
  },
];

const amalCategories = [
  {
    name: "নামায",
    slug: "namaz",

    icon: <FaMosque size={24} />,

    banner:
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200",

    title: "নামায শিক্ষা",

    subtitle:
      "পাঁচ ওয়াক্ত সালাত, সুন্নাহ ও ইসলামী ইবাদতের গুরুত্বপূর্ণ নির্দেশনা",

    description:
      "এই বিভাগে নামাযের নিয়ম, ওযু, সালাতের দোয়া, সুন্নাহ ও গুরুত্বপূর্ণ মাসআলা সহজ ভাষায় তুলে ধরা হয়েছে।",

    totalBooks: 32,

    books: [
      {
        name: "সহজ নামায শিক্ষা",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "সালাতের মাসআলা",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "ওযু ও পবিত্রতা",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "মুসলিমের দৈনিক আমল",
        icon: <FaBookOpen size={18} />,
      },
    ],
  },

  {
    name: "দু'আ",
    slug: "dua",

    icon: <FaPrayingHands size={24} />,

    banner: "https://images.unsplash.com/photo-1542816417-0983670d0f98?w=1200",

    title: "দু'আ ও যিকির",

    subtitle: "প্রতিদিনের গুরুত্বপূর্ণ দু'আ, যিকির ও আমলসমূহের সংগ্রহ",

    description:
      "ঘুম, খাবার, সফর, অসুস্থতা, নামাযসহ জীবনের বিভিন্ন মুহূর্তের জন্য সহীহ দু'আ ও যিকির এই বিভাগে সংরক্ষিত আছে।",

    totalBooks: 21,

    books: [
      {
        name: "হিসনুল মুসলিম",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "দৈনিক দু'আ সমূহ",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "সকালের যিকির",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "রাতের আমল",
        icon: <FaBookOpen size={18} />,
      },
    ],
  },

  {
    name: "তারাবীহ",
    slug: "tarabih",

    icon: <FaMoon size={24} />,

    banner:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1200",

    title: "তারাবীহ ও রমাদান",

    subtitle: "রমাদানের ফজিলত, তারাবীহর নামায ও গুরুত্বপূর্ণ আমলসমূহ",

    description:
      "এই বিভাগে রমাদান মাসের গুরুত্বপূর্ণ আমল, তারাবীহর নিয়ম, শবে কদর ও রোযার মাসআলা বিস্তারিতভাবে তুলে ধরা হয়েছে।",

    totalBooks: 18,

    books: [
      {
        name: "তারাবীহর নামায",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "রমাদানের আমল",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "রোযার মাসআলা",
        icon: <FaBookOpen size={18} />,
      },
      {
        name: "শবে কদরের ফজিলত",
        icon: <FaBookOpen size={18} />,
      },
    ],
  },
];

/* ─────────────── COMPONENT ─────────────── */

export default function ContentSections() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* Slider auto-advance */
  useEffect(() => {
    const t = setInterval(
      () => setCurrentSlide((p) => (p + 1) % bannerSlides.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ── BANNER SLIDER ── */}
        <section>
          <div className="relative h-60 md:h-80 lg:h-[400px] rounded-[2rem] overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={bannerSlides[currentSlide].image}
                  alt="banner"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
                  <motion.span
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xs md:text-sm bg-amber-400 text-amber-950 font-bold px-4 py-1.5 rounded-full mb-4 inline-block shadow-lg"
                  >
                    {bannerSlides[currentSlide].tag}
                  </motion.span>
                  <motion.h3
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white font-bold text-3xl md:text-5xl leading-tight"
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/80 text-base md:text-xl mt-3 max-w-2xl"
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-8 right-8 flex gap-2.5">
              {bannerSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-500 rounded-full ${
                    i === currentSlide
                      ? "w-10 h-2 bg-white shadow-md"
                      : "w-2 h-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── ইলম ── */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-2xl md:text-3xl tracking-tight">
              ইলম
            </h3>
            <button className="text-sm font-semibold text-[#1a4731] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-1">
              সব দেখুন <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ilmCategories.map((c, i) => (
              <Link key={i} href={`/library/${c.slug}`}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                  className="bg-white border cursor-pointer border-gray-100 rounded-3xl p-6 flex items-center gap-5 text-left shadow-sm transition-all hover:border-[#1a4731]/10 w-full"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner"
                    style={{ background: c.light }}
                  >
                    {c.icon}
                  </div>

                  <div>
                    <p className="font-bold text-lg text-gray-800">{c.name}</p>

                    <p className="text-xs text-[#1a4731] mt-1 font-bold tracking-widest uppercase opacity-70">
                      পড়ুন 
                    </p>
                  </div>
                </motion.button>
              </Link>
            ))}
          </div>
        </section>

        {/* ── আমল ── */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-2xl md:text-3xl tracking-tight">
              আমল
            </h3>
            <button className="text-sm font-semibold text-[#1a4731] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-1">
              সব দেখুন <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {amalCategories.map((c, i) => (
              <Link key={i} href={`/library/${c.slug}`}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                  className="bg-white border cursor-pointer border-gray-100 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-sm transition-all hover:border-[#1a4731]/10 w-full"
                >
                  <div
                    className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl shadow-inner"
                    style={{ background: c.light }}
                  >
                    {c.icon}
                  </div>

                  <p className="font-bold text-base md:text-lg text-gray-800 text-center">
                    {c.name}
                  </p>
                </motion.button>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Daily Ayah Card ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a4731] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-10 -right-10 text-white/5 text-[15rem] font-bold select-none leading-none">
            "
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm text-amber-300 font-black mb-6 flex items-center justify-center gap-3 uppercase tracking-[0.3em]">
              <span className="h-px w-8 bg-amber-300/30"></span>
              <Star size={16} className="fill-amber-300" /> আজকের আয়াত
              <span className="h-px w-8 bg-amber-300/30"></span>
            </p>
            <p
              className="text-3xl md:text-5xl leading-relaxed text-white mb-8 font-serif italic"
              dir="rtl"
            >
              إِنَّ مَعَ الْعُسْرِ يُسْرًا
            </p>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">
                "নিশ্চয়ই কষ্টের সাথে স্বস্তি আছে।"
              </p>
              <p className="text-sm md:text-base text-white/40 font-semibold tracking-widest uppercase">
                — সূরা ইনশিরাহ: ৬
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── FLOAT SEARCH ── */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-16 h-16 bg-[#1a4731] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 group overflow-hidden"
          style={{ boxShadow: "0 15px 40px rgba(26,71,49,0.3)" }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Search size={28} className="relative z-10" />
        </motion.button>
      </div>
    </div>
  );
}
