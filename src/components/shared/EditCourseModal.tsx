"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

const EditCourseModal = ({ course, isOpen, onClose, onUpdate, token }: any) => {
  // কোর্স প্রপ পরিবর্তনের সাথে সাথে স্টেট সিঙ্ক করার জন্য useEffect
  const [formData, setFormData] = useState({ ...course });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) {
      setFormData({ ...course });
    }
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `https://darulislam-server-v2.vercel.app/api/courses/teacher/${course._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        await Swal.fire({
          title: "সফল!",
          text: "কোর্সটি সফলভাবে আপডেট করা হয়েছে।",
          icon: "success",
          confirmButtonColor: "#105D38",
        });
        onUpdate();
        onClose();
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "আপডেট করা সম্ভব হয়নি।");
      }
    } catch (error: any) {
      Swal.fire({
        title: "ব্যর্থ!",
        text: error.message || "সার্ভার এরর!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                কোর্স এডিট করুন
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[60vh] overflow-y-auto"
            >
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  কোর্স টাইটেল
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    প্রাইস (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    সময়কাল
                  </label>
                  <input
                    type="text"
                    value={formData.duration || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">
                  কোর্স টাইপ
                </label>
                <select
                  value={formData.courseType || "Online"}
                  onChange={(e) =>
                    setFormData({ ...formData, courseType: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </form>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 font-bold text-gray-600 rounded-2xl hover:bg-gray-200"
              >
                বাতিল
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 bg-[#105D38] text-white font-bold rounded-2xl shadow-lg hover:bg-[#0c4a2d] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                আপডেট করুন
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditCourseModal;
