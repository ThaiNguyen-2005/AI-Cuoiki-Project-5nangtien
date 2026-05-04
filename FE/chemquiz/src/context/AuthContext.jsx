import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem('access_token') || null);
    const [role, setRoleState] = useState(localStorage.getItem('user_role') || null);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user_data');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    // NÚT THẮT: Nếu đã có token và role trong máy thì KHÔNG ĐỢI (loading = false luôn)
    const [loading, setLoading] = useState(token && role ? false : false); 

    const login = (newToken, userData) => {
        localStorage.setItem('access_token', newToken);
        localStorage.setItem('user_role', userData.role);
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setTokenState(newToken);
        setRoleState(userData.role);
        setUser(userData);
        setLoading(false);
    };

    const logout = () => {
        localStorage.clear();
        setTokenState(null);
        setRoleState(null);
        setUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        if (token) {
            // Cứ để nó chạy ngầm để cập nhật dữ liệu mới nhất, không chặn màn hình của user
            axiosClient.get('/user')
                .then(res => {
                    setUser(res.data);
                    setRoleState(res.data.role);
                    localStorage.setItem('user_role', res.data.role);
                })
                .catch(err => {
                    if (err.response?.status === 401) logout();
                })
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
