"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface Airport {
  id: number;
  name: string;
}

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
}

const FlightSearchPage: React.FC = () => {
  const [origin, setOrigin] = useState<number>(0);
  const [destination, setDestination] = useState<number>(0);
  const [passenger, setPassengers] = useState<number>(1);
  const [departureDate, setDepartureDate] = useState<string>('');
  const [flightClass, setFlightClass] = useState<string>('');

  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
 
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    // Fetch airports data when component mounts
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await axios.get<Airport[]>('http://127.0.0.1:8000/airports');
      setAirports(response.data);
    } catch (error) {
      setError('Error fetching airports. Please try again.');
      console.error('Error fetching airports:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get<Flight[]>('http://127.0.0.1:8000/flights', {
        params: {
          origin,
          destination,
          passenger,
          departureDate,
          class: flightClass
        }
      });

      const filteredFlights = response.data.filter(flight => {
        return flight.departure_airport === origin && flight.arrival_airport === destination;
      });

      setFlights(filteredFlights);
      if (filteredFlights.length === 0) {
        setError('No flights available for the selected route.');
      } else {
        setError('');
      }
    } catch (error) {
      setError('Error fetching flights. Please try again.');
      console.error('Error fetching flights:', error);
    }
  };
  const handleBooking = async (flightId: number) => {
    const user = localStorage.getItem('userId')
    // console.log(user)    // Check if user is authenticated
    try{     
      const queryString = `?flight=${flightId}&booking=${user}`;
      router.push(`/booking/${queryString}`);
    } catch (error) {
      console.error('Error booking flight:', error);
      // Handle error, show error message, etc.
    }
  };


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 mt-5">Flight Search</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="origin">
            Origin Airport
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(Number(e.target.value))}
          >
            <option value={0}>Select Origin Airport</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
            Destination Airport
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(Number(e.target.value))}
          >
            <option value={0}>Select Destination Airport</option>
            {airports.map(airport => (
              <option key={airport.id} value={airport.id}>{airport.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passengers">
            Number of Passengers
          </label>
          <input
            type="number"
            id="passengers"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={passenger}
            onChange={(e) => setPassengers(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureDate">
            Departure Date
          </label>
          <input
            type="date"
            id="departureDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flightClass">
            Class
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="flightClass"
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSearch}
        >
          Search Flights
        </button>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-3 gap-4">
        {flights.map(flight => (
          <div key={flight.id} className="bg-white shadow-md rounded px-4 py-2 mt-5 mb-5">
            <div>Flight Number: {flight.flight_number}</div>
            <div>Departure Time: {flight.departure_time}</div>
            <div>Arrival Time: {flight.arrival_time}</div>
            <div>Price: ${flight.price}</div>
            <div>Available Seats: {flight.available_seats}</div>
            <div>Departure Airport ID: {flight.departure_airport_name}</div>
            <div>Arrival Airport ID: {flight.arrival_airport_name}</div>
            <div>Classes: {flight.classes_name}</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleBooking(flight.id)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchPage;
