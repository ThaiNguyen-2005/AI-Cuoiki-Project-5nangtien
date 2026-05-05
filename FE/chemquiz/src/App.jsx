import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

import Login from './page/login';
import Register from './page/register';
import Profile from './page/profile';
import NotFound from './page/NotFound';

import AdminLayout from './components/AdminLayout';
import TeacherLayout from './components/TeacherLayout';
import StudentLayout from './components/StudentLayout';

import AdminDashboard from './admin/dashboard';
import AdminUser from './admin/user';
import AdminQuiz from './admin/quiz';
import AdminClass from './admin/class';
import AdminAnalytics from './admin/analytics';
import AdminSettings from './admin/settings';

import TeacherDashboard from './teacher/dashboard';
import TeacherQuiz from './teacher/quiz.jsx';
import TeacherResult from './teacher/result.jsx';
import TeacherQuestion from './teacher/question.jsx';
import TeacherAnalytics from './teacher/analytics.jsx';
import CreateQuestion from './teacher/create_question.jsx';

import StudentDashboard from './student/dashboard';
import StudentQuiz from './student/quiz.jsx';
import StudentHistory from './student/history.jsx';
import StudentAnalytics from './student/analytics.jsx';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, role, loading } = useContext(AuthContext);
    const storageToken = localStorage.getItem('access_token');
    const storageRole  = localStorage.getItem('user_role');

    if (loading && !storageToken) {
        return (
            <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-white font-bold italic">
                Đang xác thực quyền truy cập...
            </div>
        );
    }

    if (!token && !storageToken) return <Navigate to="/login" replace />;

    const currentRole = role || storageRole;
    if (allowedRole && currentRole !== allowedRole) {
        console.warn(`[Auth] Cần: ${allowedRole}, Hiện có: ${currentRole}`);
        return <Navigate to="/login" replace />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/login"    element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/"         element={<Navigate to="/login" replace />} />

                    {/* ADMIN */}
                    <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="user"       element={<AdminUser />} />
                        <Route path="quiz"       element={<AdminQuiz />} />
                        <Route path="class"      element={<AdminClass />} />
                        <Route path="analytics"  element={<AdminAnalytics />} />
                        <Route path="settings"   element={<AdminSettings />} />
                    </Route>

                    {/* TEACHER */}
                    <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher"><TeacherLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard"       element={<TeacherDashboard />} />
                        <Route path="quiz"             element={<TeacherQuiz />} />
                        <Route path="question"         element={<TeacherQuestion />} />
                        <Route path="result"           element={<TeacherResult />} />
                        <Route path="analytics"        element={<TeacherAnalytics />} />
                        <Route path="questions/create" element={<CreateQuestion />} />
                    </Route>

                    {/* STUDENT */}
                    <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<StudentDashboard />} />
                        <Route path="quiz"       element={<StudentQuiz />} />
                        <Route path="history"    element={<StudentHistory />} />
                        <Route path="analytics"  element={<StudentAnalytics />} />
                    </Route>

                    {/* SHARED */}
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;