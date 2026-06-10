import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ZakatCalculator = () => {
    const [zakat, setZakat] = useState({ input: "", result: 0 });
    return (
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-black/5">
          <div className="flex items-center gap-2 font-black text-[#0B3D2E] mb-4">
            <Calculator size={20} className="text-amber-600" />
            <span>যাকাত ক্যালকুলেটর</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="মোট জমানো টাকা..."
              className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none font-bold text-sm"
              onChange={(e) => setZakat({ ...zakat, input: e.target.value })}
            />
            <button
              onClick={() =>
                setZakat({ ...zakat, result: Number(zakat.input) * 0.025 })
              }
              className="bg-[#0B3D2E] text-white px-6 rounded-2xl font-bold text-sm"
            >
              হিসাব
            </button>
          </div>
          {zakat.result > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-between"
            >
              <span className="text-sm font-bold text-green-800">
                আপনার যাকাত:
              </span>
              <span className="text-lg font-black text-green-900">
                ৳{zakat.result.toLocaleString()}
              </span>
            </motion.div>
          )}
        </div>
    );
};

export default ZakatCalculator;