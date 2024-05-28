import React, { useState, useEffect } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import Person3Icon from "@mui/icons-material/Person3";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State to store profile image URL
  const dispatch = useDispatch();
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        setIsAuthenticated(true);

        try {
          const response = await axios.get("http://127.0.0.1:8000/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
          const userData = response.data;
    
          setIsStaff(userData.is_staff);

          const user =
            typeof window !== "undefined" ? localStorage.getItem("userId") : null;
          // Fetch profile image
          const profileImageResponse = await axios.get(
            `http://127.0.0.1:8000/profile/?user=${user}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfileImage(
            profileImageResponse.data.results.length > 0
              ? profileImageResponse.data.results[0].profile_photo
              : null
          );
        } catch (error) {
          console.error("Error fetching user details or profile image:", error);
        }
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAnchorEl(null);
    router.push("/");
  };

  return (
    <div>
      <Avatar
        onClick={handleClick}
        src={profileImage || undefined}
        sx={{ width: 60, height: 60, cursor: "pointer" }}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isAuthenticated ? (
          [
            <MenuItem key="profile" onClick={handleClose}>
              <Link
                href="/user/customer/profile"
                className="font-bold text-neutral-950"
              >
                <Person3Icon /> Profile
              </Link>
            </MenuItem>,
            !isStaff && (
              <MenuItem key="bookings" onClick={handleClose}>
                <Link
                  href="/user/customer"
                  className="font-bold text-neutral-950"
                >
                  <Image
                    src="/booking.png"
                    alt="Dashboard"
                    width={20}
                    className="inline-block"
                    height={20}
                  />{" "}
                  My Bookings
                </Link>
              </MenuItem>
            ),
            <MenuItem key="support" onClick={handleClose}>
              <Link href="/contact" className="font-bold text-green-800">
                <Image
                  src="/support.png"
                  alt="Dashboard"
                  width={20}
                  className="inline-block text-green-800"
                  height={20}
                />{" "}
                Support
              </Link>
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout}>
              <Image
                src="/power-off.png"
                alt="Dashboard"
                width={20}
                className="inline-block mr-2"
                height={20}
              />
              <span style={{ fontWeight: "bold", color: "red" }}>Logout</span>
            </MenuItem>,
          ]
        ) : (
          [
            <MenuItem key="login" onClick={handleClose}>
              <Link href="/login" className="font-bold text-neutral-950">
                Login
              </Link>
            </MenuItem>,
            <MenuItem key="register" onClick={handleClose}>
              <Link href="/register" className="font-bold text-neutral-950">
                Register
              </Link>
            </MenuItem>,
          ]
        )}
      </Menu>
    </div>
  );
};

export default Dropdown;
