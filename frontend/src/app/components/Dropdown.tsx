import React, { useState, useEffect } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = localStorage.getItem("token");
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setIsStaff(userData.is_staff);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div>
      <Avatar onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/profile" className="font-bold text-neutral-950">
            Profile
          </Link>
        </MenuItem>
        {!isStaff && (
          <MenuItem onClick={handleClose}>
            <Link href="/user/customer" className="font-bold text-neutral-950">
              My Bookings
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
