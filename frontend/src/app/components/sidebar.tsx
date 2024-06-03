"use client";
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import CustomLayout from './layout';
import {  FaBook, FaUser, FaPlane, FaBuilding, FaBriefcase } from 'react-icons/fa';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Image from 'next/image';

const Sidebar = ({ setActiveSection }: {setActiveSection: any}) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [user, setUser] = useState<any>(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/users/${userId}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        ) 
            .then(response => setUser(response.data))
            .catch(error => console.error('Error:', error));
    }, [userId]);

    const handleSectionChange = (section: any) => {
        setActiveItem(section);
        setActiveSection(section);
    };


    return (
        <CustomLayout>
            <div className="bg-gray-700 h-screen w-64 fixed left-0 top-0 overflow-y-auto pt-16 pb-16">
            {user && (
                    <div className="text-white text-2xl font-semibold p-4">
                        Hello  {user.email.split('@')[0]}
                    </div>
                )}
                <hr className='text-red-100' />
                <ul className="text-white">
                    <li className={`p-4 cursor-pointer ${activeItem === 'dashboard' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('dashboard')}>
                      <DashboardIcon />  Dashboard
                    </li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'bookings' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('bookings')}>
                        <FaBook className="inline-block mr-2" /> Bookings
                    </li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'users' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('users')}>
                        <FaUser className="inline-block mr-2" /> Users
                    </li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'flights' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('flights')}>
                        <FaPlane className="inline-block mr-2" /> Flights
                    </li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'airports' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('airports')}>
                        <FaBuilding className="inline-block mr-2" /> Airports
                    </li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'jobs' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('jobs')}>
                        <FaBriefcase className="inline-block mr-2" /> Jobs
                    </li>
                </ul>

                <div className="m-4 flex justify-center items-center">
                    <Image src="/dashboard.gif" alt="logo" width={200} height={200} className="rounded-full w-auto h-auto" /> 
                    </div>
               
                <div className="absolute bottom-0 left-0 w-full text-center pb-4">
                    <p className="text-xs text-gray-500">Elegance Air &copy; 2024</p>
                </div>
            </div>
        </CustomLayout>
    );
};

export default Sidebar;