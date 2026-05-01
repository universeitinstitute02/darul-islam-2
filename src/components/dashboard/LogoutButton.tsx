"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="p-4 border-t border-green-800">
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full p-3 hover:bg-red-600 rounded text-green-100 hover:text-white font-medium transition"
      >
        <LogOut size={20} /> লগআউট
      </button>
    </div>
  );
}
