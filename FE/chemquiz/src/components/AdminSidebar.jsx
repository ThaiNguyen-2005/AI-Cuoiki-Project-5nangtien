import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation(); // Lấy đường dẫn hiện tại để tự động highlight menu
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  // Danh sách các Menu (Sửa ở đây là tất cả các trang đều đổi)
  const menuItems = [
    { path: "/admin/dashboard", label: "Tổng quan", icon: "dashboard" },
    { path: "/admin/class", label: "Lớp học", icon: "groups" },
    { path: "/admin/user", label: "Người dùng", icon: "person" },
    { path: "/admin/analytics", label: "Phân tích", icon: "analytics" },
    { path: "/admin/settings", label: "Cài đặt", icon: "settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-[#0b1326] flex flex-col py-6 px-4 z-50 hidden lg:flex">
      <div className="mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#c0c1ff] to-[#71f8e4] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#0b1326]">science</span>
          </div>
          <h1 className="text-lg font-black text-white tracking-widest uppercase font-['Space_Grotesk']">Kinetic Admin</h1>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-6 py-3 flex items-center gap-3 transition-all rounded-lg font-medium ${
                isActive 
                ? "bg-white/5 text-white shadow-lg" 
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <span 
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full px-6 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all font-bold"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}