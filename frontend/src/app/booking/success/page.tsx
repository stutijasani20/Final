// "use client";
// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import axios from "axios";

// interface Passenger {
//   id: number;
//   first_name: string;
//   last_name: string;
//   age: number;
//   phone_number: string;
//   gender: string;
// }

// interface Booking {
//   id: number;
//   flight: number;
//   booking_date: string;
//   meals: string[];
//   insurance: string | null;
//   is_paid: boolean;
//   trip_type: string;
//   passengers: number[];
// }

// const Success: React.FC = () => {
//   const pathname = usePathname();
//   const params = new URLSearchParams(location.search);

//   const flightsParam = params.get("bookingId");
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const [booking, setBooking] = useState<Booking | null>(null);
//   const [passengers, setPassengers] = useState<Passenger[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchBookingData = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/bookings/${flightsParam}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setBooking(response.data);
//       } catch (error) {
//         console.error("Error fetching booking data:", error);
//         setError("Failed to fetch booking data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (flightsParam) {
//       fetchBookingData();
//     }
//   }, [flightsParam, token]);

//   useEffect(() => {
//     const fetchPassengerDetails = async () => {
//       if (booking?.passengers && booking.passengers.length > 0) {
//         try {
//           const passengerDetails = await Promise.all(
//             booking.passengers.map((passengerId) =>
//               axios.get(`http://127.0.0.1:8000/passengers/${passengerId}/`, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               })
//             )
//           );
//           setPassengers(passengerDetails.map((response) => response.data));
//         } catch (error) {
//           console.error("Error fetching passenger details:", error);
//           setError("Failed to fetch passenger details");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     if (booking) {
//       fetchPassengerDetails();
//     }
//   }, [booking, token]);

//   if (loading) {
//     return (
//       <div className="container mx-auto py-8 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto py-8 text-center text-red-600">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="max-w-lg mx-auto bg-white rounded-md shadow-md p-8">
//         <h1 className="text-3xl font-bold mb-4">Booking Success</h1>
//         <div className="mt-8 border rounded-md p-4">
//           <h2 className="text-xl font-bold mb-2">Booking Details</h2>
//           <p className="mb-2">
//             <span className="font-bold">Flight ID:</span> {booking?.flight}
//           </p>
//           <p className="mb-2">
//             <span className="font-bold">Booking Date:</span>{" "}
//             {new Date(booking?.booking_date).toLocaleString()}
//           </p>
//           <p className="mb-2">
//             <span className="font-bold">Meals Chosen:</span>{" "}
//             {booking?.meals.join(", ")}
//           </p>
//           <p className="mb-2">
//             <span className="font-bold">Insurance Opted:</span>{" "}
//             {booking?.insurance || "None"}
//           </p>
//           <p className="mb-2">
//             <span className="font-bold">Payment:</span>{" "}
//             {booking?.is_paid ? "Paid" : "Not Paid"}
//           </p>
//           <p className="mb-2">
//             <span className="font-bold">Trip Type:</span> {booking?.trip_type}
//           </p>
//         </div>
//         {passengers.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-xl font-bold mb-2">Passenger Details</h2>
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Age
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Phone Number
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Gender
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {passengers.map((passenger, index) => (
//                   <tr key={passenger.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {passenger.first_name} {passenger.last_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {passenger.age}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {passenger.phone_number}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {passenger.gender}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Success;
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const Success: React.FC = () => {
  const pathname = usePathname();
  const params = new URLSearchParams(location.search);

  const flightsParam = params.get("bookingId");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
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
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setError("Failed to fetch booking data");
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
        } catch (error) {
          console.error("Error fetching passenger details:", error);
          setError("Failed to fetch passenger details");
        } finally {
          setLoading(false);
        }
      }
    };

    if (booking) {
      fetchPassengerDetails();
    }
  }, [booking, token]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white rounded-md shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4">Booking Success</h1>
        <div className="mt-8 border rounded-md p-4">
          <h2 className="text-xl font-bold mb-2">Booking Details</h2>
          <p className="mb-2">
            <span className="font-bold">Flight ID:</span> {booking?.flight}
          </p>
          <p className="mb-2">
            <span className="font-bold">Booking Date:</span>{" "}
            {new Date(booking?.booking_date).toLocaleString()}
          </p>
          <p className="mb-2">
            <span className="font-bold">Meals Chosen:</span>{" "}
            {booking?.meals.join(", ")}
          </p>
          <p className="mb-2">
            <span className="font-bold">Insurance Opted:</span>{" "}
            {booking?.insurance || "None"}
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
            <h2 className="text-xl font-bold mb-2">Passenger Details</h2>
            <table className="min-w-full divide-y divide-gray-200">
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
                {passengers.map((passenger) => (
                  <tr key={passenger.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {passenger.id}
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
        )}
      </div>
    </div>
  );
};

export default Success;
