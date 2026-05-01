"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useSession } from "next-auth/react";

export default function useUser() {
  const axiosSecure = useAxiosSecure();
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/auth/me");
      return res.data;
    },
    enabled: !!session?.accessToken, // Only run if logged in
    staleTime: 5 * 60 * 1000, // Cache the data globally for 5 minutes
  });
}