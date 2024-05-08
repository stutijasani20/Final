
"use client";
import React, { useState, useEffect } from 'react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Stripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe('pk_test_51P0JlFSDdJ1Ey7xJCp7EDJgZK7Evq093Br4eKGUB66BtazQZfznCSNVHLih97GdVbAHGjzy6KVFdqkJ3DgC4bQeZ00SJ1pNNBf');

const BookingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const flightId = searchParams.get('flight');
  const bookingId = searchParams.get('booking');
  const [flightDetails, setFlightDetails] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightResponse, userResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/flights/${flightId}`),
          axios.get(`http://127.0.0.1:8000/users/${bookingId}`)
        ]);
        setFlightDetails(flightResponse.data);
        setUserDetails(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [flightId, bookingId]);

  return (
    <Elements stripe={stripePromise}>
      {flightDetails && userDetails && (
        <BookingForm flightDetails={flightDetails} userDetails={userDetails} />
      )}
    </Elements>
  );
};

const BookingForm: React.FC<{ flightDetails: any; userDetails: any }> = ({ flightDetails, userDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-payment-intent/', {
        amount: Math.floor(flightDetails.total_price_including_gst) // Amount in cents
      });
    
      const { data } = response;
      const clientSecret = data.client_secret;
    
      if (!clientSecret) {
        throw new Error("Invalid response from server: clientSecret not found");
      }
    
      const cardElement = elements.getElement(CardElement);
    
      if (!cardElement) {
        throw new Error("Card Element not found");
      }
    
      // Confirm the payment intent with the client secret and card element
      const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userDetails.email,
          },
        },
      });
    
      if (paymentError) {
        throw new Error(paymentError.message ?? "Failed to confirm payment intent");
      }
    
      // Payment successful, proceed to booking
      const bookingResponse = await axios.post('http://127.0.0.1:8000/bookings/', {
        flight: flightDetails.id,
        passenger: userDetails.id,
        is_paid: true, // Assuming payment is made
      });
    
      console.log('Booking successful:', bookingResponse.data);
      router.push('/booking/success')
    
      // Redirect to confirmation page or show success message
    
    } catch (error: any) {
      console.error('Error handling payment:', error);
      setError(error.message ?? "Failed to handle payment");
    }
    
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 mt-5">Complete Your Booking</h1>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Flight Details:</h2>
        <p>From: {flightDetails.departure_airport_name}</p>
        <p>To: {flightDetails.arrival_airport_name}</p>
        <p>Price (Including GST): ₹{flightDetails.total_price_including_gst.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">User Details:</h2>
        <p>Email: {userDetails.email}</p>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <label className="block mb-4">
          Enter your card details:
          <CardElement options={{style: {base: {fontSize: '16px'}}}} className="mt-2 p-2 border rounded-md" />
        </label>
        <button type="submit" disabled={!stripe} className="w-full mb-5 py-3 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50">
          Pay Now
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default BookingPage;
