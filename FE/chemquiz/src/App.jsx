import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './page/login';

// ADMIN
import AdminDashboard from './admin/dashboard';
import AdminClass from './admin/class';
import AdminUser from './admin/user';
import AdminAnalytics from './admin/analytics';
import AdminSettings from './admin/settings';

// TEACHER
import TeacherDashboard from './teacher/dashboard';
import TeacherQuestion from './teacher/question';
import TeacherQuiz from './teacher/quiz';
import TeacherResult from './teacher/result';
import TeacherAnalytics from './teacher/analytics'; // <-- Kiểm tra file này đã tạo chưa

// STUDENT
import StudentDashboard from './student/dashboard';
import StudentQuiz from './student/quiz';
import StudentHistory from './student/history';
import StudentAnalytics from './student/analytics'; // <-- Kiểm tra file này đã tạo chưa

const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("access_token");
    const userRole = localStorage.getItem("user_role");
    if (!token) return <Navigate to="/login" replace />;
    if (allowedRole && userRole !== allowedRole) return <Navigate to="/login" replace />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                {/* --- NHÓM ADMIN --- */}
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/class" element={<ProtectedRoute allowedRole="admin"><AdminClass /></ProtectedRoute>} />
                <Route path="/admin/user" element={<ProtectedRoute allowedRole="admin"><AdminUser /></ProtectedRoute>} />
                <Route path="/admin/analytics" element={<ProtectedRoute allowedRole="admin"><AdminAnalytics /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute allowedRole="admin"><AdminSettings /></ProtectedRoute>} />

                {/* --- NHÓM GIÁO VIÊN --- */}
                <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRole="teacher"><TeacherDashboard /></ProtectedRoute>} />
                <Route path="/teacher/question" element={<ProtectedRoute allowedRole="teacher"><TeacherQuestion /></ProtectedRoute>} />
                <Route path="/teacher/quiz" element={<ProtectedRoute allowedRole="teacher"><TeacherQuiz /></ProtectedRoute>} />
                <Route path="/teacher/result" element={<ProtectedRoute allowedRole="teacher"><TeacherResult /></ProtectedRoute>} />
                <Route path="/teacher/analytics" element={<ProtectedRoute allowedRole="teacher"><TeacherAnalytics /></ProtectedRoute>} />

                {/* --- NHÓM HỌC SINH --- */}
                <Route path="/student/dashboard" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
                <Route path="/student/quiz" element={<ProtectedRoute allowedRole="student"><StudentQuiz /></ProtectedRoute>} />
                <Route path="/student/history" element={<ProtectedRoute allowedRole="student"><StudentHistory /></ProtectedRoute>} />
                <Route path="/student/analytics" element={<ProtectedRoute allowedRole="student"><StudentAnalytics /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;