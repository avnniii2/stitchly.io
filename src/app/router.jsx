import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { CustomerLayout } from './layouts/CustomerLayout';
import { TailorLayout } from './layouts/TailorLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Route Guards
import { ProtectedRoute } from './guards/ProtectedRoute';

// Public Pages
import { LandingPage } from '../features/landing/LandingPage';
import { HowItWorksPage } from '../features/public/HowItWorksPage';
import { TailorsPage } from '../features/public/TailorsPage';
import { InspirationPage } from '../features/public/InspirationPage';
import { NotFoundPage } from '../features/public/NotFoundPage';

// Auth Pages
import { LoginPage } from '../features/auth/LoginPage';
import { SignupPage } from '../features/auth/SignupPage';
import { OnboardingPage } from '../features/auth/OnboardingPage';

// Protected Customer Pages
import { CustomerDashboard } from '../features/customer/CustomerDashboard';
import { CustomerOrders } from '../features/customer/CustomerOrders';
import { OrderDetailPage } from '../features/customer/OrderDetailPage';
import { StudioPage } from '../features/studio/StudioPage';
import { CustomerTailors } from '../features/customer/CustomerTailors';
import { CustomerWishlist } from '../features/customer/CustomerWishlist';
import { CustomerMeasurements } from '../features/customer/CustomerMeasurements';
import { CustomerGroup } from '../features/customer/CustomerGroup';
import { CustomerProfile } from '../features/customer/CustomerProfile';

// Protected Tailor Pages
import { TailorDashboard } from '../features/tailor/TailorDashboard';
import { TailorInbox } from '../features/tailor/TailorInbox';
import { TailorOrdersKanban } from '../features/tailor/TailorOrdersKanban';
import { TailorPortfolio } from '../features/tailor/TailorPortfolio';
import { TailorPricing } from '../features/tailor/TailorPricing';
import { TailorDispatch } from '../features/tailor/TailorDispatch';
import { TailorEarnings } from '../features/tailor/TailorEarnings';
import { TailorAnalytics } from '../features/tailor/TailorAnalytics';
import { TailorSchedule } from '../features/tailor/TailorSchedule';
import { TailorKyc } from '../features/tailor/TailorKyc';

// Protected Admin Pages
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { AdminVerification } from '../features/admin/AdminVerification';
import { AdminDisputes } from '../features/admin/AdminDisputes';
import { AdminModeration } from '../features/admin/AdminModeration';
import { AdminCatalog } from '../features/admin/AdminCatalog';
import { AdminUsers } from '../features/admin/AdminUsers';
import { AdminTailors } from '../features/admin/AdminTailors';
import { AdminOrders } from '../features/admin/AdminOrders';
import { AdminAnalytics } from '../features/admin/AdminAnalytics';

export const router = createBrowserRouter([
  // Public Section
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'tailors', element: <TailorsPage /> },
      { path: 'inspiration', element: <InspirationPage /> },
    ],
  },

  // Auth Section
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { 
    path: '/onboarding', 
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ) 
  },

  // Protected Customer Portal (/app/*)
  {
    path: '/app',
    element: (
      <ProtectedRoute allowedRoles={['customer']}>
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CustomerDashboard /> },
      { path: 'studio', element: <StudioPage /> },
      { path: 'tailors', element: <CustomerTailors /> },
      { path: 'orders', element: <CustomerOrders /> },
      { path: 'orders/:id', element: <OrderDetailPage /> },
      { path: 'wishlist', element: <CustomerWishlist /> },
      { path: 'measurements', element: <CustomerMeasurements /> },
      { path: 'group', element: <CustomerGroup /> },
      { path: 'profile', element: <CustomerProfile /> },
      { path: '*', element: <Navigate to="/app" replace /> },
    ],
  },

  // Protected Tailor Portal (/tailor/*)
  {
    path: '/tailor',
    element: (
      <ProtectedRoute allowedRoles={['tailor']}>
        <TailorLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <TailorDashboard /> },
      { path: 'inbox', element: <TailorInbox /> },
      { path: 'orders', element: <TailorOrdersKanban /> },
      { path: 'portfolio', element: <TailorPortfolio /> },
      { path: 'pricing', element: <TailorPricing /> },
      { path: 'dispatch', element: <TailorDispatch /> },
      { path: 'earnings', element: <TailorEarnings /> },
      { path: 'analytics', element: <TailorAnalytics /> },
      { path: 'schedule', element: <TailorSchedule /> },
      { path: 'kyc', element: <TailorKyc /> },
      { path: '*', element: <Navigate to="/tailor" replace /> },
    ],
  },

  // Protected Admin Portal (/admin/*)
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'verification', element: <AdminVerification /> },
      { path: 'disputes', element: <AdminDisputes /> },
      { path: 'moderation', element: <AdminModeration /> },
      { path: 'catalog', element: <AdminCatalog /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'tailors', element: <AdminTailors /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: '*', element: <Navigate to="/admin" replace /> },
    ],
  },

  // Global 404 Route
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
