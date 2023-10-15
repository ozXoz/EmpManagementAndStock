// AuthRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getAuthToken } from './auth';

function AuthRoute({ element, ...props }) {
  const authToken = getAuthToken();

  if (!authToken) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Route element={element} {...props} />;
}

export default AuthRoute;
