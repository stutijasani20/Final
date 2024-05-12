"use client";
// Import necessary modules
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // State for role
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login/",
        { email, password, role }
      );
      // console.log(response.data);

      localStorage.setItem("token", response.data.jwt_token.access);
      setError(""); // Clear any previous errors
      dispatch(login(response.data));
     
      setLoggedIn(true); // Set loggedIn state to true after successful login
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setError("Invalid email or password");
      console.log(localStorage.getItem("user"));
    }
  };

  // Redirect to home page after successful login
  useEffect(() => {
    if (loggedIn) {
      const role = localStorage.getItem("userRole");
      if(role === "airport_staff"){
        router.push("/user/airport_staff");
    } else if(role === "customer"){
        router.push("/user/customer");
    } else if(role === "application_user"){
        router.push("/user/application_user");
    }

    }
  }, [router, loggedIn]);

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
        <time dateTime="2016-10-25" suppressHydrationWarning />
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
            <label htmlFor="role">Select your role:</label>
      <select
        id="role"
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
      >
        <option value="">Select Role</option>
        <option value="customer">customer</option>
        <option value="airport_staff">airport_staff</option>
        <option value="application_user">application_user</option>
      </select>
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
