"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
  id: number;
  flight: string;
  date: string;
  // Add more fields as per your Booking model
}

const UserDashboardPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchBookings(userId);
    }
  }, [userId]);

  const fetchBookings = async (userId: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/bookings`); // Adjust the API endpoint
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your Bookings</h1>
        {bookings.length === 0 ? (
          <p className="text-lg text-gray-700 mb-8">No bookings found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Flight</th>
                <th className="py-2 px-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-left">{booking.flight}</td>
                  <td className="py-3 px-4 text-left">{booking.date}</td>
                  {/* Render more booking details here */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
