// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProductList from './components/Product/ProductList';
import AddProduct from './components/Product/AddProduct';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/produtos" element={<ProductList />} />
                <Route path='/add-produto' element={<AddProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
