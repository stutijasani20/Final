

// "use client";
// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// interface RouteData {
//   routes: {
//     summary: {
//       travelTimeInSeconds: number;
//       lengthInMeters: number;
//       departureTime: string;
//       arrivalTime: string;
//     };
//     guidance: {
//       instructions: { combinedMessage: string }[];
//     };
//     legs: {
//       points: { latitude: number; longitude: number }[];
//     }[];
//   }[];
// }

// const MapWithRoute = () => {
//   const [routeData, setRouteData] = useState<RouteData | null>(null);
//   const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
//   const [touristLocation, settouristLocation] = useState({ lat: 0, lng: 0 });
//   const [error, setError] = useState(false);

//   const searchParams = useSearchParams();

//   const airport = searchParams.get("airport") || "Mumbai Airport";

//   useEffect(() => {
//     const fetchUserLocation = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/airports/?name=${airport}`);
//         const { lat, lng } = response.data[0];
//         setUserLocation({ lat, lng });
//       } catch (error) {
//         setError(true);
//       }
//     };
//     fetchUserLocation();
//   }, [airport]);

//   useEffect(() => {
//     const fetchRouteData = async () => {
//       try {
//         const touristLat = parseFloat(searchParams.get("touristLat") || "");
//         const touristLng = parseFloat(searchParams.get("touristLng") || "");
//         settouristLocation({ lat: touristLat, lng: touristLng });

//         const response = await axios.get(
//           `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lng}:${touristLat},${touristLng}/json?&instructionsType=text&sectionType=lanes&instructionAnnouncementPoints=all&language=en-GB&routeType=eco&traffic=true&vehicleMaxSpeed=120&travelMode=car&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
//         );

//         if (response.status === 200) {
//           setRouteData(response.data);
//         }
//       } catch (error) {
//         // Handle error
//       }
//     };

//     if (searchParams.has("touristLat") && searchParams.has("touristLng")) {
//       fetchRouteData();
//     }
//   }, [searchParams, userLocation]);

//   const markerIcon = L.icon({
//     iconUrl: "icons8-valet-48.png",
//     iconSize: [50, 50],
//   });

//   const markerIcon2 = L.icon({
//     iconUrl: "tourist.png",
//     iconSize: [50, 50],
//   });

//   const secondsToHoursMinutes = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);

//     if (hours === 0) {
//       return `${minutes} min`;
//     } else if (minutes === 0) {
//       return `${hours} hr`;
//     } else {
//       return `${hours} hr ${minutes} min`;
//     }
//   };

//   const metersToKilometers = (meters: number) => {
//     const kilometers = meters / 1000;
//     return kilometers.toFixed(2);
//   };

//   const formatDate = (timestamp: any) => {
//     const date = new Date(timestamp);
//     const options: any = {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       timeZoneName: "short",
//     };
//     return date.toLocaleDateString("en-US", options);
//   };

//   return (
//     <>
//       {routeData && (
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-md p-8">
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-800">Route Information</h1>
//               <div className="text-gray-500">
//                 <p className="font-semibold">From: {airport}</p>
//                 <p className="font-semibold">To: tourist</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="border border-gray-200 rounded-lg p-6">
//                 <h2 className="text-xl font-semibold mb-4">Summary</h2>
//                 <p className="text-gray-700 mb-2">Travel Time: {secondsToHoursMinutes(routeData.routes[0].summary.travelTimeInSeconds)}</p>
//                 <p className="text-gray-700 mb-2">Distance: {metersToKilometers(routeData.routes[0].summary.lengthInMeters)} km</p>
//                 <p className="text-gray-700 mb-2">Departure Time: {formatDate(routeData.routes[0].summary.departureTime)}</p>
//                 <p className="text-gray-700 mb-2">Arrival Time: {formatDate(routeData.routes[0].summary.arrivalTime)}</p>
//               </div>
//               <div className="border border-gray-200 rounded-lg p-6">
//                 <h2 className="text-xl font-semibold mb-4">Instructions</h2>
//                 <ol className="list-decimal list-inside text-gray-700">
//                   {routeData.routes[0].guidance.instructions.map((instruction: any, index: number) => (
//                     <li key={index}>{instruction.combinedMessage}</li>
//                   ))}
//                 </ol>
//               </div>
//             </div>
//             <div className="mt-8">
//               <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={16} className="h-96">
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Polyline
//                   positions={routeData.routes[0].legs[0].points.map((point: any) => [
//                     point.latitude,
//                     point.longitude,
//                   ])}
//                   color="blue"
//                 />
//                 <Marker position={[userLocation.lat, userLocation.lng]} icon={markerIcon}>
//                   <Popup>Starting Point</Popup>
//                 </Marker>
//                 <Marker position={[touristLocation.lat, touristLocation.lng]} icon={markerIcon2}>
//                   <Popup>tourist</Popup>
//                 </Marker>
//               </MapContainer>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MapWithRoute;
// ``

