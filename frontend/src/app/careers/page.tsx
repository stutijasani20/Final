"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import {useRouter} from "next/navigation"
import { MagnifyingGlass } from "react-loader-spinner";
const JobCard: React.FC<{
  title: string;
  image: string;
  location: string;
  jobId: number;
}> = ({ title, image, location, jobId }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();


  const handlejob = () =>{
    router.push(`/careers/${jobId}`)

  }

  return (
    <div
      className={`bg-white rounded-md overflow-hidden shadow-lg transition duration-300 transform ${
        hovered ? "hover:-translate-y-2 hover:shadow-xl" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          className="object-cover w-full h-full"
          layout="fill"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">{title}</h3>
        <p className="text-gray-600 mb-2 font-semibold">{location}</p>
        <button
         onClick={handlejob}
          className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-300"
        >
          
          <div className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
  Learn More
</div>
        </button>
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
      <div className="flex justify-center items-center h-screen text-2xl text-red-500">
        <Image src="/error.webp" alt="Error" width={900} height={500} />
        <p>{error}</p>
      </div>
    );
  }


  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-700 text-center pt-5 mb-10">Careers</h1>
      <div className="container mx-auto flex justify-center bg-slate-100 items-center h-screen">
        
        {loading ? (
        <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-md z-50">
            <MagnifyingGlass width={100} height={100}  />
            <p className="text-gray-600">Loading careers...</p>{" "}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
