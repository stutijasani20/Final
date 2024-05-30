"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';

interface Job {
  id: number;
  title: string;
  location: string;
  start_date: string;
  type: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://127.0.0.1:8000/jobs/');
        setJobs(response.data.results);
      } catch (error) {
        setError('Error fetching jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  

  return (
    <div className="p-4 ml-64 ">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Jobs</h2>

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
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="text-center">
                  <td className="border p-2">{job.title}</td>
                  <td className="border p-2">{job.location}</td>
                  <td className="border p-2">{formatDate(job.start_date)}</td>
                  <td className="border p-2">{job.type}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Jobs;
