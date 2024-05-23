"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

const JobCard: React.FC<{
  title: string;
  image: string;
  location: string;
  jobId: number;
}> = ({ title, image, location, jobId }) => {
  return (
    <div className="bg-white shadow-lg rounded-md overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-xl font-serif">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          layout="fill"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2 font-semibold">{location}</p>
        <a
          href={`/careers/${jobId}`}
          className="text-indigo-500 hover:text-indigo-600 font-semibold"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default function Page() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://127.0.0.1:8000/jobs/");
        setJobs(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(
          "An error occurred while fetching job listings. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        <div className="jobs-container grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job: any) => (
            <JobCard
              key={job.id}
              title={job.title}
              image={job.image}
              location={job.location}
              jobId={job.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
