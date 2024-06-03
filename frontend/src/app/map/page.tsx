"use client";
import React, { useState, useEffect } from "react";

import L from "leaflet";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FiClock, FiCalendar, FiMapPin, FiInfo } from "react-icons/fi";
import { GiPathDistance } from "react-icons/gi";
import Modal from "react-modal";
import CancelIcon from '@mui/icons-material/Cancel';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import RoundaboutLeftIcon from '@mui/icons-material/RoundaboutLeft';
import Image from "next/image";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import dynamic from "next/dynamic";
const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((module) => module.Polyline), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((module) => module.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), { ssr: false });

interface RouteData {


    routes: {
        summary: {
            travelTimeInSeconds: number;
            lengthInMeters: number;
            departureTime: string;
            arrivalTime: string;
        };
        guidance: {
            instructions: { combinedMessage: string }[];
        };
        legs: {
            points: { latitude: number; longitude: number }[];
        }[];
    }[];
}

const MapWithRoute = () => {


    const [routeData, setRouteData] = useState<RouteData | null>(null);
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [hotelLocation, sethotelLocation] = useState({ lat: 0, lng: 0 });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const airport = searchParams.get("airport") || "Mumbai Airport";
   

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/airports/?name=${airport}`);
               
                const { lat, lng } = response.data.results[0];
                setUserLocation({ lat, lng });
                fetchRouteData(lat, lng);
            } catch (error) {
                setError(true);
            }
        };

        
        const fetchRouteData = async (userLat: number, userLng: number) => {
            try {
                const hotelLat = parseFloat(searchParams.get("hotelLat") || "");
                const hotelLng = parseFloat(searchParams.get("hotelLng") || "");

               
                sethotelLocation({ lat: hotelLat, lng: hotelLng });

                const response = await axios.get(
                    `https://api.tomtom.com/routing/1/calculateRoute/${userLat},${userLng}:${hotelLat},${hotelLng}/json?&instructionsType=text&sectionType=lanes&instructionAnnouncementPoints=all&language=en-GB&routeType=eco&traffic=true&vehicleMaxSpeed=120&travelMode=car&key=${process.env.NEXT_PUBLIC_TOMTOM_KEY}`
                );

                if (response.status === 200) {
                    setRouteData(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchUserLocation();
    }, [airport, searchParams]);

    const markerIcon = L.icon({
        iconUrl: "icons8-valet-48.png",
        iconSize: [50, 50],
    });

    const markerIcon2 = L.icon({
        iconUrl: "hotel.png",
        iconSize: [50, 50],
    });

    const secondsToHoursMinutes = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours === 0) {
            return `${minutes} min`;
        } else if (minutes === 0) {
            return `${hours} hr`;
        } else {
            return `${hours} hr ${minutes} min`;
        }
    };

    const metersToKilometers = (meters: number) => {
        const kilometers = meters / 1000;
        return kilometers.toFixed(2);
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };
    

    const renderMap = () => {
        if (!routeData || !routeData.routes || routeData.routes.length === 0) {
            return <p>No route data available.</p>;
        }

        return (
            typeof window !== 'undefined' && (
            <MapContainer
                style={{
                    width: '100%',
                    height: '100vh',
                }}
                center={[userLocation.lat, userLocation.lng]}
                zoom={16}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline
                    positions={routeData.routes[0].legs[0].points.map((point: any) => [
                        point.latitude,
                        point.longitude,
                    ])}
                    color="blue"
                />
                <Marker position={[userLocation.lat, userLocation.lng]} icon={markerIcon}>
                    <Popup>Starting Point</Popup>
                </Marker>
                <Marker position={[hotelLocation.lat, hotelLocation.lng]} icon={markerIcon2}>
                    <Popup>hotel</Popup>
                </Marker>
                <Control position="topright">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Show Details
                    </button>
                </Control>
                <Modal
    ariaHideApp={false}
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    style={{
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '20px',
            borderRadius: '10px',
            border: 'none',
            background: '#fff',
            zIndex: '9999',
            boxShadow: '0 4px 6px 0 hsla(0, 0%, 0%, 0.2)', 
            transition: 'all 0.3s ease-out',
        },
        overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '9998',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }}
>
<div className="flex flex-col items-center">
    <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-auto mb-2 transition duration-200 ease-in-out transform hover:scale-105" 
        onClick={() => setModalIsOpen(false)}
    >
        <CancelIcon />
    </button>
    <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-lg shadow-lg w-full md:w-auto lg:w-auto">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiInfo className="mr-2 text-blue-600" />
            <span className="text-lg">Route Details</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
                <FiMapPin className="mr-2 text-blue-600" />
                <span className="font-semibold">From: </span> {airport}
            </div>
            <div className="flex items-center">
                <FiMapPin className="mr-2 text-blue-600" />
                <span className="font-semibold">To: </span> hotel
            </div>
            <div className="flex items-center">
                <FiClock className="mr-2 text-blue-600" />
                <span className="font-semibold">Travel Time: </span> {secondsToHoursMinutes(routeData.routes[0].summary.travelTimeInSeconds)}
            </div>
            <div className="flex items-center">
                <GiPathDistance className="mr-2 text-blue-600" />
                <span className="font-semibold">Distance: </span> {metersToKilometers(routeData.routes[0].summary.lengthInMeters)} km
            </div>
            <div className="flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                <span className="font-semibold">Departure Time: </span> {formatTime(routeData.routes[0].summary.departureTime)}
            </div>
            <div className="flex items-center">
                <FiCalendar className="mr-2 text-blue-600" />
                <span className="font-semibold">Arrival Time: </span> {formatTime(routeData.routes[0].summary.arrivalTime)}
            </div>
        </div>
    </div>
    <div className="p-4 mt-4 bg-white rounded-lg shadow-lg w-full">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiMapPin className="mr-2 text-blue-600" />
            <span className="text-lg">Instructions</span>
        
        </h2>
        <div className="border border-gray-200 rounded-lg p-4">
            <ol className="list-inside text-gray-700">
                {routeData.routes[0].guidance.instructions.map((instruction: any, index: number) => (
                    <li key={index} className="mb-2">
                        {instruction.message.includes('left') && <TurnLeftIcon sx={{color: "red"}} />}
                        {instruction.message.includes('right') && <TurnRightIcon sx={{color: "blue"}} />}
                        {instruction.message.includes('roundabout') && <RoundaboutLeftIcon sx={{color: "green"}} />}
                        {instruction.message.includes('Leave') && <TimeToLeaveIcon sx={{color: "#b148d2"}}  />}
                        {instruction.message} ({metersToKilometers(instruction.routeOffsetInMeters)} kms)
                    </li>
                ))}
            </ol>
        </div>
    </div>
</div>

</Modal>

</MapContainer>
            )
);
};

if (error) {
    return <div className="text-red-600">Error fetching data. Please try again later.</div>;
}

 if (loading) {
    return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <Image src="/map.gif" alt="loading" width={150} height={150} />
    </div>
     );
}
if (typeof window === "undefined") return null;

    
return (
        <div className="flex h-full w-full">
            <div className="bg-white p-1 flex flex-col overflow-auto">
            </div>
            <div className="flex-grow h-full w-full transition-all duration-500 ease-in-out">
                {renderMap()}
            </div>
        </div>
    );
};

export default MapWithRoute;
