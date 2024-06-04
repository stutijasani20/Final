


"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Loading from "../loading";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [staff, setStaff] = useState(false);
  const [loading, setLoading] = useState(true);

 
  
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        { email, password }
      );

  
      const token = response.data.jwt_token.access;
      localStorage.setItem("token", token);
      setError(""); 
      dispatch(login(response.data));

      setStaff(response.data.is_staff);
  
      setLoggedIn(true);
      toast.success("Login successful!", {
        position: "top-right",
      });

    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
      toast.error("Invalid email or password", {
        position: "top-right",
      });

    }
  };


  useEffect(() => {
    if (loggedIn && staff) {
      router.push("/user/airport_staff");
    } else if (loggedIn && !staff) {
      router.push("/user/customer");
    }
  }, [router, loggedIn, staff]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-md z-50">
      <Loading />
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-start flex-row text-lg">
      <Image src="/back.png" alt="Login" width={512} height={512} className="w-1/2" />
      <div className="p-10 rounded-lg w-1/3 h-3/4 text-lg flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-700 text-center">Sign In</h2><br />
        <div className="relative flex flex-col items-center mb-4">
          <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col items-center mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/4 transform -translate-y-1/2" />
              <input
                type="email"
                placeholder="noreply@eleganceair.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-200 pl-10"
              />
              <p className="text-gray-400 italic pr-36 text-sm mt-2">Hint: Email Should have {"@" }and Should Verified account.</p>
            </div>

            <div className="relative flex flex-col items-center mb-4">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/4 transform -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                title="Your password should be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
                placeholder="Elegnace@1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-200 pl-10"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-1/4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
              <p className="text-gray-400 italic pr-40 text-sm mt-2">Hint: Password Should be Have at least 8 Character!!</p>
            </div>

            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 w-full"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center">
            Don’t have an account? <Link href="/auth/register" className="text-blue-500 underline">Register here</Link>
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
