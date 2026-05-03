import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Chỉnh lại đường dẫn dựa trên cấu trúc thư mục src của bạn
import Login from './page/login';
import AdminDashboard from './admin/dashboard';
import StudentDashboard from './student/dashboard';
import TeacherDashboard from './teacher/dashboard';

// Lưu ý: Nếu các file dashboard nằm sâu hơn, ví dụ src/admin/dashboard.jsx 
// thì dùng './admin/dashboard' là đúng. 
// Nếu nó nằm trong src/admin/dashboard/index.jsx thì phải thêm /index.

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Vào trang chủ tự động đẩy sang Login */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* 2. Route trang Login */}
                <Route path="/login" element={<Login />} />

                {/* 3. Phân quyền Dashboard */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                
                {/* 4. Xử lý các đường dẫn không tồn tại */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;