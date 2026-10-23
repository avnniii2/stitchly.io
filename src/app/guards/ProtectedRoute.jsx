import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/useAuth';
import { WrongDoor } from './WrongDoor';
import { NeedleLoader } from '../../components/NeedleLoader';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <NeedleLoader text="Verifying your atelier credentials..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role is not in allowed roles, show friendly Wrong Door page
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <WrongDoor requiredRole={allowedRoles[0]} />;
  }

  return children;
};
