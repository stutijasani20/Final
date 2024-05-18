"use client";
// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [staff, setStaff] = useState(false);
  const [error, setError] = useState("");
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
  
      
      
      
  
      setLoggedIn(true); // Set loggedIn state to true after successful login
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/123.webp')" }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Dont have an account?{" "}
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
