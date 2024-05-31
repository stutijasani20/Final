"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {  FaPhone, FaMapMarkerAlt, FaMap } from "react-icons/fa";
interface Hotel {
  position: {
    lat: number;
    lon: number;
  };
  id: string;
  name: string;
  phone?: string;
  categories: string[];
  address: {
    streetNumber?: string;
    streetName?: string;
    municipality?: string;
    country?: string;
    postalCode?: string;
  };
}

const MyComponent: React.FC = () => {
  const params = new URLSearchParams(location.search);
  const flightsParam = params.get("airport");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");




  const router = useRouter();

  useEffect(() => {
    setSearchQuery(flightsParam || "");
  }, [flightsParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${flightsParam}.json?key=${process.env.NEXT_PUBLIC_TOMTOM_KEY}`
        );

        const location = response.results[0];
        const latitude = location.position.lat;
        const longitude = location.position.lon;

        const { data: tomTomResponse } = await axios.get(
          `https://api.tomtom.com/search/2/search/hotel.json?lat=${latitude}&lon=${longitude}&radius=5000&key=${process.env.NEXT_PUBLIC_TOMTOM_KEY}&limit=10&ofs=${
            (page - 1) * 10
          }`
        );

        const totalResults = tomTomResponse.summary.totalResults;
        setTotalPages(Math.ceil(totalResults / 10));

        const hotelData: Hotel[] = tomTomResponse.results.map((hotel: any) => ({
          id: hotel.id,
          name: hotel.poi.name,
          categories: hotel.poi.categories,
          address: hotel.address,
          position: {
            lat: hotel.position.lat,
            lon: hotel.position.lon,
          },
        }));
        setHotels(hotelData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, flightsParam]);

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPage(1);
  };

  const handleViewMap =  (hotel: Hotel) => {
    
    const queryString = `?hotelLat=${hotel.position.lat}&hotelLng=${hotel.position.lon}&airport=${flightsParam}`;
     router.push(`/map${queryString}`);
  };

  return (
    <div className="container mx-auto p-6 bg-customGreyBGColor rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-sky-900 text-center">
        Explore Hotels
      </h1>
      <form
        onSubmit={handleSearch}
        className="mb-4 flex items-center justify-center"
      >
        <input
          type="text"
          placeholder="Enter place name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 p-2 border border-sky-300 rounded-md focus:outline-none shadow-md"
        />
       
      </form>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <Image src="/hotel.gif" alt="loading" width={200} height={200} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className={`bg-white hover:bg-sky-100 shadow-md rounded-lg p-4 transition-transform duration-200 ease-in-out cursor-pointer transform-glow`}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "")}
            >
              <h2 className="text-xl text-sky-800 font-semibold mb-2">
                {hotel.name}
              </h2>
              <hr className="mb-2" />
              {hotel.phone && (
                <p className="mb-2 text-sky-700">
                  <FaPhone className="inline-block" /> {hotel.phone}
                </p>
              )}
              <p className="mb-2 text-sky-600">
                <FaMapMarkerAlt className="inline-block" /> Address:{" "}
                {hotel.address.streetNumber} {hotel.address.streetName},{" "}
                {hotel.address.municipality}, {hotel.address.postalCode},{" "}
                {hotel.address.country}
              </p>
              <button
                onClick={async () =>await  handleViewMap(hotel)}
                className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 focus:outline-none shadow-md mt-auto"
              >
                <FaMap className="inline-block" /> View Map
              </button>
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {Array.from(Array(totalPages).keys()).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber + 1)}
              className={`px-4 py-2 ${
                pageNumber + 1 === page
                  ? "bg-sky-500 text-white"
                  : "bg-sky-200 text-sky-800"
              } rounded-md mr-2 hover:bg-sky-500 hover:text-white focus:outline-none`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
