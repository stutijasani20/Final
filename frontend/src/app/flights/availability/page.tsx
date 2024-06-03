"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Image from "next/image";
import { Hourglass } from "react-loader-spinner";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateFilteredFlights = () => {
    const params = new URLSearchParams(location.search);
    const flightsParam = params.get("flights");
    if (flightsParam) {
      try {
        const flights: Flight[] = JSON.parse(flightsParam);
        // setLoading(false);
        setFilteredFlights(flights);
        setError("");
      } catch (error) {
        setError("Error parsing flight data.");
      }
    } else {
      setError("No flight data found.");
    }
    setIsLoading(false);
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
    const options: any = {
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
    const minutes = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

    return `${hours} hours : ${minutes} minutes`;
  }

  if (isLoading) {
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
      <Hourglass />
      </div>
    );
  }
 

  return (
    <div
      className="container flex flex-col justify-start items-center  mx-auto py-8 mt-2"
      style={{ maxWidth: "12000px", height: "100vh", overflowY: "auto" }}
    >

      <h1
        className="text-3xl font-bold mb-4 mt-2"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
          padding: "10px 20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        Available Flights
      </h1>

      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : filteredFlights.length === 0 ? (
        <div className="flex flex-col items-center">
          <Image src="/no.png" alt="No data found" width={400} height={300} />
          <div className="text-gray-500 mb-4">No flights available.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 mb-5 gap-4">
          {filteredFlights.map((flight) => (
            <Paper
              key={flight.id}
              elevation={3}
              className="p-4"
              style={{ width: "600px", height: "auto" }}
            >
              <div className="flex justify-between p-4 bg-white rounded-lg shadow-md items-center mb-2">
                <Typography
                  variant="h6"
                  className="font-bold text-2xl text-blue-600"
                >
                  {flight.flight_number}
                </Typography>
                <div className="flex items-center space-x-2">
                  <FlightTakeoffIcon style={{ color: "green" }} />
                  <Typography
                    variant="body1"
                    className="font-semibold text-lg text-gray-700"
                  >
                    {calculateTimeDifference(
                      flight.departure_time,
                      flight.arrival_time
                    )}
                  </Typography>

                  <FlightLandIcon sx={{ color: "red" }} />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold", color: "#1e88e5" }}
                      >
                        Departure: {flight.departure_code}
                      </Typography>
                      <Typography variant="body2" style={{ color: "#424242" }}>
                        {formatDate(flight.departure_time)} |{" "}
                        {formatTime(flight.departure_time)}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <Typography
                    variant="subtitle1"
                    style={{ color: "#1e88e5", fontWeight: "bold" }}
                  >
                    Arrival: {flight.arrival_code}
                  </Typography>
                  <Typography variant="body2" style={{ color: "#424242" }}>
                    {formatDate(flight.arrival_time)} |{" "}
                    {formatTime(flight.arrival_time)}
                  </Typography>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBooking(flight.id)}
                  style={{
                    textTransform: "none",
                    backgroundColor: "#3f51b5",
                    color: "white",
                    padding: "10px 20px",
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: "bold",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src="/book.png"
                    width={30}
                    height={30}
                    alt="book"
                    style={{ marginRight: "10px" }}
                  />
                  Book Now
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(flight)}
                  style={{
                    textTransform: "none",
                    backgroundColor: "#87CEEB",
                    color: "white",
                    padding: "10px 20px",
                    display: "flex",
                    fontSize: "16px",
                    fontWeight: "bold",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Image
                    src="/view.png"
                    width={30}
                    height={30}
                    alt="details"
                    style={{ marginRight: "10px" }}
                  />
                  View Details
                </Button>
              </div>
            </Paper>
          ))}
        </div>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          style={{ background: "#FF69B4", color: "#fff", padding: "20px" }}
        >
          Flight Details
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
            style={{
              position: "absolute",
              top: "20px",
              right: "10px",
              backgroundColor: "#D70040",
            }}
          >
            <CancelPresentationIcon />
          </Button>
        </DialogTitle>

        <DialogContent style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
          {selectedFlight && (
            <div className="space-y-4">
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/number.png"
                  style={{ color: "red", marginRight: "10px" }}
                />
                <span>
                  <strong>Flight Number:</strong> {selectedFlight.flight_number}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={24}
                  height={24}
                  alt="flight"
                  src="/airport.png"
                  style={{ marginRight: "10px" }}
                />
                <span>
                  <strong>Departure Airport:</strong>{" "}
                  {selectedFlight.departure_airport_name} (
                  {selectedFlight.departure_code})
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/date.png"
                  style={{ color: "red", marginRight: "10px" }}
                />
                <span>
                  <strong>Departure Date:</strong>{" "}
                  {formatDate(selectedFlight.departure_time)}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/depart.png"
                  style={{ color: "red", marginRight: "10px" }}
                />
                <span>
                  <strong>Departure Time:</strong>{" "}
                  {formatTime(selectedFlight.departure_time)}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/airport.png"
                  style={{ marginRight: "10px" }}
                />
                <span>
                  <strong>Arrival Airport:</strong>{" "}
                  {selectedFlight.arrival_airport_name} (
                  {selectedFlight.arrival_code})
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/date2.jpg"
                  style={{ color: "red", marginRight: "10px", width:"auto", height:"auto" }}
                />
                <span>
                  <strong>Arrival Date:</strong>{" "}
                  {formatDate(selectedFlight.arrival_time)}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={50}
                  height={50}
                  alt="flight"
                  src="/arrival3.png"
                  style={{ color: "red" }}
                />
                <span>
                  <strong>Arrival Time:</strong>{" "}
                  {formatTime(selectedFlight.arrival_time)}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/time1.png"
                  style={{ color: "red", marginRight: "10px" }}
                />
                <span>
                  <strong>Total Duration:</strong>{" "}
                  {calculateTimeDifference(
                    selectedFlight.departure_time,
                    selectedFlight.arrival_time
                  )}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/rs.png"
                  style={{ color: "red", marginRight: "10px" }}
                />
                <span>
                  <strong>Price:</strong>{" "}
                  {selectedFlight.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "#333", display: "flex", alignItems: "center" }}
              >
                <Image
                  width={30}
                  height={30}
                  alt="flight"
                  src="/seats.png"
                  style={{ color: "red", marginRight: "10px" }}
                />
                <span>
                  <strong>Available Seats:</strong>{" "}
                  {selectedFlight.available_seats}
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
