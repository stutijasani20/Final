/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Modal, Box } from '@mui/material';
import Image from 'next/image';
import { ClipLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
interface Airport {
  id: number;
  name: string;
  code: string;
  city: string;
  country: string;
}
interface NewAirport {
  name: string;
  code: string;
  city: string;
  country: string;
  lat: number;
  lng: number;

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
  const [newAirport, setNewAirport] = useState<NewAirport>({

    name: '',
    code: '',
    city: '',
    country: '',
    lat: 0,
    lng: 0,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);


  const fetchAirports = async () => {
    setLoading(true);
    setError(null);
    let url = `http://127.0.0.1:8000/airports/?page=${page}&page_size=${pageSize}`;

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
      setAirports(response.data.results);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      setError('Error fetching airports. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, [page, pageSize, filterCriteria.name, filterCriteria.city, filterCriteria.country]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
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

  const deleteAirport = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/airports/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
     
      fetchAirports();
      toast.success('Airport deleted successfully!');
    } catch (error) {
      setError('Error deleting airport. Please try again later.');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewAirport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddAirport = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/airports/', newAirport, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchAirports();
      toast.success('Airport added successfully!');
      setOpenModal(false); 
    } catch (error) {
      setError('Error adding airport. Please try again later.');
    }
  };


  return (
    <div className="p-4 ml-64 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Flights</h2>
      <div className="flex gap-2 mb-4 flex justify-center items-center">
        <ToastContainer />
     
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

      <div className="mb-4">
        <Button variant="contained" color="secondary" onClick={() => setOpenModal(true)}>
          Add Airport
        </Button>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h3>Add Airport</h3>
          <TextField
            type="text"
            label="Name"
            name="name"
            value={newAirport.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="text"
            label="Code"
            name="code"
            value={newAirport.code}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="text"
            label="City"
            name="city"
            value={newAirport.city}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="text"
            label="Country"
            name="country"
            value={newAirport.country}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
            <TextField
            type="text"
            label="Latitude"
            name="lat"
            value={newAirport.lat}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
            <TextField
            type="text"
            label="Longitude"
            name="lng"
            value={newAirport.lng}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleAddAirport}>
              Add
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

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
                <th className="border p-2">Actions</th> 
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
                  <td className="border p-2">
                  <Button
                      variant="contained"
                      style={{ backgroundColor: 'red', color: 'white' }}
                      onClick={() => deleteAirport(airport.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
                       <Stack spacing={2}>
                       <Pagination count={totalPages} page={page} color="secondary" onChange={handlePageChange}  />
                       </Stack>
                      
                    </div>
        </>
      )}

    </div>
  );
};

export default Airports;
