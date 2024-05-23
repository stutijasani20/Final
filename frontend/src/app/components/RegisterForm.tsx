"use client";

import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import ReCAPTCHA from "react-google-recaptcha";
import withLoading from "../components/withLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadRecaptchaScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };
    
    loadRecaptchaScript();
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      const response = await axios.post<any>(
        "http://127.0.0.1:8000/api/auth/register/",
        { email, password }
      );
      toast.success("Registration successful! Please check your email for verification.", {
        position: "top-right",
      });
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 3000); // Redirect after 3 seconds
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-right",
        });
      } else {
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <img src="/back.png" alt="Login" className="w-full md:w-1/2 mb-8 md:mb-0" />
          <div className="content p-4 md:p-10 rounded-lg w-full md:w-1/2 max-w-lg text-lg">
            <h2 className="text-4xl font-bold mb-8 text-gray-700 text-center">Sign Up</h2><br />
            <div className="relative flex items-center mb-4 flex-col">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3" />
              <input
                type="email"
                id="email"
                placeholder="noreply@eleganceair.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-200 pl-10"
              />
              <p style={{ color: 'grey', fontStyle: 'italic', paddingRight: '150px', fontSize: '0.8em' }}>Hint: Email Should have "@" and Should be a Verified account.</p>
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
              <p style={{ color: 'lightgrey', fontStyle: 'italic', paddingRight: '175px', fontSize: '0.8em' }}>Hint: Password Should be Have atleast 8 Character!!</p>
            </div>

            <div className="relative flex items-center mb-4 flex-col">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Elegnace@1234"
                title="Please enter the same password as above."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-200 pl-10"
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <p style={{ color: 'lightgrey', fontStyle: 'italic', paddingRight: '280px', fontSize: '0.8em' }}>Hint: Password should Same as Above!!</p>
            </div>

            {!passwordsMatch && <p className="text-red-500">Passwords do not match</p>}
            <ReCAPTCHA
              sitekey="6LelgdkpAAAAAK7Td6htpzXSSzEEuKSljTYS8ZCr"
              onChange={() => setRecaptchaVerified(true)}
              onExpired={() => setRecaptchaVerified(false)}
            /><br />

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="terms"
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className="flex items-center cursor-pointer w-full text-left ml-2">
                I agree to the
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline ml-1 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalIsOpen(true);
                  }}
                >
                  Terms & Conditions
                </a>
              </label>
            </div><br />

            <button
              onClick={handleRegister}
              disabled={!recaptchaVerified || !termsAccepted || !passwordsMatch}
              className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200 w-full ${
                !recaptchaVerified || !passwordsMatch ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Register
            </button>

            <p className="mt-4 text-center">
              Already have an account? <a href="/auth/login" className="text-blue-500 underline">Login here</a>
            </p>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        {modalIsOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-75"></div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Terms & Conditions"
              style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '20px',
                  maxWidth: '90%',
                },
              }}
            >
              <button onClick={() => setModalIsOpen(false)} style={{ float: 'right', fontWeight: 'bold' }}>X</button>
              <h2 className="text-center" style={{ fontWeight: 'bold' }}>Terms & Conditions</h2><br />
              <p>
                By creating an account, you agree to the following terms and conditions:
              </p><br />
              <ul style={{ listStyleType: 'disc' }}>
                <li>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</li>
                <li>You agree to accept responsibility for all activities that occur under your account or password.</li>
                <li>Airlines reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders in their sole discretion.</li>
                <li>Prices and availability of flights are subject to change without notice.</li>
                <li>By purchasing a ticket, you agree to comply with all airline regulations and terms of carriage.</li>
              </ul>
            </Modal>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default withLoading(RegisterPage);