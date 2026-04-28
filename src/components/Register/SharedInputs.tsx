import { ChevronRight } from "lucide-react";

export const InputField = ({
  label,
  placeholder,
  type = "text",
  icon,
  register,
}: any) => (
  <div className="space-y-1.5 lg:space-y-2">
    <label className="text-[10px] lg:text-[11px] font-black text-neutral-400 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      <input
        {...register}
        type={type}
        placeholder={placeholder} // এখানে ফিক্স করা হয়েছে
        className="w-full pl-5 pr-12 py-3 lg:py-4 bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] focus:bg-white outline-none transition-all font-bold text-sm"
      />
      {icon && (
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 group-focus-within:text-[#105D38] transition-colors">
          {icon}
        </div>
      )}
    </div>
  </div>
);

export const SelectField = ({ label, options, register }: any) => (
  <div className="space-y-1.5 lg:space-y-2">
    <label className="text-[10px] lg:text-[11px] font-black text-neutral-400 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        {...register}
        className="w-full px-5 py-3 lg:py-4 bg-neutral-50/50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-[#105D38] focus:bg-white outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
      >
        <option value="" disabled selected>
          {label} নির্বাচন করুন
        </option>
        {options.map((opt: string, idx: number) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
        <ChevronRight size={16} className="rotate-90" />
      </div>
    </div>
  </div>
);
