import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './login-form/LoginForm';
import HomePage from './home-page/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
