"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  ShieldCheck,
  Globe,
  BookOpen,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import useUserRole from "@/src/app/hooks/useUserRole";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

const ProfileSettings = () => {
  const axiosSecure = useAxiosSecure();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, role, isLoading: isUserLoading } = useUserRole();

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [studentNameBn, setStudentNameBn] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [teacherNameBn, setTeacherNameBn] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

  const [welcomeMessage, setWelcomeMessage] = useState("আসসালামু আলাইকুম");
  const [greetingIcon, setGreetingIcon] = useState("✨");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setWelcomeMessage("শুভ সকাল ও আসসালামু আলাইকুম");
      setGreetingIcon("🌅");
    } else if (hour >= 12 && hour < 16) {
      setWelcomeMessage("শুভ দুপুর ও আসসালামু আলাইকুম");
      setGreetingIcon("☀️");
    } else if (hour >= 16 && hour < 19) {
      setWelcomeMessage("শুভ বিকেল ও আসসালামু আলাইকুম");
      setGreetingIcon("🍃");
    } else {
      setWelcomeMessage("শুভ সন্ধ্যা ও আসসালামু আলাইকুম");
      setGreetingIcon("🌙");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setImagePreview(user.profileImage || "");

      if (role === "student") {
        setStudentNameBn(user.profile?.studentNameBn || "");
        setClassLevel(user.profile?.classLevel || "");
      } else if (role === "teacher") {
        setTeacherNameBn(user.profile?.teacherNameBn || "");
        setDesignation(user.profile?.designation || "");

        const deptData = user.profile?.department;
        setDepartment(
          typeof deptData === "object" ? deptData?.name : deptData || "",
        );
      }
    }
  }, [user, role]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "ফাইল সাইজ বেশি!",
          text: "অনুগ্রহ করে ২ মেগাবাইটের কম সাইজের ছবি আপলোড করুন।",
        });
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      let profileDetails = {};
      if (role === "student") {
        profileDetails = { studentNameBn, classLevel };
      } else if (role === "teacher") {
        profileDetails = { teacherNameBn, designation, department };
      }

      formData.append("profileData", JSON.stringify(profileDetails));

      const res = await axiosSecure.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "প্রোফাইল আপডেট সফল!",
          text: "আপনার প্রোফাইলের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।",
          confirmButtonColor: "#105D38",
        });
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      Swal.fire({
        icon: "error",
        title: "আপডেট ব্যর্থ হয়েছে!",
        text:
          err.response?.data?.message ||
          "সার্ভার বা নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন।",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center py-40">
        <LoadingSpinner />
      </div>
    );
  }

  const displayName =
    role === "student"
      ? studentNameBn
      : role === "teacher"
        ? teacherNameBn
        : name;

  return (
    <>
      <Head>
        <title>প্রোফাইল সেটিংস | ড্যাশবোর্ড</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="mt-4 pb-12 max-w-4xl mx-auto font-sans px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-emerald-800 via-emerald-900 to-zinc-950 rounded-3xl text-white shadow-xl border border-emerald-700/40 group"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-bold tracking-wide text-emerald-200 border border-white/5 animate-pulse">
                <span>{greetingIcon}</span> {welcomeMessage.split(" ও ")[0]}
              </span>

              <h3 className="text-xl md:text-3xl font-black tracking-wide leading-tight">
                আসসালামু আলাইকুম,{" "}
                <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
                  {displayName || "সম্মানিত হুজুর"}
                </span>
              </h3>

              {/* ইউজারের রোল অনুযায়ী কাস্টমাইজড ডিটেইলস বার্তা */}
              <p className="text-emerald-100/70 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
                {role === "student" && classLevel && (
                  <>
                    আপনার প্রোফাইল অনুযায়ী আপনি বর্তমানে{" "}
                    <strong className="text-amber-300 font-extrabold">
                      {classLevel}
                    </strong>
                    -এর একজন শিক্ষার্থী।{" "}
                  </>
                )}
                {role === "teacher" && designation && (
                  <>
                    আপনি এই প্ল্যাটফর্মে{" "}
                    <strong className="text-amber-300 font-extrabold">
                      {designation}
                    </strong>{" "}
                    হিসেবে যুক্ত আছেন {department && <>({department} বিভাগ)</>}
                    ।{" "}
                  </>
                )}
                আপনার ড্যাশবোর্ড প্যানেলটি সম্পূর্ণ প্রস্তুত। প্রোফাইল আপডেট বা
                সিকিউরিটি সেটিংস পরিবর্তন করতে নিচের অপশনগুলো ব্যবহার করুন।
              </p>
            </div>

            {/* রোল ভিত্তিক ডানদিকের প্রিমিয়াম ইন্টারেক্টিভ ব্যাজ */}
            {role && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="shrink-0 flex flex-col items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl min-w-[130px] shadow-inner"
              >
                {role === "student" ? (
                  <GraduationCap className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                ) : (
                  <Briefcase className="w-8 h-8 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                )}
                <span className="text-[10px] uppercase font-black tracking-widest text-neutral-400 mt-1">
                  অ্যাকাউন্ট টাইপ
                </span>
                <span className="text-xs font-black uppercase text-white tracking-wider">
                  {role}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Header Title */}
        <div className="mb-6 px-1">
          <h2 className="text-xl md:text-2xl font-black text-neutral-800 flex items-center gap-2">
            প্রোফাইল সেটিংস
          </h2>
          <p className="text-xs md:text-sm text-neutral-500 font-medium">
            আপনার ব্যক্তিগত তথ্য ও রোল-ভিত্তিক প্রোফাইল ম্যানেজ করুন
          </p>
        </div>

        {/* Settings Tabs - Full Responsive */}
        <div className="flex gap-2 p-1 bg-neutral-100 rounded-2xl mb-8 w-full sm:w-fit overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-white text-[#105D38] shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            প্রোফাইল তথ্য
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === "security"
                ? "bg-white text-[#105D38] shadow-sm"
                : "text-neutral-500 hover:text-neutral-700"
            }`}
          >
            নিরাপত্তা ও পাসওয়ার্ড
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-5 md:p-8"
        >
          {activeTab === "profile" ? (
            <div className="space-y-8">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center sm:flex-row gap-6 border-b border-neutral-50 pb-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center overflow-hidden border-2 border-dashed border-[#105D38]/30 relative">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="ইউজার প্রোফাইল পিকচার"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <User size={40} className="text-[#105D38]" />
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 p-2 bg-[#105D38] text-white rounded-xl shadow-lg border-2 border-white hover:scale-110 transition-transform"
                    type="button"
                  >
                    <Camera size={16} />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-neutral-800 text-sm md:text-base">
                    প্রোফাইল ছবি
                  </h4>
                  <p className="text-[11px] md:text-xs text-neutral-500 mt-1">
                    JPG, JPEG অথবা PNG। সর্বোচ্চ ২ মেগাবাইট।
                  </p>
                </div>
              </div>

              {/* 🌐 সাধারণ তথ্যসমূহ */}
              <div>
                <h4 className="text-xs font-black text-[#105D38] uppercase tracking-wider mb-4 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#105D38] rounded-full inline-block" />{" "}
                  সাধারণ তথ্যসমূহ
                </h4>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium text-xs md:text-sm text-neutral-800"
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
                        value={user?.email || ""}
                        disabled
                        className="w-full pl-12 pr-4 py-3.5 bg-neutral-100 border border-neutral-200 rounded-2xl cursor-not-allowed outline-none font-medium text-xs md:text-sm text-neutral-500"
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all font-medium text-xs md:text-sm text-neutral-800"
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
                      <select className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none appearance-none font-medium text-xs md:text-sm text-neutral-800">
                        <option>Dhaka (GMT+6)</option>
                        <option>Makkah (GMT+3)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* 👨‍🎓 স্টুডেন্ট ফিল্ডস */}
              {role === "student" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-4 border-t border-neutral-100"
                >
                  <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider mb-4 flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-amber-600" />{" "}
                    স্টুডেন্ট প্রোফাইল তথ্য
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                        শিক্ষার্থীর নাম (বাংলায়)
                      </label>
                      <input
                        type="text"
                        value={studentNameBn}
                        onChange={(e) => setStudentNameBn(e.target.value)}
                        placeholder="বাংলায় আপনার নাম"
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all text-xs md:text-sm text-neutral-800 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                        শ্রেণী/ক্লাস (Class Level)
                      </label>
                      <input
                        type="text"
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        placeholder="উদাঃ Class 10"
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all text-xs md:text-sm text-neutral-800 font-medium"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 👨‍🏫 টিচার ফিল্ডস */}
              {role === "teacher" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-4 border-t border-neutral-100"
                >
                  <h4 className="text-xs font-black text-blue-700 uppercase tracking-wider mb-4 flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-blue-600" /> শিক্ষক
                    প্রোফাইল তথ্য
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                        शिक्षকের নাম (বাংলায়)
                      </label>
                      <input
                        type="text"
                        value={teacherNameBn}
                        onChange={(e) => setTeacherNameBn(e.target.value)}
                        placeholder="উদাঃ আরিফুল ইসলাম"
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all text-xs md:text-sm text-neutral-800 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                        পদবী (Designation)
                      </label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="উদাঃ Lecturer"
                        className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all text-xs md:text-sm text-neutral-800 font-medium"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                        বিভাগ (Department)
                      </label>
                      <div className="relative">
                        <BookOpen
                          className="absolute left-4 top-3.5 text-neutral-400"
                          size={18}
                        />
                        <input
                          type="text"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder="উদাঃ দরসি কিতাব"
                          className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all text-xs md:text-sm text-neutral-800 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
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
                    অ্যাকাউন্টের বাড়তি নিরাপত্তার জন্য এটি চালু করুন।
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                    বর্তমান পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-600 uppercase ml-1">
                    নতুন পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-neutral-50 flex justify-end">
            <button
              onClick={handleProfileSubmit}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#105D38] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-green-900/20 active:scale-95 hover:bg-[#0d4d2e] transition-all disabled:bg-neutral-300 disabled:cursor-not-allowed text-sm"
              type="button"
            >
              <Save size={18} />{" "}
              {loading ? "সংরক্ষণ করা হচ্ছে..." : "সংরক্ষণ করুন"}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProfileSettings;
