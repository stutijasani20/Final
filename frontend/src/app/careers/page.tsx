"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/jobs/?page=${page}`)
      .then((response) => {
        setJobs(response.data.results);
        setTotalPages(Math.ceil(response.data.count / pageSize));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setError(
          "An error occurred while fetching job listings. Please try again later."
        );
        setLoading(false);
      });
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-2xl text-red-500">
        <Image src="/error.webp" alt="Error" width={900} height={500} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center pt-5 mb-10">Careers</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
          <p className="text-gray-600">Loading careers...</p>{" "}
        </div>
      ) : (
        <div className="flex justify-center items-center mx-auto ">
          <div className="jobs-container   justify-center items-center grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="job-item w-96 bg-red-400 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 p-4"
              >
                <div className="relative h-48">
                  <Image
                    className="object-cover rounded-md w-full h-full"
                    src={job.image}
                    alt={job.title}
                    layout="fill"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold">{job.location}</span>{" "}
                  </p>
                  <Link
                    href={`/careers/${job.id}`}
                    className="text-indigo-500 hover:text-indigo-600 font-semibold"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
