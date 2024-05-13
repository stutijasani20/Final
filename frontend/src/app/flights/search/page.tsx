"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
  travel_date: string;
}

const FlightSearchPage: React.FC = () => {
  const [origin, setOrigin] = useState<number>(0);
  const [destination, setDestination] = useState<number>(0);
  const [passenger, setPassengers] = useState<number>(1);
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

  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);

  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Fetch airports data when component mounts
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await axios.get<Airport[]>(
        "http://127.0.0.1:8000/airports"
      );
      setAirports(response.data);
    } catch (error) {
      setError("Error fetching airports. Please try again.");
      console.error("Error fetching airports:", error);
    }
  };

 

  const handleTravellerChange = (type: any, operation: any) => (event: any) => {
    event.preventDefault();
    setTravellers((prevState) => {
      let newValue = operation === "increase" ? prevState[type] + 1 : prevState[type] - 1;
      newValue = newValue < 0 ? 0 : newValue; // Ensure the value is not negative

      // Prevent the number of infants from exceeding the number of adults
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
  const handleSearch = async () => {
    try {
      const response = await axios.get<Flight[]>(
        "http://127.0.0.1:8000/flights",
        {
          params: {
            origin,
            destination,
            passenger,
            departureDate,
            class: flightClass,
          },
        }
      );

      const filteredFlights = response.data.filter((flight) => {
        return (
          flight.departure_airport === origin &&
          flight.arrival_airport === destination &&
          flight.travel_date === departureDate &&
          flight.available_seats >= passenger

        );
      });

      setFlights(filteredFlights);
      if (filteredFlights.length === 0) {
        setError("No flights available for the selected route.");
      } else {
        
        router.push(
          `/flights/availability?flights=${encodeURIComponent(JSON.stringify(filteredFlights))}`
        );
        setError("");
      }
    } catch (error) {
      setError("Error fetching flights. Please try again.");
      console.error("Error fetching flights:", error);
    }
  };
  // const handleBooking = async (flightId: number) => {
  //   const user = localStorage.getItem("userId");
  //   // console.log(user)    // Check if user is authenticated
  //   try {
  //     const queryString = `?flight=${flightId}&booking=${user}`;
  //     router.push(`/booking/${queryString}`);
  //   } catch (error) {
  //     console.error("Error booking flight:", error);
  //     // Handle error, show error message, etc.
  //   }
  

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 mt-5">Flight Search</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="container mx-auto py-8 flex flex-col items-center">
            <span className="block text-gray-700 text-sm font-bold mb-2"></span>
            <div>
              <input
                type="radio"
                id="oneWay"
                name="tripType"
                value="oneWay"
                checked={tripType === "oneWay"}
                onChange={(e) => setTripType(e.target.value)}
              />
              <label htmlFor="oneWay" className="mr-4">
                One Way
              </label>
              <input
                type="radio"
                id="roundTrip"
                name="tripType"
                value="roundTrip"
                checked={tripType === "roundTrip"}
                onChange={(e) => setTripType(e.target.value)}
              />
              <label htmlFor="roundTrip">Round Trip</label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="origin"
            >
              Origin Airport
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(Number(e.target.value))}
            >
              <option value={0}>Select Origin Airport</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="destination"
            >
              Destination Airport
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(Number(e.target.value))}
            >
              <option value={0}>Select Destination Airport</option>
              {airports.map((airport) => (
                <option key={airport.id} value={airport.id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="passengers"
            >
              Number of Passengers
            </label>
            <input
              type="number"
              id="passengers"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={passenger}
              onChange={(e) => setPassengers(Number(e.target.value))}
            />
          </div> */}
<div onClick={() => setShowTravellerPopup(true)}>
  Travellers: Adults: {travellers.adults}, Children: {travellers.children}, Infants: {travellers.infants}
</div>

{showTravellerPopup && (
  <div 
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    }}
  >
    <div>
  <span>Adults: </span>
  <button style={{ margin: "0 5px", transition: "background-color 0.3s" }} onClick={handleTravellerChange("adults", "increase")} onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = "#ddd"} onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = ""}>
    +
  </button>
  {travellers.adults}
  <button style={{ margin: "0 5px", transition: "background-color 0.3s" }} onClick={handleTravellerChange("adults", "decrease")} onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = "#ddd"} onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = ""}>
    -
  </button>
</div>
    <div>
      <button style={{ margin: "0 5px", transition: "background-color 0.3s" }} onClick={handleTravellerChange("children", "increase")} onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = "#ddd"} onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = ""}>
        +
      </button>
      <span>Children: {travellers.children}</span>
      <button style={{ margin: "0 5px", transition: "background-color 0.3s" }} onClick={handleTravellerChange("children", "decrease")} onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = "#ddd"} onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = ""}>
        -
      </button>
    </div>
    <div>
      <button style={{ margin: "0 5px", transition: "background-color 0.3s" }} onClick={handleTravellerChange("infants", "increase")} onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = "#ddd"} onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = ""}>
        +
      </button>
      <span>Infants: {travellers.infants}</span>
      <button style={{ margin: "0 5px", transition: "background-color 0.3s" }} onClick={handleTravellerChange("infants", "decrease")} onMouseOver={(e) => (e.target as HTMLElement).style.backgroundColor = "#ddd"} onMouseOut={(e) => (e.target as HTMLElement).style.backgroundColor = ""}>
        -
      </button>
    </div>
    <button onClick={() => setShowTravellerPopup(false)}>
      Close
    </button>
  </div>
)}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="departureDate"
            >
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

       

       
      </div>
    </>
  );
};
export default FlightSearchPage;