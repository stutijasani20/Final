// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface UserProfile {
//   id: number;
//   name: string;
//   profile_photo: string; // Changed to string to store URL
//   phone: number;
//   birth_date: string | null;
// }

// const ProfilePage: React.FC = () => {
//   const [profile, setProfile] = useState<UserProfile>({
//     id: 0,
//     name: "",
//     profile_photo: "",
//     phone: 0,
//     birth_date: null,
//   });
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     // Fetch user profile data
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await axios.get<UserProfile>(
//         `http://127.0.0.1:8000/profile/?user=${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProfile(response.data.results[0]);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

 
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setProfile({
//         ...profile,
//         profile_photo: URL.createObjectURL(e.target.files[0]), // Create a URL for the file
//       });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.set("user", userId ?? "");
//       formData.append("name", profile.name);
//       formData.append("phone", profile.phone.toString());
//       if (profile.profile_photo) {
//         formData.append("profile_photo", profile.profile_photo);
//       }
//       formData.append("birth_date", profile.birth_date ?? "");

//       await axios.put(
//         `http://127.0.0.1:8000/profile/${profile.id}/`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Profile updated successfully");
//       setShowModal(false); // Close the modal after updating
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="w-full max-w-lg mx-auto border rounded-lg overflow-hidden relative">
//         <div className="p-4 flex items-center">
//           {profile.profile_photo && (
//             <img
//               className="w-20 h-20 object-cover rounded-full mr-4"
//               src={profile.profile_photo}
//               alt="Profile Photo"
//             />
//           )}
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
//             <p className="text-lg">Name: {profile.name}</p>
//             <p className="text-lg">Phone: {profile.phone}</p>
//             <p className="text-lg">Birth Date: {profile.birth_date}</p>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//               onClick={() => setShowModal(true)}
//             >
//               Update
//             </button>
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
//           <div className="bg-white p-4 rounded shadow-md">
//             <span
//               className="absolute top-0 right-0 p-2 cursor-pointer"
//               onClick={() => setShowModal(false)}
//             >
//               &times;
//             </span>
//             <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Name:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="text"
//                   name="name"
//                   value={profile.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Profile Photo:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Phone:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="tel"
//                   name="phone"
//                   value={profile.phone}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Birth Date:
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   type="date"
//                   name="birth_date"
//                   value={profile.birth_date ?? ""}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                 type="submit"
//               >
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
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
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch user profile data
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
      console.log("Profile updated successfully");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
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
        },
        {
          headers: {
            
            Authorization: `Bearer ${token}`,
            "Content-Type": "mu"
          },
        }
      );
      console.log("Password updated successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="w-full max-w-lg mx-auto border rounded-lg overflow-hidden relative">
        <div className="p-4 flex items-center">
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
            <p className="text-lg">Birth Date: {profile.birth_date}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setShowModal(true)}
            >
              Update
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

            <h2 className="text-2xl font-bold mt-6 mb-4">Reset Password</h2>
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
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

