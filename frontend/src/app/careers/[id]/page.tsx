"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Apply from "./apply";

export default function Page({ params }: { params: { id: string } }) {
  const [jobData, setJobData] = useState<any>(null);
  const [departmentData, setDepartmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/jobs/${params.id}`);
        const data = await response.json();
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    const fetchDepartmentData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/department/");
        const data = await response.json();

        setDepartmentData(data.results);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    Promise.all([fetchJobData(), fetchDepartmentData()])
      .then(() => setLoading(false))
      .catch((error) => console.error("Error:", error));

    return () => {
      // Cleanup code here if needed
    };
  }, [params.id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!jobData) {
    return <div className="text-center">Job not found</div>;
  }

  const departmentName = departmentData.find(
    (department: any) => department.id === jobData.department
  )?.name;

  const descriptionPoints = jobData.description.split(".");
  const requirementPoints = jobData.requirements.split(",");

  return (
    <div className="container mx-auto px-4 py-8">
      <Box
        sx={{
          border: 2,
          borderRadius: 5,
          borderColor: "black.300",
          p: 4,
          position: "relative",
        }}
      >
        <h1 className="text-3xl font-bold mb-4 mt-5">{jobData.title}</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <div className="mb-4">
              <h2 className="font-bold">Description:</h2>
              <ul className="list-disc ml-8">
                {descriptionPoints.map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <p className="fobt-bold mb-4">Department: {departmentName}</p>
            <p className="font-bold mb-4">Requirements:</p>

            <ul className="list-disc ml-8">
              {requirementPoints.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>

            <p className="font-bold mb-4">Salary: </p>
            <p className="mt-2 mb-4">{jobData.salary}</p>

            <Apply jobId={params.id} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <img
              src={jobData.image}
              alt="Job Image"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
