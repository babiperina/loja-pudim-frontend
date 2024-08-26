// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Common.css';
import './Product.css';

const ProductList = () => {
    const [produtos, setProdutos] = useState([]);
    const navigate = useNavigate();


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
            // setProdutos(response.data.data);
            setProdutos(response.data.data.filter(produto => produto.quantidade_em_estoque > 0));
        } catch (err) {
            console.error('Erro ao buscar produtos:', err.response?.status, err.message);
            if (err.response?.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, [navigate]);

    // Função para adicionar um ao estoque
    const adicionarUmNoEstoque = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/produtos/${id}/adicionar`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProdutos(produtos.map(produto =>
                produto.id === id ? { ...produto, quantidade: produto.quantidade_em_estoque + 1 } : produto
            ));
            fetchProdutos();  // Recarrega os produtos após a adição
        } catch (err) {
            console.error('Erro ao adicionar ao estoque:', err.response?.status, err.message);
        }
    };

    // Função para remover um do estoque
    const removerUmDoEstoque = async (id) => {
        try {
            await axios.patch(`http://localhost:3000/api/produtos/${id}/remover`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProdutos(produtos.map(produto =>
                produto.id === id && produto.quantidade_em_estoque > 0 ? { ...produto, quantidade_em_estoque: produto.quantidade - 1 } : produto
            ));
            fetchProdutos();  // Recarrega os produtos após a adição
        } catch (err) {
            console.error('Erro ao remover do estoque:', err.response?.status, err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="product-list-container">
            <h1>Lista de Produtos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome do Produto</th>
                        <th>Preço</th>
                        <th>Quantidade em Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>R${produto.preco}</td>
                            <td>{produto.quantidade_em_estoque}</td>
                            <td>
                                <button onClick={() => adicionarUmNoEstoque(produto.id)}>+</button>
                                <button onClick={() => removerUmDoEstoque(produto.id)}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
