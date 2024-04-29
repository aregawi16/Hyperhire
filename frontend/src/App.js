import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import BookListPage from './BookListPage';
import CreateBookPage from './CreateBookPage';
import CreateAccountPage from './CreateAccount';
import { LoginPage } from './LoginPage';
import MyCart from './MyCart';
import MyOrder from './MyOrder';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<BookListPage />} />
      <Route path="/create-book" element={<CreateBookPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-cart" element={<MyCart />} />
      <Route path="/my-order" element={<MyOrder />} />
    </Routes>
  </Router>
  );
};

export default App;