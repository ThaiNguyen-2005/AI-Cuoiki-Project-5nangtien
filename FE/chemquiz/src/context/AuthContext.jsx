import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient'; // Gọi axiosClient để xài API

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setTokenState] = useState(localStorage.getItem('access_token') || null);
    const [role, setRoleState] = useState(localStorage.getItem('user_role') || null);
    const [user, setUser] = useState(null); // Giỏ đựng thông tin user (tên, email, role...)

    // 1. Hàm gọi API lấy thông tin chi tiết người dùng
    const fetchUserProfile = async () => {
        if (token) {
            try {
                // Gọi API /user (BE trả về thông tin của token hiện tại)
                const response = await axiosClient.get('/user');
                setUser(response.data); // Nhét data vào state
            } catch (error) {
                console.error("Lỗi lấy thông tin user:", error);
                // Nếu token bị sai hoặc hết hạn (401), tự động logout luôn
                if (error.response?.status === 401) {
                    logout();
                }
            }
        }
    };

    // 2. Tự động lấy thông tin user mỗi khi có token (lúc load trang hoặc vừa login xong)
    useEffect(() => {
        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    // 3. Hàm xử lý khi Đăng nhập thành công
    const login = (newToken, userRole) => {
        localStorage.setItem('access_token', newToken);
        localStorage.setItem('user_role', userRole);
        setTokenState(newToken);
        setRoleState(userRole);
    };

    // 4. Hàm Đăng xuất
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        setTokenState(null);
        setRoleState(null);
        setUser(null);
        
        // Đẩy người dùng về trang login và xóa sạch trạng thái cũ của trình duyệt
        window.location.href = '/login';
    };

    // Phân phát dữ liệu đi khắp dự án
    return (
        <AuthContext.Provider value={{ token, role, user, login, logout, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};