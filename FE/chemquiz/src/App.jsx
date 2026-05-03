import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import Context và ProtectedRoute (Đảm bảo bạn đã tạo 2 file này ở các bước trước)
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// 2. Import Page Login
import Login from './page/login';

// 3. Import các Page của Admin
import AdminDashboard from './admin/dashboard';
import AdminClass from './admin/class';
import AdminQuiz from './admin/quiz';
import AdminSettings from './admin/settings';
import AdminAnalytics from './admin/analytics';

// 4. Import các Page của Teacher
import TeacherDashboard from './teacher/dashboard';
import TeacherQuestion from './teacher/question';
import TeacherQuiz from './teacher/quiz';
import TeacherResult from './teacher/result';
import TeacherAnalytics from './teacher/analytics';

// 5. Import các Page của Student
import StudentDashboard from './student/dashboard';
import StudentQuiz from './student/quiz';
import StudentHistory from './student/history';
import StudentResult from './student/result';
import StudentAnalytics from './student/analytics';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* --- PUBLIC ROUTES --- */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />

                    {/* --- ADMIN ROUTES --- */}
                    <Route element={<ProtectedRoute allowedRole="admin" />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/class" element={<AdminClass />} />
                        <Route path="/admin/quiz" element={<AdminQuiz />} />
                        <Route path="/admin/settings" element={<AdminSettings />} />
                        <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    </Route>

                    {/* --- TEACHER ROUTES --- */}
                    <Route element={<ProtectedRoute allowedRole="teacher" />}>
                        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                        <Route path="/teacher/question" element={<TeacherQuestion />} />
                        <Route path="/teacher/quiz" element={<TeacherQuiz />} />
                        <Route path="/teacher/result" element={<TeacherResult />} />
                        <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
                    </Route>

                    {/* --- STUDENT ROUTES --- */}
                    <Route element={<ProtectedRoute allowedRole="student" />}>
                        <Route path="/student/dashboard" element={<StudentDashboard />} />
                        <Route path="/student/quiz" element={<StudentQuiz />} />
                        <Route path="/student/history" element={<StudentHistory />} />
                        <Route path="/student/result" element={<StudentResult />} />
                        <Route path="/student/analytics" element={<StudentAnalytics />} />
                    </Route>

                    {/* --- Gõ sai URL thì tự động văng về login --- */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;