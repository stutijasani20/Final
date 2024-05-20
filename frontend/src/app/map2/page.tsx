

"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();

  const airport = searchParams.get("airport") || "Mumbai Airport";

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/airports/?name=${airport}`);
        const { lat, lng } = response.data[0];
        setUserLocation({ lat, lng });
      } catch (error) {
        setError(true);
      }
    };
    fetchUserLocation();
  }, [airport]);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const touristLat = parseFloat(searchParams.get("touristLat") || "");
        const touristLng = parseFloat(searchParams.get("touristLng") || "");
        settouristLocation({ lat: touristLat, lng: touristLng });

        const response = await axios.get(
          `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lng}:${touristLat},${touristLng}/json?&instructionsType=text&sectionType=lanes&instructionAnnouncementPoints=all&language=en-GB&routeType=eco&traffic=true&vehicleMaxSpeed=120&travelMode=car&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
        );

        if (response.status === 200) {
          setRouteData(response.data);
        }
      } catch (error) {
        // Handle error
      }
    };

    if (searchParams.has("touristLat") && searchParams.has("touristLng")) {
      fetchRouteData();
    }
  }, [searchParams, userLocation]);

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

  const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const options: any = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      {routeData && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Route Information</h1>
              <div className="text-gray-500">
                <p className="font-semibold">From: {airport}</p>
                <p className="font-semibold">To: tourist</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <p className="text-gray-700 mb-2">Travel Time: {secondsToHoursMinutes(routeData.routes[0].summary.travelTimeInSeconds)}</p>
                <p className="text-gray-700 mb-2">Distance: {metersToKilometers(routeData.routes[0].summary.lengthInMeters)} km</p>
                <p className="text-gray-700 mb-2">Departure Time: {formatDate(routeData.routes[0].summary.departureTime)}</p>
                <p className="text-gray-700 mb-2">Arrival Time: {formatDate(routeData.routes[0].summary.arrivalTime)}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ol className="list-decimal list-inside text-gray-700">
                  {routeData.routes[0].guidance.instructions.map((instruction: any, index: number) => (
                    <li key={index}>{instruction.combinedMessage}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-8">
              <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={16} className="h-96">
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
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapWithRoute;
``
