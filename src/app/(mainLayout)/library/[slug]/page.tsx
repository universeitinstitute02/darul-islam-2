import Image from "next/image";
import { FaMosque, FaPrayingHands, FaMoon, FaBookOpen } from "react-icons/fa";

/* ───────────────── ILM CATEGORIES ───────────────── */

const ilmCategories = [
  {
    name: "কুরআন",
    slug: "quran",

    banner: "https://images.unsplash.com/photo-1542816417-0983670d0f98?w=1200",

    title: "কুরআন শিক্ষা ও তাফসীর",

    subtitle:
      "পবিত্র কুরআনের তিলাওয়াত, তাফসীর, অনুবাদ ও গুরুত্বপূর্ণ বিষয়সমূহ নিয়ে সমৃদ্ধ সংগ্রহ",

    description:
      "এই বিভাগে পবিত্র কুরআনের বাংলা অনুবাদ, তাফসীর, তাজবীদ শিক্ষা এবং বিষয়ভিত্তিক আয়াতের ব্যাখ্যা সংরক্ষণ করা হয়েছে।",

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

    banner:
      "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=1200",

    title: "হাদীস ও সুন্নাহ",

    subtitle:
      "সহীহ হাদীস, সুন্নাহ ও ইসলামী জীবন ব্যবস্থার গুরুত্বপূর্ণ নির্দেশনা",

    description:
      "এই বিভাগে সহীহ বুখারী, মুসলিম, তিরমিযীসহ বিভিন্ন হাদীস গ্রন্থ সংরক্ষিত আছে।",

    totalBooks: 36,

    books: ["সহীহ বুখারী", "রিয়াদুস সালেহীন", "৪০ হাদীস", "শামায়েলে তিরমিযী"],
  },

  {
    name: "কিতাব",
    slug: "kitab",

    banner:
      "https://images.unsplash.com/photo-1507842217343-583f20270319?w=1200",

    title: "ইসলামী কিতাব",

    subtitle:
      "আকীদা, ফিকহ, ইতিহাস ও ইসলামী জ্ঞানভিত্তিক বিভিন্ন কিতাবের সংগ্রহ",

    description:
      "এই বিভাগে আকীদা, ফিকহ, সীরাত, ইসলামী ইতিহাস সম্পর্কিত কিতাবসমূহ রয়েছে।",

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

    banner:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",

    title: "ইসলামী প্রবন্ধ",

    subtitle:
      "দাওয়াহ, সমাজ, নৈতিকতা ও আধুনিক বিষয় নিয়ে ইসলামিক প্রবন্ধ সংগ্রহ",

    description:
      "সমসাময়িক বিভিন্ন ইসলামিক বিষয় ও সমাজ সংস্কারমূলক প্রবন্ধ এখানে সংরক্ষিত।",

    totalBooks: 27,

    books: [
      "ইসলাম ও আধুনিকতা",
      "তরুণদের করণীয়",
      "দাওয়াহর পদ্ধতি",
      "ইসলামী সমাজ ব্যবস্থা",
    ],
  },
];

/* ───────────────── AMAL CATEGORIES ───────────────── */

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

/* ───────────────── PAGE ───────────────── */

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  const allCategories = [...ilmCategories, ...amalCategories];

  const data = allCategories.find(
    (item) => item?.slug?.trim() === slug?.trim(),
  );

  console.log("slug:", slug);
  console.log("data:", data);

  if (!data) {
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        বই খুঁজে পাওয়া যায়নি
      </div>
    );
  }

  return (
    <section className="bg-[#f7faf7] min-h-screen">
      {/* Banner */}
      <div className="relative h-[260px] md:h-[380px]">
        <Image
          src={data.banner}
          alt={data.name}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center px-5">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {data.title}
            </h1>

            <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              {"icon" in data && data.icon && (
                <div className="text-[#1a4731] text-2xl">{data.icon}</div>
              )}

              <h2 className="text-2xl font-bold text-[#1a4731]">{data.name}</h2>
            </div>

            <span className="bg-[#e8f5ee] text-[#1a4731] text-sm font-semibold px-5 py-2 rounded-full">
              মোট বই: {data.totalBooks}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-8 mb-10">{data.description}</p>

          {/* Books */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              জনপ্রিয় বইসমূহ
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.books.map((book, i) => (
                <div
                  key={i}
                  className="bg-[#f8fbf8] border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    {typeof book !== "string" && (
                      <div className="text-[#1a4731]">{book.icon}</div>
                    )}

                    <p className="font-semibold text-gray-800">
                      {typeof book === "string" ? book : book.name}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    ইসলামিক লাইব্রেরির নির্বাচিত বই
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
