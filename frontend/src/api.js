import axios from "axios";

const API_URL = "http://localhost:5000/api/plans";
const USER_API_URL = "http://localhost:5000/api/users";

// ---------------- GET ALL PLANS ----------------
export const getRepairPlans = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // array of plans
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
};

// ---------------- ADD NEW PLAN ----------------
export const addRepairPlan = async (plan) => {
  try {
    const response = await axios.post(API_URL, plan);
    return response.data; // newly created plan
  } catch (error) {
    console.error("Error adding plan:", error);
    throw error;
  }
};

// ---------------- SUBSCRIBE USER TO PLAN ----------------
export const subscribeUserToPlan = async (userId, planId) => {
  try {
    const response = await axios.post(`${USER_API_URL}/${userId}/subscribe/${planId}`);
    return response.data.subscribedPlans || []; // return updated array
  } catch (error) {
    console.error("Error subscribing user to plan:", error);
    throw error;
  }
};

// ---------------- UNSUBSCRIBE USER FROM PLAN ----------------
export const unsubscribeUserFromPlan = async (userId, planId) => {
  try {
    const response = await axios.post(`${USER_API_URL}/${userId}/unsubscribe/${planId}`);
    return response.data.subscribedPlans || []; // return updated array
  } catch (error) {
    console.error("Error unsubscribing user from plan:", error);
    throw error;
  }
};

// ---------------- GET USER SUBSCRIPTIONS ----------------
export const getUserSubscriptions = async (userId) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${userId}/subscriptions`);
    return response.data || []; // array of plan IDs
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
    return [];
  }
};
