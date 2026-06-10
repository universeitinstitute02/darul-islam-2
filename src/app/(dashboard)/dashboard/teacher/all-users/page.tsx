"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  CheckCircle,
  XCircle,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import LoadingSpinner from "@/src/components/shared/spinner/LoadingSpinner";

const AllUsersPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState(""); // filter by student or teacher

  // 🔹 পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // প্রতি পেজে ইউজারের সংখ্যা

  const fetchAllUsers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const url = filterRole
        ? `https://darulislam-server-v2.vercel.app/api/users/admin/all-users?role=${filterRole}`
        : `https://darulislam-server-v2.vercel.app/api/users/admin/all-users`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [token, filterRole]);

  useEffect(() => {
    fetchAllUsers();
    setCurrentPage(1); // ফিল্টার চেঞ্জ হলে যেন ১ম পেজে ফেরত যায়
  }, [fetchAllUsers]);

  // ২. টিচার অ্যাপ্রুভ করার হ্যান্ডলার
  const handleApprove = async (userId: string, currentStatus: boolean) => {
    const result = await Swal.fire({
      title: currentStatus
        ? "অ্যাপ্রুভাল বাতিল করবেন?"
        : "টিচারকে অ্যাপ্রুভ করবেন?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0B5D3B",
      cancelButtonColor: "#64748b",
      confirmButtonText: "হ্যাঁ",
      cancelButtonText: "বাতিল",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://darulislam-server-v2.vercel.app/api/users/admin/approve-teacher/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ isApproved: !currentStatus }),
          },
        );
        if (res.ok) {
          Swal.fire("সফল!", "স্ট্যাটাস আপডেট হয়েছে।", "success");
          fetchAllUsers();
        }
      } catch (error) {
        Swal.fire("এরর", "কিছু সমস্যা হয়েছে", "error");
      }
    }
  };

  // ৩. রোল পরিবর্তন করার হ্যান্ডলার (SweetAlert Confirmation ও রিয়েলটাইম আপডেট সহ)
  const handleRoleChange = async (userId: string, newRole: string) => {
    const result = await Swal.fire({
      title: "ইউজার রোল পরিবর্তন নিশ্চিত করুন",
      text: `আপনি কি আসলেই ইউজারের রোল পরিবর্তন করে "${newRole.toUpperCase()}" করতে চান?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0B5D3B",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "হ্যাঁ, পরিবর্তন করুন",
      cancelButtonText: "বাতিল",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://darulislam-server-v2.vercel.app/api/users/admin/update-role/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ role: newRole }),
          },
        );
        if (res.ok) {
          Swal.fire(
            "সফল!",
            `রোল পরিবর্তন করে ${newRole} করা হয়েছে।`,
            "success",
          );
          fetchAllUsers(); // ডাটাবেজ থেকে নতুন ডাটা ফেচ করে রিয়েলটাইম রিফ্লেক্ট করবে
        } else {
          Swal.fire("ব্যর্থ", "রোল আপডেট করা যায়নি", "error");
        }
      } catch (error) {
        Swal.fire("ব্যর্থ", "সার্ভারে কিছু সমস্যা হয়েছে", "error");
      }
    } else {
      // ইউজার বাতিল করলে আগের স্টেট ধরে রাখার জন্য পুনরায় ডাটা লোড করা যেতে পারে
      fetchAllUsers();
    }
  };

  // 🔹 পেজিনেশন ক্যালকুলেশন লজিক
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-6 font-sans">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-emerald-600" /> ইউজার ম্যানেজমেন্ট
          </h1>
          <p className="text-gray-500 text-sm">
            মোট {users.length} জন ইউজার পাওয়া গেছে
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setFilterRole("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterRole === "" ? "bg-white shadow text-emerald-600" : "text-gray-600"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterRole("teacher")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterRole === "teacher" ? "bg-white shadow text-emerald-600" : "text-gray-600"}`}
          >
            Teachers
          </button>
          <button
            onClick={() => setFilterRole("student")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterRole === "student" ? "bg-white shadow text-emerald-600" : "text-gray-600"}`}
          >
            Students
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-sm font-bold text-gray-600">
                  ইউজার তথ্য
                </th>
                <th className="p-5 text-sm font-bold text-gray-600">
                  বর্তমান রোল
                </th>
                <th className="p-5 text-sm font-bold text-gray-600">
                  স্ট্যাটাস (Teacher Only)
                </th>
                <th className="p-5 text-sm font-bold text-gray-600">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {user.email}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                    >
                      <option value="student">STUDENT</option>
                      <option value="teacher">TEACHER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-5">
                    {user.role === "teacher" ? (
                      <button
                        onClick={() =>
                          handleApprove(user._id, user.profileData?.isApproved)
                        }
                        className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${user.profileData?.isApproved ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                      >
                        {user.profileData?.isApproved ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}
                        {user.profileData?.isApproved ? "Approved" : "Pending"}
                      </button>
                    ) : (
                      <span className="text-gray-300 text-xs">N/A</span>
                    )}
                  </td>
                  <td className="p-5">
                    <button
                      className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                      title="Edit Profile"
                    >
                      <UserCog size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔹 পিওর এবং রেসপন্সিভ পেজিনেশন কন্ট্রোল UI */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
            {/* মোবাইল মোড */}
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                পূর্ববর্তী
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                পরবর্তী
              </button>
            </div>

            {/* ডেস্কটপ মোড */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  সর্বমোট{" "}
                  <span className="font-semibold text-gray-800">
                    {totalItems}
                  </span>{" "}
                  জনের মধ্যে{" "}
                  <span className="font-semibold text-gray-800">
                    {indexOfFirstItem + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-semibold text-gray-800">
                    {Math.min(indexOfLastItem, totalItems)}
                  </span>{" "}
                  দেখানো হচ্ছে
                </p>
              </div>
              <div>
                <div
                  className="inline-flex items-center gap-1.5"
                  aria-label="Pagination"
                >
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="inline-flex items-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`inline-flex items-center justify-center rounded-xl text-sm font-semibold w-9 h-9 transition-all ${
                          currentPage === pageNum
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="inline-flex items-center rounded-xl border border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;
