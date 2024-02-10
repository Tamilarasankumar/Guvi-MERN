import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import logo from './assets/guvilogo.webp'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', backgroundColor: 'white', color: 'black' }}>
    <img src={logo} alt="GUVI Logo" style={{ width: '70%', maxHeight: '400px', marginTop: '20px' }} />

    <p style={{ marginTop: '20px', fontSize: '18px' }}>Click here to Register</p>

    <Link to="/register">
      <button style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', marginTop: '20px', fontSize: '16px' }}>
        Enroll Now
      </button>
    </Link>
  </div>
  );
};

export default App;
