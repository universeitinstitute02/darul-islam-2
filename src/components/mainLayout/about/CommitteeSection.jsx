"use client"
import React, { useState } from 'react';
import { Facebook } from 'lucide-react';

export default function CommitteeSection() {
  // একটি স্টেট তৈরি করা হয়েছে অ্যাক্টিভ ক্যাটাগরি ট্র্যাকিংয়ের জন্য
  const [activeCategory, setActiveCategory] = useState('পরিচালনা পরিষদ');

  const categories = [
    'পরিচালনা পরিষদ', 
    'উস্তাদ প্যানেল', 
    'উস্তাযা প্যানেল', 
    'এডমিশন এন্ড সাপোর্ট প্যানেল'
  ];

  // ডামি ডেটাবেজ (ছবির তথ্যের সাথে মিল রেখে)
  const members = [
    {
      id: 1,
      name: 'আল্লামা মুফতি মাসউদুল করীম দা.বা.',
      role: 'সার্বিক তত্ত্বাবধায়ক',
      category: 'পরিচালনা পরিষদ',
      image: '/images/member1.jpg',
      details: 'চেয়ারম্যান: উন্মুক্ত ইসলামী শিক্ষা ফাউন্ডেশন, বাংলাদেশ। প্রিন্সিপাল ও শায়খুল হাদীস: দারুল উলুম, টঙ্গী।'
    },
    {
      id: 2,
      name: 'মুফতি আব্দুল কারীম গুফিরালাহু',
      role: 'প্রতিষ্ঠাতা প্রিন্সিপাল',
      category: 'পরিচালনা পরিষদ',
      image: '/images/member2.jpg',
      details: 'পরিচালক: তমরীন পদ্ধতিতে নাহু-ছরফ প্রশিক্ষণ কোর্স, বাংলাদেশ। শিক্ষা সচিব: জামিয়া মাদানিয়া রওজাতুল উলুম, গুলশান, ঢাকা। মুহাদ্দিস: দারুল হুদা আল-ইসলামিয়া, উত্তরা-বাড্ডা, ঢাকা। লেখক: তমরীনুস সরফ, তমরীনুন নাহু-সহ বহু গ্রন্থের প্রণেতা।',
      fbLink: '#'
    },
    {
      id: 3,
      name: 'মেম্বার ৩',
      role: 'কারিগরি উপদেষ্টা',
      category: 'পরিচালনা পরিষদ',
      image: '/images/member3.jpg',
      details: 'কারিগরি ও আইটি সহায়তায় নিয়োজিত।'
    },
    {
      id: 4,
      name: 'মেম্বার ৪',
      role: 'হেড অফ অপারেশনস',
      category: 'পরিচালনা পরিষদ',
      image: '/images/member4.jpg',
      details: 'সার্বিক অপারেশনাল এবং প্রশাসনিক দায়িত্বে নিয়োজিত।'
    }
  ];

  // সিলেক্টেড ক্যাটাগরি অনুযায়ী ফিল্টার করা
  const filteredMembers = members.filter(member => member.category === activeCategory);

  return (
    <section className="w-full bg-[#051112] text-white py-16 px-4 md:px-12 lg:px-24 font-sans text-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Header */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold tracking-wide">
            এক নজরে <span className="text-amber-500">পরিচিতি</span>
          </h2>
          <p className="text-gray-300 text-xs md:text-sm max-w-3xl mx-auto leading-relaxed px-4">
            বিশ্বব্যাপী কুরআনের আলো ছড়িয়ে দেওয়া আমাদের লক্ষ্য। বিশেষ করে জেনারেল শিক্ষায় শিক্ষিত কর্মব্যস্ত ভাই-বোনদের সহীহ আকীদাহ
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs md:text-sm rounded-lg border font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-amber-500 border-amber-500 text-[#051112] font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-transparent border-gray-600 text-gray-300 hover:border-amber-500 hover:text-amber-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-6 max-w-5xl mx-auto">
          {filteredMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-[#0C1B1D] border border-gray-800 rounded-2xl p-6 flex flex-col items-center space-y-4 hover:shadow-xl hover:border-gray-700 transition-all duration-300"
            >
              {/* Designation/Role Banner */}
              <h3 className="text-lg md:text-xl font-bold text-gray-200">
                {member.role}
              </h3>

              {/* Photo Frame */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Identity Info */}
              <div className="space-y-2 text-center w-full flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="text-base md:text-lg font-bold text-amber-500">
                    {member.name}
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed text-center whitespace-pre-line px-2 mt-2">
                    {member.details}
                  </p>
                </div>

                {/* Optional Social Link */}
                {member.fbLink && (
                  <div className="pt-3 flex justify-center">
                    <a 
                      href={member.fbLink} 
                      className="text-gray-400 hover:text-blue-500 bg-black/30 p-2 rounded-full transition-colors"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <Facebook className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Background Mesh Style Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#0C2123_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none"></div>
    </section>
  );
}