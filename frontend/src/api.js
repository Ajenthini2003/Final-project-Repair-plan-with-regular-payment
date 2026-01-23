import axios from "axios";

const API_URL = "http://localhost:5000/repairs"; // backend URL

export const getRepairPlans = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addRepairPlan = async (plan) => {
  try {
    const response = await axios.post(API_URL, plan);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
