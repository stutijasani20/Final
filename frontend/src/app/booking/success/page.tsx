"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Loading from "@/app/loading";
import Image from "next/image";
interface Booking {
  id: number;
  flight: number;
  booking_date: string;
  meals: number[];
  insurance: number;
  is_paid: boolean;
  trip_type: string;
  passengers: number[];
}

interface Passenger {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  phone_number: string;
  gender: string;
}

interface Meal {
  id: number;
  name: string;
}

interface Insurance {
  id: number;
  name: string;
}

interface Flight {
  id: number;
  flight_number: string;
}

const Success: React.FC = () => {
  const pathname = usePathname();
  const params = new URLSearchParams(location.search);

  const flightsParam = params.get("bookingId");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [insurance, setInsurance] = useState<Insurance | null>(null);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  useEffect(() => {
    
            const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/bookings/${flightsParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooking(response.data);
      } catch (error: any) {
        console.error("Error fetching booking data:", error);
        setError("Failed to fetch booking data");
        if (error.response && error.response.status === 403) {
          setError("You do not have permission to do this action");
        }
      } finally {
        setLoading(false);
      }
    };

    if (flightsParam) {
      fetchBookingData();
    }
  }, [flightsParam, token]);

  useEffect(() => {
    const fetchPassengerDetails = async () => {
      if (booking?.passengers && booking.passengers.length > 0) {
        try {
          const passengerDetails = await Promise.all(
            booking.passengers.map((passengerId) =>
              axios.get(`http://127.0.0.1:8000/passengers/${passengerId}/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            )
          );
          setPassengers(passengerDetails.map((response) => response.data));
        } catch (error: any) {
          console.error("Error fetching passenger details:", error);
          setError("Failed to fetch passenger details");
          if (error.response && error.response.status === 403) {
            setError("You do not have permission to do this action");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    if (booking) {
      fetchPassengerDetails();
    }
  }, [booking, token]);

  useEffect(() => {
    const fetchMealsAndInsurance = async () => {
      if (booking?.meals && booking.meals.length > 0) {
        try {
          const mealDetails = await Promise.all(
            booking.meals.map((mealId) =>
              axios.get(`http://127.0.0.1:8000/foods/${mealId}/`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            )
          );
          setMeals(mealDetails.map((response) => response.data));
        } catch (error: any) {
          console.error("Error fetching meal details:", error);
          setError("Failed to fetch meal details");
          if (error.response && error.response.status === 403) {
            setError("You do not have permission to do this action");
          }
        }
      }
      if (booking?.insurance) {
        try {
          const insuranceResponse = await axios.get(
            `http://127.0.0.1:8000/insurance-policies/${booking.insurance}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setInsurance(insuranceResponse.data);
        } catch (error: any) {
          console.error("Error fetching insurance details:", error);
          setError("Failed to fetch insurance details");
          if (error.response && error.response.status === 403) {
            setError("You do not have permission to do this action");
          }
        }
      }
      if (booking?.flight) {
        try {
          const flightResponse = await axios.get(
            `http://127.0.0.1:8000/flights/${booking.flight}/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFlight(flightResponse.data);
        } catch (error: any) {
          console.error("Error fetching flight details:", error);
          setError("Failed to fetch flight details");
          if (error.response && error.response.status === 403) {
            setError("You do not have permission to do this action");
          }
        }
      }
    };

    if (booking) {
      fetchMealsAndInsurance();
    }
  }, [booking, token]);


  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-600">
          Booking Success
        </h1>
        <div className="mt-8 border rounded-md p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-2 text-blue-600">
            Booking Details
          </h2>
          <p className="mb-2">
            <span className="font-bold">Flight Number:</span>{" "}
            {flight?.flight_number}
          </p>
          <p className="mb-2">
            <span className="font-bold">Booking Date:</span>{" "}
            {booking?.booking_date
              ? new Date(booking.booking_date).toLocaleString()
              : "No booking date"}
          </p>
          <p className="mb-2">
            <span className="font-bold">Meals Chosen:</span>{" "}
            {meals.length > 0
              ? meals.map((meal) => meal.name).join(", ")
              : "No meal is chosen"}
          </p>
          <p className="mb-2">
            <span className="font-bold">Insurance Opted:</span>{" "}
            {insurance ? insurance.name : "None"}
          </p>
          <p className="mb-2">
            <span className="font-bold">Payment:</span>{" "}
            {booking?.is_paid ? "Paid" : "Not Paid"}
          </p>
          <p className="mb-2">
            <span className="font-bold">Trip Type:</span> {booking?.trip_type}
          </p>
        </div>
        {passengers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2 text-blue-600">
              Passenger Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {passengers.map((passenger: any, index: number) => (
                    <tr key={passenger.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {passenger.first_name} {passenger.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {passenger.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {passenger.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {passenger.gender}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
