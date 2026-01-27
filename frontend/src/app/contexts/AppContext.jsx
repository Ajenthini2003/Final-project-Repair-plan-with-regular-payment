import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getRepairPlans,
  subscribeUserToPlan,
  unsubscribeUserFromPlan,
  getUserSubscriptions,
} from "../../api"; // Make sure these are in api.js

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [subscribedPlans, setSubscribedPlans] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // ---------------- FETCH ALL PLANS ----------------
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getRepairPlans();
        setPlans(data);
      } catch (err) {
        console.error("Failed to fetch plans:", err);
      }
    };
    fetchPlans();
  }, []);

  // ---------------- FETCH USER SUBSCRIPTIONS ----------------
  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;
      try {
        const subs = await getUserSubscriptions(user.id); // returns array of plan IDs
        setSubscribedPlans(subs);
      } catch (err) {
        console.error("Failed to fetch user subscriptions:", err);
      }
    };
    fetchSubscriptions();
  }, [user]);

  // ---------------- SUBSCRIBE TO PLAN ----------------
  const subscribeToPlan = async (planId) => {
    if (!user) return;

    try {
      const data = await subscribeUserToPlan(user.id, planId);
      setSubscribedPlans(data.subscribedPlans || []);

      const plan = plans.find((p) => p._id === planId || p.id === planId);
      if (plan) {
        setNotifications((prev) => [
          ...prev,
          {
            id: `notif-${Date.now()}`,
            userId: user.id,
            message: `Subscribed to ${plan.name}`,
            date: new Date().toISOString(),
            read: false,
            type: "subscription",
          },
        ]);
      }
    } catch (err) {
      console.error("Subscription failed:", err);
    }
  };

  // ---------------- UNSUBSCRIBE FROM PLAN ----------------
  const unsubscribeFromPlan = async (planId) => {
    if (!user) return;

    try {
      const data = await unsubscribeUserFromPlan(user.id, planId);
      setSubscribedPlans(data.subscribedPlans || []);

      const plan = plans.find((p) => p._id === planId || p.id === planId);
      if (plan) {
        setNotifications((prev) => [
          ...prev,
          {
            id: `notif-${Date.now()}`,
            userId: user.id,
            message: `Unsubscribed from ${plan.name}`,
            date: new Date().toISOString(),
            read: false,
            type: "subscription",
          },
        ]);
      }
    } catch (err) {
      console.error("Unsubscription failed:", err);
    }
  };

  // ---------------- BOOKINGS ----------------
  const addBooking = (booking) => {
    const newBooking = { ...booking, id: `booking-${Date.now()}` };
    setBookings((prev) => [...prev, newBooking]);

    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: booking.userId,
        message: `Service booked for ${booking.date} at ${booking.time}`,
        date: new Date().toISOString(),
        read: false,
        type: "service",
      },
    ]);
  };

  const updateBooking = (id, updates) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  // ---------------- PAYMENTS ----------------
  const addPayment = (payment) => {
    const newPayment = { ...payment, id: `payment-${Date.now()}` };
    setPayments((prev) => [...prev, newPayment]);

    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: payment.userId,
        message: `Payment of Rs. ${payment.amount.toLocaleString()} ${
          payment.status === "paid" ? "successful" : "pending"
        }`,
        date: new Date().toISOString(),
        read: false,
        type: "payment",
      },
    ]);
  };

  // ---------------- NOTIFICATIONS ----------------
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        plans,
        bookings,
        addBooking,
        updateBooking,
        payments,
        addPayment,
        notifications,
        markNotificationRead,
        subscribedPlans,
        subscribeToPlan,
        unsubscribeFromPlan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
