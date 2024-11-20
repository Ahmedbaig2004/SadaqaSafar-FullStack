import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { updateUserProfile } from "../api/profile";

const UserProfileSettings = () => {
  const { user, setUser, token } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    password: "",
    profilePicture: user?.profilePicture || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(token, formData);
      setUser(updatedUser); // Update user in the auth store
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message || "Error updating profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileSettings;
