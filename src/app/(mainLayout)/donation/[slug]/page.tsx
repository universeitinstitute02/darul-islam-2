"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  ArrowRight,
  User,
  Phone,
  Smartphone,
  Hash,
  MapPin,
  Copy,
  Check,
} from "lucide-react";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";
import axios from "axios";

/* ─────────────────────────────────────────
    TYPES
───────────────────────────────────────── */
interface DonorFormValues {
  name: string;
  phone: string;
  senderNumber?: string;
  address?: string;
  trxId?: string;
}

interface DonationPayload extends DonorFormValues {
  amount: number;
  method: string;
  campaignSlug: string;
}

/* ─────────────────────────────────────────
    CONSTANTS
───────────────────────────────────────── */
const campaigns: Record<
  string,
  { title: string; target: number; raised: number }
> = {
  "masjid-renovation": {
    title: "মসজিদ সংস্কার",
    target: 500000,
    raised: 312000,
  },
  "yatim-fund": { title: "ইয়াতিম তহবিল", target: 1000000, raised: 678000 },
};
const DEFAULT_CAMPAIGN = { title: "সাধারণ দান", target: 100000, raised: 23000 };
const PRESETS = ["500", "1000", "2000", "5000"];

const PAYMENT_INFO: Record<
  string,
  {
    label: string;
    number?: string;
    ac?: string;
    bg: string;
    borderColor: string;
    logo: string;
  }
> = {
  bkash: {
    label: "বিকাশ (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-pink-50",
    borderColor: "border-pink-400",
    logo: "https://freelogopng.com/images/all_img/1656234841bkash-icon-png.png",
  },
  nagad: {
    label: "নগদ (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-orange-50",
    borderColor: "border-orange-400",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Nagad-png.png",
  },
  rocket: {
    label: "রকেট (পার্সোনাল)",
    number: "01788002255",
    bg: "bg-purple-50",
    borderColor: "border-purple-400",
    logo: "https://static.vecteezy.com/system/resources/previews/068/842/062/non_2x/rocket-icon-mobile-banking-logo-emblem-transparent-background-free-png.png",
  },
  bank: {
    label: "ইসলামী ব্যাংক",
    ac: "2050188002255",
    bg: "bg-blue-50",
    borderColor: "border-blue-400",
    logo: "https://res.cloudinary.com/darulislam/image/upload/v1780811223/central-bank_z1rprw.png",
  },
};

/* ─────────────────────────────────────────
    API FUNCTION
───────────────────────────────────────── */
async function postDonation(
  payload: DonationPayload,
): Promise<{ success: boolean; message?: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  try {
    const response = await axios.post(`${baseUrl}/donations`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message ?? "সার্ভার ত্রুটি হয়েছে");
  }
}

/* ─────────────────────────────────────────
    COPY HOOK
───────────────────────────────────────── */
function useCopy(text: string) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return { copied, copy };
}

