"use client";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

interface MapWithRouteProps {
  destination: {
    lat: number;
    lng: number;
  };
}

const MapWithRoute: React.FC<MapWithRouteProps> = ({ destination }) => {
  const [routeData, setRouteData] = useState<any>(null);
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lng}:22.5664646,72.56456464/json?vehicleHeading=90&sectionType=traffic&routeType=eco&traffic=true&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&report=effectiveSettings&travelMode=car&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
        );
        if (response.status === 200) {
          const data = response.data;
          setRouteData(data);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchData();
  }, [userLocation, destination]);
  console.log(userLocation);
  console.log(destination);

  const markerIcon = L.icon({
    iconUrl: "/1.jpeg",
    iconSize: [31, 46],
  });

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={15}
      style={{ height: "700px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {routeData && (
        <>
          <Polyline
            positions={routeData.routes[0].legs[0].points.map(
              (point: { latitude: any; longitude: any }) => [
                point.latitude,
                point.longitude,
              ]
            )}
            color="blue"
          />
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={markerIcon}
          >
            <Popup>Starting Point</Popup>
          </Marker>
          <Marker position={[22.5664646, 72.56456464]} icon={markerIcon}>
            <Popup>Ending Point</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
};

export default MapWithRoute;
