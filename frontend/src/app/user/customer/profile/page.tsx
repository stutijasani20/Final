/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast, Toaster } from "react-hot-toast";
import UserProfileModal from "@/app/components/Modal";

interface UserProfile {
  results: any;
  id: number;
  name: string;
  profile_photo: string;
  phone: number;
  birth_date: string | null;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    name: "",
    profile_photo: "",
    phone: 0,
    birth_date: null,
    results: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false); 
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get<UserProfile>(
        `http://127.0.0.1:8000/profile/?user=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(response.data.results[0]);
     
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfile({
        ...profile,
        profile_photo: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("user", userId ?? "");
      formData.append("name", profile.name);
      formData.append("phone", profile.phone.toString());
      if (profile.profile_photo) {
        formData.append("profile_photo", profile.profile_photo);
      }
      formData.append("birth_date", profile.birth_date ?? "");

      await axios.put(
        `http://127.0.0.1:8000/profile/${profile.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setShowModal(false);
      toast.success("Profile Update Successfully !")
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error in Updating Profile. Try Again Later !")
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/users/change_password/${userId}/`,
        {
          old_password: passwords.currentPassword,
          new_password: passwords.newPassword,
          confirm_new_password: passwords.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Password updated successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordModal(false);
      toast.success("Password Updated Successfully !");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(
        "An error occurred while updating the password. Please try again later."
      );
    }
  };

  return (
    <div className="p-4" >
      <div className="w-full max-w-lg mx-auto border rounded-lg overflow-hidden relative">
        <div className="p-4 flex items-center bg-white border-blue-500">
          {profile.profile_photo && (
            <img
              className="w-20 h-20 object-cover rounded-full mr-4"
              src={profile.profile_photo}
              alt="Profile Photo"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
            <p className="text-lg">Name: {profile.name}</p>
            <p className="text-lg">Phone: {profile.phone}</p>
            <p className="text-lg">Birth Date: {profile.birth_date ? new Date(profile.birth_date).toLocaleDateString('en-GB') : 'N/A'}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowModal(true)}
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md relative">
            <span
              className="absolute top-0 right-0 p-2 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Photo:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Birth Date:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  name="birth_date"
                  value={profile.birth_date ?? ""}
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow-md relative">
            <span
              className="absolute top-0 right-0 p-2 cursor-pointer"
              onClick={() => setShowPasswordModal(false)}
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Current Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  New Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm New Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          },
          duration: 4000, // Duration in milliseconds
          // Other options...
        }}
      />
    </div>
  );
};

export default ProfilePage;
