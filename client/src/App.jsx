import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Inventory from './components/Inventory';
import { Home } from './pages/Home';
import Cart from './components/Cart';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </Router>
  );
}

export default App;
