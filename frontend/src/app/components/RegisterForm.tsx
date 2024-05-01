import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"; // Import login action creator

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleRegister = async () => {
    try {
      const response = await axios.post<any>(
        "http://127.0.0.1:8000/api/auth/register/",
        { email, password }
      );
      // If registration is successful, dispatch the login action
      dispatch(login(response.data.user));
      console.log(response.data.user);
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password} 
        style={{}}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
