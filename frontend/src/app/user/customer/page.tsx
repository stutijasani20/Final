// // BookingList.js
// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BookingList = () => {
//   const [bookings, setBookings] = useState([]);
//   const [flightDetails, setFlightDetails] = useState([]);
//   const customerId = localStorage.getItem('userId'); // Retrieve customer ID from localStorage
//   const [error, setError] = useState(''); // State for error message

//   // Function to fetch bookings for a specific customer
//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/booking?customer=${customerId}`);
//       setBookings(response.data);
//       // After setting bookings, fetch flight details
//       if (response.data.length > 0) {
//         fetchFlight(response.data[0].flight);
//     }
//     } catch (error) {
//       console.error('Error fetching bookings:', error.message);
//     }
//   };

//   // Function to fetch flight details
//   const fetchFlight = async (flightId) => {
//     console.log('Fetching flight details for flight ID:', flights)
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/flights/${flightId}`);
//       setFlightDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching flight:', error.message);
//     }
//   };

//   // Fetch bookings when the component mounts or when the customer ID changes
//   useEffect(() => {
//     if (customerId) {
//       fetchBookings();
//     }
//   }, [customerId, fetchFlight]); // Include customerId in dependency array

//   return (
//     <div>
//       <h2>Booking Details</h2>
//       {bookings.map((booking, index) => (
//         <div key={index}>
//           <p>Booking ID: {index + 1}</p>
//           <p>Flight ID: {booking.flight}</p>
//           <h3>Flight Details</h3>
//           <p>Flight Number: {flightDetails[index]?.number}</p>
//           <p>Departure: {flightDetails[index]?.departure_airport_name}</p>
//           <p>Destination: {flightDetails[index]?.destination}</p>
//           {/* Add more flight details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookingList;
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';



