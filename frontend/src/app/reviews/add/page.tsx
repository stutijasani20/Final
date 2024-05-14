"use client";

import React, { useState } from "react";
import axios from "axios";
import useAuthenticationRequired from "@/app/hooks/auth_hook";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface ReviewFormProps {
  onAddReview: (newReview: Review) => void;
}

interface Review {
  id: number;
  passenger_name: number;
  city: string;
  rating: number;
  review_text: string;
  created_at: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
  const [passengerName, setPassengerName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useAuthenticationRequired();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName || !city || !rating || !reviewText) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/reviews/", {
        passenger_name: passengerName,
        city: city,
        rating: rating,
        review_text: reviewText,
      });
      onAddReview(response.data);
      setShowModal(true);
      // Clear form fields after successful submission
      setPassengerName("");
      setCity("");
      setRating(null);
      setReviewText("");
      setError("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("An error occurred while submitting the review.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
        <div className="mb-4">
          <label htmlFor="passengerName" className="block font-bold mb-1">
            Passenger Name
          </label>
          <input
            type="text"
            id="passengerName"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-bold mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block font-bold mb-1">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            value={rating || ""}
            onChange={(e) => setRating(parseInt(e.target.value))}
            min={1}
            max={5}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reviewText" className="block font-bold mb-1">
            Review Text
          </label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 8,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Success!
          </Typography>
          <Typography variant="body1" component="div" gutterBottom>
            Your review has been added successfully.
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const YourPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleAddReview = (newReview: Review) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div>
      <ReviewForm onAddReview={handleAddReview} />
    </div>
  );
};

export default YourPage;
