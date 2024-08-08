import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProtectedRouteProps from '../interfaces/protectedRouteProps.interface';


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { token } = useAuth();

  const isAuthenticated = token || localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
