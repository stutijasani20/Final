"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Razorpay from 'razorpay';

import useRazorpay  from "react-razorpay";
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

interface Meal {
  id: number;
  name: string;
  description: string;
}

interface InsurancePolicy {
  id: number;
  name: string;
  coverage_details: string;
  price: number;
}
const PopupForm: React.FC<{
  passengerDetails: {
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    gender: string;
    passenger_type: string;
  };
  setPassengerDetails: React.Dispatch<
    React.SetStateAction<{
      first_name: string;
      last_name: string;
      age: number;
      phone_number: string;
      gender: string;
      passenger_type: string;
    }>
  >;
  handleClosePopup: () => void;
}> = ({ passengerDetails, setPassengerDetails, handleClosePopup }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPassengerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Passenger Details</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="first_name"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={passengerDetails.first_name}
            onChange={handleChange}
          />
        </div>
        {/* Other input fields for passenger details */}
        {/* Add input fields for last name, age, phone number, and gender */}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleClosePopup}
          >
            Close
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClosePopup} // You can handle form submission here
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const router = useRouter();
  const [Razorpay] = useRazorpay();
  const pathname = usePathname();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [mealOptions, setMealOptions] = useState<Meal[]>([]);
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [passengerDetails, setPassengerDetails] = useState<{
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    gender: string;
    passenger_type: string;
    user: number;
  }>({
    first_name: "",
    last_name: "",
    age: 18,
    phone_number: "",
    gender: "",
    passenger_type: "adult",
    user: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId") as string) : 0,
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const [passengerList, setPassengerList] = useState<{
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    gender: string;
    passenger_type: string;
    user: number;
  }[]>([]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

 
  const handleAddPassenger = async () => {
    
    try {
      // Add the current passenger details to the list
      setPassengerDetails({ 
        first_name: "", 
        last_name: "", 
        age: 18, 
        phone_number: "", 
        gender: "", 
        passenger_type: "adult", 
        user: parseInt(localStorage.getItem("userId") as string),
      });
      console.log("Passenger Details:", passengerDetails);
      const response = await axios.post("http://127.0.0.1:8000/passengers/", passengerDetails);
      if (response.status === 201) {
        setPassengerList([...passengerList, passengerDetails]);
        console.log("Passenger added successfully");
      } else {
        console.error("Error adding passenger:", response.statusText);
      }
    
    } catch (error: any) {
      console.error("Error saving passenger details:", error);
      console.log("Error saving passenger details:", error.response.data)
      // Optionally, handle error scenarios here
    }
  };
  
 

  const handleConfirmBooking = async () => {
    try {
      // Construct payload for booking
      const bookingPayload = {
        flight: flight?.id,
        meal_id: selectedMeal,
        insurance_id: selectedInsurance,
        passenger: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId") as string) : 0,

      };
  
      // Send POST request to booking API
      const bookingResponse = await axios.post("http://127.0.0.1:8000/bookings/", bookingPayload);
  console.log("Booking confirmed successfully:", bookingResponse.data);
      if (bookingResponse.status === 201) {
        console.log("Booking confirmed successfully:", bookingResponse.data);
  
        // Make request to backend to initiate payment
        const paymentInitiationResponse = await axios.post("http://127.0.0.1:8000/payment/", {
          bookingId: bookingResponse.data.id, // Assuming the booking endpoint returns an id
        
        });
  
        if (paymentInitiationResponse.status === 200) {
          console.log("Payment initiation successful:", paymentInitiationResponse.data);
          if (paymentInitiationResponse.status === 200) {
            console.log("Payment initiation successful:", paymentInitiationResponse.data);
    
            // Load Razorpay SDK script dynamically
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            document.body.appendChild(script);
            
            script.async = true;
            script.onload = () => {
              // Use data from payment initiation response to initialize Razorpay payment
              const { id, amount } = paymentInitiationResponse.data;
              console.log("Payment ID:",id);
              console.log("Amount:", amount);


    
  
          // Use data from payment initiation response to initialize Razorpay payment
        
       
          // Initialize Razorpay payment
          const options = {
            key: 'rzp_test_wWsetA6HFaDo8e', // Replace with your actual Razorpay key
            amount: amount, 
            currency: 'INR',
            name: 'Elegance Air',
            description: 'Booking Payment',
            order_id: id,
          
            handler: async function(response: any) {
              console.log('Payment successful!', response);
              // Send payment data to backend
              try {
                const paymentData = {
                  bookingId: bookingResponse.data.id,
                  paymentId: response.razorpay_payment_id,
                  amount: response.razorpay_amount,
                  currency: response.razorpay_currency,
                  status: response.razorpay_status,
                };
                const paymentResponse = await axios.post("http://127.0.0.1:8000/payment/", paymentData);
               
                console.log("Payment data sent to backend:", paymentResponse.data);
  
                // Update is_paid field in booking API
                const updateBookingResponse = await axios.put(`http://127.0.0.1:8000/bookings/${bookingResponse.data.id}/`, {
                  flight: flight?.id,
                  meal_id: selectedMeal,
                  insurance_id: selectedInsurance,
                  passenger: localStorage.getItem("userId") ? parseInt(localStorage.getItem("userId") as string) : 0,
                  is_paid: true,
                });
                console.log("Booking payment status updated:", updateBookingResponse.data);
  
                // Redirect to success page or perform other actions
                const queryParams = new URLSearchParams();

                queryParams.append("bookingId", bookingResponse.data.id.toString());
                queryParams.append("passengerId", passengerDetails.user.toString());
                
                

                
                router.push(`/booking/success?${queryParams.toString()}`);
              } catch (error) {
                console.error("Error sending payment data to backend:", error);
                // Optionally, display an error message to the user
              }
            },
            prefill: {
              name:  passengerDetails.first_name + " " + passengerDetails.last_name,
              email: localStorage.getItem("email") as string,
              contact:  "1234567890",
            },
          };
         const razorpay = new Razorpay(options);
         
          razorpay.open();
        }
      
      
          // Optionally, display an error message to the user
        }
      } else {
        console.error("Error confirming booking:", bookingResponse.statusText);
        // Optionally, display an error message to the user
      }
    } 
    
 
  
    } catch (error) { 
      console.error("Error confirming booking:", error);
      // Optionally, display an error message to the user
    } 
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const flightId = params.get("flightId");
    if (flightId) {
      fetchFlightDetails(flightId);
      fetchMealOptions();
      fetchInsurancePolicies();
    } else {
      setError("No flight ID found.");
    }
  }, []);

  const fetchFlightDetails = async (flightId: string) => {
    try {
      // Make an API call to fetch flight details using flightId
      const response = await fetch(`http://127.0.0.1:8000/flights/${flightId}`);
      if (response.ok) {
        const flightData: Flight = await response.json();
        setFlight(flightData);
        setError("");
      } else {
        setError("Error fetching flight details.");
      }
    } catch (error) {
      setError("Error fetching flight details.");
    }
  };

  const fetchMealOptions = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/foods/");
      if (response.status === 200) {
        const mealOptionsData = response.data;
        setMealOptions(mealOptionsData);
      } else {
        console.error("Error fetching meal options:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching meal options:", error);
    }
  };

  const fetchInsurancePolicies = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/insurance-policies/");
      if (response.status === 200) {
        const insurancePoliciesData = response.data;
        setInsurancePolicies(insurancePoliciesData);
      } else {
        console.error("Error fetching insurance policies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching insurance policies:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 mt-5">Booking Details</h1>
     

      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : flight ? (
        <div className="border border-gray-200 p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold mb-2">
            Flight Number: {flight.flight_number}
          </p>
          <p className="text-sm mb-2">
            Departure Airport: {flight.departure_airport_name}             
          </p>
          <p className="text-sm mb-2">
            Arrival Airport: {flight.arrival_airport_name}
          </p>
          <p className="text-sm mb-2">
            Departure Time: {new Date(flight.departure_time).toLocaleString()}
          </p>
          <p className="text-sm mb-2">
            Price: {flight.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
          </p>
          <p className="text-sm mb-2">
            Available Seats: {flight.available_seats}
          </p>
          <p className="text-sm mb-2">Travel Date: {flight.travel_date}</p>
          <p className="text-sm mb-2">Class: {flight.classes_name}</p>
          <div className="mb-4">
            <label htmlFor="meal" className="block text-sm font-medium text-gray-700">
              Select Meal:
            </label>
            <select
              id="meal"
              name="meal"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedMeal ?? ""}
              onChange={(e) => setSelectedMeal(parseInt(e.target.value))}
            >
               <option value="">None</option>
              {mealOptions.map((meal) => (
                <option key={meal.id} value={meal.id}>
                  {meal.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="insurance" className="block text-sm font-medium text-gray-700">
              Select Insurance:
            </label>
            <select
              id="insurance"
              name="insurance"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedInsurance ?? ""}
              onChange={(e) => setSelectedInsurance(parseInt(e.target.value))}
            >
              <option value="">None</option>
              {insurancePolicies.map((policy) => (
                <option key={policy.id} value={policy.id}>
                  {policy.name}, Rs {policy.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                </option>
              ))}
            </select>
          </div>

          <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenPopup}
      >
        Add Passenger Details
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Passenger Details</h2>
            {/* Form fields for passenger details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={passengerDetails.first_name}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, first_name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={passengerDetails.last_name}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, last_name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={passengerDetails.age}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, age: parseInt(e.target.value) })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number:
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={passengerDetails.phone_number}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, phone_number: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender:
                </label>
                <select
                  id="gender"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={passengerDetails.gender}
                  onChange={(e) => setPassengerDetails({ ...passengerDetails, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
          {/* New dropdown for selecting passenger type */}
          <label htmlFor="passengerType" className="block text-sm font-medium text-gray-700">
            Passenger Type:
          </label>
          <select
            id="passengerType"
            name="passenger_type"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={passengerDetails.passenger_type}
            onChange={handleClosePopup}
          >
            <option value="adult">Adult</option>
            <option value="child">Child</option>
            <option value="infant">Infant</option>
          </select>
        </div>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleClosePopup}
              >
                Close
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddPassenger}
              >
                Add Passenger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display the list of passengers */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Passenger List</h2>
        {passengerList.map((passenger, index) => (
          <div key={index} className="mb-2">
            <p>{`${passenger.first_name} ${passenger.last_name}, Age: ${passenger.age}, Gender: ${passenger.gender}, Passenger Type: ${passenger.passenger_type}`}</p>
          </div>
        ))}
      </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button> 
        </div>
      ) : (
        <div className="text-gray-500 mb-4">Loading...</div>
      )}
    </div>
  );
};

export default BookingPage;