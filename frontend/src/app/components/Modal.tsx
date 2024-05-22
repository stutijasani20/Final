import React, { useState } from "react";
import axios from "axios";

const ProfilePage: React.FC = () => {
  const [name, setName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      const id = localStorage.getItem("userId");
      formData.set("user", id);
      formData.append("name", name);

      formData.append("phone", phoneNumber);
      formData.append("birth_date", birthdate);

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
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
      console.log("Profile saved successfully:", response.data);
      localStorage.setItem("profileData", "true");
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("An error occurred while saving the profile.");
      // Handle error, show error message to user, etc.
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-8">User Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-bold mb-2"
          >
            Phone Number:
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="birthdate"
            className="block text-gray-700 font-bold mb-2"
          >
            Birthdate:
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="profilePhoto"
            className="block text-gray-700 font-bold mb-2"
          >
            Profile Photo:
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            onChange={(e) =>
              setProfilePhoto(e.target.files ? e.target.files[0] : null)
            }
            className="border border-gray-400 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
