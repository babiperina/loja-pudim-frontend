// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // src/components/ProductList.js

        const fetchProdutos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/produtos', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProdutos(response.data.data);
            } catch (err) {
                console.error('Erro ao buscar produtos:', err.response?.status, err.message);
                if (err.response?.status === 403) {
                    // Token inválido ou expirado
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        fetchProdutos();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="product-list-container">
            <h1>Lista de Produtos</h1>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        {produto.nome} - {produto.preco} reais
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
