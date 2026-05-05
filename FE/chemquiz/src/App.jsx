import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';

// Pages chung
import Login from './page/login';
import Profile from './page/profile';
import NotFound from './page/NotFound';

// Layouts
import StudentLayout from './components/StudentLayout';
import TeacherLayout from './components/TeacherLayout';
import AdminLayout from './components/AdminLayout';

// Student pages
import StudentDashboard from './student/dashboard';
import StudentQuiz from './student/quiz';
import StudentHistory from './student/history';
import StudentAnalytics from './student/analytics';
import StudentResult from './student/result';

// Teacher pages
import TeacherDashboard from './teacher/dashboard';
import TeacherQuiz from './teacher/quiz';
import TeacherResult from './teacher/result';
import TeacherQuestion from './teacher/question';
import TeacherCreateQuestion from './teacher/create_question';
import TeacherAnalytics from './teacher/analytics';

// Admin pages
import AdminDashboard from './admin/dashboard';
import AdminUser from './admin/user';
import AdminClass from './admin/class';
import AdminAnalytics from './admin/analytics';
import AdminSettings from './admin/settings';
import AdminQuiz from './admin/quiz';

// ── Guard routes ──────────────────────────────────────────
function PrivateRoute({ children, role }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Public ── */}
          <Route path="/login" element={<Login />} />

          {/* ── Profile ── */}
          <Route
            path="/profile"
            element={<PrivateRoute><Profile /></PrivateRoute>}
          />

          {/* ── Student ── */}
          <Route
            path="/student"
            element={
              <PrivateRoute role="student">
                <StudentLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="quiz" element={<StudentQuiz />} />
            <Route path="history" element={<StudentHistory />} />
            <Route path="analytics" element={<StudentAnalytics />} />
            <Route path="result" element={<StudentResult />} />
          </Route>

          {/* ── Teacher ── */}
          <Route
            path="/teacher"
            element={
              <PrivateRoute role="teacher">
                <TeacherLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<TeacherDashboard />} />
            <Route path="quiz" element={<TeacherQuiz />} />
            <Route path="result" element={<TeacherResult />} />
            <Route path="question" element={<TeacherQuestion />} />
            <Route path="create-question" element={<TeacherCreateQuestion />} />
            <Route path="analytics" element={<TeacherAnalytics />} />
          </Route>

          {/* ── Admin ── */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="class" element={<AdminClass />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="quiz" element={<AdminQuiz />} />
          </Route>

          {/* ── Root redirect ── */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}