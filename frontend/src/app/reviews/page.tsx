"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { AddCircle, Favorite } from "@mui/icons-material";
import { Avatar } from "@mui/material"; // Import Avatar from Material-UI

interface Review {
  id: number;
  passenger_name: number;
  city: string;
  rating: number;
  review_text: string;
  created_at: string;
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reviews/?page=${currentPage}`);
        setReviews(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [currentPage]);

  useEffect(() => {
    const inappropriateWords = [
      "bad",
      "inappropriate",
      "offensive",
      "disappointing",
    ];

    const filtered = reviews.filter((review: any) => {
      return !inappropriateWords.some((word) =>
        review.review_text.toLowerCase().includes(word)
      );
    });
    setFilteredReviews(filtered);
  }, [reviews, currentPage, totalPages]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }; 

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Passenger Reviews</h1>
        <Link
          href="/reviews/add"
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600"
        >
          <AddCircle />
        </Link>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredReviews.map((review: any) => (
          <li key={review.id} className="py-4">
            <div className="flex items-center">
              <Avatar sx={{ bgcolor: "#ce93d8" }}>
                {review.passenger_name[0]}
              </Avatar>
              <div className="ml-4">
                <span className="text-lg font-semibold">
                  {review.passenger_name}
                </span>
                <span className="text-gray-600 ml-2">City: {review.city}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-red-500">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {index < review.rating ? <Favorite /> : ""}{" "}
                  </span>
                ))}
              </span>
              <span className="ml-2 text-gray-600">{review.rating}</span>
            </div>
            <p className="mt-2">{review.review_text}</p>
            <small className="text-gray-500">
              Created At: {new Date(review.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
      {filteredReviews.length === 0 && (
        <p className="text-gray-600 mt-4">No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewList;
