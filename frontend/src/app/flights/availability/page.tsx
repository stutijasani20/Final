"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Grid, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

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
      const response = await axios.get<Flight[]>(
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
      setFilteredFlights(filteredFlights);
      router.push(
        `/flights/availability?flights=${JSON.stringify(filteredFlights)}`
      );

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

  const handleViewDetails = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedFlight(null);
  };

  const formatDate = (dateString: any) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString: any) => {
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const diffMs = arrival.getTime() - departure.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs}h ${diffMins}m`;
  };

  

  return (
  
<div className="container mx-auto py-8 mt-4">
  <div className="rounded-lg shadow-md p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-1">
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
              Modify Search
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
        <div className="grid grid-cols-1 mb-5 gap-4">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="border border-gray-200 p-4 rounded-lg shadow-md font-serif">
              <div>
                <Typography variant="h6" className="font-bold mb-2 font-serif" style={{ fontWeight: "bold" }}>
                  {flight.flight_number}
                </Typography>
                <hr />
                <br />
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 pr-2">
                  <Typography variant="body1" className="mb-2">
                    <strong>{flight.departure_code}</strong>
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <strong>{formatDate(flight.departure_time)}</strong>
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <strong>{formatTime(flight.departure_time)}</strong>
                  </Typography>
                </div>
                <div className="w-1/2 flex items-center justify-center space-x-2">
                  <FlightTakeoffIcon sx={{ color: "red" }} /> ----------- {" "}
                  <Typography variant="body1" className="mb-2 text-center">
                    {calculateDuration(flight.departure_time, flight.arrival_time)}
                  </Typography> --------- {" "}
                  <FlightLandIcon sx={{ color: "red" }} />
                </div>
                <div className="w-1/3 pl-2">
                  <Typography variant="body1" className="mb-2">
                    <strong>{flight.arrival_code}</strong>
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <strong>{formatDate(flight.arrival_time)}</strong>
                  </Typography>
                  <Typography variant="body1" className="mb-2">
                    <strong>{formatTime(flight.arrival_time)}</strong>
                  </Typography>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBooking(flight.id)}
                >
                  Book Now
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewDetails(flight)}
                >
                  View Flight Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Flight Details</DialogTitle>
        <DialogContent>
          {selectedFlight && (
            <>
              <Typography variant="body1" className="mb-2">
                <strong>Flight Number:</strong> {selectedFlight.flight_number}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Departure Airport:</strong> {selectedFlight.departure_airport_name} ({selectedFlight.departure_code})
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Departure Date:</strong> {formatDate(selectedFlight.departure_time)}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Departure Time:</strong> {formatTime(selectedFlight.departure_time)}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Arrival Airport:</strong> {selectedFlight.arrival_airport_name} ({selectedFlight.arrival_code})
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Arrival Date:</strong> {formatDate(selectedFlight.arrival_time)}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Arrival Time:</strong> {formatTime(selectedFlight.arrival_time)}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Total Duration:</strong> {calculateDuration(selectedFlight.departure_time, selectedFlight.arrival_time)}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Price:</strong> {selectedFlight.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Available Seats:</strong> {selectedFlight.available_seats}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
   
  );
};

export default AvailableFlightsPage;

