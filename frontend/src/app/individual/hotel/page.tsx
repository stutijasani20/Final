"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapWithRoute from "@/app/map/page";
import { useRouter } from "next/navigation";

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
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("Mumbai Airport");
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${searchQuery}.json?key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
        );

        const location = response.results[0];
        const latitude = location.position.lat;
        const longitude = location.position.lon;

        const { data: tomTomResponse } = await axios.get(
          `https://api.tomtom.com/search/2/search/hotel.json?lat=${latitude}&lon=${longitude}&radius=5000&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb&limit=10&ofs=${
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
        }));
        setHotels(hotelData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchQuery]);
  console.log(hotels);

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
  };
  console.log(hotels);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hotel Data</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter place name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white hover:bg-red-50 shadow-md rounded-lg p-4"
              >
                <h2 className="text-xl text-sky-900 font-semibold mb-2">
                  {hotel.name}
                </h2>
                {hotel.phone && (
                  <p className="mb-2 text-emerald-800">Phone: {hotel.phone}</p>
                )}

                <p className="mb-2 text-pink-400">
                  Address: {hotel.address.streetNumber}{" "}
                  {hotel.address.streetName}, {hotel.address.municipality},{" "}
                  {hotel.address.postalCode}, {hotel.address.country}
                </p>
               
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber + 1)}
                className={`px-4 py-2 ${
                  pageNumber + 1 === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } rounded-md mr-2`}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyComponent;
