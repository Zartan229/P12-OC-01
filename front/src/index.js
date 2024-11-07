import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import User from './pages/User.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<Navigate to="/user" />} />
      </Routes>
    </Router>
  </React.StrictMode>
);