"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Import login action creator
import MyPage from "../page";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.post<any>(
        "http://127.0.0.1:8000/api/auth/login/",
        { email, password }
      );

      // Set token to localStorage
      localStorage.setItem("token", response.data.jwt_token.access);
      setLoggedIn(true);
      setError(""); // Clear any previous errors
      router.push("/");

      // Dispatch the login action with user data
      dispatch(login(response.data.email));
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/123.webp')" }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
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
          <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          Don't have an account? <Link href="/auth/register" className="text-blue-500">Register</Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}
        {/* Remove recursion here */}
        {/* Conditional rendering based on loggedIn state */}
        {loggedIn && <MyPage />}
      </div>
    </div>
  );
};

export default LoginPage;
