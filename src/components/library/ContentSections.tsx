"use client";
import Link from "next/link";
import { ChevronRight, Search, NotebookText, NotebookPen } from "lucide-react";
import { PiMosqueDuotone } from "react-icons/pi";
import {
  FaBook,
  FaBookOpen,
  FaMoon,
  FaMosque,
  FaPrayingHands,
} from "react-icons/fa";
import { motion } from "framer-motion";

/* ─────────────── DATA ─────────────── */

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
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ── BANNER SLIDER ── */}

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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
                    // style={{ background: c.light }}
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
      </div>
    </div>
  );
}
