"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  CheckCircle,
  Clock,
  X,
  Package,
  User,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";

// ডামি ডাটা
type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  product: string;
  price: string;
  status: "pending" | "successful";
};
const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Rahim Ahmed",
    phone: "01711223344",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    product: "Wireless Headphone",
    price: "৳২,৫০০",
    status: "pending",
  },
  {
    id: "ORD-002",
    customer: "Karim Ali",
    phone: "01911556677",
    address: "Sector 4, Uttara, Dhaka",
    product: "Mechanical Keyboard",
    price: "৳৪,২০০",
    status: "successful",
  },
  {
    id: "ORD-003",
    customer: "Sumaiya Khan",
    phone: "01511889900",
    address: "Mirpur 10, Block C, Dhaka",
    product: "Smart Watch",
    price: "৳৩,৫০০",
    status: "pending",
  },
  {
    id: "ORD-004",
    customer: "Asif Iqbal",
    phone: "01811224455",
    address: "Chittagong GEC Circle",
    product: "Gaming Mouse",
    price: "৳১,৮০০",
    status: "successful",
  },
];

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // ডেলিভারি স্ট্যাটাস চেঞ্জ করার ফাংশন
  const handleDeliverySuccess = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "successful" } : order,
      ),
    );
  };

  // একটিভ ট্যাব অনুযায়ী ডাটা ফিল্টার করা
  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
        <Package className="text-indigo-600" /> Delivery Dashboard
      </h2>

      {/* ট্যাব সিলেকশন এরিয়া */}
      <div className="flex border-b border-slate-200 mb-6 bg-white p-1.5 rounded-xl shadow-sm max-w-md">
        <button
          onClick={() => setActiveTab("pending")}
          className={`flex items-center justify-center gap-2 w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === "pending"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Clock size={16} />
          Pending ({orders.filter((o) => o.status === "pending").length})
        </button>
        <button
          onClick={() => setActiveTab("successful")}
          className={`flex items-center justify-center gap-2 w-1/2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            activeTab === "successful"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <CheckCircle size={16} />
          Successful ({orders.filter((o) => o.status === "successful").length})
        </button>
      </div>

      {/* ডাটা টেবিল */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          {filteredOrders.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold text-sm">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="p-4 font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.product}</td>
                    <td className="p-4">{order.price}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "successful"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status === "successful" ? (
                          <>
                            <CheckCircle size={14} /> Successful
                          </>
                        ) : (
                          <>
                            <Clock size={14} /> Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Eye size={16} /> View
                      </button>

                      {/* Delivery Button (শুধুমাত্র pending ট্যাবেই দৃশ্যমান থাকবে) */}
                      {order.status === "pending" && (
                        <button
                          onClick={() => handleDeliverySuccess(order.id)}
                          className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                          <CheckCircle size={16} /> Delivery
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* খালি থাকলে যা দেখাবে */
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
              <AlertCircle size={40} className="text-slate-300" />
              <p className="font-medium text-lg">No {activeTab} orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Details Popup (Modal) using Framer Motion */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div
              className="absolute inset-0"
              onClick={() => setSelectedOrder(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-slate-100 z-10"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Order Details
                  </p>
                  <h3 className="text-lg font-bold">{selectedOrder.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 rounded-full hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="text-slate-400 mt-1 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                      Customer Name
                    </p>
                    <p className="text-slate-800 font-medium">
                      {selectedOrder.customer}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-slate-400 mt-1 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                      Phone Number
                    </p>
                    <p className="text-slate-800 font-medium">
                      {selectedOrder.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="text-slate-400 mt-1 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                      Delivery Address
                    </p>
                    <p className="text-slate-800 font-medium text-sm leading-relaxed">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="flex items-start gap-3">
                  <Package className="text-slate-400 mt-1 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">
                      Product Info
                    </p>
                    <p className="text-slate-800 font-medium">
                      {selectedOrder.product} ({selectedOrder.price})
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                {selectedOrder.status === "pending" && (
                  <button
                    onClick={() => {
                      handleDeliverySuccess(selectedOrder.id);
                      setSelectedOrder(null); // ডেলিভারি করার পর পপআপ বন্ধ হয়ে যাবে
                    }}
                    className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                  >
                    Complete Delivery
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}