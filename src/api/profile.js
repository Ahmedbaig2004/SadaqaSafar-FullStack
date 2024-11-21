import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const updateUserProfile = async (token, userData) => {
  try {
    const response = await api.put('/profile/user', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    console.error('Profile update error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

export const updateNGOProfile = async (token, ngoData) => {
  try {
    const response = await api.put('/profile/ngo', ngoData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.ngo;
  } catch (error) {
    console.error('NGO Profile update error:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to update NGO profile');
  }
};