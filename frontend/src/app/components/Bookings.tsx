"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import Loading from '../loading';
import Image from 'next/image';
import { Button, Grid, TextField, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface Booking {
    id: number;
    booking_date: string;
    passengers: number[];
    passenger: number;
    is_paid: boolean;
    flight: number;
    meals: number[];
}

interface Flight {
    id: number;
    flight_number: string;
}

interface PassengerDetails {
    id: number;
    first_name: string;
    last_name: string;

}

const Booking = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [passengerEmails, setPassengerEmails] = useState<string[]>([]);
    const [passengerDetails, setPassengerDetails] = useState<PassengerDetails[]>([]);
    const [flightData, setFlightData] = useState<Flight[]>([]);
    const [filterCriteria, setFilterCriteria] = useState({
        bookingDate: "",
        isPaid: "",
        flightId: ""
    });

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/flights", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFlightData(response.data);
            } catch (error) {
                console.error("Error fetching flights:", error);
            }
        }
        fetchFlights();
    }, []);

    useEffect(() => {
        const fetchBookings = async () => {
            let url = `http://127.0.0.1:8000/bookings/?page=${page}`;
            if (filterCriteria.bookingDate) {
                url += `&booking_date=${filterCriteria.bookingDate}`;
            }
            if (filterCriteria.isPaid) {
                url += `&is_paid=${filterCriteria.isPaid}`;
            }
            if (filterCriteria.flightId) {
                url += `&flight=${filterCriteria.flightId}`;
            }

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBookings(response.data.results);
                console.log(response.data)
                setTotalPages(Math.ceil(response.data.count / pageSize));

                
                


                const passengerIds = response.data.results.map((booking: Booking) => booking.passenger);
                const passengerEmailResponses = await Promise.all(
                    passengerIds.map((passengerId: number) =>
                        axios.get(`http://127.0.0.1:8000/users/${passengerId}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        })
                    )
                );
                const emails = passengerEmailResponses.map(response => response.data.email);
                setPassengerEmails(emails);

                const ids = response.data.results.map((booking: Booking) => booking.passengers).flat();
                const passengerDetailResponses = await Promise.all(
                    ids.map((passengerId: number) =>
                        axios.get(`http://127.0.0.1:8000/passengers/${passengerId}`)
                    )
                );
                const details = passengerDetailResponses.map(response => response.data);
                setPassengerDetails(details);

            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [filterCriteria.bookingDate, filterCriteria.flightId, filterCriteria.isPaid, page, pageSize]);
    
    const handleFilterChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void = (e) => {
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

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
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

    const handleChange = (event: SelectChangeEvent<string>) => {
        setFilterCriteria({
            ...filterCriteria,
            [event.target.name as string]: event.target.value,
        });
    };

    return (
        <div className="p-4 ml-64">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Bookings</h2>
            <div className="flex gap-2 mb-4 flex justify-center items-center">
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
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                    <Select
                        label="Payment Status"
                        name="isPaid"
                        value={filterCriteria.isPaid}
                        onChange={handleChange}
                    >
                        <MenuItem value={''}>All</MenuItem>
                        <MenuItem value={'true'}>Success</MenuItem>
                        <MenuItem value={'false'}>Pending</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="secondary" onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>
            {bookings.length === 0 ? (
                <div className="flex flex-col items-center mt-8">
                    <Image src="/no.png" alt="No data found" width={500} height={500} />
                    <p className="text-xl text-gray-700 mt-4">No bookings found</p>
                </div>
            ) : (
                <>
                   <table className="w-full border-collapse table-auto">
    <thead className="bg-gray-300">
        <tr>
            <th className="border p-4 text-left font-bold">No.</th>
            <th className="border p-4 text-left font-bold">Booking Date</th>
            <th className="border p-4 text-left font-bold">Passengers</th>
            <th className="border p-4 text-left font-bold">Booked By</th>
            <th className="border p-4 text-left font-bold">Payment Status</th>
            <th className="border p-4 text-left font-bold">Flight</th>
        </tr>
    </thead>
    <tbody>
        {bookings.map((booking, index) => (
            <tr key={booking.id} className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                <td className="border p-4">{index + 1}</td>
                <td className="border p-4">{new Date(booking.booking_date).toLocaleString()}</td>
                <td className="border p-4">
                    {booking.passengers.length > 0 ? (
                        booking.passengers.map((passengerId, i) => {
                            const passenger = passengerDetails.find(p => p.id === passengerId);
                            return passenger ? (
                                <div key={i} className="my-1">
                                    {passenger.first_name} {passenger.last_name}
                                </div>
                            ) : <div key={i} className="my-1 text-red-500">No details for this passenger</div>;
                        })
                    ) : (
                        <div className="text-gray-500">No passengers</div>
                    )}
                </td>
                <td className="border p-4">{passengerEmails[index]}</td>
                
                <td className="border p-4">
                    <div className={`inline-block px-3 py-1 rounded-full ${booking.is_paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {booking.is_paid ? "Success" : "Pending"}
                    </div>
                </td>
                <td className="border p-4">
                    {flightData.find(flight => flight.id === booking.flight)?.flight_number}
                </td>
            </tr>
        ))}
    </tbody>
</table>


                    <div className="flex justify-center mt-4">
                       <Stack spacing={2}>
                       <Pagination count={totalPages} color="secondary" onChange={handlePageChange}  />
                       </Stack>
                    </div>
                </>
            )}
        </div>
    );
};

export default Booking;
