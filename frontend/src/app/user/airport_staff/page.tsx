"use client";
import React, { useState } from "react";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Sidebar from "@/app/components/sidebar";
import DashBoard from "@/app/components/Dashboard";
import Booking from "@/app/components/Bookings";
import User from "@/app/components/Users";
import { Typography } from "@mui/material";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="admin-dashboard">
      <nav className="mb-4 position:sticky top:0 flex justify-between items-center font-bold p-4 rounded shadow bg-blue-500 text-white">
        <Typography variant="h5">Admin Dashboard</Typography>
        <div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
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
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </nav>
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">
        {activeSection === "dashboard" && <DashBoard />}
        {activeSection === "bookings" && <Booking />}
        {activeSection === "users" && <User />}
      </div>
    </div>
  );
};

export default AdminDashboard;
