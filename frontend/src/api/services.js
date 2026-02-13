import axios from "axios";

const BASE_URL = "http://localhost:5000/api/services";

export const getServices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
};
