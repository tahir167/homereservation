import axios from "axios";
import { API_BASE_URL, endpoints } from "../../constants/constants.js";

export const getAllbook = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.bookings}`);
    return {
      data: response.data,
      message: " received successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to fetch "
    };
  }
};

export const getbookById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.bookings}/${id}`);
    return {
      data: response.data,
      message: " received successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to fetch "
    };
  }
};

export const createbook = async (booktData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoints.bookings}`, booktData);
    return {
      data: response.data,
      message: " created successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to create "
    };
  }
};

export const updatebook = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoints.bookings}/${id}`, updatedData);
    return {
      data: response.data,
      message: " updated successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to update "
    };
  }
};

export const patchbook = async (id, partialData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}${endpoints.bookings}/${id}`, partialData);
    return {
      data: response.data,
      message: " patched successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to patch "
    };
  }
};

export const deletebook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoints.bookings}/${id}`);
    return {
      data: response.data,
      message: "deleted successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to delete "
    };
  }
};
