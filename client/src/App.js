import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard'; // Import the AdminDashboard component
import UserSide from './components/UserSide'; // Import the UserSide component
import AuthRoute from './components/AuthRoute';


// import Price from './components/Price'; // Import the Price component
// import Contact from './components/Contact'; // Import the Contact component
// import WhoWeAre from './components/WhoWeAre'; // Import the WhoWeAre component

function App() {
  const[user,setUser] = useState(null);


  const handleLogin = (userData) => {
    setUser(userData);
  };
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        {user && user.role === 'admin' ? (
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        ) : (
          <Route path="/userSide" element={<UserSide />} />
        )}
        {/* Add routes for other sections */}
      </Routes>
    </Router>
  );
}



export default App;
