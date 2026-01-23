import React, { createContext, useContext, useState } from 'react';

// Mock plans
const mockPlans = [
  {
    id: '1',
    name: 'Basic Plan',
    price: 2500,
    duration: 'monthly',
    services: [
      'Home appliance diagnostics',
      'Minor electrical repairs',
      'Plumbing checkups',
      '1 Emergency service per month',
    ],
    description: 'Perfect for basic home maintenance needs',
  },
  {
    id: '2',
    name: 'Standard Plan',
    price: 6500,
    duration: 'quarterly',
    services: [
      'All Basic Plan services',
      'AC servicing',
      'Electronics repair',
      '3 Emergency services per quarter',
      'Priority booking',
    ],
    description: 'Comprehensive coverage for your home',
  },
  {
    id: '3',
    name: 'Premium Plan',
    price: 22000,
    duration: 'yearly',
    services: [
      'All Standard Plan services',
      'Unlimited emergency services',
      'Vehicle repairs',
      'Smart device installation',
      '24/7 support',
      'Free annual maintenance',
    ],
    description: 'Complete peace of mind for the whole year',
  },
];

// Create context
const AppContext = createContext();

// Provider
export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [subscribedPlans, setSubscribedPlans] = useState([]);

  // Add booking
  const addBooking = (booking) => {
    const newBooking = { ...booking, id: `booking-${Date.now()}` };
    setBookings((prev) => [...prev, newBooking]);

    // Add notification
    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: booking.userId,
        message: `Service booked for ${booking.date} at ${booking.time}`,
        date: new Date().toISOString(),
        read: false,
        type: 'service',
      },
    ]);
  };

  // Update booking
  const updateBooking = (id, updates) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  // Add payment
  const addPayment = (payment) => {
    const newPayment = { ...payment, id: `payment-${Date.now()}` };
    setPayments((prev) => [...prev, newPayment]);

    // Add notification
    setNotifications((prev) => [
      ...prev,
      {
        id: `notif-${Date.now()}`,
        userId: payment.userId,
        message: `Payment of Rs. ${payment.amount.toLocaleString()} ${
          payment.status === 'paid' ? 'successful' : 'pending'
        }`,
        date: new Date().toISOString(),
        read: false,
        type: 'payment',
      },
    ]);
  };

  // Mark notification as read
  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Subscribe to plan
  const subscribeToPlan = (planId) => {
    setSubscribedPlans((prev) => [...prev, planId]);

    const plan = mockPlans.find((p) => p.id === planId);
    if (plan && user) {
      setNotifications((prev) => [
        ...prev,
        {
          id: `notif-${Date.now()}`,
          userId: user.id,
          message: `Successfully subscribed to ${plan.name}`,
          date: new Date().toISOString(),
          read: false,
          type: 'general',
        },
      ]);
    }
  };

  // Unsubscribe from plan
  const unsubscribeFromPlan = (planId) => {
    setSubscribedPlans((prev) => prev.filter((id) => id !== planId));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        plans: mockPlans,
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

// Hook to use AppContext
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
