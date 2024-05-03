"use client";
import {
  useState,
  useEffect,
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
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
import { useSearchParams } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const MapWithRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [hotelLocation, setHotelLocation] = useState({ lat: 0, lng: 0 });
  const searchParams = useSearchParams();

  useEffect(() => {
    // Step 1: Retrieve user's location
    const fetchUserLocation = async () => {
      try {
        // Use Geolocation API to get user's current position
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
    const fetchRouteData = async () => {
      try {
        // Extract hotel location from search params
        const hotelLat = parseFloat(searchParams.get("hotelLat") || "");
        const hotelLng = parseFloat(searchParams.get("hotelLng") || "");

        setHotelLocation({ lat: hotelLat, lng: hotelLng });

        // Fetch route data using TomTom API
        const response = await axios.get(
          `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lng}:${hotelLat},${hotelLng}/json?&instructionsType=text&sectionType=lanes&instructionAnnouncementPoints=all&language=en-GB&routeType=eco&traffic=true&vehicleMaxSpeed=120&travelMode=car&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
        );

        if (response.status === 200) {
          const data = response.data;
          setRouteData(data);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    if (searchParams.has("hotelLat") && searchParams.has("hotelLng")) {
      fetchRouteData();
    }
  }, [searchParams, userLocation]);

  const markerIcon = L.icon({
    iconUrl: "icons8-valet-48.png",
    iconSize: [50, 50],
  });

  const markerIcon2 = L.icon({
    iconUrl: "icons8-hotel-bed-32.png",
    iconSize: [50, 50],
  });

  const secondsToHoursMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${minutes} min`;
    }
  };

  const metersToKilometers = (meters: number) => {
    const kilometers = meters / 1000;
    return kilometers.toFixed(2); // Round to 2 decimal places
  };

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const options = {
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
        <div>
          <div className="capitalize text-justify box-content h-100 w-96 p-4 flow-root  border-4 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
            {" "}
            <p className="mb-2">
              <span className="text-lime-500">
                {secondsToHoursMinutes(
                  routeData.routes[0].summary.travelTimeInSeconds
                )}
              </span>
              <span className="text-sky-500"> ( </span>
              <span className="text-sky-500">
                {metersToKilometers(routeData.routes[0].summary.lengthInMeters)}{" "}
                km
              </span>
              <span className="text-sky-500"> )</span>
            </p>
            <p>
              Departure Time:{" "}
              {formatDate(routeData.routes[0].summary.departureTime)}
            </p>
            <p>
              Arrival Time:{" "}
              {formatDate(routeData.routes[0].summary.arrivalTime)}
            </p>
          </div>
          <h2>Route Instructions</h2>
          <ol>
            {routeData.routes[0].guidance.instructions.map(
              (
                instruction: {
                  combinedMessage:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                },
                index: Key | null | undefined
              ) => (
                <li key={index}>{instruction.combinedMessage}</li>
              )
            )}
          </ol>

          <div>
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={15}
              style={{ height: "700px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
                <Marker
                  position={[hotelLocation.lat, hotelLocation.lng]}
                  icon={markerIcon2}
                >
                  <Popup>Ending Point</Popup>
                </Marker>
              </>
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default MapWithRoute;
