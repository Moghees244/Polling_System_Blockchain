// LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here (validate credentials, make API calls, etc.)
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: '#f5f5f5' 
        }}>
            <form style={{ 
                backgroundColor: '#fff', 
                padding: '40px', 
                borderRadius: '10px', 
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', 
                width: '300px', 
                textAlign: 'center' 
            }} onSubmit={handleLogin}>
                <h2 style={{ 
                    marginBottom: '30px', 
                    color: '#333' 
                }}>Admin Login</h2>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            borderBottom: '2px solid #007bff', 
                            backgroundColor: 'transparent', 
                            marginBottom: '15px', 
                            outline: 'none' 
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            border: 'none', 
                            borderBottom: '2px solid #007bff', 
                            backgroundColor: 'transparent', 
                            marginBottom: '15px', 
                            outline: 'none' 
                        }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Link to="/add-voter" style={{ 
                    width: '100%', 
                    textDecoration: 'none' // Remove underline from the link
                }}>
                    <button type="submit" style={{ 
                        width: '100%', 
                        padding: '12px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        backgroundColor: '#007bff', 
                        color   : '#fff', 
                        fontSize: '16px', 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s ease' 
                    }}>Login</button>
                </Link>
            </form>
        </div>
    );
};

