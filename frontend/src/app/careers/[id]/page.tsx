"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Apply from "./apply";
import Image from "next/image";

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
    <div className="flex justify-center items-center mb-5 mt-5 h-full">
      <Box
        sx={{
          width: "80%",
          maxWidth: 1000,
          border: 2,
          borderRadius: 5,
          borderColor: "primary.main",
          p: 4,
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h3" sx={{ mb: 4, color: "primary.main" }}>
          {jobData.title}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, color: "primary.main" }}>
                Description:
              </Typography>
              <ul style={{ marginLeft: "1rem", color: "text.secondary" }}>
                {descriptionPoints.map((point: string, index: number) => (
                  <li key={index}>
                  <Typography component="span" variant="body1" sx={{ mb: 1 }}>
                    {point}
                  </Typography>
                </li>
                ))}
              </ul>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Department: {departmentName}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, color: "primary.main" }}>
              Requirements:
            </Typography>
            <ul style={{ marginLeft: "1rem", color: "text.secondary", listStyleType: 'disc' }}>
              {requirementPoints.map((point: string, index: number) => (
               <li key={index}>
               <Typography component="span" variant="body1" sx={{ mb: 1 }}>
                 {point}
               </Typography>
               </li>
              ))}
            </ul>
            <p className="font-bold text-lg text-blue-500 mb-4">Salary: </p>
<div className="mt-2 mb-4 text-gray-700 bg-gray-100 p-2 rounded">{jobData.salary}</div>

<Apply jobId={params.id} />
</Grid>
<Grid item xs={12} sm={4}>
  <div className="shadow-lg rounded overflow-hidden">
    <Image
      src={jobData.image}
      alt="Job Image"
      width={400}
      height={300}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "cover",
      }}
    />
  </div>
</Grid>
</Grid>
</Box>
</div>
  );
}
