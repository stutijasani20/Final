"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Import login action creator
import Link from "next/link"
import { useRouter } from "next/navigation";  


const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // State for role
  const [error, setError] = useState("");

  const dispatch = useDispatch(); // Initialize useDispatch hook
  const router = useRouter(); // Initialize useRouter hook

  const handleRegister = async () => {
    const token = localStorage.getItem("token")
    
    try {
      const response = await axios.post<any>(
        "http://127.0.0.1:8000/api/auth/register/",
        { email, password, role } 
    

         // Include role in the request payload
      );
      // If registration is successful, dispatch the login action
      dispatch(login(response.data));
    

      // console.log(response.data);
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
      
    }

    const loggedIn = localStorage.getItem("token");
    if (loggedIn){
      router.push("/");
    }
   
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage: `url('/register.jpg')`, backgroundSize: "cover"}}>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2"
      />
      {/* Role dropdown */}
      <label htmlFor="role">Choose a role:</label>
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

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 mt-5 rounded-md"
      >
        Register
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p> Already have an account !
        <Link href="/auth/login">Click here </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
