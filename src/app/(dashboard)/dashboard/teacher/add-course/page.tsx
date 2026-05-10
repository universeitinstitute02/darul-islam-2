"use client";
import React, { useState, useRef } from "react";
import {
  Upload,
  BookOpen,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Loader2,
  LayoutList,
  Type,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const AddCoursePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // API অনুযায়ী মূল স্টেট
  const [course, setCourse] = useState({
    title: "",
    category: "",
    duration: "",
    courseType: "Online",
    price: "",
    oldPrice: "",
  });

  // Details অবজেক্টের জন্য স্টেট
  const [details, setDetails] = useState({
    fullTitle: "",
    description: "",
    admissionFee: "",
    monthlyFee: "",
  });

  // Highlights স্টেট
  const [highlights, setHighlights] = useState([{ label: "", value: "" }]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name in details) {
      setDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setCourse((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return Swal.fire("Error", "লগইন সেশন পাওয়া যায়নি!", "error");
    if (!imageFile) return Swal.fire("Warning", "কোর্সের ইমেজ দিন", "warning");

    setLoading(true);
    Swal.fire({
      title: "পাবলিশ হচ্ছে...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("image", imageFile);
      formData.append("category", course.category);
      formData.append("duration", course.duration);
      formData.append("courseType", course.courseType);
      formData.append("price", course.price);
      formData.append("oldPrice", course.oldPrice || "0");

      const detailsPayload = {
        fullTitle: details.fullTitle || course.title,
        description: details.description,
        admissionFee: Number(details.admissionFee) || 0,
        monthlyFee: Number(details.monthlyFee) || 0,
        highlights: highlights.filter((h) => h.label && h.value),
      };

      formData.append("details", JSON.stringify(detailsPayload));

      const response = await fetch(
        "https://darulislam-server-v2.vercel.app/api/courses/teacher/add-course",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (response.ok) {
        Swal.fire("অভিনন্দন!", "কোর্সটি সফলভাবে তৈরি হয়েছে।", "success");
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "সার্ভার এরর");
      }
    } catch (err: any) {
      Swal.fire("ব্যর্থ হয়েছে", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-12 pt-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-black text-[#105D38]">
            নতুন কোর্স তৈরি করুন
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            প্রয়োজনীয় তথ্য দিয়ে আপনার কোর্সটি পাবলিশ করুন
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Main Info Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
                <BookOpen className="w-5 h-5 text-emerald-600" /> বেসিক ইনফরমেশন
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                    কোর্সের নাম (Title)
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    placeholder="উদা: আরবী ভাষা শিক্ষা"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                    বিস্তারিত শিরোনাম (Full Title)
                  </label>
                  <input
                    type="text"
                    name="fullTitle"
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20"
                    placeholder="যেমন: কুরআন পড়ার সহজ উপায় ও আরবী ব্যাকরণ"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                      ক্যাটাগরি
                    </label>
                    <input
                      type="text"
                      name="category"
                      required
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
                      placeholder="উদা: আরবী ভাষা"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                      কোর্স টাইপ
                    </label>
                    <select
                      name="courseType"
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
                    >
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                    কোর্সের বিবরণ (Description)
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none"
                    placeholder="কোর্সের বিস্তারিত এখানে লিখুন..."
                  />
                </div>
              </div>
            </div>

            {/* Highlights Builder */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <LayoutList className="w-5 h-5 text-emerald-600" /> কোর্স
                  হাইলাইটস
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setHighlights([...highlights, { label: "", value: "" }])
                  }
                  className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  + নতুন লাইন
                </button>
              </div>
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex gap-3 animate-in fade-in zoom-in duration-300"
                  >
                    <input
                      placeholder="লেবেল (সময়)"
                      value={h.label}
                      onChange={(e) => {
                        const upd = [...highlights];
                        upd[i].label = e.target.value;
                        setHighlights(upd);
                      }}
                      className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm outline-none"
                    />
                    <input
                      placeholder="মান (৩ মাস)"
                      value={h.value}
                      onChange={(e) => {
                        const upd = [...highlights];
                        upd[i].value = e.target.value;
                        setHighlights(upd);
                      }}
                      className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setHighlights(highlights.filter((_, idx) => idx !== i))
                      }
                      className="text-red-300 hover:text-red-500 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 space-y-6">
            {/* Image Upload */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 text-center">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 justify-center">
                <ImageIcon className="w-4 h-4 text-emerald-600" /> থাম্বনেইল
                ইমেজ
              </h3>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-gray-100 rounded-3xl aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/30 transition-all overflow-hidden group"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <>
                    <div className="p-4 bg-emerald-50 rounded-full mb-3 text-emerald-500">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      ইমেজ সিলেক্ট করুন
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                  বর্তমান মূল্য
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 p-4 pl-10 rounded-2xl outline-none text-lg font-bold text-[#105D38]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                  পূর্বের মূল্য (Old Price)
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-2xl outline-none"
                  placeholder="0.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 block uppercase">
                    ভর্তি ফি
                  </label>
                  <input
                    type="number"
                    name="admissionFee"
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 p-3 rounded-2xl outline-none text-sm"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 block uppercase">
                    মাসিক ফি
                  </label>
                  <input
                    type="number"
                    name="monthlyFee"
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 p-3 rounded-2xl outline-none text-sm"
                    placeholder="200"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                  সময়কাল (Duration)
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="duration"
                    required
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-100 p-3 pl-10 rounded-2xl outline-none"
                    placeholder="যেমন: ৩ মাস"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#105D38] text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-emerald-900/10 hover:bg-[#0d4d2e] transition-all disabled:bg-gray-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "কোর্স পাবলিশ করুন"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePage;
