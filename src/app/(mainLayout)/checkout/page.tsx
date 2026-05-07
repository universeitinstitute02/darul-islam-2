"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  CreditCard,
  Truck,
} from "lucide-react";
import Swal from "sweetalert2";

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productName = searchParams.get("name") || "পণ্য";
  const productPrice = Number(searchParams.get("price")) || 0;
  const productImage = searchParams.get("image") || "";
  const deliveryCharge = 70;
  const totalPrice = productPrice + deliveryCharge;

  const handleOrder = () => {
    // এখানে আপনি চাইলে ফর্ম ভ্যালিডেশন চেক করতে পারেন

    Swal.fire({
      title: "অর্ডার সফল হয়েছে!",
      text: "আপনার অর্ডারটি আমরা পেয়েছি, শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।",
      icon: "success",
      iconColor: "#105D38",
      confirmButtonText: "ঠিক আছে",
      confirmButtonColor: "#105D38",
      background: "#fff",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl px-8 py-3 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/islamic-shop");
      }
    });
  };

  return (
    // mt-16 বা pt-20 ব্যবহার করা হয়েছে যাতে নেভবার এর নিচে না যায়
    <div className="min-h-screen bg-[#F9FBFA] pt-20 pb-12 md:pt-28">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              চেকআউট
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              নিচের তথ্যগুলো পূরণ করে অর্ডারটি সম্পন্ন করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-[#105D38]">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-gray-800">
                  ডেলিভারি ঠিকানা
                </h2>
              </div>

              <div className="space-y-5">
                <div className="group">
                  <label className="text-xs font-bold text-gray-400 ml-2 mb-2 block uppercase tracking-widest">
                    আপনার নাম
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#105D38] transition-colors" />
                    <input
                      type="text"
                      placeholder="পুরো নাম লিখুন"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#105D38] outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-gray-400 ml-2 mb-2 block uppercase tracking-widest">
                    ফোন নম্বর
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#105D38] transition-colors" />
                    <input
                      type="number"
                      placeholder="সক্রিয় ফোন নম্বর"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#105D38] outline-none transition-all text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-xs font-bold text-gray-400 ml-2 mb-2 block uppercase tracking-widest">
                    পুরো ঠিকানা
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-5 w-5 h-5 text-gray-300 group-focus-within:text-[#105D38] transition-colors" />
                    <textarea
                      rows={3}
                      placeholder="গ্রাম/রাস্তা, থানা, জেলা"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#105D38] outline-none transition-all text-gray-800 font-medium resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm">পেমেন্ট মেথড</p>
                <p className="text-xs text-blue-700">
                  ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা দিন)
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-green-900/5 border border-gray-50 sticky top-28">
              <h2 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#105D38]" /> অর্ডার সামারি
              </h2>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl mb-8 border border-gray-100/50">
                <div className="relative w-20 h-20 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-2 leading-snug">
                    {productName}
                  </h3>
                  <p className="text-[#105D38] font-black mt-1">
                    ৳ {productPrice}
                  </p>
                </div>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>পণ্যের দাম</span>
                  <span className="text-gray-900">৳ {productPrice}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="text-gray-900">৳ {deliveryCharge}</span>
                </div>
                <div className="h-px bg-dashed bg-gray-200 my-4"></div>
                <div className="flex justify-between items-center text-gray-900">
                  <span className="font-bold text-lg">সর্বমোট</span>
                  <span className="font-black text-3xl text-[#105D38]">
                    ৳ {totalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="w-full mt-10 py-5 bg-[#105D38] text-white font-black rounded-2xl shadow-lg shadow-green-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                অর্ডার নিশ্চিত করুন
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </div>
              </button>

              <p className="text-center text-[10px] text-gray-400 mt-6 font-medium uppercase tracking-widest">
                নিরাপদ ও দ্রুত ডেলিভারির নিশ্চয়তা
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => (
  <Suspense
    fallback={
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#105D38] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }
  >
    <CheckoutContent />
  </Suspense>
);

export default CheckoutPage;
