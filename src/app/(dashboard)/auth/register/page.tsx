"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

import { Sidebar } from "@/src/components/register/Sidebar";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
} from "@/src/components/register/Fromsteps";

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<any>({
    defaultValues: { role: "student" },
  });

  const [step, setStep] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const totalSteps = 5;

  const userRole = watch("role");
  const isTeacher = userRole === "teacher";

  // Fetch Departments from your Category/Bivag API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        );
        setDepartments(res.data); // Assuming res.data is an array of { _id, name }
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
    };
    fetchDepartments();
  }, []);

  const staticDivisions = [
    "ঢাকা",
    "চট্টগ্রাম",
    "রাজশাহী",
    "খুলনা",
    "বরিশাল",
    "সিলেট",
    "রংপুর",
    "ময়মনসিংহ",
  ];

  const nextStep = async () => {
    // সঠিক ধাপ অনুযায়ী ভ্যালিডেশন ম্যাপ
    const validationMap: any = {
      1: [
        "studentNameEn",
        "studentNameBn",
        "teacherNameBn",
        "birthDate",
        "gender",
        "division",
      ],
      2: isTeacher
        ? ["designation", "department"]
        : ["fatherName", "fatherMobile"],
      3: ["motherName"],
      4: ["district", "studentMobile", "email"],
      5: ["password", "confirmPassword"],
    };

    // বর্তমান ধাপের ফিল্ডগুলো চেক করবে
    const isStepValid = await trigger(validationMap[step] || []);

    if (isStepValid) {
      if (isTeacher && step === 2) {
        setStep(4);
      } else if (step < totalSteps) {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    if (isTeacher && step === 4) {
      setStep(2);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("পাসওয়ার্ড মিলছে না!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "confirmPassword") {
          formData.append(key, data[key]);
        }
      });

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("রেজিস্ট্রেশন সফল হয়েছে!");
      router.push("/auth/login");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-neutral-100">
        <Sidebar step={step} isTeacher={isTeacher} />

        <div className="flex-1 p-6 lg:p-12 relative">
          <div className="mb-6 lg:mb-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#105D38] transition-colors group"
            >
              <div className="p-2 lg:p-0 bg-neutral-50 lg:bg-transparent rounded-full lg:rounded-none">
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </div>
              <span className="hidden lg:block text-sm font-bold uppercase tracking-widest">
                পিছনে
              </span>
            </Link>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                nextStep();
              }
            }}
            className="min-h-[400px] flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                {step === 1 && (
                  <Step1
                    register={register}
                    errors={errors}
                    watch={watch}
                    divisions={staticDivisions}
                    handleImageClick={() => fileInputRef.current?.click()}
                    handleImageChange={(e: any) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedImage(URL.createObjectURL(file));
                        setImageFile(file);
                      }
                    }}
                    fileInputRef={fileInputRef}
                    selectedImage={selectedImage}
                  />
                )}
                {step === 2 && (
                  <Step2
                    register={register}
                    errors={errors}
                    isTeacher={isTeacher}
                    departments={departments}
                  />
                )}
                {step === 3 && !isTeacher && (
                  <Step3 register={register} errors={errors} />
                )}
                {step === 4 && (
                  <Step4
                    register={register}
                    errors={errors}
                    divisions={staticDivisions}
                  />
                )}
                {step === 5 && (
                  <Step5 register={register} errors={errors} watch={watch} />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isLoading}
                    className="px-6 py-4 border-2 border-neutral-100 rounded-2xl font-black text-neutral-400 hover:bg-neutral-50 flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    <ChevronLeft size={20} /> ফিরে যান
                  </button>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      nextStep();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#105D38] text-white rounded-2xl font-black shadow-xl active:scale-[0.98] transition-all"
                  >
                    পরবর্তী ধাপ <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#105D38] text-white rounded-2xl font-black shadow-xl active:scale-[0.98] transition-all disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> অপেক্ষা
                        করুন...
                      </>
                    ) : (
                      "রেজিস্ট্রেশন সম্পন্ন করুন"
                    )}
                  </button>
                )}
              </div>

              <p className="text-center text-sm font-bold text-neutral-500 mt-2">
                ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link
                  href="/auth/login"
                  className="text-[#105D38] hover:underline font-black"
                >
                  লগইন করুন
                </Link>
              </p>

              {step === 1 && (
                <div className="mt-4">
                  <div className="relative flex items-center py-4">
                    <div className="flex-grow border-t border-neutral-200"></div>
                    <span className="flex-shrink-0 mx-4 text-neutral-400 text-sm font-bold">
                      অথবা
                    </span>
                    <div className="flex-grow border-t border-neutral-200"></div>
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-neutral-200 rounded-2xl font-black text-neutral-600 hover:bg-neutral-50 transition-all shadow-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google-এর মাধ্যমে যুক্ত হোন
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
