import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'technician';
}

export interface RepairPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'quarterly' | 'yearly';
  services: string[];
  description: string;
}

export interface Booking {
  id: string;
  userId: string;
  planId: string;
  technicianId: string;
  date: string;
  time: string;
  issue: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  date: string;
  planId: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  date: string;
  read: boolean;
  type: 'service' | 'payment' | 'general';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  plans: RepairPlan[];
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  subscribedPlans: string[];
  subscribeToPlan: (planId: string) => void;
  unsubscribeFromPlan: (planId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockPlans: RepairPlan[] = [
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

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [subscribedPlans, setSubscribedPlans] = useState<string[]>([]);

  const addBooking = (booking: Omit<Booking, 'id'>) => {
    const newBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
    };
    setBookings((prev) => [...prev, newBooking]);
    
    // Add notification
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: booking.userId,
      message: `Service booked for ${booking.date} at ${booking.time}`,
      date: new Date().toISOString(),
      read: false,
      type: 'service',
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment = {
      ...payment,
      id: `payment-${Date.now()}`,
    };
    setPayments((prev) => [...prev, newPayment]);
    
    // Add notification
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: payment.userId,
      message: `Payment of Rs. ${payment.amount.toLocaleString()} ${payment.status === 'paid' ? 'successful' : 'pending'}`,
      date: new Date().toISOString(),
      read: false,
      type: 'payment',
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const subscribeToPlan = (planId: string) => {
    setSubscribedPlans((prev) => [...prev, planId]);
    
    const plan = mockPlans.find((p) => p.id === planId);
    if (plan && user) {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: user.id,
        message: `Successfully subscribed to ${plan.name}`,
        date: new Date().toISOString(),
        read: false,
        type: 'general',
      };
      setNotifications((prev) => [...prev, newNotification]);
    }
  };

  const unsubscribeFromPlan = (planId: string) => {
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

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
