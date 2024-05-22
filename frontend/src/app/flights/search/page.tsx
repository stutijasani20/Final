"use client";
import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../../styles/flifgtsearch.module.scss";
import {
  Card,
  DatePicker,
  Form,
  InputNumber,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Airport {
  id: number;
  name: string;
  city: string;
}

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
}

const FlightSearchPage: React.FC = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [passenger, setPassengers] = useState<number>(1);
  const [departureDate, setDepartureDate] = useState<string>("");
  const [flightClass, setFlightClass] = useState<string>("Economy");
  const [tripType, setTripType] = useState<string>("oneWay");
  const [returnDate, setReturnDate] = useState<string>("");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [showTravellerPopup, setShowTravellerPopup] = useState(false);
const [originAirports, setOriginAirports] = useState<Airport[]>([]);
const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);

  const [error, setError] = useState<string>("");
  const router = useRouter();
  const query = useSearchParams();

  useEffect(() => {
    // Fetch airports data when component mounts if no origin city in URL
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      const response = await axios.get<Airport[]>(
        "http://127.0.0.1:8000/airports"
      );
      setAirports(response.data);
    } catch (error) {
      setError("Error fetching airports. Please try again.");
      console.error("Error fetching airports:", error);
    }
  };

  const handleTravellerChange =
    (type: any, operation: any) => (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTravellers((prevState: any) => {
        let newValue =
          operation === "increase" ? prevState[type] + 1 : prevState[type] - 1;
        newValue = newValue < 0 ? 0 : newValue; // Ensure the value is not negative

        if (
          type === "infants" &&
          operation === "increase" &&
          newValue > prevState.adults
        ) {
          newValue = prevState.adults;
        }

        return { ...prevState, [type]: newValue };
      });
    };

  const handleSearch = async () => {
    try {
      const response = await axios.get<Flight[]>(
        "http://127.0.0.1:8000/flights",
        {
          params: {
            departure_airport_name: origin,
            arrival_airport_name: destination,
            passenger,
            travel_date: departureDate,
            class_name: flightClass,
          },
        }
      );

      setFlights(response.data);
      router.push(
        `/flights/availability?flights=${encodeURIComponent(
          JSON.stringify(response.data)
        )}`
      );
      setError("");
    } catch (error) {
      setError("Error fetching flights. Please try again.");
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    const city = query.get("city");

    if (city) {
      // If the city is provided in the search query, find the corresponding airport
      const matchingAirport = airports.find(
        (airport) => airport.city.toLowerCase() === city.toLowerCase()
      );

      if (matchingAirport) {
        setDestination(matchingAirport.name);
      }
    }
  }, [query, airports]);

  const handleOriginChange = (value: string) => {
    // Filter airports based on user's input
    const matchingAirports: any = airports.filter(
      (airport) => airport.city.toLowerCase().includes(value.toLowerCase()) ||
                   airport.name.toLowerCase().includes(value.toLowerCase())
    );
  
    
    setOriginAirports(matchingAirports);
  
    
    setOrigin(value);
  };
  const handleDestinationChange = (value: string) => {
    // Filter airports based on user's input
    const matchingAirports: any = airports.filter(
      (airport) => airport.city.toLowerCase().includes(value.toLowerCase()) ||
                   airport.name.toLowerCase().includes(value.toLowerCase())
    );
  
    
    setDestinationAirports(matchingAirports);
  
    
    setDestination(value);
  };
  return (
    <>
      <div className={styles.body}>
        <div className="flex items-center justify-center">
          <div className="w-full md:w-4/5 lg:w-3/5">
            <h1 className="text-3xl font-bold mb-4 mt-5 text-center">
              Flight Search
            </h1>
            <form className="rounded px-8  pb-8 mb-4">
              <div className="container mx-auto py-8 flex flex-col items-center">
                <span className="block text-gray-700 text-sm font-bold mb-2"></span>
                <div>
                  <button
                    className={`mr-4 p-2 ${
                      tripType === "oneWay"
                        ? "bg-blue-500 text-white"
                        : "bg-white-500 text-black"
                    } transition-all duration-200 hover:bg-blue-500 hover:text-black hover:scale-110`}
                    onClick={(e) => {
                      e.preventDefault();
                      setTripType("oneWay");
                    }}
                  >
                    One Way
                  </button>

                  <button
                    className={`mr-4 p-2 ${
                      tripType === "roundTrip"
                        ? "bg-blue-500 text-white"
                        : "bg-white-500 text-black"
                    } transition-all duration-200 hover:bg-blue-500 hover:text-black hover:scale-110`}
                    onClick={(e) => {
                      e.preventDefault();
                      setTripType("roundTrip");
                    }}
                  >
                    Round Trip
                  </button>
                </div>
              </div>{" "}
              <br /> <br />
              <div className="flex justify-between mb-4">
                             <div className="w-1/2 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="origin"
                  >
                    Origin City/Airport
                  </label>
                  <input
                    className="dropdown-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="origin"
                    list="originAirportsList"
                    value={origin}
                    onChange={(e) => handleOriginChange(e.target.value)}
                    placeholder="Enter Origin City or Airport"
                  />
                  <datalist id="originAirportsList">
                    {originAirports.map((airport) => (
                      <option key={airport.id} value={airport.name}>
                        {airport.city} ({airport.name})
                      </option>
                    ))}
                  </datalist>
                </div>
                <div className="swap-container flex flex-col justify-center mx-2">
                  <button type="button">
                    <Image
                      src="/swap.png"
                      width={50}
                      height={50}
                      alt="Swap values"
                    />
                  </button>
                </div>

                <div className="w-1/2 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="destination"
                  >
                    Destination City/Airport
                  </label>
                  <input
                    className="dropdown-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="destination"
                    list="destinationAirportsList"
                    value={origin}
                    onChange={(e) => handleDestinationChange(e.target.value)}
                    placeholder="Enter Destination City or Airport"
                  />
                  <datalist id="destinationAirportsList">
                    {destinationAirports.map((airport) => (
                      <option key={airport.id} value={airport.name}>
                        {airport.city} ({airport.name})
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div
                className="mb-4"
                onClick={() => setShowTravellerPopup(true)}
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                Travellers:
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ paddingRight: "10px" }}>
                    Adults:
                    <input
                      type="text"
                      value={travellers.adults}
                      readOnly
                      className={styles.readonlyInput}
                    />
                  </div>
                  <div style={{ paddingRight: "0px" }}>
                    Children:
                    <input
                      type="text"
                      value={travellers.children}
                      readOnly
                      className={styles.readonlyInput}
                    />
                  </div>
                  <div>
                    Infants:
                    <input
                      type="text"
                      value={travellers.infants}
                      readOnly
                      className={styles.readonlyInput}
                    />
                  </div>
                </div>
              </div>
              {showTravellerPopup && (
                <Modal
                  isOpen={showTravellerPopup}
                  onRequestClose={() => setShowTravellerPopup(false)}
                  className={styles.modalContent}
                  overlayClassName={styles.modelOverlay}
                >
                  <div>
                    <button
                      className={styles.closeButton}
                      onClick={() => setShowTravellerPopup(false)}
                    >
                      <FontAwesomeIcon icon={faTimes} color="red" />
                    </button>

                    <h2 className={styles.modalTitle}>
                      Please Select The Seats:
                    </h2>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Adults:</span>
                        <div>
                          <button
                            style={{
                              margin: "0 10px",
                              transition: "background-color 0.3s",
                            }}
                            onClick={handleTravellerChange(
                              "adults",
                              "increase"
                            )}
                            onMouseOver={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "#ddd")
                            }
                            onMouseOut={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "")
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <span
                            style={{ fontWeight: "bold", margin: "0 10px" }}
                          >
                            {travellers.adults}
                          </span>
                          <button
                            style={{
                              margin: "0 10px",
                              transition: "background-color 0.3s",
                              cursor:
                                travellers.adults === 1
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            onClick={
                              travellers.adults === 1
                                ? null
                                : handleTravellerChange("adults", "decrease")
                            }
                            onMouseOver={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "#ddd")
                            }
                            onMouseOut={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "")
                            }
                            disabled={travellers.adults === 1}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Children:</span>
                        <div>
                          <button
                            style={{
                              margin: "0 10px",
                              transition: "background-color 0.3s",
                              cursor:
                                travellers.children === 0
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            onClick={handleTravellerChange(
                              "children",
                              "increase"
                            )}
                            onMouseOver={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "#ddd")
                            }
                            onMouseOut={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "")
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <span
                            style={{ fontWeight: "bold", margin: "0 10px" }}
                          >
                            {travellers.children}
                          </span>
                          <button
                            style={{
                              margin: "0 10px",
                              transition: "background-color 0.3s",
                              cursor:
                                travellers.children === 0
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            onClick={
                              travellers.children === 0
                                ? null
                                : handleTravellerChange("children", "decrease")
                            }
                            onMouseOver={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "#ddd")
                            }
                            onMouseOut={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "")
                            }
                            disabled={travellers.children === 0}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          marginTop: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>Infants:</span>
                        <div>
                          <button
                            style={{
                              margin: "0 10px",
                              transition: "background-color 0.3s",
                              cursor:
                                travellers.infants === 0
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            onClick={handleTravellerChange(
                              "infants",
                              "increase"
                            )}
                            onMouseOver={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "#ddd")
                            }
                            onMouseOut={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "")
                            }
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                          <span
                            style={{ fontWeight: "bold", margin: "0 10px" }}
                          >
                            {travellers.infants}
                          </span>
                          <button
                            style={{
                              margin: "0 10px",
                              transition: "background-color 0.3s",
                              cursor:
                                travellers.infants === 0
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            onClick={
                              travellers.infants === 0
                                ? null
                                : handleTravellerChange("infants", "decrease")
                            }
                            onMouseOver={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "#ddd")
                            }
                            onMouseOut={(e) =>
                              ((e.target as HTMLElement).style.backgroundColor =
                                "")
                            }
                            disabled={travellers.infants === 0}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="departureDate"
                >
                  Departure Date
                </label>
                <input
                  className="date-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="departureDate"
                  type="date"
                  value={departureDate}
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                  }}
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                />
              </div>
              {tripType === "roundTrip" && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="returnDate"
                  >
                    Return Date
                  </label>
                  <input
                    type="date"
                    id="returnDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="flightClass"
                >
                  Class
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="flightClass"
                  value={flightClass}
                  onChange={(e) => setFlightClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 hover:text-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSearch}
              >
                Search Flights
              </button>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightSearchPage;