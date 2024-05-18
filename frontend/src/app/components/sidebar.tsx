"use client";
import React, { useState } from 'react';
import CustomLayout from './layout';

const Sidebar = ({ setActiveSection }) => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const handleSectionChange = (section) => {
        setActiveItem(section);
        setActiveSection(section);
    };

    return (
        <CustomLayout>
            <div className="bg-gray-800 h-screen w-64 fixed left-0 top-0 overflow-y-auto pt-16 pb-16">
                <div className="text-white text-2xl font-semibold p-4">Airline Admin</div>
                <ul className="text-white">
                    <li className={`p-4 cursor-pointer ${activeItem === 'dashboard' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('dashboard')}>Dashboard</li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'bookings' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('bookings')}>Bookings</li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'users' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('users')}>Users</li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'flights' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('flights')}>Flights</li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'airports' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('airports')}>Airports</li>
                    <li className={`p-4 cursor-pointer ${activeItem === 'jobs' ? 'bg-white text-gray-800 border-l-4 border-yellow-400' : 'hover:bg-gray-700'}`} onClick={() => handleSectionChange('jobs')}>Jobs</li>
                </ul>
                <div className="absolute bottom-0 left-0 w-full text-center pb-4">
                    <p className="text-xs text-gray-500">Airline Admin &copy; 2024</p>
                </div>
            </div>
        </CustomLayout>
    );
};

export default Sidebar;
