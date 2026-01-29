import axios from "axios";

// ---------------- Axios instance ----------------
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ---------------- AUTH ----------------

// Signup user
export const signupUser = async (userData) => {
  try {
    const res = await API.post("/auth/signup", userData);
    return res.data;
  } catch (err) {
    console.error("Error signing up:", err);
    throw err;
  }
};

// Login user
export const loginUser = async (loginData) => {
  try {
    const res = await API.post("/auth/login", loginData);
    return res.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

// ---------------- PLANS ----------------

// Get all repair plans
export const getRepairPlans = async () => {
  try {
    const res = await API.get("/plans");
    return res.data;
  } catch (err) {
    console.error("Error fetching plans:", err);
    return [];
  }
};

// Add a new plan
export const addRepairPlan = async (plan) => {
  try {
    const res = await API.post("/plans", plan);
    return res.data;
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
    return res.data;
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
    return res.data.subscribedPlans || [];
  } catch (err) {
    console.error("Error subscribing user:", err);
    throw err;
  }
};

// Unsubscribe user from a plan
export const unsubscribeUserFromPlan = async (userId, planId) => {
  try {
    const res = await API.post(`/users/${userId}/unsubscribe/${planId}`);
    return res.data.subscribedPlans || [];
  } catch (err) {
    console.error("Error unsubscribing user:", err);
    throw err;
  }
};

// Get user subscriptions
export const getUserSubscriptions = async (userId) => {
  try {
    const res = await API.get(`/users/${userId}/subscriptions`);
    return res.data || [];
  } catch (err) {
    console.error("Error fetching user subscriptions:", err);
    return [];
  }
};

// ---------------- EXPORT API INSTANCE ----------------
export default API;
