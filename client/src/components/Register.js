import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/Register.css'; // Importing a CSS file for styling

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    // Add other registration fields as needed
  });

  const navigate = useNavigate(); // Initialize navigate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          // Include other registration fields in the request body
        }),
      });

      if (response.ok) {
        // Successful registration, handle the response (e.g., show a success message)
        console.log('Registration successful');
        onRegister(); // Call the callback to indicate successful registration
        // Redirect to the login page
        navigate('/login'); // Programmatically navigate to the login page      } else {
        // Handle registration failure (e.g., show an error message)
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container">
  <h2 className="register-header">Register</h2> 
     <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other registration fields */}
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
  
}

export default Register;
