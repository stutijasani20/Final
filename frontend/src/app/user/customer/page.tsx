"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BookingSuccessModal from "../customer/success"; // Import the success modal component
import Link from "next/link";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import UserProfileModal from "@/app/components/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Booking {
  id: number;
  booking_date: string;
  trip_type: string;
  passengers: any[];
  is_paid: boolean;
  flight: number;

  // Add more booking details
}
interface Flight {
  id: number;
  flight_number: string;
  arrival_airport_name: string;
  // Add more flight details
}

interface Passenger {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [passengerData, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flightData, setFlightData] = useState<Flight[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [flightNumberFilter, setFlightNumberFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [bookingDateFilter, setBookingDateFilter] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false); // State to control the profile modal visibility
  const profileExists = localStorage.getItem("profileData");
  // Define function to handle filter button click
  const handleFilter = async () => {
    try {
      // Construct query parameters based on filter values
      const queryParams = {
        flight: flightNumberFilter,
        is_paid: paymentStatusFilter,
        booking_date: bookingDateFilter,
      };

      // Fetch filtered bookings from backend API
      const response = await axios.get("http://127.0.0.1:8000/bookings/", {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update state variable with filtered bookings
      setFilteredBookings(response.data);
    } catch (error) {
      console.error("Error fetching filtered bookings:", error);
      // Handle error
    }
  };

  useEffect(() => {
    if (userId && !profileExists) {
      setShowProfileModal(true);
    }
  }, [profileExists, userId]);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/bookings/?passenger=${userId}&page=1`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setBookings(response.data.results.slice(0, 2));
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/flights/`);
        setFlightData(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError("Failed to fetch flights");
      }
    };

    if (userId) {
      fetchBookings();
      fetchFlights();
    } else {
      // Redirect to login if user ID is not available
      router.push("/login");
    }
  }, [userId, router]);
  const all = bookings.map((booking: any) => booking.passengers);
  
   

  

  const handleCancelBooking = async (bookingId: any) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/bookings/${bookingId}`);
      // Remove canceled booking from state
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      setShowSuccessModal(true);
      console.log("Booking canceled successfully");
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Failed to cancel booking");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const first_flight = bookings[0];
  const id = first_flight?.flight;
  const flight = flightData.find(
    (flight) => flight.id === id
  )?.arrival_airport_name;

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          {
            text: "My Previous Bookings",
            icon: <Image src="/hotel1.png" alt="menu" height={40} width={40} />,
            link: "/user/customer/bookings",
          },
          {
            text: "Hotel",
            icon: <Image src="/hotel.png" alt="menu" height={40} width={40} />,
            link: `/individual/hotel?airport=${
              flightData.find((flight) => flight.id === id)
                ?.arrival_airport_name
            }`,
          },
          {
            text: "Restaurants",
            icon: (
              <Image src="/restaurant1.png" alt="menu" height={40} width={40} />
            ),
            link: `/individual/restaurant?airport=${
              flightData.find((flight) => flight.id === id)
                ?.arrival_airport_name
            }`,
          },
          {
            text: "Tourist Places",
            icon: (
              <Image src="/tourist1.png" alt="menu" height={40} width={40} />
            ),
            link: `/individual/tourist?airport=${
              flightData.find((flight) => flight.id === id)
                ?.arrival_airport_name
            }`,
          },
        ].map((item, index) => (
          <Link href={item.link} key={item.text} passHref>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ color: "#263238" }} primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton></ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <div>{showProfileModal && <UserProfileModal />}</div>
      <div>
        <Button onClick={toggleDrawer(true)}>
          <Image src="/side.png" alt="side" height={50} width={50} />
        </Button>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      {/* Bookings Table */}
      <div className="container  mx-auto p-8">
        <h1 className="text-3xl flex justify-center  font-bold mb-6">
          My Bookings
        </h1>
        <div className="mb-8 flex justify-center">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div>
              <table className="min-w-full  divide-y divide-gray-200">
                {/* Table Headers */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trip Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Passengers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flight Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(booking.booking_date).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.trip_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.passengers.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-block px-2 py-1 rounded-lg ${
                            booking.is_paid
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {booking.is_paid ? "Success" : "Pending"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {
                          flightData.find(
                            (flight) => flight.id === booking.flight
                          )?.flight_number
                        }
                      </td>
                      <td>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Success Modal */}
        <BookingSuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
    </>
  );
}