/* ─────────────────────────────────────────
    MAIN PAGE
───────────────────────────────────────── */
export default function DonationPage() {
  const params = useParams();
  const campaign = campaigns[params?.slug as string] ?? DEFAULT_CAMPAIGN;

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bkash");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonorFormValues>({ mode: "onSubmit" });

  const onSubmit = async (data: DonorFormValues) => {
    if (!amount || Number(amount) < 1) {
      return Swal.fire("ভুল হয়েছে", "দানের পরিমাণ লিখুন", "error");
    }
    if (method !== "bank" && (!data.senderNumber || !data.trxId)) {
      return Swal.fire(
        "তথ্য প্রয়োজন",
        "বিকাশ/নগদ পেমেন্টের ক্ষেত্রে নাম্বার ও TrxID দিন",
        "warning",
      );
    }

    const payload: DonationPayload = {
      name: data.name,
      phone: data.phone,
      address: data.address || "",
      amount: Number(amount),
      method,
      campaignSlug: (params?.slug as string) ?? "general",
      // Exclude mobile-banking fields cleanly if processing direct bank transfers
      senderNumber: method !== "bank" ? data.senderNumber : undefined,
      trxId: method !== "bank" ? data.trxId : undefined,
    };

    setLoading(true);
    try {
      await postDonation(payload);
      Swal.fire({
        title: "জাযাকাল্লাহ খাইর!",
        text: "আপনার তথ্যটি সফলভাবে গৃহীত হয়েছে।",
        icon: "success",
        confirmButtonColor: "#14281D",
      });
      setAmount("");
      reset();
    } catch (err: any) {
      Swal.fire("দুঃখিত", err?.message ?? "আবার চেষ্টা করুন", "error");
    } finally {
      setLoading(false);
    }
  };

  const paymentInfo = PAYMENT_INFO[method];
  const copyTarget =
    method === "bank" ? (paymentInfo.ac ?? "") : (paymentInfo.number ?? "");

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-16">
      {/* Header */}
      <div className="bg-green-800 text-white px-6 py-12 text-center">
        <h1 className="text-3xl font-black mb-2">{campaign.title}</h1>
        <p className="text-xs opacity-60 uppercase font-bold tracking-widest">
          মানবতার সেবায় আপনার অংশগ্রহণ
        </p>
      </div>

      <div className="max-w-xl mx-auto px-4 -mt-8 space-y-6">
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-black/5">
          {/* Amount presets */}
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-3 block">
            পরিমাণ নির্বাচন করুন
          </label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setAmount(p)}
                className={`py-3 rounded-xl text-sm font-bold transition-all ${
                  amount === p
                    ? "bg-[#14281D] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {p}৳
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="টাকার পরিমাণ..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-lg outline-none mb-6 border-2 border-transparent focus:border-[#14281D]/10"
          />

          {/* Payment method selector */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {["bkash", "nagad", "rocket", "bank"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                  method === m
                    ? "border-[#14281D] bg-gray-50"
                    : "border-gray-100 opacity-60 hover:opacity-80"
                }`}
              >
                <img
                  src={PAYMENT_INFO[m].logo}
                  alt={m}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="text-[10px] font-black uppercase">{m}</span>
              </button>
            ))}
          </div>

          {/* Payment info card with copy button */}
          <AnimatePresence mode="wait">
            <motion.div
              key={method}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl mb-6 border-l-4 ${paymentInfo.bg} ${paymentInfo.borderColor}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={paymentInfo.logo}
                  alt={method}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <p className="text-xs font-bold opacity-70">
                  {paymentInfo.label}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p
                  className={`font-black ${method === "bank" ? "text-sm" : "text-xl"} flex-1`}
                >
                  {method === "bank"
                    ? `A/C: ${paymentInfo.ac}`
                    : `Number: ${paymentInfo.number}`}
                </p>
                <CopyButton text={copyTarget} />
              </div>

              <p className="text-[10px] mt-2 opacity-60 italic">
                * এই ঠিকানায় টাকা পাঠিয়ে নিচের তথ্যগুলো পূরণ করুন।
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form fields via react-hook-form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <RHFInput
                    icon={<User size={16} />}
                    placeholder="আপনার নাম"
                    registration={register("name", { required: "নাম দিন" })}
                  />
                  {errors.name && <FieldError msg={errors.name.message} />}
                </div>
                <div>
                  <RHFInput
                    icon={<Phone size={16} />}
                    placeholder="আপনার ফোন নাম্বার"
                    registration={register("phone", {
                      required: "ফোন নাম্বার দিন",
                      pattern: {
                        value: /^[0-9+]{10,15}$/,
                        message: "সঠিক নাম্বার দিন",
                      },
                    })}
                  />
                  {errors.phone && <FieldError msg={errors.phone.message} />}
                </div>
              </div>

              {method !== "bank" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div>
                    <RHFInput
                      icon={<Smartphone size={16} />}
                      placeholder="যে নাম্বার থেকে পাঠিয়েছেন"
                      registration={register("senderNumber", {
                        required: "সেন্ডার নাম্বার দিন",
                        pattern: {
                          value: /^[0-9+]{10,15}$/,
                          message: "সঠিক নাম্বার দিন",
                        },
                      })}
                    />
                    {errors.senderNumber && (
                      <FieldError msg={errors.senderNumber.message} />
                    )}
                  </div>
                  <div>
                    <RHFInput
                      icon={<MapPin size={16} />}
                      placeholder="আপনার ঠিকানা"
                      registration={register("address")}
                    />
                  </div>
                  <div>
                    <RHFInput
                      icon={<Hash size={16} />}
                      placeholder="ট্রানজেকশন আইডি (TrxID)"
                      registration={register("trxId", {
                        required: "TrxID দিন",
                      })}
                    />
                    {errors.trxId && <FieldError msg={errors.trxId.message} />}
                  </div>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full cursor-pointer bg-green-800 text-white py-4 rounded-2xl font-black flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-60 overflow-hidden"
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-800">
                  <LoadingSpinner />
                </div>
              )}

              <span
                className={`flex items-center justify-center gap-2 transition-opacity duration-200 ${loading ? "opacity-0" : "opacity-100"}`}
              >
                দান নিশ্চিত করুন
                <ArrowRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
    COPY BUTTON COMPONENT
───────────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const { copied, copy } = useCopy(text);

  return (
    <button
      type="button"
      onClick={copy}
      title="কপি করুন"
      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
        copied
          ? "bg-green-100 border-green-300 text-green-700"
          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
      }`}
    >
      {copied ? (
        <>
          <Check size={13} /> কপি হয়েছে
        </>
      ) : (
        <>
          <Copy size={13} /> কপি
        </>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────
    RHF INPUT COMPONENT
───────────────────────────────────────── */
interface RHFInputProps {
  icon: React.ReactNode;
  placeholder: string;
  registration: ReturnType<
    import("react-hook-form").UseFormRegister<DonorFormValues>
  >;
}

function RHFInput({ icon, placeholder, registration }: RHFInputProps) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-gray-200 transition-all"
        placeholder={placeholder}
        {...registration}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
    FIELD ERROR
───────────────────────────────────────── */
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-[11px] text-red-500 font-semibold mt-1 ml-2">{msg}</p>
  );
}
