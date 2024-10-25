// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Check local storage for saved user data
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', { username, password });
            const loggedInUser = { username: response.data.username };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser)); // Save user to local storage
        } catch (error) {
            console.error('Login failed:', error.response.data);
            alert('Login failed: ' + error.response.data.error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from local storage
    };

    const register = async (username, email, password) => {
        try {
            await axios.post('http://127.0.0.1:8000/api/accounts/register/', { username, email, password });
            alert('Registration successful. You can now log in.');
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            alert('Registration failed: ' + error.response.data.email.join(', '));
        }
    };

    useEffect(() => {
        // Load user from local storage on initial mount
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
