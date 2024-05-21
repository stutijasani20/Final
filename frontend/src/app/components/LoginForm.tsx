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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [staff, setStaff] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        { email, password }
      );

      console.log(response.data.is_staff);
  
      const token = response.data.jwt_token.access;
      localStorage.setItem("token", token);
      setError(""); // Clear any previous errors
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

  
  
  // Redirect to home page after successful login
  useEffect(() => {
    if (loggedIn && staff) {
      router.push("/user/airport_staff");
    } else if (loggedIn && !staff) {
      router.push("/user/customer");
    }
  }, [router, loggedIn, staff]);
  
  return (
    <div className="flex-container items-start justify-center flex-row text-lg">
      <Image src="/back.png" alt="Login" width={1/2} height={1/2}   className="w-1/2" />
      <div className="content p-10 rounded-lg w-1/3 h-3/4 text-lg">
        <h2 className="text-4xl font-bold mb-8 text-gray-700 text-center">Sign In</h2><br />
        <div className="relative flex items-center mb-4 flex-col">

          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center mb-4 flex-col">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3" />
              <input
                type="email"
                placeholder="noreply@eleganceair.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-5 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-200 pl-10"
              />
              <p style={{ color: 'lightgrey', fontStyle: 'italic', paddingRight: '150px', fontSize: '0.8em' }}>Hint: Email Should have "@" and Should Verified account.</p>
            </div>

            <div className="relative flex items-center mb-4 flex-col">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3" />
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
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
              <p style={{ color: 'lightgrey', fontStyle: 'italic', paddingRight: '175px', fontSize: '0.8em' }}>Hint: Password Should be Have at least 8 Character!!</p>
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
