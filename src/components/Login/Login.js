// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importe o CSS aqui


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        
        try {
            // Simulação de login. Substitua com a chamada real à API de autenticação.
            const response = await axios.post('http://localhost:3000/api/login', { email, senha });
            
            if (response.data.token) {
                // Armazenar o token (opcional) e redirecionar
                localStorage.setItem('token', response.data.token);
                navigate('/produtos');
            } else {
                setError('Credenciais inválidas');
            }
        } catch (err) {
            setError('Erro ao fazer login');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Entrar</button>
                {error && <p>{error}</p>}
            </form>
            <button onClick={() => navigate('/register')}>Criar Conta</button>
        </div>
    );
};

export default Login;
