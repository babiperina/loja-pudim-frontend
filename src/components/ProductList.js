// src/components/ProductList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/produtos');
                setProdutos(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <h2>{produto.nome}</h2>
                        <p>Descrição: {produto.descricao || 'N/A'}</p>
                        <p>Preço: R${produto.preco.toFixed(2)}</p>
                        <p>Quantidade em Estoque: {produto.quantidade_em_estoque}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
