import {
  User,
  Phone,
  Lock,
  UploadCloud,
  ShieldCheck,
  Mail,
  Briefcase,
  EyeOff,
  Eye,
} from "lucide-react";
import { InputField, SelectField } from "./SharedInputs";
import { useState } from "react";

export const Step1 = ({
  register,
  errors,
  watch,
  handleImageClick,
  handleImageChange,
  fileInputRef,
  selectedImage,
  divisions,
}: any) => {
  const currentRole = watch("role");

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-neutral-800 flex items-center gap-2">
          <User className="text-[#105D38]" size={24} /> নতুন অ্যাকাউন্ট
        </h3>
        <p className="text-sm font-bold text-neutral-400 ml-8">
          ধাপে ধাপে আপনার তথ্য পূরণ করুন
        </p>
      </div>

      <div className="space-y-2 mb-4">
        <label className="text-[11px] font-black text-neutral-400 uppercase">
          অ্যাকাউন্টের ধরন
        </label>
        <div className="flex gap-3">
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-3.5 border-2 rounded-2xl cursor-pointer transition-all font-bold text-sm ${currentRole === "student" ? "border-[#105D38] bg-green-50 text-[#105D38]" : "border-neutral-100 text-neutral-400"}`}
          >
            <input
              type="radio"
              value="student"
              {...register("role")}
              className="hidden"
            />{" "}
            ছাত্র (Student)
          </label>
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-3.5 border-2 rounded-2xl cursor-pointer transition-all font-bold text-sm ${currentRole === "teacher" ? "border-[#105D38] bg-green-50 text-[#105D38]" : "border-neutral-100 text-neutral-400"}`}
          >
            <input
              type="radio"
              value="teacher"
              {...register("role")}
              className="hidden"
            />{" "}
            শিক্ষক (Teacher)
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          label="নাম (বাংলা)"
          placeholder="বাংলায় নাম লিখুন"
          register={register("studentNameBn")}
          icon={<User size={18} />}
        />
        <InputField
          label="নাম (ইংরেজিতে) *"
          placeholder="Name in English"
          register={register("studentNameEn", {
            required: "নাম প্রদান করা আবশ্যক",
          })}
          error={errors.studentNameEn}
          icon={<User size={18} />}
        />
        <InputField
          label="জন্ম তারিখ *"
          type="date"
          register={register("birthDate", { required: "জন্ম তারিখ আবশ্যক" })}
          error={errors.birthDate}
        />

        <div className="space-y-2">
          <label className="text-[11px] font-black text-neutral-400 uppercase">
            লিঙ্গ *
          </label>
          <div className="flex gap-3">
            {["male", "female"].map((g) => (
              <label
                key={g}
                className={`flex-1 flex items-center justify-center gap-2 p-3.5 border rounded-2xl cursor-pointer hover:bg-neutral-50 transition-all font-bold text-sm text-neutral-600 ${errors.gender ? "border-red-500" : "border-neutral-100"}`}
              >
                <input
                  type="radio"
                  {...register("gender", { required: "লিঙ্গ নির্বাচন করুন" })}
                  value={g}
                  className="accent-[#105D38]"
                />{" "}
                {g === "male" ? "পুরুষ" : "মহিলা"}
              </label>
            ))}
          </div>
          {errors.gender && (
            <span className="text-[10px] text-red-500 font-bold block">
              {errors.gender.message}
            </span>
          )}
        </div>

        <SelectField
          label="বিভাগ *"
          options={divisions}
          register={register("division", { required: "বিভাগ নির্বাচন করুন" })}
          error={errors.division}
        />
        {!currentRole || currentRole === "student" ? (
          <SelectField
            label="ক্লাস / লেভেল"
            options={["প্লে", "নার্সারি", "প্রথম শ্রেণি"]}
            register={register("classLevel")}
          />
        ) : null}
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black text-neutral-400 uppercase">
          প্রোফাইল ছবি
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
};

