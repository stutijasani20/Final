/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Typography, AppBar, Toolbar, Button, Avatar } from "@mui/material";
import Sidebar from "@/app/components/sidebar";
import DashBoard from "@/app/components/Dashboard";
import Booking from "@/app/components/Bookings";
import User from "@/app/components/Users";
import Flight from "../airport_staff/flight";
import Airports from "./airports";
import Jobs from "./jobs";
import { useRouter } from "next/navigation";
import { logout } from  "@/app/store/authSlice";
import Link from "next/link";
import UserProfileModal from "@/app/components/Modal";
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch(); 

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout()); 
    router.push("/");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const checkProfileCompleteness = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profile/?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const profileData = response.data.results;
        console.log("Profile data:", profileData);

        if (profileData === null || profileData.length === 0) {
          setShowProfileModal(true);
        }
      } catch (error) {
        console.error("Error checking profile completeness:", error);
      }
    };

    if (userId ) {
      checkProfileCompleteness();
    }
  }, []);





  return (
    <div className="admin-dashboard">
       <div>{showProfileModal && <UserProfileModal />}</div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <div>
            
           
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem><Link href="/user/customer/profile" >Profile</Link></MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem> 
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">
        {activeSection === "dashboard" && <DashBoard />}
        {activeSection === "bookings" && <Booking />}
        {activeSection === "users" && <User />}
        {activeSection === "flights" && <Flight />}
        {activeSection === "airports" && <Airports />}
        {activeSection === "jobs" && <Jobs />}
      </div>
    </div>
  );
};

export default AdminDashboard;
