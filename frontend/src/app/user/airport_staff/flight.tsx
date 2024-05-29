"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { Button, Grid, TextField, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";

interface Flight {
    id: number;
    flight_number: string;
    departure_airport_name: string;
    arrival_airport_name: string;
    price: number;
    travel_date: string;
    classes_name: string;
}

const Flights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [filterCriteria, setFilterCriteria] = useState({
        departureAirportName: "",
        arrivalAirportName: "",
        travelDate: "",
        className: "",

    });

    useEffect(() => {
        const fetchFlights = async () => {
            let url = `http://127.0.0.1:8000/flights/?page=${page}`;
            if (filterCriteria.departureAirportName) {
                url += `&departure_airport_name=${filterCriteria.departureAirportName}`;
            }
            if (filterCriteria.arrivalAirportName) {
                url += `&arrival_airport_name=${filterCriteria.arrivalAirportName}`;
            }
           
            if (filterCriteria.travelDate) {
                url += `&travel_date=${filterCriteria.travelDate}`;
            }
            if (filterCriteria.className) {
                url += `&class_name=${filterCriteria.className}`;
            }

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFlights(response.data);
			
                setTotalPages(Math.ceil(response.data.count / pageSize));
            } catch (error) {
                console.error("Error fetching flights:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [filterCriteria.departureAirportName, filterCriteria.arrivalAirportName,  filterCriteria.travelDate, filterCriteria.className, page, pageSize]);

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFilterCriteria((prev) => ({
            ...prev,
            [name]: name === "price" ? (value ? parseInt(value) : undefined) : value
        }));
    };


    const clearFilters = () => {
        setFilterCriteria({
            departureAirportName: "",
            arrivalAirportName: "",
           
            travelDate: "",
            className: ""
        });
    };

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
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Flights</h2>
            <div className="flex gap-2 mb-4 flex justify-center items-center">
                <TextField
                    type="text"
                    label="Departure Airport"
                    name="departureAirportName"
                    value={filterCriteria.departureAirportName}
                    onChange={handleFilterChange}
                />
                <TextField
                    type="text"
                    label="Arrival Airport"
                    name="arrivalAirportName"
                    value={filterCriteria.arrivalAirportName}
                    onChange={handleFilterChange}
                />
                <TextField
                    type="date"
                    label="Travel Date"
                    name="travelDate"
                    value={filterCriteria.travelDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="text"
                    label="Class"
                    name="className"
                    value={filterCriteria.className}
                    onChange={handleFilterChange}
                />
                <Button variant="contained" color="secondary" onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>
            {flights.length === 0 ? (
                <div className="flex flex-col items-center mt-8">
                    <Image src="/no.png" alt="No data found" width={500} height={500} />
                    <p className="text-xl text-gray-700 mt-4">No flights found</p>
                </div>
            ) : (
                <>
                    <table className="w-full border-collapse table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">No.</th>
                                <th className="border p-2">Flight Number</th>
                                <th className="border p-2">Departure Airport</th>
                                <th className="border p-2">Arrival Airport</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Travel Date</th>
                                <th className="border p-2">Class</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight, index) => (
                                <tr key={flight.id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{flight.flight_number}</td>
                                    <td className="border p-2">{flight.departure_airport_name}</td>
                                    <td className="border p-2">{flight.arrival_airport_name}</td>
                                    <td className="border p-2">{flight.price}</td>
                                    <td className="border p-2">{new Date(flight.travel_date).toLocaleDateString()}</td>
                                    <td className="border p-2">{flight.classes_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index} onClick={() => handlePageChange(index + 1)} className="mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200">{index + 1}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Flights;
