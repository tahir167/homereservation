import axios from "axios";
import { API_BASE_URL, endpoints } from "../../constants/constants.js";

// 1. Get all apartments
export const getAllApartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.apartments}`);
    return {
      data: response.data,
      message: "Apartments received successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to fetch apartments"
    };
  }
};

// 2. Get apartment by ID
export const getApartmentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.apartments}/${id}`);
    return {
      data: response.data,
      message: "Apartment received successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to fetch apartment"
    };
  }
};

// 3. Create new apartment
export const createApartment = async (apartmentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoints.apartments}`, apartmentData);
    return {
      data: response.data,
      message: "Apartment created successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to create apartment"
    };
  }
};

// 4. Full update (PUT)
export const updateApartment = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoints.apartments}/${id}`, updatedData);
    return {
      data: response.data,
      message: "Apartment updated successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to update apartment"
    };
  }
};

// 5. Partial update (PATCH)
export const patchApartment = async (id, partialData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}${endpoints.apartments}/${id}`, partialData);
    return {
      data: response.data,
      message: "Apartment patched successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to patch apartment"
    };
  }
};

// 6. Delete apartment
export const deleteApartment = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoints.apartments}/${id}`);
    return {
      data: response.data,
      message: "Apartment deleted successfully"
    };
  } catch (error) {
    return {
      data: null,
      message: "Failed to delete apartment"
    };
  }
};
