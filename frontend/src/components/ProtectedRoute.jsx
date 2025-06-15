import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // Non connecté → redirection vers login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Mauvais rôle → redirection vers dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;