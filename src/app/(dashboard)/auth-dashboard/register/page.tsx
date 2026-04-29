"use client";
import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Sidebar } from "@/src/components/register/Sidebar";
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
} from "@/src/components/register/Fromsteps";

const RegisterPage: React.FC = () => {
  const { register, handleSubmit } = useForm<any>();
  const [step, setStep] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalSteps = 5;

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

  const onSubmit: SubmitHandler<any> = (data) => {
    const finalData = { ...data, profileImage: selectedImage };
    console.log("Collected Form Data for MongoDB:", finalData);
    alert("রেজিস্ট্রেশন ডেটা কনসোলে পাঠানো হয়েছে!");
  };

  const nextStep = () => step < totalSteps && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 lg:p-8 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-neutral-100">
        <Sidebar step={step} />

        <div className="flex-1 p-6 lg:p-12 relative">
          {/* --- "পিছনে" বাটন সিস্টেম (রেসপনসিভ) --- */}
          <div className="mb-6 lg:mb-8">
            <Link
              href="/auth-dashboard/login"
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
                    divisions={staticDivisions}
                    handleImageClick={() => fileInputRef.current?.click()}
                    handleImageChange={(e: any) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedImage(URL.createObjectURL(file));
                    }}
                    fileInputRef={fileInputRef}
                    selectedImage={selectedImage}
                  />
                )}
                {step === 2 && <Step2 register={register} />}
                {step === 3 && <Step3 register={register} />}
                {step === 4 && (
                  <Step4 register={register} divisions={staticDivisions} />
                )}
                {step === 5 && <Step5 register={register} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-4 border-2 border-neutral-100 rounded-2xl font-black text-neutral-400 hover:bg-neutral-50 flex items-center gap-2 transition-all"
                  >
                    <ChevronLeft size={20} /> ফিরে যান
                  </button>
                )}
                <button
                  type={step === totalSteps ? "submit" : "button"}
                  onClick={step === totalSteps ? undefined : nextStep}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#105D38] text-white rounded-2xl font-black shadow-xl active:scale-[0.98] transition-all"
                >
                  {step === totalSteps
                    ? "রেজিস্ট্রেশন সম্পন্ন করুন"
                    : "পরবর্তী ধাপ"}{" "}
                  <ChevronRight size={20} />
                </button>
              </div>
              <p className="text-center text-sm font-bold text-neutral-500">
                ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link
                  href="/auth-dashboard/login"
                  className="text-[#105D38] hover:underline"
                >
                  লগইন করুন
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
