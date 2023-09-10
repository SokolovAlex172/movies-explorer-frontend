import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children }) =>  loggedIn ? children : <Navigate to='/' />;

export default ProtectedRoute;