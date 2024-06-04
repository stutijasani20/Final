/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/app/loading';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button, TextField, Modal, Box } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
interface Job {
  id: number;
  title: string;
  location: string;
  start_date: string;
  type: string;
  department: string;
  image: File  | null | string;
  requirements: string;
  description: string;
  salary: string;

}

interface NewJob {
   department: any;

   title: string;
   location: string;
   start_date: string;
   type: string;
   requirements: string;
   description: string;
   salary: string;
   image: File | null | string;
  

  }

  interface Department {
    id: number;
    name: string;
}

  
interface DepartmentResponse {
  results: Department[];
  count: number;
  next: string | null;
  previous: string | null;
}




  const Jobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [newJob, setNewJob] = useState<NewJob>({
      title: '',
      location: '',
      start_date: '',
      type: '',
      requirements: '',
      description : "",
      salary: "",
      department:'',
      image : null,
    });
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [departmentdata, setDepartmentData] = useState<Department[]>([]);
    const [departments, setDepartments] = useState<number | ''>('');
    const [loadingDepartments, setLoadingDepartments] = useState<boolean>(false);

  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editJobId, setEditJobId] = useState<number | null>(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            setLoadingDepartments(true);
            const response = await axios.get<DepartmentResponse>("http://127.0.0.1:8000/department/");
            setDepartmentData(response.data.results);
        } catch (error) {
            console.error("Error fetching departments:", error);
            toast.error("Error fetching departments. Try again later.");
        } finally {
            setLoadingDepartments(false);
        }
    };

  
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      let url = `http://127.0.0.1:8000/jobs/?page=${page}`;
  
      try {
        const response = await axios.get(url);
        setJobs(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchJobs();
    }, [page, pageSize]);
  
    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
  };
  
    const deleteJob = async (id: number) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/jobs/${id}`);
        fetchJobs();
        toast.success('Job deleted successfully!');
      } catch (error) {
        setError('Error deleting job. Please try again later.');
      }
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setNewJob((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    const handleFileInputChange = (event: any) => {
      const file = event.target.files[0];
      setNewJob((prev) => ({
        ...prev,
        image: file,
      }));
    };
  
    const handleDepartmentChange = (event: any) => {
      const departmentId = event.target.value;
      setNewJob((prev) => ({
        ...prev,
        department: departmentId,
      }));
    };
    const handleAddJob = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/jobs/', newJob, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        fetchJobs();
        toast.success('Job added successfully!');
        setNewJob({
          title: '',
          location: '',
          start_date: '',
          type: '',
          requirements: '',
          description : "",
          salary: "",
          department:'',
          image : null,
         
      });
      fetchJobs();
        setOpenModal(false);
      } catch (error) {
        setError('Error adding job. Please try again later.');
      }
    };

    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    const handleEditJob = (job: Job) => {
      setIsEditing(true);
      setEditJobId(job.id);
      setNewJob({
        title: job.title,
        location: job.location ,
        start_date: job.start_date,
        type: job.type,
        requirements: job.requirements,
        description : job.description,
        salary: job.salary,
        department:job.department,
        image : job.image,
        
          
      });
      setOpenModal(true);
  };
  
  const handleUpdateJob = async () => {
    try {
        await axios.put(`http://127.0.0.1:8000/jobs/${editJobId}/`, newJob, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setOpenModal(false);
        toast.success('Job updated successfully!');
       fetchJobs();
    } catch (error) {
        setError('Error updating Job. Please try again later.');
    }
  };
  return (
    <div className="p-4 ml-64 ">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Jobs</h2>
      <ToastContainer />
      <div className='mb-5'>
      <Button variant="contained" color="secondary" onClick={() => setOpenModal(true)} sx={{ marginLeft: 'auto' }}>
        Add Job
      </Button>
      </div>

      
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, maxHeight: '80vh', overflowY: 'auto' }}>
                    <h3>{isEditing ? 'Edit Flight' : 'Add Flight'}</h3>
         <TextField
            type="text"
            label="Location"
            name="location"
            value={newJob.location}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            type="date"
            label="Start Date"
            name="start_date"
            value={newJob.start_date}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
         
          <TextField
            type="text"
            label="Type"
            name="type"
            value={newJob.type}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            />
              <TextField
            type="text"
            label="Salary"
            name="salary"
            value={newJob.salary}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            />
              <TextField
            type="text"
            label="Description"
            name="description"
            placeholder='After Each Description add a fullstop (.)'
            value={newJob.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            />
              <TextField
            type="text"
            label="Requirements"
            name="requirements"
            placeholder='After each requirement add a coma (,)'
            value={newJob.requirements}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
            />
     
     <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  label='Department'
                  value={newJob.department}
                  onChange={handleDepartmentChange}
                  fullWidth
                 
                  
                >
                  <MenuItem value="">Select Department</MenuItem>
                  {departmentdata.map((department) => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
<input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className='mt-2'
          />


             
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button variant="contained" color="primary" onClick={isEditing ? handleUpdateJob : handleAddJob}>
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)} sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    </div>
        </Box>
      </Modal>
      
      

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : error ? (
        <div className="mx-64 flex justify-center items-center h-screen text-2xl text-red-500">
          <div className="flex flex-col items-center">
            <Image src="/error.webp" alt="Error" width={900} height={900} className="mb-4" />
            <p>{error}</p>
          </div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <Image src="/no.png" alt="No data found" width={500} height={500} />
          <p className="text-xl text-gray-700 mt-4">No jobs found</p>
        </div>
      ) : (
        <>
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Actions</th> 
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="text-center">
                  <td className="border p-2">{job.title}</td>
                  <td className="border p-2">{job.location}</td>
                  <td className="border p-2">{formatDate(job.start_date)}</td>
                  <td className="border p-2">{job.type}</td>
                  <td className="border p-2">
                                        <button onClick={() => handleEditJob(job)} className="text-blue-500 hover:text-blue-700 mr-2">
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:text-red-700">
                                            <DeleteIcon />
                                        </button>
                                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-center mt-4">
                       <Stack spacing={2}>
                       <Pagination count={totalPages} color="secondary" onChange={handlePageChange}  />
                       </Stack>
                    </div>
        </>
      )}
    </div>
  );
};

export default Jobs;
