"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import Razorpay from "razorpay";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useRazorpay from "react-razorpay";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

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

interface Passenger {
  id: number;
  first_name: string;
  last_name:  string;
  age: number;
  gender: string;
  passenger_type: string;
  phone_number: number;
}


const BookingPage: React.FC = () => {
  const [passengerData, setPassengerData] = useState<Passenger[]>([]);
  const router = useRouter();
  const [Razorpay] = useRazorpay();
  const pathname = usePathname();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [mealOptions, setMealOptions] = useState<Meal[]>([]);
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>(
    []
  );
  const [selectedMeal, setSelectedMeal] = useState<number | null>(null);

  const [selectedInsurance, setSelectedInsurance] = useState<number | null>(
    null
  );

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");

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
    user: localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId") as string)
      : 0,
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("");

  const [passengerList, setPassengerList] = useState<
    {
      first_name: string;
      last_name: string;
      age: number;
      phone_number: string;
      gender: string;
      passenger_type: string;
      user: number;
    }[]
  >([]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddPassenger = async () => {
    try {
      setPassengerDetails({
        first_name: "",
        last_name: "",
        age: 18,
        phone_number: "",
        gender: "",
        passenger_type: "adult",
        user: parseInt(localStorage.getItem("userId") as string),
      });

      if (passengerDetails.first_name === "") {
        setFirstNameError("First name is required");
      }
      if (passengerDetails.last_name === "") {
        setLastNameError("Last name is required");
      }
      if (passengerDetails.age === 0) {
        setAgeError("Age is required");
      }
      if (passengerDetails.phone_number === "") {
        setPhoneNumberError("Phone number is required");
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/passengers/",
        passengerDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token") || "",
          },
        }
      );

      if (response.status === 201) {
        const passengerId = response.data.id;

        setPassengerList([...passengerList, passengerId]);

        setPassengerData([...passengerData, response.data]);

        toast.success("Passenger added successfully!"); 

        setShowPopup(false);
      } else {
        console.error("Error adding passenger:", response.statusText);
        toast.error("Failed to add passenger. Please try again."); }
    } catch (error) {
      console.error("Error saving passenger details:", error);

    }
  };

  const handleConfirmBooking = async () => {
    if (passengerData.length === 0) {
      return;
    }

    try {
      
      const bookingPayload = {
        flight: flight?.id,
        meals: [selectedMeal],
        insurance: selectedInsurance,
        passenger: localStorage.getItem("userId")
          ? parseInt(localStorage.getItem("userId") as string)
          : 0,
        passengers: passengerList,
      };

      

      const bookingResponse = await axios.post(
        "http://127.0.0.1:8000/bookings/",
        bookingPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token") || "",
          },
        }
      );
      console.log("Booking confirmed successfully:", bookingResponse.data);

      if (bookingResponse.status === 201) {
        console.log("Booking confirmed successfully:", bookingResponse.data);

      
        const paymentInitiationResponse = await axios.post(
          "http://127.0.0.1:8000/payment/",
          {
            bookingId: bookingResponse.data.id, 
          }
        );
        if (paymentInitiationResponse.status === 200) {
          console.log(
            "Payment initiation successful:",
            paymentInitiationResponse.data
          );
          if (paymentInitiationResponse.status === 200) {
          
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            document.body.appendChild(script);


            script.async = true;
            script.onload = () => {
              
              const { id, amount } = paymentInitiationResponse.data;

              const options: any = {
                amount: amount,
                currency: "INR",
                name: "Elegance Air",
                description: "Booking Payment",
                order_id: id,

                handler: async function (response: any) {
                     
                  try {
                    const paymentData = {
                      bookingId: bookingResponse.data.id,
                      paymentId: response.razorpay_payment_id,
                      amount: response.razorpay_amount,
                      currency: response.razorpay_currency,
                      status: response.razorpay_status,
                    };
                    const paymentResponse = await axios.post(
                      "http://127.0.0.1:8000/payment/",
                      paymentData
                    );

                    const token = localStorage.getItem("token");

                   
                    const updateBookingResponse = await axios.put(
                      `http://127.0.0.1:8000/bookings/${bookingResponse.data.id}/`,
                      {
                        flight: flight?.id,
                        meal_id: selectedMeal,
                        insurance_id: selectedInsurance,
                        passenger: localStorage.getItem("userId")
                          ? parseInt(localStorage.getItem("userId") as string)
                          : 0,
                        is_paid: true,
                        passengers: passengerList,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    const queryParams = new URLSearchParams();

                    queryParams.append(
                      "bookingId",
                      bookingResponse.data.id.toString()
                    );
                    queryParams.append(
                      "passengerId",
                      passengerDetails.user.toString()
                    );
                    toast.success("Payment successful!"); 
                    router.push(`/booking/success?${queryParams.toString()}`);
                  } catch (error) {
                    console.error(
                      "Error sending payment data to backend:",
                      error
                    );
                    toast.error("Failed to confirm booking. Please try again."); 
                   
                  }
                },
                prefill: {
                  name:
                    passengerDetails.first_name +
                    " " +
                    passengerDetails.last_name,
                  email: localStorage.getItem("email") as string,
                  contact: "1234567890",
                },
              };
              const razorpay = new Razorpay(options);

              razorpay.open();
            };

         
          }
        } else {
          console.error(
            "Error confirming booking:",
            bookingResponse.statusText
          );
         
        }
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      
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
      const response = await axios.get("http://127.0.0.1:8000/foods/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
      });
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
      const response = await axios.get(
        "http://127.0.0.1:8000/insurance-policies/",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token") || "",
          },
        }
      );
      if (response.status === 200) {
        const insurancePoliciesData = response.data;
        setInsurancePolicies(insurancePoliciesData);
      } else {
        console.error(
          "Error fetching insurance policies:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching insurance policies:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-3xl p-8 relative">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Booking Details
        </h1>
        {error ? (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        ) : flight ? (
          <div className="border border-gray-200 p-6 rounded-lg shadow-inner bg-gray-50">
            <div className="mb-6">
              <p className="text-lg font-bold mb-2">
                Flight Number:{" "}
                <span className="font-bold">{flight.flight_number}</span>
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Departure Airport:</span>{" "}
                {flight.departure_airport_name}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Arrival Airport:</span>{" "}
                {flight.arrival_airport_name}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Departure Time:</span>{" "}
                {new Date(flight.departure_time).toLocaleString()}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Price:</span>{" "}
                <span>
                  <span className="font-bold">
                    {flight.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </span>
              </p>

              <p className="text-sm mb-2">
                <span className="font-bold">Available Seats:</span>{" "}
                {flight.available_seats}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Travel Date:</span>
                {new Date(flight.travel_date).toLocaleDateString("en-GB")}
              </p>
              <p className="text-sm mb-2">
                <span className="font-bold">Class:</span> {flight.classes_name}
              </p>
            </div>
            <div className="mb-4">
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="meal-label">Select Meal</InputLabel>
                <Select
                  labelId="meal-label"
                  id="meal"
                  value={selectedMeal !== null ? selectedMeal : ""}
                  onChange={(e) => setSelectedMeal(Number(e.target.value))}
                  label="Select Meal"
                >
                  {mealOptions.map((meal) => (
                    <MenuItem key={meal.id} value={meal.id}>
                      {meal.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mb-6">
              <FormControl variant="outlined" className="mb-6 w-full">
                <InputLabel id="insurance-label">Select Insurance:</InputLabel>
                <Select
                  labelId="insurance-label"
                  id="insurance"
                  value={selectedInsurance ?? ""}
                  onChange={(e: any) =>
                    setSelectedInsurance(parseInt(e.target.value))
                  }
                  label="Select Insurance"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {insurancePolicies.map((policy) => (
                    <MenuItem key={policy.id} value={policy.id}>
                      {policy.name}, Rs{" "}
                      {policy.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <button
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded mb-6 transition duration-300 justify-center"
              onClick={handleOpenPopup}
            >
              Add Passenger Details
            </button>

            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                  <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    Passenger Details
                  </h2>
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={handleClosePopup}
                  >
                    <CancelPresentationIcon sx={{ color: "red" }} />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name:
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        className="mt-1 p-2 block w-full border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={passengerDetails.first_name}
                        onChange={(e) => {
                          setPassengerDetails({
                            ...passengerDetails,
                            first_name: e.target.value,
                          });
                        }}
                      />
                      {firstNameError && (
                        <div className="text-red-500">{firstNameError}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name:
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        className="mt-1 p-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={passengerDetails.last_name}
                        onChange={(e) =>
                          setPassengerDetails({
                            ...passengerDetails,
                            last_name: e.target.value,
                          })
                        }
                      />
                      {lastNameError && (
                        <div className="text-red-500">{lastNameError}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age:
                      </label>
                      <input
                        type="number"
                        id="age"
                        required
                        className="mt-1 p-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={passengerDetails.age}
                        onChange={(e) =>
                          setPassengerDetails({
                            ...passengerDetails,
                            age: parseInt(e.target.value),
                          })
                        }
                      />
                      {ageError && (
                        <div className="text-red-500">{ageError}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number :
                      </label>
                      <PhoneInput
                        country={"in"} 
                        inputProps={{
                          id: "phoneNumber",
                          name: "phoneNumber",
                          required: true,
                          className:
                            "mt-1 p-2 block px-4 w-full md:w-100 border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                          
                        }}
                        value={passengerDetails.phone_number}
                        onChange={(phone) =>
                          setPassengerDetails({
                            ...passengerDetails,
                            phone_number: phone,
                          })
                        }
                      />
                      {phoneNumberError && (
                        <div className="text-red-500">{phoneNumberError}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender:
                      </label>
                      <select
                        id="gender"
                        required
                        className="mt-1 p-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={passengerDetails.gender}
                        onChange={(e) =>
                          setPassengerDetails({
                            ...passengerDetails,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="passengerType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Passenger Type:
                      </label>
                      <select
                        id="passengerType"
                        name="passenger_type"
                        className="mt-1 p-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={passengerDetails.passenger_type}
                        onChange={(e) =>
                          setPassengerDetails({
                            ...passengerDetails,
                            passenger_type: e.target.value,
                          })
                        }
                      >
                        <option value="adult">Adult</option>
                        <option value="child">Child</option>
                        <option value="infant">Infant</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
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

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Passenger List</h2>
              {passengerData.map((passenger: any, index: number) => (
                <div key={index} className="mb-2 border-b border-gray-200 pb-2">
                  <p>{`${passenger.first_name} ${passenger.last_name}, Age: ${passenger.age}, Gender: ${passenger.gender}, Passenger Type: ${passenger.passenger_type}`}</p>
                </div>
              ))}
            </div>

            <button
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded mt-6 cursor-pointer transition duration-300  hover:from-blue-700 hover:to-blue-900`}
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
          </div>
        ) : (
          <div className="text-gray-500 text-center">Loading...</div>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />{" "}
      </div>
    </div>
  );
};

export default BookingPage;
