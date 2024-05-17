"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BookingSuccessModal from '../customer/success'; // Import the success modal component
import Link from 'next/link';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyBookingsPage() {
    const router = useRouter();
    const userId = localStorage.getItem("userId"); // Assuming you store user ID after login

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [flightData, setFlightData] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/bookings/?userId=${userId}&page=${currentPage}` ,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                
            });
                console.log(response.data)
                setBookings(response.data.results);
                setTotalPages(Math.ceil(response.data.count / itemsPerPage)); 
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to fetch bookings");
            } finally {
                setLoading(false);
            }   
        };

        const fetchFlights = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/flights/`);
                setFlightData(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
                setError("Failed to fetch flights");
            }
        }

    
        if (userId) {
            fetchBookings();
            fetchFlights();
        } else {
            // Redirect to login if user ID is not available
            router.push("/login");
        }
    }, [userId, currentPage, router]);

    const handleCancelBooking = async (bookingId: any) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/bookings/${bookingId}`);
            // Remove canceled booking from state
            setBookings(bookings.filter(booking => booking.id !== bookingId));
            setShowSuccessModal(true);
            console.log("Booking canceled successfully");
        } catch (error) {
            console.error("Error canceling booking:", error);
            setError("Failed to cancel booking");
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const first_flight = bookings[0]
    const id = first_flight?.flight
    const flight = flightData.find(flight => flight.id === id)?.arrival_airport_name

    const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
      
        const handleNextPage = () => {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          }
        }; 
    

    

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            <div className="mb-8">
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Passengers</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Number</th>
                                {/* Add more table headers for other booking details */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((booking: any, index) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">{index+1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.booking_date).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{booking.trip_type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{booking.adults + booking.children + booking.infants}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`inline-block px-2 py-1 rounded-lg ${booking.is_paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {booking.is_paid ? "Success" : "Pending"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{flightData.find(flight => flight.id === booking.flight)?.flight_number}</td>
                                    <td>
                                        <button onClick={() => handleCancelBooking(booking.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                )}
            </div>
           

            <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>


            <div className="mt-4 flex items-center justify-center space-x-4">
            <Link href={`/individual/hotel?airport=${flightData.find(flight => flight.id === id)?.arrival_airport_name}`}  className="text-blue-600 hover:underline transition duration-300 ease-in-out">
                Dashboard
            </Link>
            <Link href="/individual/hotel" className="text-blue-600 hover:underline transition duration-300 ease-in-out">
               Profile
            </Link>
            <Link href="/settings" className="text-blue-600 hover:underline transition duration-300 ease-in-out">
                Settings
            </Link>
        </div>
            {/* Success Modal */}
            <BookingSuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
        </div>
    );
}
