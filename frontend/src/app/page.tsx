"use client";
import React, { useState } from "react";

const SearchFlights = () => {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to search for flights with provided details
    console.log(
      "Searching for flights...",
      departure,
      destination,
      departureDate
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Departure"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <input
        type="date"
        placeholder="Departure Date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
      />
      <button type="submit">Search Flights</button>
    </form>
  );
};

export default SearchFlights;
