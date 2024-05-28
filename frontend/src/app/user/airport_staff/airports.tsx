import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';

interface Airport {
  id: number;
  name: string;
  code: string;
  city: string;
  country: string;
}

const Airports = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filterCriteria, setFilterCriteria] = useState<{ name: string; city: string; country: string }>({
    name: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      setError(null);
      let url = `http://127.0.0.1:8000/airports/?`;

      if (filterCriteria.name) {
        url += `&name=${filterCriteria.name}`;
      }
      if (filterCriteria.city) {
        url += `&city=${filterCriteria.city}`;
      }
      if (filterCriteria.country) {
        url += `&country=${filterCriteria.country}`;
      }

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAirports(response.data);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        setError('Error fetching airports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, [page, pageSize, filterCriteria.name, filterCriteria.city, filterCriteria.country]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCriteria((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const clearFilters = () => {
    setFilterCriteria({
      name: '',
      city: '',
      country: '',
    });
  };

  return (
    <div className="p-4 ml-64 bg-gray-100">
       <h2 className="text-2xl font-semibold mb-4 text-blue-700">Flights</h2>
      <div className="flex gap-2 mb-4 flex justify-center items-center">
     
        <TextField
          type="text"
          label="Name"
          name="name"
          value={filterCriteria.name}
          onChange={handleFilterChange}
        />
        <TextField
          type="text"
          label="City"
          name="city"
          value={filterCriteria.city}
          onChange={handleFilterChange}
        />
        <TextField
          type="text"
          label="Country"
          name="country"
          value={filterCriteria.country}
          onChange={handleFilterChange}
        />
        <Button variant="contained" color="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#123abc" loading={loading} />
        </div>
      ) : error ? (
        <div className="mx-64 flex justify-center items-center h-screen text-2xl text-red-500">
          <div className="flex flex-col items-center">
            <Image src="/error.webp" alt="Error" width={900} height={900} className="mb-4" />
            <p>{error}</p>
          </div>
        </div>
      ) : airports.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <Image src="/no.png" alt="No data found" width={500} height={500} />
          <p className="text-xl text-gray-700 mt-4">No airports found</p>
        </div>
      ) : (
        <>
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">No.</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Code</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Country</th>
              </tr>
            </thead>
            <tbody>
              {airports.map((airport, index) => (
                <tr key={airport.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{airport.name}</td>
                  <td className="border p-2">{airport.code}</td>
                  <td className="border p-2">{airport.city}</td>
                  <td className="border p-2">{airport.country}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className="mx-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Airports;
