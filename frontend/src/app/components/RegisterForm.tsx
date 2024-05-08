// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice"; // Import login action creator

// const RegisterPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch(); // Initialize useDispatch hook

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post<any>(
//         "http://127.0.0.1:8000/api/auth/register/",
//         { email, password }
//       );
//       console.log(response)
//       // If registration is successful, dispatch the login action
//       dispatch(login(response.data.user));
//       console.log(response.data.email);
//     } catch (error: any) {
//       console.error("Registration failed:", error.message);
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border border-gray-300 rounded-md px-4 py-2 mb-2"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border border-gray-300 rounded-md px-4 py-2 mb-2"
//       />
//       <button
//         onClick={handleRegister}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//       >
//         Register
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default RegisterPage;
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
      dispatch(login(response.data));
      // console.log(response.data);
      // console.log(response.data.id);
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Register
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default RegisterPage;
