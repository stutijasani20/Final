"use client";
import React from "react";
import Accordion from "./Accordian";
export default function Page() {
  return (
    <div>
      <p style={{ color: "blue", fontSize: "12px" }}>HOME/CORPORATE_INFO</p>
      <h1 style={{ color: "purple", fontFamily: "chiller", fontSize: "50px" }}>
        Corporate Information
      </h1>
      <div
        className="container"
        style={{ backgroundColor: "ghostwhite", padding: "20px" }}
      >
        <h3>Corporate Information</h3>
        <p style={{ color: "dimgray" }}>CIN NO:. AE2009SJ1709KV0112RM28B</p>
        <h4>Registered Office Address</h4>
        <p style={{ color: "dimgray" }}>3/73, Old Rajinder Nagar , </p>
        <p style={{ color: "dimgray" }}> New Delhi, India, 110060</p>
        <p style={{ color: "dimgray" }}>Phone No: 011 2576 7773</p>

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
