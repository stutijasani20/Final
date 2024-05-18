"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ClipLoader } from 'react-spinners';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function Dashboard() {
    const [bookingsData, setBookingsData] = useState([]);
    const [passengersData, setPassengersData] = useState([]);
    const [flightsData, setFlightsData] = useState([]);
    const [airportsData, setAirportsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const [applicantsData, setApplicantsData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

   
   


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            setLoading(true);
            try {
                const [bookingsResponse, passengersResponse, flightsResponse, airportsResponse, usersResponse, jobsResponse, applicantsResponse] = await Promise.all([
                    axios.get("http://127.0.0.1:8000/bookings", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://127.0.0.1:8000/passengers", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://127.0.0.1:8000/flights", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://127.0.0.1:8000/airports", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://127.0.0.1:8000/users", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://127.0.0.1:8000/jobs", { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get("http://127.0.0.1:8000/applicant", { headers: { Authorization: `Bearer ${token}` } })
                ]);

                setBookingsData(bookingsResponse.data);
                setPassengersData(passengersResponse.data);
                setFlightsData(flightsResponse.data);
                setAirportsData(airportsResponse.data);
                setUsersData(usersResponse.data);
                setJobsData(jobsResponse.data);
                setApplicantsData(applicantsResponse.data);
            } catch (err) {
                setError("Error fetching data");
                console.error(err);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><ClipLoader size={50} color={"#123abc"} loading={loading} /></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    const data = {
        labels: ['Bookings', 'Passengers', 'Flights', 'Airports', 'Users', 'Jobs', 'Applicants'],
        datasets: [
            {
            
                data: [
                    bookingsData?.count || 0,
                    passengersData?.length || 0,
                    flightsData?.length || 0,
                    airportsData?.length || 0,
                    usersData?.count || 0,
                    jobsData?.length || 0,
                    applicantsData?.length || 0
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(201, 203, 207, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
 


    return (
        <div className="ml-64 px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/booking.png" alt="Dashboard" width={50} height={50} />
                    <h2 className="text-xl mt-5 font-semibold">Total Bookings: {bookingsData.count}</h2>
                </div>
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/passengers.png" alt="Dashboard" width={90} height={90} />
                    <h2 className="text-xl font-semibold">Total Passengers: {passengersData.length}</h2>
                </div>
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/flight.png" alt="Dashboard" width={100} height={100} />
                    <h2 className="text-xl font-semibold">Total Flights: {flightsData.length}</h2>
                </div>
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/airport.png" alt="Dashboard" width={100} height={100} />
                    <h2 className="text-xl font-semibold">Total Airports: {airportsData.length}</h2>
                </div>
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/user1.png" alt="users" width={100} height={100} />
                    <h2 className="text-xl font-semibold">Total Users: {usersData.count}</h2>
                </div>
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/job.png" alt="users" width={100} height={100} />
                    <h2 className="text-xl font-semibold">Total Jobs: {jobsData.length}</h2>
                </div>
                <div className="p-4 bg-slate-500 text-white rounded shadow">
                    <Image src="/applicant.png" alt="users" width={100} height={100} />
                    <h2 className="text-xl font-semibold">Total Applicants: {applicantsData.length}</h2>
                </div>

                
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 mb-5">
            <Bar data={data} />
        </div>
       
        
        </div>

    );
}

