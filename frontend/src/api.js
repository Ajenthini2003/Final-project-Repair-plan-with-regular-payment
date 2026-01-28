import axios from "axios";

// ---------------- Axios instance ----------------
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ---------------- PLANS ----------------

// Get all repair plans
export const getRepairPlans = async () => {
  try {
    const res = await API.get("/plans");
    return res.data; // array of plans
  } catch (err) {
    console.error("Error fetching plans:", err);
    return [];
  }
};

// Add a new plan
export const addRepairPlan = async (plan) => {
  try {
    const res = await API.post("/plans", plan);
    return res.data; // newly created plan
  } catch (err) {
    console.error("Error adding plan:", err);
    throw err;
  }
};

// ---------------- SERVICES ----------------

// Get all services
export const getServices = async () => {
  try {
    const res = await API.get("/services");
    return res.data; // array of services
  } catch (err) {
    console.error("Error fetching services:", err);
    return [];
  }
};

// ---------------- USER SUBSCRIPTIONS ----------------

// Subscribe user to a plan
export const subscribeUserToPlan = async (userId, planId) => {
  try {
    const res = await API.post(`/users/${userId}/subscribe/${planId}`);
    return res.data.subscribedPlans || []; // FIXED to return array
  } catch (err) {
    console.error("Error subscribing user:", err);
    throw err;
  }
};

// Unsubscribe user from a plan
export const unsubscribeUserFromPlan = async (userId, planId) => {
  try {
    const res = await API.post(`/users/${userId}/unsubscribe/${planId}`);
    return res.data.subscribedPlans || []; // FIXED to return array
  } catch (err) {
    console.error("Error unsubscribing user:", err);
    throw err;
  }
};

// Get user subscriptions
export const getUserSubscriptions = async (userId) => {
  try {
    const res = await API.get(`/users/${userId}/subscriptions`);
    return res.data || []; // FIXED to return array
  } catch (err) {
    console.error("Error fetching user subscriptions:", err);
    return [];
  }
};

// ---------------- EXPORT API INSTANCE ----------------
export default API;
