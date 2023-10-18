import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserSide from './components/UserSide';
import AuthRoute from './components/AuthRoute';
import ProductType from './components/ProductType'; // Import the ProductType component
import Products from './components/Products';
import LogoutButton from './components/LogoutButton';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Pricing from './components/Pricing';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null); // Clear the user when logging out
  };

  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        {user && user.role === 'admin' ? (
          <>
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            {/* Add a new Route for the ProductType component */}
            <Route path="/product-types" element={<ProductType />} />
            <Route path="/products" element={<Products />} />
          </>
        ) : (
          <Route path="/userSide" element={<UserSide />} />
        )}
      </Routes>

      {/* Conditionally render the LogoutButton based on the user */}
      {user && <LogoutButton onLogout={handleLogout} />}
      
    </Router>
  );
}

export default App;
