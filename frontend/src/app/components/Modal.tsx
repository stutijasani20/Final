/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiUser, FiPhone, FiCalendar, FiCamera } from "react-icons/fi";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {ThreeDots} from 'react-loader-spinner';
function UserProfileModal() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const rootElement = document.getElementById('__next') as HTMLElement; 

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const checkProfileCompleteness = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/profile/?user=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const profileData = response.data.results;
        console.log("Profile data:", profileData);

        if (profileData === null || profileData.length === 0) {
          setShowModal(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking profile completeness:", error);
      }
    };

    if (userId ) {
      checkProfileCompleteness();
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    const id: any = localStorage.getItem("userId");
    formData.append("user", id);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("birth_date", dateOfBirth);
    formData.append("profile_photo", profilePhoto);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Profile Data added successfully");

        setShowModal(false);
        toast.success("Profile Data added Successfully !");
        
      } else {
        console.error("Failed to add profile");
        toast.error("Error in setting Up Profile. Try Again Later");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePhotoChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  if(loading) {
    return (
      <div>
        <ThreeDots   visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass="" />
      </div>
      
    )
  }

  return (
    <div>
      <Modal
     ariaHideApp={false}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          content: {
            position: "absolute",
            top: "40%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-40%, -40%)",
            overflow: "auto",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            background: "#eee",
            zIndex: "9999",
            boxShadow: "0 5px 8px 0 hsla(0, 0%, 0%, 0.2)",
            transition: "all 0.3s ease-out",
          },
          overlay: {
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: "9998",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <div className="flex flex-col items-center animate-fade-in-down">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 ml-auto transition duration-200 ease-in-out transform hover:scale-105"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <div className="mt-4 p-4 border-b border-gray-200 bg-gray-50 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiUser className="mr-2 text-blue-600" />
              <span className="text-lg">Add Profile Details</span>
            </h2>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                  <FiUser className="mr-2 text-blue-600" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                  <FiPhone className="mr-2 text-blue-600" />
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full outline-none"
                    maxLength={10}
                  />
                  
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                  <FiCalendar className="mr-2 text-blue-600" />
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="profilePhoto"
                >
                  Profile Photo
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                  <FiCamera className="mr-2 text-blue-600" />
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full outline-none"
                  />
                </div>
               
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Toaster position="top-right" />
    </div>
  );
}

export default UserProfileModal;
