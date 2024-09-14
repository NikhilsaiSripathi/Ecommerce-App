import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Use the custom hook

const ProtectedRoute = ({ component: Component, roles }) => {
  const { authState } = useAuth();  // Access auth state via useAuth

  // Check if the user is authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  // Check if the user has the required role
  if (!roles.includes(authState.user.role)) {
    return <Navigate to="/" />;  // Redirect to home if the user doesn't have permission
  }

  // If authenticated and role is correct, render the component
  return <Component />;
};

export default ProtectedRoute;