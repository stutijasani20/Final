
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import Image from 'next/image';

const User = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [filterCriteria, setFilterCriteria] = useState<{ isStaff: boolean | null }>({
    isStaff: null,
  });
  

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      let url =  `http://127.0.0.1:8000/users/?page=${page}`;

      if (filterCriteria.isStaff !== null) {
        url += `&staff=${filterCriteria.isStaff}`;
      }


      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },

        });
        setUsers(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize, filterCriteria.isStaff]);

  

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setFilterCriteria({
      isStaff: event.target.value === 'staff' ? true : event.target.value === 'customer' ? false : null,
    });
  };

  const clearFilters = () => {
    setFilterCriteria({
      isStaff: null,
    });
  };

  return (
    <div className="p-4 ml-64 bg-gray-100">
         <div className="flex gap-2 mb-4 flex justify-center items-center">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">User</InputLabel>
        <Select
  label="User Type"
  name="userType"
  value={filterCriteria.isStaff === true ? 'staff' : filterCriteria.isStaff === false ? 'customer' : ''}
  onChange={handleFilterChange}
>
  <MenuItem value={''}>All</MenuItem>
  <MenuItem value={'staff'}>Staff</MenuItem>
  <MenuItem value={'customer'}>Customer</MenuItem>
</Select>
</FormControl>
       
<Button variant="contained" color="secondary" onClick={clearFilters}  >
    Clear Filters
</Button>
        
       
        </div>

      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length === 0 ? ( 
      <Image src="/no.png" alt="No data" width={500} height={500} /> 
    ) : (
        <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {users.map((user, index) => (
      <tr key={user.id} className="hover:bg-gray-100 transition-colors duration-200 ease-in-out">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">
          <span className={`inline-block px-2 py-1 rounded-full font-semibold ${user.is_staff ? 'bg-green-200 text-green-800' : 'bg-purple-200 text-purple-800'}`}>
            {user.is_staff ? 'Staff' : 'Customer'}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          <div className="flex justify-center mt-4">
            
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded transition-colors duration-200 ${
                  page === index + 1 ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white hover:bg-blue-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default User;
