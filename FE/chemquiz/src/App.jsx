import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

// IMPORT TRANG ĐĂNG NHẬP VÀ PROFILE
import Login from './page/login';
import Profile from './page/profile';

// IMPORT LAYOUTS
import AdminLayout from './components/AdminLayout';
import TeacherLayout from './components/TeacherLayout';
import StudentLayout from './components/StudentLayout';

// IMPORT PAGES (Ông nhớ kiểm tra đường dẫn import cho đúng với máy ông)
import AdminDashboard from './admin/dashboard';
import TeacherDashboard from './teacher/dashboard';
import StudentDashboard from './student/dashboard';
import CreateQuestion from './teacher/create_question.jsx';

/**
 * CHỐT CHẶN BẢO VỆ ROUTE
 * Sửa lỗi đứng màn hình xanh bằng cách kiểm tra song song State và LocalStorage
 */
const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, role, loading } = useContext(AuthContext);

    // Lấy dữ liệu dự phòng từ máy để bypass lỗi state chậm
    const storageToken = localStorage.getItem('access_token');
    const storageRole = localStorage.getItem('user_role');

    // Chỉ hiện "Đang tải" nếu thực sự không tìm thấy thông tin gì trong máy
    if (loading && !storageToken) {
        return (
            <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-white font-bold italic">
                Đang xác thực quyền truy cập...
            </div>
        );
    }

    // Nếu không có token ở cả State và LocalStorage -> Về login ngay
    if (!token && !storageToken) {
        return <Navigate to="/login" replace />;
    }

    // Kiểm tra quyền: Ưu tiên State, nếu chưa có thì dùng dữ liệu từ LocalStorage
    const currentRole = role || storageRole;

    if (allowedRole && currentRole !== allowedRole) {
        console.warn(`[Auth] Truy cập bị chặn! Cần: ${allowedRole}, Hiện có: ${currentRole}`);
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* TRANG CÔNG KHAI */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* NHÓM GIÁO VIÊN */}
                    <Route path="/teacher" element={
                        <ProtectedRoute allowedRole="teacher">
                            <TeacherLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<TeacherDashboard />} />
                        <Route path="questions/create" element={<CreateQuestion />} />
                    </Route>

                    {/* NHÓM ADMIN */}
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                    </Route>

                    {/* NHÓM HỌC SINH */}
                    <Route path="/student" element={
                        <ProtectedRoute allowedRole="student">
                            <StudentLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<StudentDashboard />} />
                    </Route>

                    {/* TRANG THÔNG TIN CÁ NHÂN CHUNG */}
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    {/* ĐIỀU HƯỚNG SAI ĐƯỜNG DẪN */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;