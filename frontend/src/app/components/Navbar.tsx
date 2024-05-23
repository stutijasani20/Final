import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss"; // Import the CSS module
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropdown from "./Dropdown";

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
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo1.png" alt="logo" height={150} width={150} />
        </Link>
      </div>
      <div className={styles.navLinks}>
        <div className={styles.navLink}>
          <Link href="/flights/search">Book & Manage</Link>
        </div>
        <div className={styles.navLink}>
          <Link href="/flights/search">Prepare to Travel</Link>
        </div>
        <div className={styles.navLink}>
          <Link href="/reviews">Passenger Reviews</Link>
        </div>
        <div className={styles.navLink}>
          <Link href="/where_we_fly/route_map">Where We Fly</Link>
        </div>
      </div>
      <div className={styles.registerLogin}>
        {isAuthenticated ? (
          <div className={styles.navLink}>
            <Dropdown />
          </div>
        ) : (
          <div className={styles.navLink}>
            <Link href="/auth/register">Register/Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
