"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/navbar.scss";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropdown from "./Dropdown";
// Hydration error was caused by the use of the Link component from next/link. and removed with use effect
const Header: React.FC = () => {
  const router = useRouter();
  const isAuthenticatedRedux = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuthenticated(isAuthenticatedRedux);
  }, [isAuthenticatedRedux]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="header">
      <Link href="/" className="logo">
        <Image src="/logo.png" alt="logo" height={50} width={50} />
      </Link>
      <div className="nav-links">
        <Link href="/flights/search" className="nav-link">
          Book & Manage
        </Link>
        <div className="nav-link">Prepare to Travel</div>
        <Link href="/reviews" className="nav-link">
          Passenger Reviews
        </Link>
        <Link href="/where_we_fly/route_map" className="nav-link">
          Where We Fly
        </Link>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <div className="nav-link">
            <Dropdown />
          
           
          </div>
        ) : (
          <div>
            <Link href="/auth/register" className="nav-link">
              Register/Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
