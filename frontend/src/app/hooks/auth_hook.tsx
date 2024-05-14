"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthenticationRequired = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const auth = localStorage.getItem("isAuthenticated");

    // If token doesn't exist, redirect to login page
    if (!auth) {
      router.push("/auth/login");
    }
  }, [router]);

  return;
};

export default useAuthenticationRequired;
