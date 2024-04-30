import React from "react";
import Link from "next/link";
import "../styles/navbar.scss";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.isAuthenticated
  );
  // console.log('my state ',isAuthenticated)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <Link href="/" className="logo">
        Elegance Air
      </Link>
      <div className="nav-links">
        <Link href="/book" className="nav-link">
          Book & Manage
        </Link>
        <div className="nav-link">Prepare to Travel</div>
        <Link href="/destinations" className="nav-link">
          Passenger Reviews
        </Link>
        <Link href="/" className="nav-link">
          Where We Fly
        </Link>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <div className="nav-link" onClick={handleLogout}>
            Logout
          </div>
        ) : (
          <>
            {" "}
            <Link href="/auth/register" className="nav-link">
              Register/Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
