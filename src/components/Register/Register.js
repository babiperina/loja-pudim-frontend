// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Importe o CSS aqui


const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/api/register', { nome, email, senha });
            
            if (response.data.message === 'Usuário criado com sucesso') {
                navigate('/login');
            } else {
                setError('Erro ao criar conta');
            }
        } catch (err) {
            setError('Erro ao criar conta');
        }
    };

    return (
        <div className="register-container">
            <h1>Criar Conta</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Register;
