import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setAuthToken } from './auth';


function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        // Parse the response JSON once
        const loggedInUser = await response.json();

        // Store the authentication token in local storage
        setAuthToken(loggedInUser.token);

        
        // Check the role and handle redirection
        if (loggedInUser.role === 'admin') {
          navigate('/adminDashboard'); // Redirect to adminDashboard
        } else {
          navigate('/userSide'); // Redirect to userSide
        }
  
        // Handle other logic, such as storing the user data
        onLogin(loggedInUser);
      } else {
        // Handle login failure (e.g., show an error message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
