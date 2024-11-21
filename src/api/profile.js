import axios from "axios";

const API_URL = "http://localhost:3000/api/profile";

export const updateUserProfile = async (token, userData) => {
  const response = await axios.put(`${API_URL}/user`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateNGOProfile = async (token, ngoData) => {
  const response = await axios.put(`${API_URL}/ngo`, ngoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
