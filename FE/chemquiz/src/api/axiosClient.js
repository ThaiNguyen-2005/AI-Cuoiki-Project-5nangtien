import axios from 'axios';

// Khởi tạo một "bộ đàm" nối thẳng tới Backend của ông
const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Trỏ thẳng vào port 8000 của Laravel
  headers: {
    'Content-Type': 'application/json',
  },
});

// THUẬT TOÁN TỰ ĐỘNG GẮN TOKEN:
// Trước khi gửi bất kỳ request nào lên BE, nó sẽ chạy qua đây kiểm tra
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy chìa khóa (token) từ kho chứa của trình duyệt
    const token = localStorage.getItem('access_token');
    if (token) {
      // Nếu có khóa, nhét vào Header để BE mở cửa
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;