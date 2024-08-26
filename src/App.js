// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar'; // Importe o NavBar

function App() {
    return (
        <Router>
            <NavBar /> {/* Adicione o NavBar */}
            <main>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/produtos" element={<ProductList />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
