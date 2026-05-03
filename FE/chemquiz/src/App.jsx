import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './page/login';
import Profile from './page/profile';

// LAYOUTS (Nhớ import các layout ông đã tạo)
import AdminLayout from './components/AdminLayout'; // Đổi đường dẫn nếu cần
import TeacherLayout from './components/TeacherLayout'; // Đổi đường dẫn nếu cần
import StudentLayout from './components/StudentLayout'; // Đổi đường dẫn nếu cần

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
import TeacherAnalytics from './teacher/analytics';

// STUDENT
import StudentDashboard from './student/dashboard';
import StudentQuiz from './student/quiz';
import StudentHistory from './student/history';
import StudentAnalytics from './student/analytics';
import StudentResult from './student/result';

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
                {/* --- PUBLIC ROUTES --- */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                {/* --- PROFILE CHUNG CHO MỌI ROLE --- */}
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                {/* --- NHÓM ADMIN --- */}
                <Route path="/admin" element={
                    <ProtectedRoute allowedRole="admin">
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    {/* Các route con sẽ render vào <Outlet /> trong AdminLayout */}
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="class" element={<AdminClass />} />
                    <Route path="user" element={<AdminUser />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* --- NHÓM GIÁO VIÊN --- */}
                <Route path="/teacher" element={
                    <ProtectedRoute allowedRole="teacher">
                        <TeacherLayout />
                    </ProtectedRoute>
                }>
                    <Route path="dashboard" element={<TeacherDashboard />} />
                    <Route path="question" element={<TeacherQuestion />} />
                    <Route path="quiz" element={<TeacherQuiz />} />
                    <Route path="result" element={<TeacherResult />} />
                    <Route path="analytics" element={<TeacherAnalytics />} />
                </Route>

                {/* --- NHÓM HỌC SINH --- */}
                <Route path="/student" element={
                    <ProtectedRoute allowedRole="student">
                        <StudentLayout />
                    </ProtectedRoute>
                }>
                    <Route path="dashboard" element={<StudentDashboard />} />
                    <Route path="quiz" element={<StudentQuiz />} />
                    <Route path="history" element={<StudentHistory />} />
                    <Route path="analytics" element={<StudentAnalytics />} />
                    <Route path="result" element={<StudentResult />} />
                </Route>

                {/* --- FALLBACK ROUTE --- */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;