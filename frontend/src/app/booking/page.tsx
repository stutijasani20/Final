// bookingForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

function BookingForm() {
  const [flightData, setFlightData] = useState<Flight | null>(null);
  const [airports, setAirports] = useState<{
    length: number; [key: number]: Airport 
}>({});
  const searchParam = useSearchParams();
  const id = searchParam.get("flightData");

  useEffect(() => {
    async function fetchFlightData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/flights/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFlightData(data); // Update state with flight data
        } else {
          console.error("Error fetching flight data");
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    }

    fetchFlightData();
  }, [id, searchParam]);

  useEffect(() => {
    async function fetchAirportData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/airports`);
        if (response.ok) {
          const data = await response.json();
          setAirports(data); // Update state with airport data
        } else {
          console.error("Error fetching Airport data");
        }
      } catch (error) {
        console.error("Error fetching Airport data:", error);
      }
    }

    fetchAirportData();
  }, []);

  return (
    <div>
      {/* Display flight data */}
      {flightData && (
        <div>
          <p>Flight ID: {flightData.id}</p>
          <p>Flight Number: {flightData.flight_number}</p>
          {/* Ensure airports are fetched and departure/arrival airports are valid */}
          {airports.length > 0 &&
            flightData.departure_airport >= 0 &&
            flightData.arrival_airport >= 0 && (
              <>
                <p>Departure:</p>
                <p>
                  - Airport:{" "}
                  {
                    airports.find(
                      (airport) => airport.id === flightData.departure_airport
                    )?.name
                  }
                </p>
                <p>- Departure Time: {flightData.departure_time}</p>
                <p>Arrival:</p>
                <p>
                  - Airport:{" "}
                  {
                    airports.find(
                      (airport) => airport.id === flightData.arrival_airport
                    )?.name
                  }
                </p>
                <p>- Arrival Time: {flightData.arrival_time}</p>
              </>
            )}
          <p>Price: {flightData.price}</p>
          {/* Other flight details as needed */}
        </div>
      )}
    </div>
  );
}

export default BookingForm;
