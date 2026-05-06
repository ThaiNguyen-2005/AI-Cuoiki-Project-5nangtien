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
import AdminAcademic from './admin/academic';


import TeacherDashboard from './teacher/dashboard';
import TeacherQuiz from './teacher/quiz.jsx';
import TeacherResult from './teacher/result.jsx';
import TeacherQuestion from './teacher/question.jsx';
import TeacherAnalytics from './teacher/analytics.jsx';
import ManualQuiz from './teacher/manual_quiz.jsx';
import AutoQuiz from './teacher/auto_quiz.jsx';
import ViewQuiz from './teacher/view_quiz.jsx';
import EditQuizQuestions from './teacher/edit_quiz_questions.jsx';

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
                        <Route path="academic"   element={<AdminAcademic />} />
                        <Route path="profile"    element={<Profile />} />
                        <Route path="settings"   element={<Navigate to="/admin/profile" replace />} />
                    </Route>

                    {/* TEACHER */}
                    <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher"><TeacherLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard"       element={<TeacherDashboard />} />
                        <Route path="quiz"             element={<TeacherQuiz />} />
                        <Route path="quiz/view/:id"    element={<ViewQuiz />} />
                        <Route path="quiz/edit-questions/:id" element={<EditQuizQuestions />} />
                        <Route path="question"         element={<TeacherQuestion />} />
                        <Route path="result"           element={<TeacherResult />} />
                        <Route path="results/:id"      element={<TeacherResult />} />
                        <Route path="analytics"        element={<TeacherAnalytics />} />
                        <Route path="manual-quiz"      element={<ManualQuiz />} />
                        <Route path="auto-quiz"        element={<AutoQuiz />} />
                        <Route path="profile"          element={<Profile />} />
                    </Route>

                    {/* STUDENT */}
                    <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<StudentDashboard />} />
                        <Route path="quiz"       element={<StudentQuiz />} />
                        <Route path="history"    element={<StudentHistory />} />
                        <Route path="analytics"  element={<StudentAnalytics />} />
                        <Route path="profile"    element={<Profile />} />
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