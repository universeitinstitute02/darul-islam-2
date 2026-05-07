"use client";
import React from "react";
import { Truck, Headset, RotateCcw, ShieldCheck } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      icon: <Truck className="w-5 h-5 md:w-8 md:h-8 text-red-600" />,
      title: "Free Delivery",
      subtitle: "Over 5k TK",
    },
    {
      id: 2,
      icon: <Headset className="w-5 h-5 md:w-8 md:h-8 text-green-600" />,
      title: "Support",
      subtitle: "24/7 Dedicated",
    },
    {
      id: 3,
      icon: <RotateCcw className="w-5 h-5 md:w-8 md:h-8 text-gray-700" />,
      title: "Replace",
      subtitle: "If problems",
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-blue-500" />,
      title: "Secure Pay",
      subtitle: "100% Safe",
    },
  ];

  return (
    <section className="px-2 md:px-4 py-6 md:py-10 max-w-7xl mx-auto">
      {/* grid-cols-4 দিয়ে মোবাইলেও ৪টি কলাম রাখা হয়েছে */}
      <div className="grid grid-cols-4 gap-1 md:gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center text-center p-2 md:p-6 bg-white border border-gray-50 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* আইকন */}
            <div className="mb-2">{badge.icon}</div>

            {/* টেক্সট */}
            <div className="flex flex-col">
              <h3 className="text-[8px] md:text-lg font-black text-gray-800 leading-tight">
                {badge.title}
              </h3>
              <p className="hidden md:block text-xs font-bold text-gray-400 mt-1 uppercase tracking-tight">
                {badge.subtitle}
              </p>
              {/* মোবাইলের জন্য খুব ছোট সাবটাইটেল (অপশনাল) */}
              <p className="md:hidden text-[6px] font-bold text-gray-400 leading-none mt-0.5">
                {badge.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
