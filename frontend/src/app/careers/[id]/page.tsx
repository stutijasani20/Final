"use client";
import { data } from "@maptiler/sdk";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [jobData, setJobData] = useState<any>(null);
  const [departmentData, setDepartmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch job data based on the id when the component mounts
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/jobs/${params.id}`);
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    // Fetch department data from another API
    const fetchDepartmentData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/department/");
        const data = await response.json();
        setDepartmentData(data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    // Fetch both job and department data
    Promise.all([fetchJobData(), fetchDepartmentData()])
      .then(() => setLoading(false))
      .catch((error) => console.error("Error:", error));

    // Cleanup function if necessary
    return () => {
      // Cleanup code here if needed
    };
  }, [params.id]); // Re-fetch data if the id changes

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!jobData) {
    return <div className="text-center">Job not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{jobData.title}</h1>

      <p className="text-gray-700 mb-4">{jobData.description}</p>

      <p className="text-gray-700 mb-4">{jobData.department}</p>

      <p className="text-gray-700 mb-4">{jobData.requirements}</p>

      <p className="text-gray-700 mb-4">Salary: {jobData.salary}</p>
      {/* Display other job details as needed */}
    </div>
  );
}
