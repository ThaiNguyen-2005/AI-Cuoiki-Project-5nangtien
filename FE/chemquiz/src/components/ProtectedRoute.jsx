import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRole }) {
  const { token, role } = useAuth();

  // Chưa đăng nhập -> Đá về Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Đăng nhập rồi nhưng sai role (ví dụ student ráng vô link của admin)
  if (allowedRole && role !== allowedRole) {
    // Trả về trang dashboard tương ứng với role hiện tại
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  return <Outlet />;
}