import axios from 'axios';

const axiosClient = axios.create({
  // Thay bằng URL chạy backend Laravel của bạn
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Rất quan trọng nếu BE dùng Sanctum bảo mật CSRF
  withCredentials: true, 
});

// Interceptor nạp token trước khi gửi request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor bắt lỗi từ BE trả về
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response && response.status === 401) {
        // Hết hạn token hoặc không có quyền -> xóa token, đá về login
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_ROLE');
        window.location.href = '/login';
      }
    } catch (e) {
      console.error(e);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;