import React from 'react';
import { clearAuthToken } from './auth'; // Import a function to clear the authentication token

function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    // Clear the authentication token
    clearAuthToken();

    // Clear the login status in the parent component
    onLogout();

    // Redirect the user to the login page or homepage
    // Example: history.push('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