"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
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
    const [touristLocation, settouristLocation] = useState({ lat: 0, lng: 0 });
    const [error, setError] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const airport = searchParams.get("airport") || "Mumbai Airport";

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/airports/?name=${airport}`);
                const { lat, lng } = response.data[0];
                setUserLocation({ lat, lng });
                fetchRouteData(lat, lng);
            } catch (error) {
                setError(true);
            }
        };

        const fetchRouteData = async (userLat: number, userLng: number) => {
            try {
                const touristLat = parseFloat(searchParams.get("touristLat") || "");
                const touristLng = parseFloat(searchParams.get("touristLng") || "");
                settouristLocation({ lat: touristLat, lng: touristLng });

                const response = await axios.get(
                    `https://api.tomtom.com/routing/1/calculateRoute/${userLat},${userLng}:${touristLat},${touristLng}/json?&instructionsType=text&sectionType=lanes&instructionAnnouncementPoints=all&language=en-GB&routeType=eco&traffic=true&vehicleMaxSpeed=120&travelMode=car&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
                );

                if (response.status === 200) {
                    setRouteData(response.data);
                }
            } catch (error) {
                setError(true);
            }
        };

        fetchUserLocation();
    }, [airport, searchParams]);

    const markerIcon = L.icon({
        iconUrl: "icons8-valet-48.png",
        iconSize: [50, 50],
    });

    const markerIcon2 = L.icon({
        iconUrl: "tourist.png",
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
                <Marker position={[touristLocation.lat, touristLocation.lng]} icon={markerIcon2}>
                    <Popup>tourist</Popup>
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
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    style={{
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            maxHeight: '100%',
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
<div className="flex flex-col items-center animate-fade-in-down">
<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-auto transition duration-200 ease-in-out transform hover:scale-105" 
            onClick={() => setModalIsOpen(false)}
        >
            <CancelIcon />
        </button>
        <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FiInfo className="mr-2 text-blue-600" />
        <span className="text-lg">Route Details</span>
    </h2>
    <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center">
            <FiMapPin className="mr-2 text-blue-600" />
            <span className="font-semibold">From: </span> {airport}
        </div>
        <div className="flex items-center">
            <FiMapPin className="mr-2 text-blue-600" />
            <span className="font-semibold">To: </span> tourist
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
<div className="p-4 mt-4 bg-white rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FiMapPin className="mr-2 text-blue-600" />
        <span className="text-lg">Instructions</span>
    </h2>
    <div className="border border-gray-200 rounded-lg p-4">
    <ol className="list-decimal list-inside text-gray-700">
    {routeData.routes[0].guidance.instructions.map((instruction: any, index: number) => (
        <li key={index} className="mb-2">
            {instruction.message.includes('left') && <TurnLeftIcon />}
            {instruction.message.includes('right') && <TurnRightIcon />}
            {instruction.message}
        </li>
    ))}
</ol>
    </div>
</div>

                       
                    </div>
                </Modal>
            </MapContainer>
        );
    };

    if (error) {
        return <div className="text-red-600">Error fetching data. Please try again later.</div>;
    }

    if (!routeData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-full w-full">
            <div className="bg-white p-1 flex flex-col overflow-auto">
                {/* Placeholder for other components if needed */}
            </div>
            <div className="flex-grow h-full w-full transition-all duration-500 ease-in-out">
                {renderMap()}
            </div>
        </div>
    );
};

export default MapWithRoute;


