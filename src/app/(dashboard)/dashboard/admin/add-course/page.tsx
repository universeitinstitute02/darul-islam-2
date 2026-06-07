"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Upload,
  BookOpen,
  Clock,
  DollarSign,
  Image as ImageIcon,
  Loader2,
  LayoutList,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import useAxiosSecure from "@/src/app/hooks/useAxiosSecure";
import TiptapEditor from "@/src/components/TiptapEditor/TiptapEditor";

interface ISubCategory {
  _id: string;
  name: string;
}

interface ICategory {
  _id: string;
  name: string;
  subCategories?: ISubCategory[];
  subCategory?: ISubCategory[];
}

// React Hook Form Inputs Type
interface ICourseFormInputs {
  title: string;
  fullTitle: string;
  subCategory: string;
  description: string;
  price: string;
  oldPrice: string;
  duration: string;
  courseType: string;
  admissionFee: string;
  monthlyFee: string;
  highlights: { label: string; value: string }[];
  modules: { title: string; statusType: string; statusText: string }[];
}

const AddCoursePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState<ICategory[]>([]);

  // React Hook Form Initialization
  const { register, control, handleSubmit, setValue, watch, reset } =
    useForm<ICourseFormInputs>({
      defaultValues: {
        courseType: "Online",
        oldPrice: "0",
        description: "",
        highlights: [{ label: "", value: "" }],
        modules: [
          {
            title: "অরিয়েন্টেশন ও ড্যাশবোর্ড সেটআপ",
            statusType: "live_class",
            statusText: "লাইভ ক্লাস - একটিভ",
          },
        ],
      },
    });

  // Dynamic Fields for Highlights
  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control,
    name: "highlights",
  });

  // Dynamic Fields for Modules
  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await axiosSecure.get("/categories");
        // আপনার এপিআই রেসপন্স ফরম্যাট অনুযায়ী সেট করুন
        if (res.data) {
          setCategories(res.data.categories || res.data);
        }
      } catch (error) {
        console.error("Category fetch failed:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, [axiosSecure]);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Form Submit Handler
  const onSubmit = async (data: ICourseFormInputs) => {
    if (!token) return Swal.fire("Error", "লগইন সেশন পাওয়া যায়নি!", "error");
    if (!imageFile) return Swal.fire("Warning", "কোর্সের ইমেজ দিন", "warning");

    setLoading(true);
    Swal.fire({
      title: "পাবলিশ হচ্ছে...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // কনসোলে ডেটা শো করার জন্য অবজেক্ট তৈরি
    const detailsPayload = {
      fullTitle: data.fullTitle || data.title,
      description: data.description,
      admissionFee: Number(data.admissionFee) || 0,
      monthlyFee: Number(data.monthlyFee) || 0,
      highlights: data.highlights.filter((h) => h.label && h.value),
    };

    const finalDataConsoleLog = {
      title: data.title,
      category: data.subCategory, // সাবক্যাটাগরি আইডিকে ক্যাটাগরি ফিল্ডে পাঠানো হচ্ছে
      duration: data.duration,
      courseType: data.courseType,
      price: data.price,
      oldPrice: data.oldPrice || "0",
      details: detailsPayload,
      modules: data.modules, // মডিউল কারিকুলাম ডেটা
      image: imageFile.name,
    };

    // আপনার রিকোয়েস্ট অনুযায়ী কনসোলে ডেটা প্রিন্ট
    console.log("--- SUBMITTED COURSE DATA ---", finalDataConsoleLog);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", imageFile);
      formData.append("category", data.subCategory);
      formData.append("duration", data.duration);
      formData.append("courseType", data.courseType);
      formData.append("price", data.price);
      formData.append("oldPrice", data.oldPrice || "0");
      formData.append("details", JSON.stringify(detailsPayload));
      // যদি সার্ভার মডিউল এক্সেপ্ট করে তবে অ্যাপেন্ড করতে পারেন:
      formData.append("modules", JSON.stringify(data.modules));

      const response = await fetch(
        "https://darulislam-server-v2.vercel.app/api/courses/teacher/add-course",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (response.ok) {
        Swal.fire("অভিনন্দন!", "কোর্সটি সফলভাবে তৈরি হয়েছে।", "success");
        reset();
        setImageFile(null);
        setPreviewUrl(null);
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "সার্ভার এরর");
      }
    } catch (err: any) {
      Swal.fire("ব্যর্থ হয়েছে", err.message, "error");
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
            প্রয়োজনীয় তথ্য দিয়ে আপনার কোর্সটি পাবলিশ করুন
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
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
                    required
                    {...register("title", { required: true })}
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
                    {...register("fullTitle")}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 ring-emerald-500/20"
                    placeholder="যেমন: কুরআন পড়ার সহজ উপায় ও আরবী ব্যাকরণ"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                    Select Sub Category
                  </label>
                  <select
                    required
                    {...register("subCategory", { required: true })}
                    className="w-full cursor-pointer rounded-2xl bg-gray-50 border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value="">
                      {categoriesLoading ? "Loading..." : "Select Sub Category"}
                    </option>
                    {categories.map((category) => (
                      <optgroup key={category._id} label={category.name}>
                        {(
                          category.subCategories ||
                          category.subCategory ||
                          []
                        ).map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Tiptap Description Editor */}
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-2 block uppercase tracking-wider">
                    কোর্সের বিবরণ (Description)
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
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
                  onClick={() => appendHighlight({ label: "", value: "" })}
                  className="text-xs cursor-pointer font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  + নতুন লাইন
                </button>
              </div>
              <div className="space-y-3">
                {highlightFields.map((field, i) => (
                  <div key={field.id} className="flex gap-3 items-center">
                    <input
                      placeholder="লেবেল (সময়)"
                      {...register(`highlights.${i}.label` as const)}
                      className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                    <input
                      placeholder="মান (৩ মাস)"
                      {...register(`highlights.${i}.value` as const)}
                      className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/10"
                    />
                    {highlightFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(i)}
                        className="text-red-500 bg-red-200 cursor-pointer hover:text-red-700 rounded p-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Modules Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b pb-4 mb-2">
                <LayoutList className="w-5 h-5 text-emerald-600" /> কোর্সের
                কারিকুলাম / মডিউল
              </h3>

              {moduleFields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border border-dashed border-gray-200 rounded-2xl bg-gray-50/50 relative space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-400 bg-white shadow-sm w-7 h-7 flex items-center justify-center rounded-full border border-gray-100">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <input
                      type="text"
                      placeholder="মডিউলের নাম লিখুন"
                      required
                      {...register(`modules.${index}.title` as const, {
                        required: true,
                      })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className=" pl-10">
                    <input
                      type="text"
                      placeholder="স্ট্যাটাস টেক্সট"
                      required
                      {...register(`modules.${index}.statusText` as const, {
                        required: true,
                      })}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>

                  {moduleFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeModule(index)}
                      className="absolute top-4.5 right-4 text-red-500 bg-red-200 cursor-pointer hover:text-red-700 rounded p-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() =>
                    appendModule({
                      title: "",
                      statusType: "live_class",
                      statusText: "",
                    })
                  }
                  className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-green-600 hover:text-green-700 transition"
                >
                  + আরও মডিউল যোগ করুন
                </button>
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

            {/* Pricing & Duration Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                  বর্তমান মূল্য
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    required
                    {...register("price", { required: true })}
                    className="w-full bg-gray-50 border border-gray-100 p-4 pl-10 rounded-2xl outline-none text-lg font-bold text-[#105D38]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                  পূর্বের মূল্য (Old Price)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    {...register("oldPrice")}
                    className="w-full bg-gray-50 border border-gray-100 p-4 pl-10 rounded-2xl outline-none text-md text-gray-500 line-through"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-2 block uppercase">
                  Duration
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    {...register("duration", { required: true })}
                    className="w-full bg-gray-50 border border-gray-100 p-3 pl-10 rounded-2xl outline-none"
                    placeholder="যেমন: ৩ মাস"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#105D38] cursor-pointer text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-emerald-900/10 hover:bg-[#0d4d2e] transition-all disabled:bg-gray-300 flex items-center justify-center gap-2"
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
