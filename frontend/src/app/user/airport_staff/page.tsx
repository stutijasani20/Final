"use client";
import React, { useState } from "react";
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
import { logout } from  "@/app/store/authSlice"; // Import the logout action
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push("/");
  };



  return (
    <div className="admin-dashboard">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <div>
            <Button color="inherit">Profile</Button>
            <Button color="inherit">My Account</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button> {/* Call handleLogout function on click */}
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Call handleLogout function on click */}
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
