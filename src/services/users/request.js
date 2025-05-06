import axios from "axios";
import { API_BASE_URL } from "../../constants/constants.js";
import { endpoints } from "../../constants/constants.js";
const USERS_URL = `${API_BASE_URL}${endpoints.users}`;

// 1. Get all users
export const getAllUsers = async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
};

// 2. Get one user by ID
export const getUserById = async (id) => {
  const response = await axios.get(`${USERS_URL}/${id}`);
  
  return response.data;
};

// 3. Create (POST) a new user
export const createUser = async (userData) => {
  const response = await axios.post(USERS_URL, userData);
  return response.data;
};

// 4. Update (PUT) user completely
export const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${USERS_URL}/${id}`, updatedData);
  return response.data;
};

// 5. Update (PATCH) user partially
export const patchUser = async (id, partialData) => {
  const response = await axios.patch(`${USERS_URL}/${id}`, partialData);
  return response.data;
};

// 6. Delete user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${USERS_URL}/${id}`);
  return response.data;
};