"use client";

import useUser from "./useUser";

export default function useUserRole() {
  const { data: user, isLoading } = useUser();

  const isAdmin = user?.role === "admin";
  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  const role = user?.role;
  const isApproved = user?.profile?.isApproved;

  return {
    role,
    isAdmin,
    isTeacher,
    isStudent,
    isApproved,
    isLoading,
    user,
  };
}