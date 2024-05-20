// "use client";
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {useSearchParams} from "next/navigation";
// import { useRouter } from "next/navigation";

// interface restaurant {
//   position: {
//     lat: number;
//     lon: number;
//   };
//   id: string;
//   name: string;
//   phone?: string;
//   categories: string[];
//   address: {
//     streetNumber?: string;
//     streetName?: string;
//     municipality?: string;
//     country?: string;
//     postalCode?: string;
//   };
// }

// const MyComponent: React.FC = () => {
//   const [restaurants, setrestaurants] = useState<restaurant[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [page, setPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const searchParams = useSearchParams();

//   const flightsParam = searchParams.get("flight");
  

//   useEffect(() => {
//     setSearchQuery(flightsParam || ""); 
//   }, [flightsParam]);
  

//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: response } = await axios.get(
//           `https://api.tomtom.com/search/2/geocode/${flightsParam}.json?key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
//         );

//         const location = response.results[0];
//         const latitude = location.position.lat;
//         const longitude = location.position.lon;

//         const { data: tomTomResponse } = await axios.get(
//           `https://api.tomtom.com/search/2/search/restaurant.json?lat=${latitude}&lon=${longitude}&radius=5000&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb&limit=10&ofs=${
//             (page - 1) * 10
//           }`
//         );

//         const totalResults = tomTomResponse.summary.totalResults;
//         setTotalPages(Math.ceil(totalResults / 10));

//         const restaurantData: restaurant[] = tomTomResponse.results.map(
//           (restaurant: any) => ({
//             id: restaurant.id,
//             name: restaurant.poi.name,
//             categories: restaurant.poi.categories,
//             address: restaurant.address,
//             position: {
//               lat: restaurant.position.lat,
//               lon: restaurant.position.lon,
//             },
//           })
//         );
//         setrestaurants(restaurantData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [page, flightsParam]);

//   const goToPage = (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setPage(1);
//   };

//   const handleViewMap = (restaurant: restaurant) => {
//     // Navigate to MapComponent page with the restaurant location
//     const queryString = `?restaurantLat=${restaurant.position.lat}&restaurantLng=${restaurant.position.lon}&flight=$`;
//     router.push(`/map3${queryString}`);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">restaurant Data</h1>
//       <form onSubmit={handleSearch} className="mb-4">
//         <input
//           type="text"
//           placeholder="Enter place name..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="mr-2 p-2 border border-gray-300 rounded-md"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Search
//         </button>
//       </form>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//             {restaurants.map((restaurant) => (
//               <div
//                 key={restaurant.id}
//                 className="bg-white hover:bg-red-50 shadow-md rounded-lg p-4"
//               >
//                 <h2 className="text-xl text-sky-900 font-semibold mb-2">
//                   {restaurant.name}
//                 </h2>
//                 {restaurant.phone && (
//                   <p className="mb-2 text-emerald-800">
//                     Phone: {restaurant.phone}
//                   </p>
//                 )}

//                 <p className="mb-2 text-pink-400">
//                   Address: {restaurant.address.streetNumber}{" "}
//                   {restaurant.address.streetName},{" "}
//                   {restaurant.address.municipality},{" "}
//                   {restaurant.address.postalCode}, {restaurant.address.country}
//                 </p>
//                 <button
//                   onClick={() => handleViewMap(restaurant)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   View Map
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center mt-4">
//             {Array.from(Array(totalPages).keys()).map((pageNumber) => (
//               <button
//                 key={pageNumber}
//                 onClick={() => goToPage(pageNumber + 1)}
//                 className={`px-4 py-2 ${
//                   pageNumber + 1 === page
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 } rounded-md mr-2`}
//               >
//                 {pageNumber + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyComponent;


"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

interface restaurant {
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
 
  const [restaurants, setrestaurants] = useState<restaurant[]>([]);
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
          `https://api.tomtom.com/search/2/geocode/${flightsParam}.json?key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb`
        );

        const location = response.results[0];
        const latitude = location.position.lat;
        const longitude = location.position.lon;

        const { data: tomTomResponse } = await axios.get(
          `https://api.tomtom.com/search/2/search/restaurant.json?lat=${latitude}&lon=${longitude}&radius=5000&key=gDHQcXzGojvGzDDLFc0ZMo4QNg84gjZb&limit=10&ofs=${
            (page - 1) * 10
          }`
        );

        const totalResults = tomTomResponse.summary.totalResults;
        setTotalPages(Math.ceil(totalResults / 10));

        const restaurantData: restaurant[] = tomTomResponse.results.map((restaurant: any) => ({
          id: restaurant.id,
          name: restaurant.poi.name,
          categories: restaurant.poi.categories,
          address: restaurant.address,
          position: {
            lat: restaurant.position.lat,
            lon: restaurant.position.lon,
          },
        }));
        setrestaurants(restaurantData);
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

  const handleViewMap = (restaurant: restaurant) => {
    // Navigate to MapComponent page with the restaurant location
    const queryString = `?restaurantLat=${restaurant.position.lat}&restaurantLng=${restaurant.position.lon}&airport=${flightsParam}`;
    router.push(`/map3${queryString}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Restaurant Data</h1>
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
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white hover:bg-red-50 shadow-md rounded-lg p-4"
              >
                <h2 className="text-xl text-sky-900 font-semibold mb-2">
                  {restaurant.name}
                </h2>
                {restaurant.phone && (
                  <p className="mb-2 text-emerald-800">Phone: {restaurant.phone}</p>
                )}

                <p className="mb-2 text-pink-400">
                  Address: {restaurant.address.streetNumber}{" "}
                  {restaurant.address.streetName}, {restaurant.address.municipality},{" "}
                  {restaurant.address.postalCode}, {restaurant.address.country}
                </p>
                <button
                  onClick={() => handleViewMap(restaurant)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  View Map
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 mb-4">
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
