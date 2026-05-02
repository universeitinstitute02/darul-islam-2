import {
  User,
  Phone,
  Lock,
  UploadCloud,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { InputField, SelectField } from "./SharedInputs";

export const Step1 = ({
  register,
  handleImageClick,
  handleImageChange,
  fileInputRef,
  selectedImage,
  divisions,
}: any) => (
  <div className="space-y-6">
    <div className="space-y-1">
      <h3 className="text-xl font-black text-neutral-800 flex items-center gap-2">
        <User className="text-[#105D38]" size={24} /> নতুন শিক্ষার্থী
        রেজিস্ট্রেশন
      </h3>
      <p className="text-sm font-bold text-neutral-400 ml-8">
        ধাপে ধাপে আপনার তথ্য পূরণ করুন
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField
        label="শিক্ষার্থীর নাম (বাংলা)"
        placeholder="বাংলায় নাম লিখুন"
        register={register("studentNameBn")}
        icon={<User size={18} />}
      />
      <InputField
        label="শিক্ষার্থীর নাম (ইংরেজিতে)"
        placeholder="Name in English"
        register={register("studentNameEn")}
        icon={<User size={18} />}
      />
      <InputField
        label="জন্ম তারিখ"
        type="date"
        register={register("birthDate")}
      />

      <div className="space-y-2">
        <label className="text-[11px] font-black text-neutral-400 uppercase">
          লিঙ্গ
        </label>
        <div className="flex gap-3">
          {["male", "female"].map((g) => (
            <label
              key={g}
              className="flex-1 flex items-center justify-center gap-2 p-3.5 border border-neutral-100 rounded-2xl cursor-pointer hover:bg-neutral-50 transition-all font-bold text-sm"
            >
              <input
                type="radio"
                {...register("gender")}
                value={g}
                className="accent-[#105D38]"
              />{" "}
              {g === "male" ? "ছেলে" : "মেয়ে"}
            </label>
          ))}
        </div>
      </div>

      <SelectField
        label="বিভাগ"
        options={divisions}
        register={register("division")}
      />
      <SelectField
        label="ক্লাস / লেভেল"
        options={["প্লে", "নার্সারি", "প্রথম শ্রেণি"]}
        register={register("classLevel")}
      />
    </div>

    <div className="space-y-2">
      <label className="text-[11px] font-black text-neutral-400 uppercase">
        শিক্ষার্থীর প্রোফাইল ছবি
      </label>
      <div
        onClick={handleImageClick}
        className="w-full p-4 lg:p-6 bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-2xl flex items-center justify-center gap-4 cursor-pointer hover:border-[#105D38] transition-all group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-neutral-400 group-hover:text-[#105D38]">
          <UploadCloud size={24} />
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-neutral-700">ছবি আপলোড করুন</p>
          <p className="text-[10px] text-neutral-400 font-bold uppercase">
            JPG, PNG (সর্বোচ্চ 2MB)
          </p>
        </div>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Preview"
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg object-cover ml-auto border border-neutral-200 shadow-md"
          />
        )}
      </div>
    </div>
  </div>
);

export const Step2 = ({ register }: any) => (
  <div className="space-y-5">
    <h3 className="text-xl font-black text-neutral-800 mb-4">পিতার তথ্য</h3>
    <InputField
      label="পিতার নাম"
      placeholder="পিতার পূর্ণ নাম লিখুন"
      register={register("fatherName")}
    />
    <InputField
      label="মোবাইল নম্বর"
      placeholder="01XXXXXXXXX"
      register={register("fatherMobile")}
      icon={<Phone size={18} />}
    />
    <InputField
      label="পেশা"
      placeholder="পিতার পেশা লিখুন"
      register={register("fatherJob")}
    />
  </div>
);

export const Step3 = ({ register }: any) => (
  <div className="space-y-5">
    <h3 className="text-xl font-black text-neutral-800 mb-4">মাতার তথ্য</h3>
    <InputField
      label="মাতার নাম"
      placeholder="মাতার পূর্ণ নাম লিখুন"
      register={register("motherName")}
    />
    <InputField
      label="মোবাইল নম্বর"
      placeholder="01XXXXXXXXX"
      register={register("motherMobile")}
      icon={<Phone size={18} />}
    />
    <InputField
      label="পেশা"
      placeholder="মাতার পেশা লিখুন"
      register={register("motherJob")}
    />
  </div>
);

export const Step4 = ({ register, divisions }: any) => (
  <div className="space-y-5">
    <h3 className="text-xl font-black text-neutral-800 mb-4">
      ঠিকানা ও যোগাযোগ
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        label="বিভাগ"
        options={divisions}
        register={register("presentDivision")}
      />
      <SelectField
        label="জেলা"
        options={["রংপুর", "ঢাকা"]}
        register={register("district")}
      />
    </div>
    <InputField
      label="স্থায়ী ঠিকানা"
      placeholder="গ্রাম, ডাকঘর, উপজেলা"
      register={register("permanentAddress")}
    />

    {/* Contact Info Grouped Together */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="শিক্ষার্থীর মোবাইল"
        placeholder="01XXXXXXXXX"
        register={register("studentMobile")}
        icon={<Phone size={18} />}
      />
      <InputField
        label="ইমেইল অ্যাড্রেস"
        type="email"
        placeholder="example@gmail.com"
        register={register("email")}
        icon={<Mail size={18} />}
      />
    </div>
  </div>
);

export const Step5 = ({ register }: any) => (
  <div className="space-y-5">
    <h3 className="text-xl font-black text-neutral-800 mb-4">
      নিরাপত্তা সেটআপ
    </h3>
    <InputField
      label="পাসওয়ার্ড"
      type="password"
      placeholder="••••••••"
      register={register("password")}
      icon={<Lock size={18} />}
    />
    <InputField
      label="পাসওয়ার্ড পুনরায় নিশ্চিত করুন"
      type="password"
      placeholder="••••••••"
      register={register("confirmPassword")}
      icon={<Lock size={18} />}
    />
    <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex gap-4 mt-6">
      <ShieldCheck className="text-[#105D38] shrink-0" size={24} />
      <p className="text-[12px] font-bold text-neutral-600 leading-relaxed">
        আমি ঘোষণা করছি যে, উপরে প্রদত্ত সমস্ত তথ্য সঠিক এবং আমি প্রতিষ্ঠানের সকল
        নিয়মাবলী মেনে চলতে বাধ্য থাকব।
      </p>
    </div>
  </div>
);
