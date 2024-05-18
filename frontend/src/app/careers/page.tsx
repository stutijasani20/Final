"use client";
import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/jobs/?page=${page}`)
      .then((response) => {
        setJobs(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <ClipLoader size={50} color={"#123abc"} loading={loading} />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="mx-64 flex justify-center items-center h-screen text-2xl text-red-500">
        <div className="flex flex-col items-center">
          <Image src="/error.webp" alt="Error" width={900} height={500} />
          <p>{error}</p>
        </div>
      </div>
    );
  }
  console.log(jobs.map((job) => job.image));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center pt-5 mb-5">Careers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-5 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <Image
              className="object-cover h-56 w-full"
              cloudname="dvueo2lkr" // Use lowercase 'cloudname' instead of 'cloudName'
              src={job.image} // Assuming your job object has an image property with the Cloudinary public ID
              alt={job.title}
              width={400}
              height={500}
            />

            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-4">{job.location}</p>
              </div>
              <div>
                <Link
                  href={`/careers/${job.id}`}
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
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
    </div>
  );
}
