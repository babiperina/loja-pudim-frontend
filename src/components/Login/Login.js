// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Common.css';
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
            setError('Credenciais inválidas. Email ou senha incorretos. Tente novamente ou crie uma conta.');
        }
    };

    return (
        <div className="forms-container">
            <h1>Fazer login</h1>
            <form onSubmit={handleLogin}>
                {error && <p className='error-message'>{error}</p>}
                <div className='input-group'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@email.com'
                        required
                    />
                </div>
                <div className='input-group'>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder='********'
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
                <button onClick={() => navigate('/register')}>Criar Conta</button>
            </form>
        </div>
    );
};

export default Login;
