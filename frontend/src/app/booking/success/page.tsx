"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';

interface Booking {
  id: number;
  flight: number;
  passenger: number;
  booking_date: string;
  meals: string;
  insurance: string;
  is_paid: string;
}

interface Passenger {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  phone_number: string;
  gender: string;
}

const Success: React.FC = () => {
  const pathname = usePathname();
  const params = new URLSearchParams(location.search);

  const flightsParam = params.get('bookingId');
  const passengerParam = params.get('passengerId');
  const userId = localStorage.getItem('userId');

  const [booking, setBooking] = useState<Booking | null>(null);
  const [passengers, setPassengers] = useState<Passenger[] >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/bookings/${flightsParam}`);
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setError('Failed to fetch booking data');
      } finally {
        setLoading(false);
      }
    };

    if (flightsParam) {
      fetchBookingData();
    }
  }, [flightsParam]);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/passengers/?user=${userId}`);
        setPassengers(response.data);
      } catch (error) {
        console.error('Error fetching passenger data:', error);
        setError('Failed to fetch passenger data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPassengerData();
    }
  }, [userId]);

  console.log(passengers)
  return (
    <div className="container mx-auto py-8">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold mb-4">Booking Success</h1>
          <p>Thank you for booking with us!</p>
          {booking && (
            <div className="mt-8 border rounded-md p-4">
              <h2 className="text-xl font-bold mb-2">Booking Details</h2>
              <p>Flight ID: {booking.flight}</p>
              <p>Booking by: {booking.passenger}</p>
              <p>Booking Date: {new Date(booking.booking_date).toLocaleString()}</p>
              <p>Meals Choosed: {booking.meals}</p>
              <p>Insurance Opted: {booking.insurance}</p>
              <p>Payment: {booking.is_paid}</p>
            </div>
          )}
          {passengers && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Passenger Details</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {passengers.results.map((passenger) =>{
                    
                    return  (
                    <tr key={passenger.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.first_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.last_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.phone_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{passenger.gender}</td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Success;
