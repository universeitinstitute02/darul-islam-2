import { BookOpen, GraduationCap, Users } from 'lucide-react';
import React from 'react';

const StatusCounter = () => {
      const stats = [
    { label: "শিক্ষার্থী", value: "২,৫০০+", icon: <Users size={32} className="text-islamic-gold" /> },
    { label: "শিক্ষক", value: "১২০+", icon: <GraduationCap size={32} className="text-islamic-gold" /> },
    { label: " কোর্স", value: "৪৫+", icon: <BookOpen size={32} className="text-islamic-gold" /> },
  ];
    return (
        <section className="py-1 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center divide-y-0 md:divide-x divide-neutral-200">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-2">
                  {stat.icon}
                </div>
                <h4 className="text-xl font-bold text-neutral-800 mb-1 center">{stat.value}</h4>
                <p className="text-neutral-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default StatusCounter;