"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthenticationRequired = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");

    if (!auth) {
      router.push("/auth/login");
    }
  }, [router]);

  return;
};

export default useAuthenticationRequired;
