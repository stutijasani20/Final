"use client";
import React from "react";
import Accordion from "./Accordian";

export default function Page() {
  return (
    <div className="container mx-auto px-4">

      <h1 className="text-blue-600 font-bold text-5xl text-center">
        Corporate Information

      </h1><br />
      <div className="bg-white p-5 m-5 shadow-lg rounded-lg">
      
      <p className="text-gray-700 font-medium">CIN NO:. AE2009SJ1709KV0112RM28B</p>
<h4 className="font-bold text-lg text-blue-600 mt-2">Registered Office Address:</h4>
<p className="text-gray-700 font-light">3/73, Old Rajinder Nagar , </p>
<p className="text-gray-700 font-light"> New Delhi, India, 110060</p>
<p className="text-gray-700 font-light">Phone No: 011 2576 7773</p>
        <Accordion
          title="Annual Returns"
          pdfFiles={[
            { name: "File 1", url: "/path/to/file1.pdf" },
            { name: "File 2", url: "/path/to/file2.pdf" },
            { name: "File 3", url: "/path/to/file3.pdf" },
          ]}
        />
        <Accordion
          title="Policies"
          pdfFiles={[
            { name: "File 1", url: "/path/to/file1.pdf" },
            { name: "File 2", url: "/path/to/file1.pdf" },
            { name: "File 3", url: "/path/to/file1.pdf" },
            { name: "File 4", url: "/path/to/file1.pdf" },
            { name: "File 5", url: "/path/to/file1.pdf" },
            { name: "File 6", url: "/path/to/file1.pdf" },
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