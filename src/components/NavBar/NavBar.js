// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Importe o CSS aqui


const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                {token ? (
                    <>
                        <li><Link to="/produtos">Produtos</Link></li>
                        <li><Link to = "/add-produto">Adicionar Produto</Link></li>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
