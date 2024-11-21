import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { updateNGOProfile } from "../api/profile";

const NGOProfileSettings = () => {
  const { ngo, setNGO, token } = useAuthStore();
  const [formData, setFormData] = useState({
    name: ngo?.name || "",
    password: "",
    confirmPassword: "",
    registrationNumber: ngo?.registrationNumber || "",
    domain: ngo?.domain || "",
    description: ngo?.description || "",
    logo: ngo?.logo || "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const updatedNGO = await updateNGOProfile(token, formData);
      setNGO(updatedNGO); // Update NGO in the auth store
      alert("Profile updated successfully!");
      setError(""); // Clear error if successful
    } catch (error) {
      alert(error.message || "Error updating profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">NGO Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        {/* NGO Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">NGO Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
          />
        </div>

        {/* Registration Number Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Registration Number</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
            required
          />
        </div>

        {/* Domain Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Domain</label>
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Logo URL Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Logo URL</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500  dark:text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default NGOProfileSettings;
