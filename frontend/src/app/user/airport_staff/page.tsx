"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Image from 'next/image'; 
import Sidebar from '@/app/components/sidebar';
import DashBoard from '@/app/components/Dashboard';
import Booking from '@/app/components/Bookings';
import User from '@/app/components/Users';
// import FlightsComponent from './FlightsComponent';
// import AirportsComponent from './AirportsComponent';
// import JobsComponent from './JobsComponent';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

const handleMenu = (event: any) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};


    

    return (
        <div className="admin-dashboard">
             <nav className="mb-4 position:sticky top:0  flex justify-between items-center  font-bold p-4 rounded shadow">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        {/* Add more elements/components here */}
      </div>
    </nav>
            <Sidebar setActiveSection={setActiveSection} />
            <div className="main-content">
                {activeSection === 'dashboard' && <DashBoard />  }
                {/* Render content based on activeSection */}
                {activeSection === 'bookings' && (
                    <Booking />
                )}
                {activeSection === 'users' && <User />  }
                {/* {activeSection === 'flights' && <FlightsComponent />}
                {activeSection === 'airports' && <AirportsComponent />}
                {activeSection === 'jobs' && <JobsComponent />} */} 
            </div>
        </div>
    );
};

export default AdminDashboard;