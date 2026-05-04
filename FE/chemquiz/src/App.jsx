import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Login from './page/login';
import Profile from './page/profile';

import AdminLayout from './components/AdminLayout';
import TeacherLayout from './components/TeacherLayout';
import StudentLayout from './components/StudentLayout';

import AdminDashboard from './admin/dashboard';
import TeacherDashboard from './teacher/dashboard';
import StudentDashboard from './student/dashboard';
import CreateQuestion from './teacher/create_question.jsx';
import TeacherQuiz from './teacher/quiz.jsx';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, role, loading } = useContext(AuthContext);

    const storageToken = localStorage.getItem('access_token');
    const storageRole = localStorage.getItem('user_role');

    if (loading && !storageToken) {
        return (
            <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-white font-bold italic">
                Đang xác thực quyền truy cập...
            </div>
        );
    }

    if (!token && !storageToken) {
        return <Navigate to="/login" replace />;
    }

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    <Route path="/teacher" element={
                        <ProtectedRoute allowedRole="teacher">
                            <TeacherLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<TeacherDashboard />} />
                        <Route path="questions/create" element={<CreateQuestion />} />
                        <Route path="quiz" element={<TeacherQuiz />} />
                        <Route path="question" element={<TeacherDashboard />} />
                        <Route path="result" element={<TeacherDashboard />} />
                        <Route path="analytics" element={<TeacherDashboard />} />
                    </Route>

                    <Route path="/admin" element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                    </Route>

                    <Route path="/student" element={
                        <ProtectedRoute allowedRole="student">
                            <StudentLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<StudentDashboard />} />
                    </Route>

                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;