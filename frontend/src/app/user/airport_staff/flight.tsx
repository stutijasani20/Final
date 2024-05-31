/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { Button, Grid, TextField, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Modal, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
interface Airport {
    city: string;
    id: number;
    name: string;
}
interface Flight {
    id: number;
    flight_number: string;
    departure_airport_name: string;
    departure_airport: number;
    arrival_airport: string;
    arrival_airport_name: string;
    price: number;
    travel_date: string;
    classes_name: string;
    available_seats: number;
    classes: string;
}

interface NewFlight {
    flight_number: string;
    departure_airport: number;
    arrival_airport: number;
    price: number;
    travel_date: string;
    departure_time: string;
    arrival_time: string;
    available_seats: number;
    classes: number;

}

interface Classes {
    id: number,
    name: string,
}

const Flights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [filterCriteria, setFilterCriteria] = useState({
        departureAirportName: "",
        arrivalAirportName: "",
        travelDate: "",
        className: "",
    });

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [newFlight, setNewFlight] = useState<NewFlight>({
        flight_number: "",
        departure_airport: 0,
        arrival_airport: 0,
        price: 0,
        travel_date: "",
        departure_time: "",
        arrival_time: "",
        available_seats: 0,
        classes: 0,
    });
    

    const [airports, setAirports] = useState<Airport[]>([]);
    const [classes, setClasses] = useState<Classes[]>([]);


   
    const fetchAirports = async () => {
        let url = 'http://127.0.0.1:8000/airports/';
        let airports: Airport[] = [];
        
        while (url) {
            const response = await axios.get(url);
            const data = response.data;
            const fetchedAirports: Airport[] = data.results.map((airport: any) => ({
                id: airport.id,
                name: airport.name,
                city: airport.city,
            }));
            airports = airports.concat(fetchedAirports);
            url = data.next;
        }

        setAirports(airports); 
    };

    useEffect(() => {
        fetchAirports();
    }, []);

    const fetchClass = async () => {
        let url = 'http://127.0.0.1:8000/classes/';
        let classes_list: Classes[] = [];
        
        while (url) {
            const response = await axios.get(url);
            const data = response.data;
            const fetchedClass: Classes[] = data.results.map((class_list: any) => ({
                id: class_list.id,
                name: class_list.name,
                
            }));
            classes_list = classes.concat(fetchedClass);
            url = data.next;
        }

        setClasses(classes_list)
    };

    useEffect(() => {
        fetchClass();
    }, []);




      
      
    
    


        const fetchFlights = async () => {
            let url = `http://127.0.0.1:8000/flights/?page=${page}`;
            if (filterCriteria.departureAirportName) {
                url += `&departure_airport_name=${filterCriteria.departureAirportName}`;
            }
            if (filterCriteria.arrivalAirportName) {
                url += `&arrival_airport_name=${filterCriteria.arrivalAirportName}`;
            }
           
            if (filterCriteria.travelDate) {
                url += `&travel_date=${filterCriteria.travelDate}`;
            }
            if (filterCriteria.className) {
                url += `&class_name=${filterCriteria.className}`;
            }

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setFlights(response.data);
                setTotalPages(Math.ceil(response.data.count / pageSize));
            } catch (error) {
                console.error("Error fetching flights:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchFlights();
          // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [filterCriteria.departureAirportName, filterCriteria.arrivalAirportName,  filterCriteria.travelDate, filterCriteria.className, page, pageSize]);

        
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFilterCriteria((prev) => ({
            ...prev,
            [name]: name === "price" ? (value ? parseInt(value) : undefined) : value
        }));
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        const { name, value } = event.target;
        setNewFlight((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewFlight((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    

    const clearFilters = () => {
        setFilterCriteria({
            departureAirportName: "",
            arrivalAirportName: "",
            travelDate: "",
            className: ""
        });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage); 
    };

    const deleteFlight = async (id: number) => {
        try {
          await axios.delete(`http://127.0.0.1:8000/flights/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
         
          fetchFlights();
          toast.success('Flight deleted successfully!');
        } catch (error) {
          setError('Error deleting Flight. Please try again later.');
        }
      };
    

    const handleAddFlight = async () => {
        try {
            await axios.post(`http://127.0.0.1:8000/flights/`, newFlight, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setOpenModal(false);
            toast.success('Flight added successfully!');
            fetchFlights();
        } catch (error) {
            setError('Error adding flight. Please try again later.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-64 flex justify-center items-center h-screen text-2xl text-red-500">
                <div className="flex flex-col items-center">
                    <Image src="/error.webp" alt="Error" width={900} height={900} className="mb-4" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    

    return (
        <div className="p-4 ml-64">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Flights</h2>
            <ToastContainer />
            <div className="flex gap-2 mb-4 flex justify-center items-center">
                <TextField
                    type="text"
                    label="Departure Airport"
                    name="departureAirportName"
                    value={filterCriteria.departureAirportName}
                    onChange={handleFilterChange}
                />
                <TextField
                    type="text"
                    label="Arrival Airport"
                    name="arrivalAirportName"
                    value={filterCriteria.arrivalAirportName}
                    onChange={handleFilterChange}
                />
                <TextField
                    type="date"
                    label="Travel Date"
                    name="travelDate"
                    value={filterCriteria.travelDate}
                    onChange={handleFilterChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="text"
                    label="Class"
                    name="className"
                    value={filterCriteria.className}
                    onChange={handleFilterChange}
                />
                <Button variant="contained" color="secondary" onClick={clearFilters}>
                    Clear Filters
                </Button>
            </div>

            <div className="mb-4">
        <Button variant="contained" color="secondary" onClick={() => setOpenModal(true)}>
         Add Flights
        </Button>
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h3>Add Airport</h3>
          <TextField
            type="text"
            label="Flight Number"
            name="flight_number"
            value={newFlight.flight_number}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="number"
            label="Price"
            name="price"
            value={newFlight.price}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="number"
            label="Available Seats"
            name="available_seats"
            value={newFlight.available_seats}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
    <TextField
        type="datetime-local"
        label="Departure Date and Time"
        name="departure_time"
        value={newFlight.departure_time}
        onChange={handleInputChange}
        fullWidth
        sx={{ mt: 2 }}
        InputLabelProps={{ shrink: true }}
      />
<TextField
        type="datetime-local"
        label="Arrival Date and Time"
        name="arrival_time"
        value={newFlight.arrival_time}
        onChange={handleInputChange}
        fullWidth
        sx={{ mt: 2 }}
        InputLabelProps={{ shrink: true }}
      />

          <TextField
            type="date"
            label='Travel_date'
           
            name="travel_date"
            value={newFlight.travel_date}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
           
         <FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel>Departure Airport</InputLabel>
    <Select
        value={newFlight.departure_airport}
        onChange={handleChange}
        label="Departure Airport"
        name="departure_airport"
    >
        {airports.map((airport) => (
            <MenuItem key={airport.id} value={airport.id}>
                {airport.name} ({airport.city})
            </MenuItem>
        ))}
    </Select>
</FormControl>
<FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel>Arrival Airport</InputLabel>
    <Select
        value={newFlight.arrival_airport}
        onChange={handleChange}
        label="Arrival Airport"
        name="arrival_airport"
    >
        {airports.map((airport) => (
            <MenuItem key={airport.id} value={airport.id}>
                {airport.name} ({airport.city})
            </MenuItem>
        ))}
    </Select>
</FormControl>
<FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel>Class</InputLabel>
    <Select
        value={newFlight.classes}
        onChange={handleChange}
        label="Class"
        name="classes"
    >
        {classes.map((classData) => (
            <MenuItem key={classData.id} value={classData.id}>
                {classData.name}
            </MenuItem>
        ))}
    </Select>
</FormControl>


     
         
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleAddFlight}>
              Add
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

            {flights.length === 0 ? (
                <div className="flex flex-col items-center mt-8">
                    <Image src="/no.png" alt="No data found" width={500} height={500} />
                    <p className="text-xl text-gray-700 mt-4">No flights found</p>
                </div>
            ) : (
                <>
                    <table className="w-full border-collapse table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">No.</th>
                                <th className="border p-2">Flight Number</th>
                                <th className="border p-2">Departure Airport</th>
                                <th className="border p-2">Arrival Airport</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Travel Date</th>
                                <th className="border p-2">Class</th>
                                <th className='border p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight, index) => (
                                <tr key={flight.id} className="text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{flight.flight_number}</td>
                                    <td className="border p-2">{flight.departure_airport_name}</td>
                                    <td className="border p-2">{flight.arrival_airport_name}</td>
                                    <td className="border p-2">{flight.price}</td>
                                    <td className="border p-2">{new Date(flight.travel_date).toLocaleDateString()}</td>
                                    <td className="border p-2">{flight.classes_name}</td>
                                    <td className="border p-2">
                    <button onClick={() => deleteFlight(flight.id)} className="text-red-500 hover:text-red-700">
                      <DeleteIcon />
                    </button>
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

export default Flights;

