"use client";
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Flight {
  id: number;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
  departure_airport: number;
  departure_airport_name: string;
  arrival_airport: number;
  arrival_airport_name: string;
  classes: number;
  classes_name: string;
  travel_date: string;
  departure_code: string;
  arrival_code: string;
}

const AvailableFlightsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [departure_airport, setDeparture_airport] = useState<string>("");
  const [arrival_airport, setArrival_airport] = useState<string>("");
  const [travel_date, setTravel_date] = useState<string>("");
  const [classes, setClasses] = useState<string>("");

  const [error, setError] = useState<string>("");

  const updateFilteredFlights = () => {
    const params = new URLSearchParams(location.search);
    const flightsParam = params.get("flights");
    if (flightsParam) {
      try {
        const flights: Flight[] = JSON.parse(flightsParam);
        setFilteredFlights(flights);
        setError("");
      } catch (error) {
        setError("Error parsing flight data.");
      }
    } else {
      setError("No flight data found.");
    }
  };

  

    const handleSearchModification = async () => {
      try {
        const response =  await axios.get<Flight[]>(
          "http://127.0.0.1:8000/flights",
          {
            params: {
              departure_airport_name: departure_airport,
              arrival_airport_name: arrival_airport,
              travel_date: travel_date,
              classes: classes,
            },
          }
        );
       
       const filteredFlights = response.data.filter((flight) => {
          return (
            flight.departure_airport_name === departure_airport &&
            flight.arrival_airport_name === arrival_airport &&
            flight.travel_date === travel_date &&
            flight.classes_name === classes
          );
        });
        console.log(filteredFlights);
        setFilteredFlights(filteredFlights);
        router.push(`/flights/availability?flights=${JSON.stringify(filteredFlights)}`);

        setError("");
      } catch (error) {
        setError("Error fetching flight data.");
      }
    };
    


   
  


  useEffect(() => {
    updateFilteredFlights();
  }, [pathname]);

  const handleBooking = (flightId: number) => {
    router.push(`/booking?flightId=${flightId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
              Departure Airport
            </label>
            <input
              type="text"
              value={departure_airport}
              onChange={(e) => setDeparture_airport(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrival Airport
            </label>
            <input
              type="text"
              value={arrival_airport}
              onChange={(e) => setArrival_airport(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Travel Date
            </label>
            <input
              type="date"
              value={travel_date}
              onChange={(e) => setTravel_date(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Select Class</option>
              <option value="Economy Class">Economy Class</option>
              <option value="Business Class">Business Class</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
          <div className="col-span-2">
            <button
              onClick={handleSearchModification}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
          
      </div>
      </div>
      <h1 className="text-3xl font-bold mb-4 mt-5">Available Flights</h1>
      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : filteredFlights.length === 0 ? (
        <div className="text-gray-500 mb-4">No flights available.</div>
      ) : (
        <ul className="grid  grid-cols-1 mb-4  md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFlights.map((flight: Flight) => (
            <li
              key={flight.id}
              className="border border-gray-200 p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold mb-2">
                Flight Number: {flight.flight_number}
              </p>
              <p className="text-sm mb-2">
                Departure Airport: {flight.departure_airport_name}             
              </p>
              <p className="text-sm mb-2">
                Arrival Airport: {flight.arrival_airport_name}
              </p>
              <p className="text-sm mb-2">
                Departure Time: {new Date(flight.departure_time).toLocaleString()}
              </p>
              <p className="text-sm mb-2">
                Price: {flight.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </p>
              <p className="text-sm mb-2">
                Available Seats: {flight.available_seats}
              </p>
              <p className="text-sm mb-2">Travel Date: {flight.travel_date}</p>
              <p className="text-sm mb-2">Class: {flight.classes_name}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleBooking(flight.id)}
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableFlightsPage;
