import React, { useState } from "react";
import Link from "next/link";
import "../styles/navbar.scss";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="header text-lg font-bold text-blue-600">
      <div className="logo-container">
        <Link href="/">
          <div className="logo">
            <Image src="/logo1.png" alt="logo" height={150} width={150} />
          </div>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link href="#">
            <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
              <div className="nav-link">Book & Manage</div>
              {isOpen && (
                <div className="dropdown-content">
                  <Link href="/flights/search">
                    <div className="dropdown-item hover:bg-gray-200 p-2">Book Flight</div>
                  </Link>
                  <Link href="/link2">
                    <div className="dropdown-item hover:bg-gray-200 p-2">Web CheckIn</div>
                  </Link>
                  <div className="dropdown-item text-gray-700 hover:bg-gray-200 p-2" onMouseEnter={() => setIsNestedOpen(true)} onMouseLeave={() => setIsNestedOpen(false)}>
                    Cancel/Reschedule Flight
                    {isNestedOpen && (
                      <div className="dropdown-content">
                        <Link href="/link4">
                          <div className="dropdown-item text-gray-700 hover:bg-gray-200 p-2">Cancel Flight</div>
                        </Link>
                        <Link href="/link5">
                          <div className="dropdown-item text-gray-700 hover:bg-gray-200 p-2">Reschedule Flight</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Link>
        </li>
        <li>
          <div className="nav-link">Prepare to Travel</div>
        </li>
        <li>
          <Link href="/reviews">
            <div className="nav-link">Passenger Reviews</div>
          </Link>
        </li>
        <li>
          <Link href="/">
            <div className="nav-link">Where We Fly</div>
          </Link>
        </li>
        <li>
          {isAuthenticated ? (
            <div className="nav-link" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <Link href="/auth/login">
              <div className="nav-link">Login</div>
            </Link>
          )}
        </li>
      </ul>
      <div className="profile-container" onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)}>
        <FaUserCircle size={50} />
        {isProfileOpen && (
          <div className="profile-dropdown">
            <Link href="/auth/login">
              <div className="dropdown-item hover:bg-gray-200 p-2">Login</div>
            </Link>
            <Link href="/auth/register">
              <div className="dropdown-item hover:bg-gray-200 p-2">Register</div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
