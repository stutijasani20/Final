"use client";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch data based on the id when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/jobs/${params.id}`);
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function if necessary
    return () => {
      // Cleanup code here if needed
    };
  }, [params.id]); // Re-fetch data if the id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobData) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <h1>{jobData.title}</h1>
      <p>{jobData.description}</p>
      {/* Display other job details as needed */}
    </div>
  );
}
