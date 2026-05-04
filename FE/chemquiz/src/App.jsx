import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Login from './page/login';
import Profile from './page/profile';

// LAYOUTS
import AdminLayout from './components/AdminLayout';
import TeacherLayout from './components/TeacherLayout';
import StudentLayout from './components/StudentLayout';

// PAGES (Ông nhớ kiểm tra đường dẫn import cho đúng)
import AdminDashboard from './admin/dashboard';
import TeacherDashboard from './teacher/dashboard';
import StudentDashboard from './student/dashboard';
import CreateQuestion from './teacher/create_question.jsx';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, role, loading } = useContext(AuthContext);

    if (loading) return <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-white">Đang tải...</div>;
    if (!token) return <Navigate to="/login" replace />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/login" replace />;

    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" />} />

                    {/* NHÓM GIÁO VIÊN */}
                    <Route path="/teacher" element={
                        <ProtectedRoute allowedRole="teacher">
                            <TeacherLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<TeacherDashboard />} />
                        <Route path="questions/create" element={<CreateQuestion />} />
                        {/* Thêm các route khác của teacher ở đây */}
                    </Route>

                    {/* NHÓM ADMIN */}
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                    </Route>

                    {/* NHÓM HỌC SINH */}
                    <Route path="/student" element={
                        <ProtectedRoute allowedRole="student">
                            <StudentLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<StudentDashboard />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;