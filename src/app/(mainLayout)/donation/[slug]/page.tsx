"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  Clock, Calculator, ArrowRight, User, Phone, 
  Loader2, Smartphone, Building2, Hash
} from "lucide-react";

/* --- CONSTANTS --- */
const campaigns: Record<string, any> = {
  "masjid-renovation": { title: "মসজিদ সংস্কার", target: 500000, raised: 312000 },
  "yatim-fund": { title: "ইয়াতিম তহবিল", target: 1000000, raised: 678000 },
};
const DEFAULT_CAMPAIGN = { title: "সাধারণ দান", target: 100000, raised: 23000 };
const PRESETS = ["500", "1000", "2000", "5000"];

const PAYMENT_INFO: Record<string, any> = {
  bkash: { label: "বিকাশ (পার্সোনাল)", number: "017XX-XXXXXX", color: "text-pink-500", bg: "bg-pink-50" },
  nagad: { label: "নগদ (পার্সোনাল)", number: "018XX-XXXXXX", color: "text-orange-500", bg: "bg-orange-50" },
  rocket: { label: "রকেট (পার্সোনাল)", number: "019XX-XXXXXX", color: "text-purple-600", bg: "bg-purple-50" },
  bank: { label: "ইসলামী ব্যাংক", ac: "2050XXXXXXXXX", color: "text-blue-700", bg: "bg-blue-50" },
};

export default function DonationPage() {
  const params = useParams();
  const campaign = campaigns[params?.slug as string] ?? DEFAULT_CAMPAIGN;

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bkash");
  const [loading, setLoading] = useState(false);
  const [donor, setDonor] = useState({ name: "", phone: "", senderNumber: "", trxId: "" });
  const [zakat, setZakat] = useState({ input: "", result: 0 });

  const handleSubmit = async () => {
    if (!amount || Number(amount) < 1) return Swal.fire("ভুল হয়েছে", "দানের পরিমাণ লিখুন", "error");
    if (method !== "bank" && (!donor.senderNumber || !donor.trxId)) {
       return Swal.fire("তথ্য প্রয়োজন", "বিকাশ/নগদ পেমেন্টের ক্ষেত্রে নাম্বার ও TrxID দিন", "warning");
    }

    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 2000)); 
      Swal.fire({
        title: "জাযাকাল্লাহ খাইর!",
        text: "আপনার তথ্যটি সফলভাবে গৃহীত হয়েছে।",
        icon: "success",
        confirmButtonColor: "#14281D",
      });
      setAmount("");
      setDonor({ name: "", phone: "", senderNumber: "", trxId: "" });
    } catch (err) {
      Swal.fire("দুঃখিত", "আবার চেষ্টা করুন", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-16">
      <div className="bg-[#14281D] text-[#E2D4B9] px-6 py-12 text-center">
        <h1 className="text-3xl font-black mb-2">{campaign.title}</h1>
        <p className="text-xs opacity-60 uppercase font-bold tracking-widest">মানবতার সেবায় আপনার অংশগ্রহণ</p>
      </div>

      <div className="max-w-xl mx-auto px-4 -mt-8 space-y-6">
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-black/5">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-3 block">পরিমাণ নির্বাচন করুন</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PRESETS.map(p => (
              <button key={p} onClick={() => setAmount(p)} className={`py-3 rounded-xl text-sm font-bold transition-all ${amount === p ? "bg-[#14281D] text-white" : "bg-gray-100 text-gray-600"}`}>{p}৳</button>
            ))}
          </div>

          <input type="number" placeholder="টাকার পরিমাণ..." value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl font-bold text-lg outline-none mb-6 border-2 border-transparent focus:border-[#14281D]/10" />

          <div className="grid grid-cols-4 gap-2 mb-6">
            {['bkash', 'nagad', 'rocket', 'bank'].map((m) => (
              <button key={m} onClick={() => setMethod(m)} className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${method === m ? "border-[#14281D] bg-gray-50" : "border-gray-50 opacity-60"}`}>
                {m === 'bank' ? <Building2 size={20} className="text-blue-700"/> : <Smartphone size={20} className={PAYMENT_INFO[m].color}/>}
                <span className="text-[10px] font-black uppercase">{m}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={method} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-5 rounded-2xl mb-6 border-l-4 ${PAYMENT_INFO[method].bg} ${PAYMENT_INFO[method].color.replace('text', 'border')}`}>
               <p className="text-xs font-bold opacity-70 mb-1">{PAYMENT_INFO[method].label}</p>
               <p className={method === 'bank' ? "text-sm font-black" : "text-xl font-black"}>
                  {method === 'bank' ? `A/C: ${PAYMENT_INFO[method].ac}` : `Number: ${PAYMENT_INFO[method].number}`}
               </p>
               <p className="text-[10px] mt-2 opacity-60 italic">* এই ঠিকানায় টাকা পাঠিয়ে নিচের তথ্যগুলো পূরণ করুন।</p>
            </motion.div>
          </AnimatePresence>

          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-2">
               {/* এখানে v: string লিখে টাইপ ডিফাইন করা হয়েছে */}
               <Input icon={<User size={16}/>} placeholder="আপনার নাম" value={donor.name} onChange={(v: string) => setDonor({...donor, name: v})} />
               <Input icon={<Phone size={16}/>} placeholder="আপনার ফোন" value={donor.phone} onChange={(v: string) => setDonor({...donor, phone: v})} />
            </div>
            
            {method !== 'bank' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <Input icon={<Smartphone size={16}/>} placeholder="যে নাম্বার থেকে পাঠিয়েছেন" value={donor.senderNumber} onChange={(v: string) => setDonor({...donor, senderNumber: v})} />
                <Input icon={<Hash size={16}/>} placeholder="ট্রানজেকশন আইডি (TrxID)" value={donor.trxId} onChange={(v: string) => setDonor({...donor, trxId: v})} />
              </motion.div>
            )}
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-[#14281D] text-[#E2D4B9] py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            {loading ? <Loader2 className="animate-spin"/> : "দান নিশ্চিত করুন"} <ArrowRight size={18}/>
          </button>
        </div>

        {/* Zakat Calculator */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-black/5">
          <div className="flex items-center gap-2 font-black text-[#14281D] mb-4">
            <Calculator size={20} className="text-amber-600" />
            <span>যাকাত ক্যালকুলেটর</span>
          </div>
          <div className="flex gap-2">
            <input type="number" placeholder="মোট জমানো টাকা..." className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm" onChange={(e) => setZakat({ ...zakat, input: e.target.value })} />
            <button onClick={() => setZakat({ ...zakat, result: Number(zakat.input) * 0.025 })} className="bg-[#14281D] text-white px-6 rounded-2xl font-bold text-sm">হিসাব</button>
          </div>
          {zakat.result > 0 && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-between">
              <span className="text-sm font-bold text-green-800">আপনার যাকাত:</span>
              <span className="text-lg font-black text-green-900">৳{zakat.result.toLocaleString()}</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- REUSABLE INPUT COMPONENT --- */
interface InputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}

function Input({ icon, placeholder, value, onChange }: InputProps) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input 
        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-bold outline-none border border-transparent focus:border-gray-200 transition-all" 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}