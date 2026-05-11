"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  UserCog,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";

const AllUsersPage = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState(""); // filter by student or teacher

  // ১. সকল ইউজার ফেচ করার ফাংশন
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
  }, [fetchAllUsers]);

  // ২. টিচার অ্যাপ্রুভ করার হ্যান্ডলার
  const handleApprove = async (userId: string, currentStatus: boolean) => {
    const result = await Swal.fire({
      title: currentStatus
        ? "অ্যাপ্রুভাল বাতিল করবেন?"
        : "টিচারকে অ্যাপ্রুভ করবেন?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#105D38",
      confirmButtonText: "হ্যাঁ",
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
          Swal.fire("সফল!", "স্ট্যাটাস আপডেট হয়েছে।", "success");
          fetchAllUsers();
        }
      } catch (error) {
        Swal.fire("এরর", "কিছু সমস্যা হয়েছে", "error");
      }
    }
  };

  // ৩. রোল পরিবর্তন করার হ্যান্ডলার
  const handleRoleChange = async (userId: string, newRole: string) => {
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
        Swal.fire("সফল!", `রোল পরিবর্তন করে ${newRole} করা হয়েছে।`, "success");
        fetchAllUsers();
      }
    } catch (error) {
      Swal.fire("ব্যর্থ", "রোল আপডেট হয়নি", "error");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600 w-12 h-12" />
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
            মোট {users.length} জন ইউজার পাওয়া গেছে
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
              {users.map((user) => (
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
                      className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg border-none focus:ring-2 focus:ring-emerald-500 outline-none"
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
      </div>
    </div>
  );
};

export default AllUsersPage;
