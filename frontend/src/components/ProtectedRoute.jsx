import React from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  return authUtils.isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
