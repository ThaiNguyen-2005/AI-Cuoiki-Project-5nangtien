import axios from 'axios';

// 1. Khởi tạo một phiên bản Axios mới
const axiosClient = axios.create({
    // Đổi link này thành link thư mục gốc API của Backend nhé
    // Ví dụ: http://localhost:8000/api
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// 2. Can thiệp trước khi GỬI request lên Backend (Gắn Token)
axiosClient.interceptors.request.use(
    (config) => {
        // Lấy thẻ token đang cất trong máy
        const token = localStorage.getItem('access_token');
        
        // Nếu có thẻ, tự động kẹp vào tiêu đề (Header) của request
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Can thiệp trước khi NHẬN kết quả từ Backend trả về (Xử lý lỗi Token)
axiosClient.interceptors.response.use(
    (response) => {
        // Nếu thành công thì trả dữ liệu về bình thường
        return response;
    },
    (error) => {
        // Mã 401 thường là lỗi "Unauthorized" - Chưa xác thực hoặc Token đã hết hạn
        if (error.response && error.response.status === 401) {
            // Tịch thu thẻ cũ và đá văng ra trang Login
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_role');
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default axiosClient;