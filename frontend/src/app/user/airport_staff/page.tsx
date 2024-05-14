"use client";
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
interface Booking {
    id: number;
    booking_date: string;
    passenger: Passenger;
    trip_type: string;
    adults: number;
    children: number;
    infants: number;
    is_paid: boolean;
    flight: string;

    // Add other booking details
}
interface Passenger {
    id: number;

    

    // Add other passenger details
}
interface User {
    id: number;
    // Add other user details
}

export default function Page() {
    const router = useRouter();
    const [bookingData, setBookingData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState("");
    const [passengerData, setPassengerData] = useState([]);
    const [flightData, setFlightData] = useState([]);
    const [loading, setLoading] = useState(true);

    const loggedIn = localStorage.getItem("isAuthenticated");
    if (!loggedIn) {
        router.push("/auth/login");
    }

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [bookingsResponse, passengersResponse, usersResponse, flightsResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/bookings/"),
                    axios.get("http://127.0.0.1:8000/passengers/"),
                    axios.get("http://127.0.0.1:8000/users/"),
                    axios.get("http://127.0.0.1:8000/flights/")
                ]);
                setBookingData(bookingsResponse.data);
                setPassengerData(passengersResponse.data);
                setUserData(usersResponse.data);
                setFlightData(flightsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        router.push("/login");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Page</h1>
            
            {/* Display booking data in table */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Booking Data</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Passengers</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Flight Number</th>
                            {/* Add more table headers for other booking details */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookingData.map((booking : any, index ) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.booking_date).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{userData.find(passenger => passenger.id === booking.passenger)?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.trip_type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{booking.adults + booking.children + booking.infants}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
  <div className={`inline-block px-2 py-1 rounded-lg ${booking.is_paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
    {booking.is_paid ? "Success" : "Pending"}
  </div>

 
</td>
<td className="px-6 py-4 whitespace-nowrap">{flightData.find(flight => flight.id === booking.flight)?.flight_number}</td>


                               

                                {/* Display other booking details in table cells */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display passenger data in table */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Passenger Data</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By: </th>

                            {/* Add more table headers for other passenger details */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {passengerData.map((passenger: any, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{passenger.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{passenger.first_name + " " + passenger.last_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{passenger.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{userData.find(passengers => passengers.id === passenger.user)?.email}</td>
                                
                                {/* Display other passenger details in table cells */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Display user data in table */}
            <div>
                <h2 className="text-xl font-bold mb-2">User Data</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            {/* Add more table headers for other user details */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {userData.map((user: any, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                {/* Display other user details in table cells */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    };