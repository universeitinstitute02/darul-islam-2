"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Save,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="mt-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 px-1">
        <h2 className="text-2xl font-bold text-neutral-800">প্রোফাইল সেটিংস</h2>
        <p className="text-sm text-neutral-500">
          আপনার ব্যক্তিগত তথ্য ও নিরাপত্তা আপডেট করুন
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="flex gap-2 p-1 bg-neutral-100 rounded-2xl mb-8 w-fit">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "profile"
              ? "bg-white text-[#105D38] shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          প্রোফাইল
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "security"
              ? "bg-white text-[#105D38] shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          নিরাপত্তা
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 md:p-8"
      >
        {activeTab === "profile" ? (
          <div className="space-y-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center sm:flex-row gap-6 border-b border-neutral-50 pb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-[#105D38]/30">
                  <User size={40} className="text-[#105D38]" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-[#105D38] text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform">
                  <Camera size={16} />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-neutral-800">প্রোফাইল ছবি</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  JPG, GIF অথবা PNG। সর্বোচ্চ ২ মেগাবাইট।
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                  পুরো নাম
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-3.5 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue="শামস আল লাবিব"
                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                  ইমেইল ঠিকানা
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-3.5 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="email"
                    defaultValue="shams@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                  ফোন নম্বর
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-3.5 text-neutral-400"
                    size={18}
                  />
                  <input
                    type="text"
                    defaultValue="017XXXXXXXX"
                    className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                  সময় অঞ্চল (Timezone)
                </label>
                <div className="relative">
                  <Globe
                    className="absolute left-4 top-3.5 text-neutral-400"
                    size={18}
                  />
                  <select className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none appearance-none font-medium">
                    <option>Dhaka (GMT+6)</option>
                    <option>Makkah (GMT+3)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-orange-50 rounded-2xl flex gap-4 items-start mb-4">
              <ShieldCheck className="text-orange-600 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-orange-800 text-sm">
                  টু-ফ্যাক্টর অথেনটিকেশন
                </h5>
                <p className="text-xs text-orange-700 mt-0.5">
                  অ্যাকাউন্টের বাড়তি নিরাপত্তার জন্য এটি চালু করুন।
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                  বর্তমান পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10 pt-6 border-t border-neutral-50 flex justify-end">
          <button className="flex items-center gap-2 bg-[#105D38] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-all">
            <Save size={18} /> তথ্য সংরক্ষণ করুন
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
