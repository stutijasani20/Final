"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Flight {
  id: number;
  flight_number: string;
  departure_airport: number;
  arrival_airport: number;
  departure_time: string;
  arrival_time: string;
  price: number;
}

interface Airport {
  name: string;
  id: number;
  city: string;
  country: string;
}

const FlightList: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [airports, setAirports] = useState<{ [key: number]: Airport }>({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get("http://127.0.0.1:8000/flights/");
      setFlights(response.data);

      const airportIds = response.data.map((flight: Flight) => [
        flight.departure_airport,
        flight.arrival_airport,
      ]);
      const uniqueAirportIds = Array.from(new Set(airportIds.flat()));
      fetchAirportDetails(uniqueAirportIds);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  // console.log(flights.map((flight) => flight.price));

  const handleBook = (flight: Flight) => {
    const selectedFlight = flights.map((flight) => flight.id);

    // Use the selectedFlight object to pre-fill booking form
    console.log(selectedFlight);
    router.push(`/booking?flightData=${selectedFlight}`);
  };

  const fetchAirportDetails = async (airportIds: number[]) => {
    try {
      const airportDetailsResponse = await Promise.all(
        airportIds.map(async (id) => {
          const response = await axios.get(
            `http://127.0.0.1:8000/airports/${id}/`
          );
          return { [id]: response.data };
        })
      );
      const airportDetails = Object.assign({}, ...airportDetailsResponse);
      setAirports(airportDetails);
    } catch (error) {
      console.error("Error fetching airport details:", error);
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Flight List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">
                Flight Number
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Departure Airport
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Arrival Airport
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Departure Time
              </th>
              <th className="border border-gray-300 px-4 py-2">Arrival Time</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id} className="odd:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {flight.flight_number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {airports[flight.departure_airport] && (
                    <>
                      {airports[flight.departure_airport].name},
                      {airports[flight.departure_airport].city},
                      {airports[flight.departure_airport].country}
                    </>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {airports[flight.arrival_airport] && (
                    <>
                      {airports[flight.arrival_airport].name},
                      {airports[flight.arrival_airport].city},
                      {airports[flight.arrival_airport].country}
                    </>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {flight.departure_time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {flight.arrival_time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Rs. {flight.price.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={handleBook}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightList;
