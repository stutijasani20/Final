"use client";
import React, { useState } from "react";
import axios from "axios";

interface Flight {
  id: number;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  // Add more properties as needed
}

const FlightSearch: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const searchFlights = async () => {
    try {
      const response = await axios.get<Flight[]>(
        "http://127.0.0.1:8000/flights/",
        {
          params: {
            departureAirport,
            arrivalAirport,
            departureDate,
          },
        }
      );
      setFlights(response.data);
    } catch (error) {
      console.error("Error searching for flights:", error);
    }
  };

  return (
    <div>
      <h2>Flight Search</h2>
      <div>
        <label htmlFor="departureAirport">Departure Airport:</label>
        <input
          type="text"
          id="departureAirport"
          value={departureAirport}
          onChange={(e) => setDepartureAirport(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="arrivalAirport">Arrival Airport:</label>
        <input
          type="text"
          id="arrivalAirport"
          value={arrivalAirport}
          onChange={(e) => setArrivalAirport(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="departureDate">Departure Date:</label>
        <input
          type="date"
          id="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      <button onClick={searchFlights}>Search Flights</button>
      <div>
        {flights.length > 0 ? (
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                {flight.departureAirport} to {flight.arrivalAirport} on{" "}
                {flight.departureDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
