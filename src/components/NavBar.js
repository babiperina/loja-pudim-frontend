// src/components/NavBar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Se desejar adicionar estilos personalizados

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/produtos">Produtos</Link></li>
                <li><Link to="/register">Registro</Link></li>
                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;
