"use client";
import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import axios from "axios";

export default function Page() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/jobs/")
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Careers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <CldImage
              className="object-cover h-56 w-full"
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${job.image}`} // Assuming your job object has an image property with the Cloudinary public ID
              alt={job.title}
              width={500}
              height={300}
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
    </div>
  );
}
