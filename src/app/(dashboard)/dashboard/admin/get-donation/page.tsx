"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HandHeart, Check, Trash2, X, Image as ImageIcon, UploadCloud } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

interface Cause {
  title: string;
  slug: string;
  desc: string;
  goal: string;
  image: string; // এটি বর্তমান ইমেজের URL ধরে রাখবে
}

// React Hook Form-এর ডাটা টাইপ (যেখানে ইমেজ ফাইল অথবা স্ট্রিং URL থাকতে পারে)
interface FormInputs extends Omit<Cause, "image"> {
  image: FileList | string;
}

const initialCauses: Cause[] = [
  {
    title: "দারুল ইসলাম ইনস্টিটিউটে দান করুন",
    slug: "darulislam-donate",
    desc: "সদগায়ে জারিয়া হিসেবে দারুল ইসলাম ইনস্টিটিউটে আত্ম উন্নয়নমূলক কাজে সহযোগিতা করুন । আপনার সহযোগিতা দারুন ইসলাম ইনস্টিটিউটের পথ চলা কে সহজ করে",
    goal: "২৫,০০,০০০",
    image:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function DonationPage() {
  const [causes, setCauses] = useState<Cause[]>(initialCauses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  
  // নতুন সিলেক্ট করা ইমেজের প্রিভিউ দেখানোর জন্য স্টেট
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  // ইমেজ ফিল্ড ওয়াচ করা যাতে ব্যবহারকারী ফাইল সিলেক্ট করলেই প্রিভিউ চেঞ্জ হয়
  const watchedImage = watch("image");

  useEffect(() => {
    if (watchedImage && watchedImage instanceof FileList && watchedImage.length > 0) {
      const file = watchedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // মেমোরি লিক রোধ করতে ইফেক্ট ক্লিনআপ
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [watchedImage]);

  // মডাল ওপেন করার ফাংশন
  const openUpdateModal = (cause: Cause) => {
    setSelectedCause(cause);
    setImagePreview(cause.image); // আগের ইমেজটি প্রিভিউ হিসেবে সেট হবে
    reset({
      title: cause.title,
      slug: cause.slug,
      desc: cause.desc,
      goal: cause.goal,
      image: cause.image, // ডিফল্ট হিসেবে স্ট্রিং URL পাস করা হচ্ছে
    });
    setIsModalOpen(true);
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const onUpdateSubmit = async (data: FormInputs) => {
    let finalImageUrl = selectedCause?.image || "";

    // ব্যবহারকারী যদি নতুন কোনো ফাইল আপলোড করে থাকেন
    if (data.image instanceof FileList && data.image.length > 0) {
      const file = data.image[0];
      
      // এখানে আপনার সার্ভার বা Cloudinary/S3 তে ফাইল আপলোডের লজিক হবে:
      // const formData = new FormData();
      // formData.append("file", file);
      // const res = await uploadImageAPI(formData);
      // finalImageUrl = res.url;

      // আপাতত ডেমো হিসেবে লোকাল ইউআরএল সেট করে দেওয়া হচ্ছে ফ্রন্টএন্ডে দেখার জন্য
      finalImageUrl = URL.createObjectURL(file);
    }

    const updatedData: Cause = {
      title: data.title,
      slug: data.slug,
      desc: data.desc,
      goal: data.goal,
      image: finalImageUrl,
    };

    // স্টেট আপডেট
    setCauses((prev) =>
      prev.map((item) => (item.slug === selectedCause?.slug ? { ...item, ...updatedData } : item))
    );

    setIsModalOpen(false);

    Swal.fire({
      title: "সফল!",
      text: "দান প্রকল্পটির তথ্য ও ছবি সফলভাবে আপডেট করা হয়েছে।",
      icon: "success",
      confirmButtonColor: "#0B5D3B",
    });
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (slug: string) => {
    const result = await Swal.fire({
      title: "প্রকল্পটি মুছে ফেলবেন?",
      text: "একবার মুছে ফেললে এই তথ্যটি আর পুনরুদ্ধার করা যাবে না।",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন",
      cancelButtonText: "না, রাখুন",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      setCauses((prev) => prev.filter((item) => item.slug !== slug));
      Swal.fire({
        title: "মুছে ফেলা হয়েছে!",
        text: "দান প্রকল্পটি সফলভাবে মুছে ফেলা হয়েছে।",
        icon: "success",
        confirmButtonColor: "#0B5D3B",
      });
    }
  };

  return (
    <div className="flex flex-col relative min-h-screen bg-gray-50/50">
      <div className="max-w-screen-xl mx-auto w-full px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 space-y-12">
          <div className="space-y-8 pt-12">
            <h2 className="text-3xl font-black text-[#0B3D2E] flex items-center gap-3">
              <HandHeart /> আপনার দান প্রকল্পসমূহ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {causes.map((cause, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-[#0B3D2E]/5 group"
                >
                  <div className="relative h-44">
                    <Image
                      src={cause.image}
                      alt={cause.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 right-6 flex items-end justify-between">
                      <div className="text-white text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#8FE3A9]">
                          লক্ষ্যমাত্রা
                        </p>
                        <p className="text-xl font-black">{cause.goal}৳</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-[#0B3D2E]">
                        {cause.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {cause.desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleDelete(cause.slug)}
                        className="py-2.5 hover:cursor-pointer border border-red-100 hover:bg-red-50 text-red-600 text-xs font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        প্রকল্প মুছুন
                      </button>

                      <button
                        onClick={() => openUpdateModal(cause)}
                        className="py-2.5 hover:cursor-pointer bg-[#0B5D3B] hover:bg-[#0c4a2c] text-white text-xs font-black rounded-xl shadow-md shadow-green-100 transition-all active:scale-[0.98] flex items-center justify-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        তথ্য আপডেট করুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- REACT HOOK FORM UPDATE MODAL WITH IMAGE UPLOAD --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Modal Header */}
            <div className="bg-[#0B3D2E] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5" /> প্রকল্পের তথ্য ও ছবি পরিবর্তন
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit(onUpdateSubmit)} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              {/* Image Upload Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">প্রকল্পের ছবি</label>
                
                {/* Image Preview Window */}
                {imagePreview && (
                  <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Custom File Upload Input */}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100/70 transition-all">
                    <div className="flex flex-col items-center justify-center pt-3 pb-3">
                      <UploadCloud className="w-6 h-6 text-gray-400 mb-1" />
                      <p className="text-xs text-gray-500 font-medium">
                        নতুন ছবি আপলোড করতে <span className="font-bold text-[#0B5D3B]">ক্লিক করুন</span>
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG বা WEBP</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Title Field */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 block">
                  প্রকল্পের নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("title", { required: "প্রকল্পের নাম দেওয়া আবশ্যক" })}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/20 focus:border-[#0B5D3B] transition-all text-sm ${
                    errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                  }`}
                  placeholder="যেমন: এতিমখানায় খাদ্য বিতরণ"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              {/* Goal Field */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 block">
                  টাকার লক্ষ্যমাত্রা (৳) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("goal", { required: "টাকার লক্ষ্যমাত্রা দেওয়া আবশ্যক" })}
                  className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/20 focus:border-[#0B5D3B] transition-all text-sm ${
                    errors.goal ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                  }`}
                  placeholder="যেমন: ৫০,০০০"
                />
                {errors.goal && (
                  <p className="text-red-500 text-xs mt-1">{errors.goal.message}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700 block">বিবরণ</label>
                <textarea
                  rows={3}
                  {...register("desc")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B5D3B]/20 focus:border-[#0B5D3B] transition-all text-sm resize-none"
                  placeholder="প্রকল্পের বিস্তারিত বিবরণ এখানে লিখুন..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-bold text-white bg-[#0B5D3B] hover:bg-[#0c4a2c] rounded-xl shadow-md shadow-green-100 cursor-pointer transition-all active:scale-[0.98] flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}