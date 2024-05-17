"use client";
import React, { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import Link  from 'next/link';
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store"; // replace with the actual path
import { useRouter } from "next/navigation";

const Dropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

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
        <MenuItem onClick={handleClose} >
          <Link href="/profile" className='font-bold text-neutral-950'>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/My_Bookings" className='font-bold text-neutral-950'>My Bookings</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/My_Bookings" className='font-bold text-neutral-950'>Restaurants near me</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
       
      </Menu>
    </div>
  );
};

export default Dropdown;