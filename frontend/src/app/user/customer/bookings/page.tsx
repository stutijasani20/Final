"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Grid, TextField } from "@mui/material";
import Loading from "@/app/loading";
interface Booking {
    id: number;
    booking_date: string;
    trip_type: string;
    passengers: Passenger[];
    is_paid: boolean;
    flight: number;
}

interface Passenger {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    dob: string
}

interface Flight {
    id: number;
    flight_number: string;
    departure_airport: string;
    arrival_airport: string;
    departure_time: string;
    arrival_time: string;
    price: number;
}

const Page: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;
    const userId = localStorage.getItem("userId");
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const [flightIdToNumberMap, setFlightIdToNumberMap] = useState({});
    const [filterCriteria, setFilterCriteria] = useState({
        bookingDate: "",
        isPaid: "",
        flightId: ""
    });

    const router = useRouter();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                let url = `http://127.0.0.1:8000/bookings/?passenger=${userId}&page=${currentPage}`;

                if (filterCriteria.bookingDate || filterCriteria.isPaid || filterCriteria.flightId) {
                    url = `http://127.0.0.1:8000/bookings/?passenger=${userId}`;
                }

                const response = await axios.get(url, {
                    params: {
                        booking_date: filterCriteria.bookingDate,
                        flight_id: filterCriteria.flightId,
                        page: currentPage
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

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
        };

        if (userId) {
            fetchBookings();
            fetchFlights();
        } else {
            router.push("/login");
        }
    }, [userId, currentPage, filterCriteria, router]);

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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFilterCriteria((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilterCriteria({
            bookingDate: "",
            isPaid: "",
            flightId: ""
        });
    };

    return (
        <div className="container mx-auto p-8 flex flex-col items-center bg-slate-100">
            <h1 className="text-3xl font-bold mb-6">My Previous Bookings</h1>
          
            <div className="flex gap-2 mb-4">
                <TextField
                    type="date"
                    label="Booking Date"
                    name="bookingDate"
                    value={filterCriteria.bookingDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
               
            </div>
            <Button variant="contained" color="secondary" onClick={clearFilters}>
    Clear Filters
</Button>
            <div className="mb-8 mt-3">
                {loading ? (
                    <p>
                        <Loading />
                    </p>
                ) : (
                    <>
                        {filterCriteria.bookingDate || filterCriteria.flightId ? (
                            <>
                                {bookings.length === 0 ? (
                                    <p>No filtered bookings found.</p>
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
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookings.map((booking, index) => (
                                                <tr key={booking.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.booking_date).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.trip_type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.passengers.length}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`inline-block px-2 py-1 rounded-lg ${booking.is_paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                            {booking.is_paid ? "Success" : "Pending"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{flightData.find(flight => flight.id === booking.flight)?.flight_number}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        ) : (
                            <>
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
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookings.map((booking, index) => (
                                                <tr key={booking.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.booking_date).toLocaleString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.trip_type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.passengers.length}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className={`inline-block px-2 py-1 rounded-lg ${booking.is_paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                            {booking.is_paid ? "Success" : "Pending"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{flightData.find(flight => flight.id === booking.flight)?.flight_number}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
            
           <Grid container  component="div" style={{ marginTop: '20px' }}>
                <Button variant="contained" color="primary" disabled={currentPage === 1} onClick={handlePreviousPage}>
                    Previous
                </Button>
                <Button variant="contained" color="primary" disabled={currentPage === totalPages} onClick={handleNextPage}>
                    Next
                </Button>
            </Grid>
           
            
        </div>
    );
}

export default Page;

