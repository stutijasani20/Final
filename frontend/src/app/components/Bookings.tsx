import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';

const Booking = () => {
    const [bookings, setBookings] = useState<any[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string>(""); 
    const [page, setPage] = useState<number>(1); 
    const [pageSize, setPageSize] = useState(10); 
    const [totalPages, setTotalPages] = useState(0); 

    
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/bookings/?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setBookings(response.data.results);
                setTotalPages(Math.ceil(response.data.count / pageSize));
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to fetch Data");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [page, pageSize]);
    

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-64 flex justify-center items-center h-screen text-2xl text-red-500">
                <div className="flex flex-col items-center">
                    <Image src="/error.webp" alt="Error" width={900} height={900} className="mb-4" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }


    return (
        <div className="p-4 ml-64">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Bookings</h2>
            <table className="w-full border-collapse table-auto">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">No.</th>
                        <th className="border p-2">Booking Date</th>
                        <th className="border p-2">Trip Type</th>
                        <th className="border p-2">Passengers</th>
                        <th className="border p-2">Payment Status</th>
                        <th className="border p-2">Flight</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={booking.id} className="text-center">
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{new Date(booking.booking_date).toLocaleString()}</td>
                            <td className="border p-2">{booking.trip_type}</td>
                            <td className="border p-2">{booking.passengers.length}</td>
                            
                            <td className="border p-2">
                                <div className={`inline-block px-2 py-1 rounded-lg ${booking.is_paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                    {booking.is_paid ? "Success" : "Pending"}
                                </div>
                            </td>
                            <td className="border p-2">{booking.flight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)} className="mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200">{index + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default Booking;
