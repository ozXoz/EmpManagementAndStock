import React from 'react';
import { useNavigate } from 'react-router-dom'; // Corrected import statement
import '../css/MainPage.css'; // Importing a CSS file for styling
import Contact from './Contact';

import AboutUs from './AboutUs';
import Pricing from './Pricing';


function MainPage() {
  const navigate = useNavigate(); // Initialize navigate
  const goToLogin = () => {
    navigate('/login'); // Navigate to the login route (change this route to match your login page route)
  }

  const goToSignUp = () => {
    navigate('/register'); // Navigate to the login route (change this route to match your login page route)
  }
  const goToContact = () => {
    navigate('/contact'); // Navigate to the login route (change this route to match your login page route)
  }
  const goToExperience = () => {
    navigate('/experience'); // Navigate to the login route (change this route to match your login page route)
  }

  const goToAboutUs = () => {
    navigate('/aboutus'); // Navigate to the login route (change this route to match your login page route)
  }
  const goToPricing = () => {
    navigate('/pricing'); // Navigate to the login route (change this route to match your login page route)
  }

  return (
    <div className="container">
      <h1 className="title">Main Page Business</h1>
      <div className="button-container">
        <button type="button" className="button" onClick={goToLogin}>Login</button> 
        <button type="button" className="button" onClick={goToSignUp}>Register</button> 
        <button type="button" className="button" onClick={goToContact}>Contact</button> 

        <button type="button" className="button" onClick={goToAboutUs}>About Us</button> 
        <button type="button" className="button" onClick={goToPricing}>Pricing </button> 




      </div>
    </div>
  );
}

export default MainPage;
