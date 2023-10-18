import React from 'react';
import { clearAuthToken } from './auth'; // Import a function to clear the authentication token
import {useNavigate} from 'react-router-dom';


function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const goMainPage=()=>{
    navigate('/')
  }

  

  const handleLogout = () => {
    // Clear the authentication token
    clearAuthToken();

    // Clear the login status in the parent component
    onLogout();
    goMainPage();


    // Redirect the user to the login page or homepage
    // Example: history.push('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        zIndex: 1000, // ensures the button is above other elements
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
