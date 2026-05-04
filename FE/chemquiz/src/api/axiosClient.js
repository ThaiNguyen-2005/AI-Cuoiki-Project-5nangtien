import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Thay bằng URL API Backend của ông
    headers: {
        'Content-Type': 'application/json',
    },
});

// Gài Token vào mọi Request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Đảm bảo lúc login ông lưu token đúng tên này
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Bắt lỗi Response
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // SỬA CHỖ NÀY: Kiểm tra nếu API gọi lên KHÔNG PHẢI là '/login' 
            // thì mới xóa token và đá ra ngoài.
            if (error.config && error.config.url !== '/login') {
                console.error("Token hết hạn hoặc không hợp lệ!");
                localStorage.removeItem('token');
                window.location.href = '/login'; 
            }
        }
        // Trả lỗi về lại cho các component (như trang Login) tự xử lý hiện thông báo
        return Promise.reject(error);
    }
);

export default axiosClient;