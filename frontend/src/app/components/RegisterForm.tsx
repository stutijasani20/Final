import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import axios from "axios";
import styles from "../styles/Register.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import ReCAPTCHA from "react-google-recaptcha";
import withLoading from "../components/withLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
        router.push("/auth/login")
      }, 3000);
    } catch (error: any) {
      console.error("Registration failed:", error.message);
      setError("Registration failed. Please try again.");
      console.log(error.response.data.email);
      if (error.response) {
        if (error.response.data && error.response.data.email) {
         
          error.response.data.email.forEach((errorMessage: any )=> {
            toast.error(errorMessage, { position: "top-right" });
          });
        } else {

          toast.error(error.response.data, { position: "top-right" });
        }
      } else {
       
        toast.error("Registration failed. Please try again.", { position: "top-right" });
      }
    }
   
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordsMatch(true);
    setRecaptchaVerified(false);
    setTermsAccepted(false);
    setModalIsOpen(false);
    setError('');
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.flex} ${styles['flex-col']} ${styles['md:flex-row']} ${styles['items-center']} ${styles['justify-center']}`}>
          <Image src="/back.png" alt="Login" width={400} height={300} className={`${styles['w-full']} ${styles['md:w-1/2']} ${styles['mb-8']} ${styles['md:mb-0']}`} />
          <div className={`${styles.content} ${styles['p-4']} ${styles['md:p-10']} ${styles['rounded-lg']} ${styles['w-full']} ${styles['md:w-1/2']} ${styles['max-w-lg']} ${styles['text-lg']}`}>
            <h2 className={`${styles['text-4xl']} ${styles['font-bold']} ${styles['mb-8']} ${styles['text-gray-700']} ${styles['text-center']}`}>Sign Up</h2><br />
            <div className={styles['input-container']}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              <input
                type="email"
                id="email"
                placeholder="noreply@eleganceair.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <p className={styles.hint}>Hint: Email should contain {"@"} and be a verified account.</p>
            </div>

            <div className={styles['input-container']}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                title="Your password should be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
                placeholder="Elegnace@1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles['show-password']}
                onClick={() => setShowPassword(!showPassword)}
              />
              <p className={styles.hint}>Hint: Password should be at least 8 characters long.</p>
            </div>

            <div className={styles['input-container']}>
              <FontAwesomeIcon icon={faLock} className={styles.icon} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                title="Please enter the same password as above."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className={styles['show-password']}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              <p className={styles.hint}>Hint: Confirm password must match the password above.</p>
            </div>

            {!passwordsMatch && <p className={styles['text-red-500']}>Passwords do not match</p>}
            <ReCAPTCHA
              sitekey= "6LelgdkpAAAAAK7Td6htpzXSSzEEuKSljTYS8ZCr"
              onChange={() => setRecaptchaVerified(true)}
              onExpired={() => setRecaptchaVerified(false)}
            /><br />

            <div className={styles.terms}>
              <input
                type="checkbox"
                id="terms"
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className={styles['terms-label']}>
                I agree to the
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.blue} ${styles.center}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setModalIsOpen(true);
                  }}
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              onClick={handleRegister}
              disabled={!recaptchaVerified || !termsAccepted}
              className={styles.registerButton}
            >
              Register
            </button>

            <p className={styles['mt-4']}>
              Already have an account? <a href="/auth/login"  className={`${styles.blue} ${styles.center}`}>Click here!</a>
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className={styles.closeIcon} onClick={() => setModalIsOpen(false)}>
          <FontAwesomeIcon icon={faTimes} size="lg" color="red" />
        </div>
        <div className={styles.modalContent}>
          <h2 className={styles.center}>Terms and Conditions</h2><br />
          <p>
            By registering for an account, you agree to abide by the following terms and conditions:<br /><br />
            <ul>
              <li><b>Acceptance of Terms:</b> By accessing and using this portal, you agree to be bound by these terms and conditions.</li><br />
              <li><b>Eligibility:</b> You must be at least 18 years old to register and use this portal.</li><br />
              <li><b>Account Registration:</b> You agree to provide accurate information during registration. You are responsible for maintaining the confidentiality of your account.</li><br />
              <li><b>Privacy:</b> Your use of this portal is subject to our Privacy Policy.</li><br />
              <li><b>User Conduct:</b> Use this portal for lawful purposes. Prohibited behavior includes posting unlawful or harmful material.</li><br />
              <li><b>Booking and Payment:</b> Bookings are subject to availability. Payment must be made using a valid method.</li><br />
              <li><b>Changes to Terms:</b> We reserve the right to modify these terms at any time.</li><br />
              <li><b>Termination:</b> We may terminate or suspend your account for violations of these terms.</li><br />
              <li><b>Limitation of Liability:</b> We are not liable for damages resulting from your use of this portal.</li><br />
              <li><b>Governing Law:</b> These terms are governed by the laws of [Country/State].</li><br />
            </ul>
            Please read these terms carefully before proceeding.
          </p>
        </div>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default withLoading(RegisterPage);
