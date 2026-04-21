import { Megaphone } from 'lucide-react';

const notices = [
  "ভর্তি চলছে! আগামী শিক্ষাবর্ষের জন্য ভর্তি প্রক্রিয়া শুরু হয়েছে",
  "আগামী শুক্রবার বাদ জুমা বিশেষ তাফসিরুল কুরআন মাহফিল অনুষ্ঠিত হবে",
  "অনলাইন ইসলামিক কোর্সের রেজিস্ট্রেশন শুরু হয়েছে, দ্রুত সিট বুক করুন",
];

export default function NoticeTicker() {
  return (
    <div className="bg-islamic-green text-white flex items-center py-2 px-1 md:px-4 lg:px-10 shadow-md">
      <div className="flex items-center gap-2 bg-islamic-green-light px-3 py-1 rounded font-semibold whitespace-nowrap z-10 shadow-sm">
        <Megaphone size={18} className="text-islamic-gold-light" />
        <span className='text-sm'>নোটিশ বোর্ড</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap ml-4 flex-grow relative">
        {/* Simple CSS animation ticker */}
        <div className="inline-block animate-[ticker_40s_linear_infinite] whitespace-nowrap">
          {notices.map((notice, i) => (
            <span key={i} className="mx-8 font-medium">
              ★ {notice}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
