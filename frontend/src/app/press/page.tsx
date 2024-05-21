"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { NextPage } from "next";
import Head from "next/head";

interface PressItem {
  id: string;
  title: string;
  publication_date: string;
  image?: string;
  content: string;
}

const YourComponent: NextPage = () => {
  const [data, setData] = useState<PressItem[]>([]);
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/press/?page=${currentPage}`
      );
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleAccordion = (itemId: string) => {
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <Head>
        <title>Press Releases</title>
        <meta
          name="Press_Data"
          content="Browse through the latest press releases."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-4 mt-8 text-violet-800">
        Press Releases:
      </h1>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="border border-gray-300 rounded">
            <button
              className="flex justify-between items-center w-full px-4 py-2 text-left focus:outline-none hover:bg-gray-100"
              onClick={() => toggleAccordion(item.id)}
            >
              <div className="font-semibold text-teal-800">{item.title}</div>
              <div className="text-sm text-rose-800">
                {item.publication_date}
              </div>
            </button>
            {openItemId === item.id && (
              <div className="grid items-center grid-cols-3 mx-6 pb-5">
                {item.image && (
                  <div className="mt-4 col-span-1">
                    <Image
                      src={item.image}
                      alt="Press Image"
                      width={300}
                      height={300}
                      className="rounded"
                    />
                  </div>
                )}
                <p className="text-gray-700 col-span-2">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-rose-300 text-red-500"
                : "bg-amber-100 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
