"use client";
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

const MapWithRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [restaurantLocation, setrestaurantLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const searchParams = useSearchParams();
  const airport = searchParams.get("airport") || "Mumbai Airport"

  useEffect(() => {
    
    const fetchUserLocation = async () => {
      try {
        // Fetch airport data from the API endpoint
        const response = await axios.get(`http://127.0.0.1:8000/airports/?name=${airport}`);
        console.log(response.data[0].lat);
        console.log(response.data[0].lng);
        
        
        // Extract latitude and longitude from the response data
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lng;
        // Set the user location state with the fetched latitude and longitude
        setUserLocation({ lat: latitude, lng: longitude });
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };
  
    // Call the fetchUserLocation function
    fetchUserLocation();
  }, [airport]);


  

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        // Extract restaurant location from search params
        const restaurantLat = parseFloat(
          searchParams.get("restaurantLat") || ""
        );
        const restaurantLng = parseFloat(
          searchParams.get("restaurantLng") || ""
        );

        setrestaurantLocation({ lat: restaurantLat, lng: restaurantLng });

        // Fetch route data using TomTom API
        const response = await axios.get(
          `https://api.tomtom.com/routing/1/calculateRoute/${userLocation.lat},${userLocation.lng}:${restaurantLat},${restaurantLng}/json?&instructionsType=text&sectionType=lanes&instructionAnnouncementPoints=all&language=en-GB&routeType=eco&traffic=true&vehicleMaxSpeed=120&travelMode=car&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
        );

        if (response.status === 200) {
          const data = response.data;
          setRouteData(data);
        }
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    if (
      searchParams.has("restaurantLat") &&
      searchParams.has("restaurantLng")
    ) {
      fetchRouteData();
    }
  }, [searchParams, userLocation]);

  const markerIcon = L.icon({
    iconUrl: "/user.jpg",
    iconSize: [31, 46],
  });

  const markerIcon2 = L.icon({
    iconUrl: "/restaurant.png",
    iconSize: [31, 46],
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
                position={[restaurantLocation.lat, restaurantLocation.lng]}
                icon={markerIcon2}
              >
                <Popup>Ending Point</Popup>
              </Marker>
            </>
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default MapWithRoute;
