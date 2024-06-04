"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/flightsearch.module.scss"
import { InputNumber } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
interface Airport {
  id: number;
  name: string;
  city: string;
  results: Airport[]
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
  travel_date: string;
}

const FlightSearchPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [passenger, setPassenger] = useState<number>(1);
  const [departureDate, setDepartureDate] = useState<string>("");
  const [flightClass, setFlightClass] = useState<string>("Economy");
  const [tripType, setTripType] = useState<string>("oneWay");
  const [returnDate, setReturnDate] = useState<string>("");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [showTravellerPopup, setShowTravellerPopup] = useState(false);
  const [originAirports, setOriginAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");
  const router = useRouter();
  const query = useSearchParams();

  useEffect(() => {

    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/airports"
      );
      setAirports(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching airports. Please try again.");
      console.error("Error fetching airports:", error);
    }
  };

  const handleTravellerChange =
    (type: any, operation: any) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTravellers((prevState: any) => {
        let newValue =
          operation === "increase" ? prevState[type] + 1 : prevState[type] - 1;
        newValue = newValue < 0 ? 0 : newValue; 

        if (
          type === "infants" &&
          operation === "increase" &&
          newValue > prevState.adults
        ) {
          newValue = prevState.adults;
        }

        return { ...prevState, [type]: newValue };
      });
    };

  const handlePassengerChange = (value: number) => {
    setPassenger(value < 1 ? 1 : value);
  };

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate || !flightClass) {
      setError("Please fill in all required fields.");
      return;
    }
    try {

      const response = await axios.get<Flight[]>(
        "http://127.0.0.1:8000/flights",
        {
          params: {
            departure_airport_name: origin,
            arrival_airport_name: destination,
            passenger,
            travel_date: departureDate,
            class_name: flightClass,
          },
        }
      );

      setFlights(response.data);
      router.push(
        `/flights/availability?flights=${encodeURIComponent(
          JSON.stringify(response.data)
        )}`
      );
      setError("");
    } catch (error) {
      setError("Error fetching flights. Please try again.");
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    const city = query.get("city");

    if (city) {

      const matchingAirport = airports.find(
        (airport) => airport.city.toLowerCase() === city.toLowerCase()
      );

      if (matchingAirport) {
        setDestination(matchingAirport.name);
      }
    }
  }, [query, airports]);

  const handleOriginChange = (value: string) => {
  
    const matchingAirports: any = airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase())
    );

    setOriginAirports(matchingAirports);

    setOrigin(value);
  };
  const handleDestinationChange = (value: string) => {
    
    const matchingAirports: any = airports.filter(
      (airport) =>
        airport.city.toLowerCase().includes(value.toLowerCase()) ||
        airport.name.toLowerCase().includes(value.toLowerCase())
    );

    setDestinationAirports(matchingAirports);

    setDestination(value);
  };

  const handleSwap = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
       
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backdropFilter: 'blur(5px)', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)' 
      }}>
      <Loading />
      </div>
    );
  }
  return (
    <>
      <div className={styles.body}>
        <div className="flex items-center justify-center">
          <div className="w-full md:w-4/5 lg:w-3/5">
            <h1 className="text-3xl font-bold mb-4 mt-5 text-center">
              Flight Search
            </h1>
            <form className="rounded px-8  pb-8 mb-4">
              <div className="container mx-auto py-8 flex flex-col items-center">
                <span className="block text-gray-700 text-sm font-bold mb-2"></span>
                <div>
                  <button
                    className={`mr-4 p-2 ${
                      tripType === "oneWay"
                        ? "bg-blue-500 text-white"
                        : "bg-white-500 text-black"
                    } transition-all duration-200 hover:bg-blue-500 hover:text-black hover:scale-110`}
                    onClick={(e) => {
                      e.preventDefault();
                      setTripType("oneWay");
                    }}
                  >
                    One Way
                  </button>

                  <button
                    className={`mr-4 p-2 ${
                      tripType === "roundTrip"
                        ? "bg-blue-500 text-white"
                        : "bg-white-500 text-black"
                    } transition-all duration-200 hover:bg-blue-500 hover:text-black hover:scale-110`}
                    onClick={(e) => {
                      e.preventDefault();
                      setTripType("roundTrip");
                    }}
                  >
                    Round Trip
                  </button>
                </div>
              </div>{" "}
              <br /> <br />
              <div className="flex justify-between mb-4">
                <div className="w-1/2 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="origin"
                  >
                    Origin City/Airport
                  </label>
                  <input
                    className="dropdown-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="origin"
                    list="originAirportsList"
                    value={origin}
                    onChange={(e) => handleOriginChange(e.target.value)}
                    placeholder="Enter Origin City or Airport"
                  />
                  <datalist id="originAirportsList">
                    {originAirports.map((airport) => (
                      <option key={airport.id} value={airport.name}>
                        {airport.city} ({airport.name})
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="swapContainer flex items-center justify-center mx-2">
                  <button className={styles.swapButton} onClick={handleSwap}>
                    <Image
                      src="/swap.png"
                      width={24}
                      height={24}
                      alt="Swap values"
                    />
                  </button>
                </div>

                <div className="w-1/2 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="destination"
                  >
                    Destination City/Airport
                  </label>
                  <input
                    className="dropdown-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="destination"
                    list="destinationAirportsList"
                    value={destination}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    placeholder="Enter Destination City or Airport"
                  />
                  <datalist id="destinationAirportsList">
                    {destinationAirports.map((airport) => (
                      <option key={airport.id} value={airport.name}>
                        {airport.city} ({airport.name})
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="departureDate"
                >
                  Departure Date
                </label>
                <input
                  className="date-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="departureDate"
                  type="date"
                  value={departureDate}
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                  }}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                />
              </div>
              {tripType === "roundTrip" && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="returnDate"
                  >
                    Return Date
                  </label>
                  <input
                    type="date"
                    id="returnDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="passengers"
                >
                  Passengers
                </label>
                <InputNumber
                min={1}
                value={passenger}
                onChange={(value: number | null) => {handlePassengerChange}}

                 
                className="w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="flightClass"
                >
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
                className="bg-blue-500 hover:bg-blue-700 hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSearch}
              >
                Search Flights
              </button>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearchPage;
