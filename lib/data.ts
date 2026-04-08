// Mock data for Darul Islam Institute platform

export const courses = [
  {
    id: "hifz",
    title: "হিফযুল কুরআন",
    type: "হিফয",
    duration: "২ বছর",
    desc: "তাজবীদ সহ সম্পূর্ণ কুরআন মুখস্থ করার বিশেষ স্কিম।",
    price: "বিনামূল্যে",
    seats: "২৫ আসন",
    icon: "BookOpen"
  },
  {
    id: "alim",
    title: "আলিম কোর্স",
    type: "আলিম",
    duration: "৬ বছর",
    desc: "হাদিস, ফিকহ, তাফসির ও আরবি সাহিত্যের উচ্চতর শিক্ষা।",
    price: "মাসিক ৫০০৳",
    seats: "৪০ আসন",
    icon: "University"
  },
  {
    id: "arabic",
    title: "আরবি ভাষা কোর্স",
    type: "আরবি",
    duration: "১ বছর",
    desc: "আধুনিক ও কোরআনিক আরবি ভাষা শিক্ষা ও যোগাযোগ দক্ষতা।",
    price: "মাসিক ৩০০৳",
    seats: "৩০ আসন",
    icon: "Languages"
  },
  {
    id: "tajweed",
    title: "তাজবীদ ও কিরাত",
    type: "তাজবীদ",
    duration: "৬ মাস",
    desc: "সহীহ-শুদ্ধভাবে কুরআন তিলাওয়াত ও কিরাতের বিশেষ কোর্স।",
    price: "মাসিক ২০০৳",
    seats: "২০ আসন",
    icon: "Mic"
  }
];

export const teachers = [
  { 
    id: 1, 
    name: "প্রফেসর ড. আব্দুর রহমান", 
    department: "হাদীস বিভাগ", 
    role: "বিভাগীয় প্রধান", 
    image: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
  },
  { 
    id: 2, 
    name: "মাওলানা মুহাম্মদ ইউসুফ", 
    department: "ফিকহ বিভাগ", 
    role: "জ্যেষ্ঠ উস্তাদ", 
    image: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
  },
  { 
    id: 3, 
    name: "ড. আয়েশা সিদ্দিকা", 
    department: "কুরআন বিভাগ", 
    role: "সহকারী অধ্যাপক", 
    image: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" 
  }
];

export const notices = [
  {
    id: 1,
    title: "২০২৬ শিক্ষাবর্ষে ভর্তি বিজ্ঞপ্তি",
    date: "০৫ জানুয়ারি, ২০২৬",
    category: "ভর্তি",
    content: "হিফয ও আলিম কোর্সে নতুন সেশনে ভর্তি কার্যক্রম শুরু হয়েছে। আগ্রহী শিক্ষার্থীদের আগামী ১৫ মার্চের মধ্যে আবেদন করার অনুরোধ করা হচ্ছে।"
  },
  {
    id: 2,
    title: "রমজানুল মোবারক উপলক্ষে মাদরাসা ছুটি",
    date: "১০ ফেব্রুয়ারি, ২০২৬",
    category: "অ্যাকাডেমিক",
    content: "পবিত্র রমজান উপলক্ষে আগামী ১লা রমজান থেকে ঈদ-উল-ফিতর পর্যন্ত মাদরাসার সকল ক্লাস বন্ধ থাকবে।"
  }
];

export const statistics = [
  { label: "শিক্ষার্থী", count: "৩৫০+", icon: "Users" },
  { label: "শিক্ষক", count: "২৫", icon: "UserRound" },
  { label: "কোর্স", count: "১৮", icon: "BookOpen" },
  { label: "বিভাগ", count: "৬", icon: "Building2" },
];
