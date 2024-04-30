"use client";
import React from "react";
import RegistrationPage from "@/app/components/RegisterForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <h1>Please Register !</h1>
      <RegistrationPage />
      <p>
        Already have an account <Link href={"/auth/login"}>Login !</Link>
      </p>
    </>
  );
}
