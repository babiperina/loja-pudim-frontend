// src/components/AddProduct.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Common.css';
import './AddProduct.css'; // Importe o CSS aqui

const AddProduct = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isNewProduct, setIsNewProduct] = useState(true);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productData, setProductData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        quantidade_em_estoque: ''
    });

    const fetchProducts = async () => {
        try {
            if (!token) {
                navigate('/');
                return;
            }

            const response = await axios.get('http://localhost:3000/api/produtos', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(response.data.data);
            // setProdutos(response.data.data.filter(produto => produto.quantidade_em_estoque > 0));
        } catch (err) {
            console.error('Erro ao buscar produtos:', err.response?.status, err.message);
            if (err.response?.status === 403) {
                localStorage.removeItem('token');
                navigate('/');
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [navigate]);

    const handleToggleChange = () => {
        setIsNewProduct(!isNewProduct);
        setSelectedProduct(null);
        setProductData({
            nome: '',
            descricao: '',
            preco: '',
            quantidade_em_estoque: ''
        });
    };

    const handleProductSelect = (event) => {
        const productId = event.target.value;
        const product = products.find(p => p.id === parseInt(productId));
        setSelectedProduct(product);
        setProductData({
            nome: product.nome,
            descricao: product.descricao || '',
            preco: product.preco,
            quantidade_em_estoque: product.quantidade_em_estoque
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');

            if (isNewProduct) {
                await axios.post('http://localhost:3000/api/produtos', productData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                await axios.put(`http://localhost:3000/api/produtos/${selectedProduct.id}`, productData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
            alert('Produto salvo com sucesso!');
            setProductData({
                nome: '',
                descricao: '',
                preco: '',
                quantidade_em_estoque: ''
            });
            setSelectedProduct(null);
        } catch (err) {
            console.error('Erro ao salvar produto:', err.message);
            alert('Erro ao salvar produto.');
        }
    };

    return (
        <div className="add-product-container">
            <h1>{isNewProduct ? 'Adicionar Novo Produto' : 'Atualizar Produto Existente'}</h1>
            <div className="toggle-container">
                <label>
                    <input
                        type="radio"
                        checked={isNewProduct}
                        onChange={handleToggleChange}
                    />
                    Novo Produto
                </label>
                <label>
                    <input
                        type="radio"
                        checked={!isNewProduct}
                        onChange={handleToggleChange}
                    />
                    Produto Existente
                </label>
            </div>

            <form onSubmit={handleSubmit}>
                {!isNewProduct && (
                    <div className="input-group">
                        <label htmlFor="productSelect">Selecionar Produto</label>
                        <select
                            id="productSelect"
                            value={selectedProduct ? selectedProduct.id : ''}
                            onChange={handleProductSelect}
                        >
                            <option value="">Selecione um produto</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="input-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={productData.nome}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={productData.descricao}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        id="preco"
                        name="preco"
                        value={productData.preco}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="quantidade_em_estoque">Quantidade em Estoque</label>
                    <input
                        type="number"
                        id="quantidade_em_estoque"
                        name="quantidade_em_estoque"
                        value={productData.quantidade_em_estoque}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Salvar Produto</button>
            </form>
        </div>
    );
};

export default AddProduct;
