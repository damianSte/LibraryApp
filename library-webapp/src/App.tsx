import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import BookPage from './bookDetails/bookPage';
import MyAccount from './myAccount/MyAccount';

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/book/:bookId" element={<BookPage />} />
      <Route path="/my-account" element={<MyAccount />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}
