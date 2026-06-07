"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  Phone,
  User,
  BadgeDollarSign,
} from "lucide-react";

type DonationStatus = "pending" | "approved" | "rejected";

interface Donation {
  id: number;
  projectImage: string;
  projectName: string;
  transactionId: string;
  amount: number;
  senderName: string;
  senderPhone: string;
  status: DonationStatus;
}

export default function DonationManagementPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const donations: Donation[] = [
    {
      id: 1,
      projectImage:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
      projectName: "Help Flood Victims",
      transactionId: "TXN-87456321",
      amount: 5000,
      senderName: "Rakib Hasan",
      senderPhone: "01712345678",
      status: "pending",
    },
    {
      id: 2,
      projectImage:
        "https://images.unsplash.com/photo-1469571486292-b53601020f1f?w=500",
      projectName: "Food Distribution Program",
      transactionId: "TXN-45218976",
      amount: 2500,
      senderName: "Nusrat Jahan",
      senderPhone: "01898765432",
      status: "approved",
    },
    {
      id: 3,
      projectImage:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500",
      projectName: "Winter Clothes Donation",
      transactionId: "TXN-36521489",
      amount: 3500,
      senderName: "Tanvir Islam",
      senderPhone: "01625874123",
      status: "rejected",
    },
    {
      id: 4,
      projectImage:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500",
      projectName: "Orphan Education Fund",
      transactionId: "TXN-78541236",
      amount: 10000,
      senderName: "Sabbir Ahmed",
      senderPhone: "01945612378",
      status: "pending",
    },
    {
      id: 5,
      projectImage:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500",
      projectName: "Medical Support Campaign",
      transactionId: "TXN-99887744",
      amount: 7000,
      senderName: "Fahim Khan",
      senderPhone: "01512345678",
      status: "approved",
    },
  ];

  const pendingCount = donations.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = donations.filter(
    (item) => item.status === "approved"
  ).length;

  const rejectedCount = donations.filter(
    (item) => item.status === "rejected"
  ).length;

  const filteredDonations = useMemo(() => {
    if (activeTab === "all") return donations;

    return donations.filter(
      (donation) => donation.status === activeTab
    );
  }, [activeTab]);

  const statusClasses: Record<DonationStatus, string> = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
  };

  const tabs = [
    {
      label: "All",
      value: "all",
      count: donations.length,
    },
    {
      label: "Pending",
      value: "pending",
      count: pendingCount,
    },
    {
      label: "Approved",
      value: "approved",
      count: approvedCount,
    },
    {
      label: "Rejected",
      value: "rejected",
      count: rejectedCount,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Donation Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and review all donation requests.
          </p>
        </div>

        {/* Stats */}

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Donations
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {donations.length}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Requests
            </p>

            <h3 className="mt-2 text-3xl font-bold text-amber-500">
              {pendingCount}
            </h3>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Amount
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              ৳
              {donations
                .reduce((acc, item) => acc + item.amount, 0)
                .toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Tabs */}

        <div className="mb-6 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() =>
                setActiveTab(
                  tab.value as
                    | "all"
                    | "pending"
                    | "approved"
                    | "rejected"
                )
              }
              className={`rounded-2xl border px-5 py-3 font-medium transition-all duration-300 ${
                activeTab === tab.value
                  ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <span>{tab.label}</span>

                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    activeTab === tab.value
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    Project
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    Transaction ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    Sender
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDonations.length > 0 ? (
                  filteredDonations.map(
                    (donation, index) => (
                      <motion.tr
                        key={donation.id}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.05,
                        }}
                        className="border-b hover:bg-slate-50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <Image
                              src={donation.projectImage}
                              alt={donation.projectName}
                              width={60}
                              height={60}
                              className="h-14 w-14 rounded-xl object-cover"
                            />

                            <div>
                              <h4 className="font-semibold text-slate-900">
                                {donation.projectName}
                              </h4>

                              <p className="text-sm text-slate-500">
                                Donation Campaign
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="font-mono text-sm font-medium">
                            {donation.transactionId}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 font-semibold text-emerald-600">
                            <BadgeDollarSign size={18} />
                            ৳
                            {donation.amount.toLocaleString()}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <User
                              size={16}
                              className="text-slate-400"
                            />
                            {donation.senderName}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <Phone
                              size={16}
                              className="text-slate-400"
                            />
                            {donation.senderPhone}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClasses[donation.status]}`}
                          >
                            {donation.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-2">
                            <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
                              <CheckCircle2 size={18} />
                              Approve
                            </button>

                            <button className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                              <XCircle size={18} />
                              Reject
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-20 text-center"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-700">
                          No donations found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          There are no records in this
                          category.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}