import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/app/contexts/AppContext';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { Toaster } from '@/app/components/ui/sonner';
import { DashboardLayout } from '@/app/components/DashboardLayout';
import { OnboardingPage } from '@/app/pages/OnboardingPage';
import { LandingPage } from '@/app/pages/LandingPage';
import { LoginPage } from '@/app/pages/LoginPage';
import { SignUpPage } from '@/app/pages/SignUpPage';
import { DashboardPage } from '@/app/pages/DashboardPage';
import { PlansPage } from '@/app/pages/PlansPage';
import { ServicesPage } from '@/app/pages/ServicesPage';
import { TechniciansPage } from '@/app/pages/TechniciansPage';
import { BookServicePage } from '@/app/pages/BookServicePage';
import { ServiceHistoryPage } from '@/app/pages/ServiceHistoryPage';
import { PaymentsPage } from '@/app/pages/PaymentsPage';
import { NotificationsPage } from '@/app/pages/NotificationsPage';
import { SupportPage } from '@/app/pages/SupportPage';
import { ProfilePage } from '@/app/pages/ProfilePage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <PlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technicians"
          element={
            <ProtectedRoute>
              <TechniciansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-service"
          element={
            <ProtectedRoute>
              <BookServicePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <ServiceHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </LanguageProvider>
  );
}