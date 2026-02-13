import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/sonner';
import { DashboardLayout } from './components/DashboardLayout';
import AdminLayout from './components/admin/AdminLayout'; // ✅ FIXED IMPORT

import { OnboardingPage } from './pages/OnboardingPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { PlansPage } from './pages/PlansPage';
import { ServicesPage } from './pages/ServicesPage';
import { TechniciansPage } from './pages/TechniciansPage';
import { BookServicePage } from './pages/BookServicePage';
import { ServiceHistoryPage } from './pages/ServiceHistoryPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SupportPage } from './pages/SupportPage';
import { ProfilePage } from './pages/ProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UsersManagement } from './pages/admin/UsersManagement';
import { TechniciansManagement } from './pages/admin/TechniciansManagement';
import { ServicesManagement } from './pages/admin/ServicesManagement';
import { PlansManagement } from './pages/admin/PlansManagement';
import { PaymentsManagement } from './pages/admin/PaymentsManagement';
import { BookingsManagement } from './pages/admin/BookingsManagement';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { ReportsAnalytics } from './pages/admin/ReportsAnalytics';

function ProtectedRoute({ children }) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

function AdminRoute({ children }) {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
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
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/plans" element={
          <ProtectedRoute>
            <PlansPage />
          </ProtectedRoute>
        } />

        <Route path="/services" element={
          <ProtectedRoute>
            <ServicesPage />
          </ProtectedRoute>
        } />

        <Route path="/technicians" element={
          <ProtectedRoute>
            <TechniciansPage />
          </ProtectedRoute>
        } />

        <Route path="/book-service" element={
          <ProtectedRoute>
            <BookServicePage />
          </ProtectedRoute>
        } />

        <Route path="/history" element={
          <ProtectedRoute>
            <ServiceHistoryPage />
          </ProtectedRoute>
        } />

        <Route path="/payments" element={
          <ProtectedRoute>
            <PaymentsPage />
          </ProtectedRoute>
        } />

        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        } />

        <Route path="/support" element={
          <ProtectedRoute>
            <SupportPage />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        <Route path="/admin/users" element={
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        } />

        <Route path="/admin/technicians" element={
          <AdminRoute>
            <TechniciansManagement />
          </AdminRoute>
        } />

        <Route path="/admin/services" element={
          <AdminRoute>
            <ServicesManagement />
          </AdminRoute>
        } />

        <Route path="/admin/plans" element={
          <AdminRoute>
            <PlansManagement />
          </AdminRoute>
        } />

        <Route path="/admin/payments" element={
          <AdminRoute>
            <PaymentsManagement />
          </AdminRoute>
        } />

        <Route path="/admin/bookings" element={
          <AdminRoute>
            <BookingsManagement />
          </AdminRoute>
        } />

        <Route path="/admin/notifications" element={
          <AdminRoute>
            <AdminNotifications />
          </AdminRoute>
        } />

        <Route path="/admin/reports" element={
          <AdminRoute>
            <ReportsAnalytics />
          </AdminRoute>
        } />

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