export const Step2 = ({ register, errors, isTeacher, departments }: any) => {
  // শিক্ষক রেজিস্ট্রেশনের জন্য প্রফেশনাল তথ্য ফিল্ড
  if (isTeacher) {
    return (
      <div className="space-y-5">
        <h3 className="text-xl font-black text-neutral-800 mb-4">
          পেশাগত তথ্য
        </h3>

        {/* পদবি ফিল্ড */}
        <InputField
          label="পদবি (Designation) *"
          placeholder="যেমন: Lecturer"
          register={register("designation", {
            required: "পদবি প্রদান করা আবশ্যক",
          })}
          error={errors.designation}
          icon={<Briefcase size={18} />}
        />

        {/* ডাইনামিক ডিপার্টমেন্ট ড্রপডাউন */}
        <div className="space-y-1.5 lg:space-y-2">
          <label
            className={`text-[10px] lg:text-[11px] font-black uppercase tracking-wider ${errors.department ? "text-red-500" : "text-neutral-400"}`}
          >
            বিভাগ (Department) *
          </label>
          <div className="relative">
            <select
              {...register("department", {
                required: "ডিপার্টমেন্ট নির্বাচন করুন",
              })}
              defaultValue=""
              className={`w-full px-5 py-3 lg:py-4 bg-neutral-50/50 border rounded-2xl focus:ring-2 focus:bg-white outline-none transition-all font-bold text-sm appearance-none cursor-pointer ${
                errors.department
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-neutral-200 focus:ring-[#105D38]"
              }`}
            >
              <option value="" disabled>
                বিভাগ নির্বাচন করুন
              </option>
              {/* ডাটাবেস থেকে আসা ডিপার্টমেন্টগুলো এখানে লুপ হবে */}
              {departments?.map((dept: any) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {/* ড্রপডাউন অ্যারো আইকন */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
              <svg
                className="w-4 h-4 fill-current rotate-90"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </div>
          </div>
          {errors.department && (
            <span className="text-[10px] text-red-500 font-bold block mt-1">
              {errors.department.message}
            </span>
          )}
        </div>

        {/* শিক্ষাগত যোগ্যতা ফিল্ড */}
        <InputField
          label="শিক্ষাগত যোগ্যতা"
          placeholder="যেমন: B.Sc in CSE"
          register={register("qualifications")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-black text-neutral-800 mb-4">পিতার তথ্য</h3>
      <InputField
        label="পিতার নাম *"
        placeholder="পিতার পূর্ণ নাম লিখুন"
        register={register("fatherName", { required: "পিতার নাম আবশ্যক" })}
        error={errors.fatherName}
      />
      <InputField
        label="মোবাইল নম্বর *"
        placeholder="01XXXXXXXXX"
        register={register("fatherMobile", { required: "পিতার মোবাইল আবশ্যক" })}
        error={errors.fatherMobile}
        icon={<Phone size={18} />}
      />
      <InputField
        label="পেশা"
        placeholder="পিতার পেশা লিখুন"
        register={register("fatherJob")}
      />
    </div>
  );
};

export const Step3 = ({ register, errors }: any) => (
  <div className="space-y-5">
    <h3 className="text-xl font-black text-neutral-800 mb-4">মাতার তথ্য</h3>
    <InputField
      label="মাতার নাম *"
      placeholder="মাতার পূর্ণ নাম লিখুন"
      register={register("motherName", { required: "মাতার নাম আবশ্যক" })}
      error={errors.motherName}
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

export const Step4 = ({ register, errors, divisions }: any) => (
  <div className="space-y-5">
    <h3 className="text-xl font-black text-neutral-800 mb-4">
      ঠিকানা ও যোগাযোগ
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SelectField
        label="বিভাগ *"
        options={divisions}
        register={register("presentDivision", {
          required: "বিভাগ নির্বাচন করুন",
        })}
        error={errors.presentDivision}
      />
      <SelectField
        label="জেলা *"
        options={["রংপুর", "ঢাকা"]}
        register={register("district", { required: "জেলা নির্বাচন করুন" })}
        error={errors.district}
      />
    </div>
    <InputField
      label="স্থায়ী ঠিকানা"
      placeholder="গ্রাম, ডাকঘর, উপজেলা"
      register={register("permanentAddress")}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField
        label="মোবাইল নম্বর *"
        placeholder="01XXXXXXXXX"
        register={register("studentMobile", {
          required: "মোবাইল নম্বর আবশ্যক",
        })}
        error={errors.studentMobile}
        icon={<Phone size={18} />}
      />
      <InputField
        label="ইমেইল অ্যাড্রেস *"
        type="email"
        placeholder="example@gmail.com"
        register={register("email", { required: "ইমেইল আবশ্যক" })}
        error={errors.email}
        icon={<Mail size={18} />}
      />
    </div>
  </div>
);

export const Step5 = ({ register, errors, watch }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // পাসওয়ার্ড ম্যাচিং চেক করার জন্য password ফিল্ডটি ওয়াচ করা
  const password = watch("password");

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-black text-neutral-800 mb-4">
        নিরাপত্তা সেটআপ
      </h3>

      {/* মেইন পাসওয়ার্ড ফিল্ড */}
      <div className="relative">
        <InputField
          label="পাসওয়ার্ড *"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          register={register("password", {
            required: "পাসওয়ার্ড আবশ্যক",
            minLength: {
              value: 6,
              message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
            },
          })}
          error={errors.password}
          icon={<Lock size={18} />}
        />
        {/* আই আইকন বাটন */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-12 top-[38px] lg:top-[42px] text-neutral-400 hover:text-[#105D38] transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* পাসওয়ার্ড কনফার্ম ফিল্ড */}
      <div className="relative">
        <InputField
          label="পাসওয়ার্ড পুনরায় নিশ্চিত করুন *"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          register={register("confirmPassword", {
            required: "পুনরায় পাসওয়ার্ড দিন",
            validate: (value: string) =>
              value === password || "পাসওয়ার্ড দুটি মিলছে না",
          })}
          error={errors.confirmPassword}
          icon={<Lock size={18} />}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-12 top-[38px] lg:top-[42px] text-neutral-400 hover:text-[#105D38] transition-colors"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex gap-4 mt-6">
        <ShieldCheck className="text-[#105D38] shrink-0" size={24} />
        <p className="text-[12px] font-bold text-neutral-600 leading-relaxed">
          আমি ঘোষণা করছি যে, উপরে প্রদত্ত সমস্ত তথ্য সঠিক এবং আমি প্রতিষ্ঠানের
          সকল নিয়মাবলী মেনে চলতে বাধ্য থাকব।
        </p>
      </div>
    </div>
  );
};
