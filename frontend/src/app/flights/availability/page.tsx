"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Image from "next/image";
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
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString: any) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  function calculateTimeDifference(time1: string, time2: string): string {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    const timeDifferenceMs = Math.abs(date2.getTime() - date1.getTime());

    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

    return `${hours} hours : ${minutes} minutes`;
}


  return (
  
    <div className="container flex flex-col justify-center items-center bg-slate-100 mx-auto py-8 mt-2" style={{ maxWidth: '12000px' }}>
    <div className="rounded-lg shadow-md p-6 mt-5 bg-gray-100" style={{ width: '100%', maxWidth: '600px' }}>
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

      <h1
        className="text-3xl font-bold mb-4 mt-5"
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          color: '#ffffff',
          background: 'linear-gradient(90deg, #1e3c72, #2a5298)',
          padding: '10px 20px',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        Available Flights
      </h1>

      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : filteredFlights.length === 0 ? (
        <div className="text-gray-500 mb-4">No flights available.</div>
      ) : (
        <div className="grid grid-cols-1 mb-5 gap-4">
          {filteredFlights.map((flight) => (
            <Paper key={flight.id} elevation={3} className="p-4" style={{ width: '600px', height: 'auto' }}>
              <div className="flex justify-between p-4 bg-white rounded-lg shadow-md items-center mb-2">
               
                  <Typography variant="h6" className="font-bold text-2xl text-blue-600">
  {flight.flight_number}
</Typography>
<div className="flex items-center space-x-2">
  <FlightTakeoffIcon style={{ color: 'green' }} />
  <Typography variant="body1" className="font-semibold text-lg text-gray-700">
    {calculateTimeDifference(flight.departure_time, flight.arrival_time)}
  </Typography>

                  <FlightLandIcon sx={{ color: 'red' }} />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <FlightTakeoffIcon style={{ color: '#1e88e5', marginRight: '10px' }} />
                    <div>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#1e88e5' }}>
                        Departure: {flight.departure_code}
                      </Typography>
                      <Typography variant="body2" style={{ color: '#424242' }}>
                        {formatDate(flight.departure_time)} | {formatTime(flight.departure_time)}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <Typography variant="subtitle1" style={{ color: '#1e88e5', fontWeight: 'bold' }}>
                    Arrival: {flight.arrival_code}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#424242' }}>
                    {formatDate(flight.arrival_time)} | {formatTime(flight.arrival_time)}
                  </Typography>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBooking(flight.id)}
                  style={{
                    textTransform: 'none',
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    padding: '10px 20px',
                    display: 'flex',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                  }}
                >
                  <Image src="/book.png" width={30} height={30} alt="book" style={{ marginRight: '10px' }} />
                  Book Now
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(flight)}
                  style={{
                    textTransform: 'none',
                    backgroundColor: '#87CEEB',
                    color: 'white',
                    padding: '10px 20px',
                    display: 'flex',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                  }}
                >
                  <Image src="/view.png" width={30} height={30} alt="details" style={{ marginRight: '10px' }} />
                  View Details
                </Button>
              </div>
            </Paper>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle style={{ background: '#FF69B4', color: '#fff', padding: '20px' }}>
          Flight Details
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
            style={{
              position: 'absolute',
              top: '20px',
              right: '10px',
              backgroundColor: '#D70040',
            }}
          >
            <CancelPresentationIcon />
          </Button>
        </DialogTitle>

        <DialogContent style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
          {selectedFlight && (
            <div className="space-y-4">
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/number.png" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Flight Number:</strong> {selectedFlight.flight_number}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={24} height={24} alt="flight" src="/airport.png" style={{ marginRight: '10px' }} />
                <span>
                  <strong>Departure Airport:</strong> {selectedFlight.departure_airport_name} ({selectedFlight.departure_code})
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/date.png" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Departure Date:</strong> {formatDate(selectedFlight.departure_time)}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/depart.png" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Departure Time:</strong> {formatTime(selectedFlight.departure_time)}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/airport.png" style={{ marginRight: '10px' }} />
                <span>
                  <strong>Arrival Airport:</strong> {selectedFlight.arrival_airport_name} ({selectedFlight.arrival_code})
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/date2.jpg" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Arrival Date:</strong> {formatDate(selectedFlight.arrival_time)}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={50} height={50} alt="flight" src="/arrival3.png" style={{ color: 'red' }} />
                <span>
                  <strong>Arrival Time:</strong> {formatTime(selectedFlight.arrival_time)}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/time1.png" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Total Duration:</strong> {calculateTimeDifference(selectedFlight.departure_time, selectedFlight.arrival_time)}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/rs.png" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Price:</strong> {selectedFlight.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </span>
              </Typography>
              <Typography variant="body1" style={{ color: '#333', display: 'flex', alignItems: 'center' }}>
                <Image width={30} height={30} alt="flight" src="/seats.png" style={{ color: 'red', marginRight: '10px' }} />
                <span>
                  <strong>Available Seats:</strong> {selectedFlight.available_seats}
                </span>
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

                export default AvailableFlightsPage;