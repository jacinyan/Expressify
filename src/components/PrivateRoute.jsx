import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@components/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
