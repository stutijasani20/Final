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

  const handleSubmit = async () => {
    try {
      const response = await axios.post<any>(
        "http://127.0.0.1:8000/api/auth/login/",
        { email, password }
      );
      console.log("Response data:", response.data);

      // Set token to localStorage
      localStorage.setItem("token", response.data.jwt_token.access);
      console.log(response.data.token);

      // localStorage.setItem("token", response.data.token); // Store token in localStorage
      setLoggedIn(true);

      // console.log(response.data.token);
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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {/* <button onClick={handleSubmit}>Login</button> */}
      <p>
        Do Not have an account <Link href={"/auth/register"}>Register</Link>
      </p>
      {error && <p>{error}</p>}
      {loggedIn ? <MyPage /> : null}
    </div>
  
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice"; // Import login action creator
// import MyPage from "../page";
// import { useRouter } from "next/navigation"; // Change import from "next/navigation"
// import Link from "next/link";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch(); // Initialize useDispatch hook

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // Prevent form submission
//     try {
//       const response = await axios.post<any>(
//         "http://127.0.0.1:8000/api/auth/login/",
//         { email, password }
//       );
//       console.log("Response data:", response.data);

//       // Set token to localStorage
//       localStorage.setItem("token", response.data.jwt_token.access);
//       console.log(response.data.token);

//       // localStorage.setItem("token", response.data.token); // Store token in localStorage
//       setLoggedIn(true);

//       // console.log(response.data.token);
//       setError(""); // Clear any previous errors
//       router.push("");

//       // Dispatch the login action with user data
//       dispatch(login(response.data.email));
//     } catch (error) {
//       console.error("Login failed:", error.message);
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         {" "}
//         {/* Attach handleSubmit to form onSubmit event */}
//         <input
//           type="text"
//           placeholder="Username"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />
//         <button type="submit">Login</button>{" "}
//         {/* Add type="submit" to trigger form submission */}
//       </form>
//       <p>
//         Do Not have an account <Link href={"/auth/register"}>Register</Link>
//       </p>
//       {error && <p>{error}</p>}
//       {/* Remove recursion here */}
//       {/* Conditional rendering based on loggedIn state */}
//       {loggedIn ? <MyPage /> : null}
//     </div>
  
//   );


