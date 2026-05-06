import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use((config) => {
    // Thống nhất dùng access_token[cite: 5]
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Không đá văng khi đang ở trang login[cite: 5]
            if (window.location.pathname !== '/login') {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_role');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
export default axiosClient;