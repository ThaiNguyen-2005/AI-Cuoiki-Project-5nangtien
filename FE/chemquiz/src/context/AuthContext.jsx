import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem('access_token') || null);
    const [role, setRoleState] = useState(localStorage.getItem('user_role') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Thêm trạng thái chờ

    const login = (newToken, userRole) => {
        localStorage.setItem('access_token', newToken);
        localStorage.setItem('user_role', userRole);
        setTokenState(newToken);
        setRoleState(userRole);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        setTokenState(null);
        setRoleState(null);
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        if (token) {
            axiosClient.get('/user')
                .then(res => setUser(res.data))
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, role, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};