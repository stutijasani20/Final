"use client";
import React, {useState, useEffect} from "react";
import Accordion from "./Accordian";
import Loading from "../loading";



export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 backdrop-filter backdrop-blur-md z-50">
      <Loading />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-purple-600 font-bold mt-4 mb-8">CORPORATE INFORMATION</h1>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Corporate Information</h2>
        <p className="text-gray-700 mb-4">CIN NO: AE2009SJ1709KV0112RM28B</p>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Registered Office Address</h3>
          <p className="text-gray-700">3/73, Old Rajinder Nagar,</p>
          <p className="text-gray-700">New Delhi, India, 110060</p>
          <p className="text-gray-700">Phone No: 011 2576 7773</p>
        </div>

        <Accordion
          title="Annual Returns"
          pdfFiles={[
            { name: "File 1", url: "/path/to/file1.pdf" },
            { name: "File 2", url: "/path/to/file2.pdf" },
            { name: "File 3", url: "/path/to/file3.pdf" }
          ]}
        />
        <Accordion
          title="Policies"
          pdfFiles={[
            { name: "File 1", url: "/path/to/file1.pdf" },
            { name: "File 2", url: "/path/to/file2.pdf" },
            { name: "File 3", url: "/path/to/file3.pdf" },
            { name: "File 4", url: "/path/to/file4.pdf" },
            { name: "File 5", url: "/path/to/file5.pdf" },
            { name: "File 6", url: "/path/to/file6.pdf" }
          ]}
        />
        <Accordion
          title="Disclosures"
          pdfFiles={[{ name: "File 1", url: "/path/to/file1.pdf" }]}
        />
      </div>
    </div>
  );
}