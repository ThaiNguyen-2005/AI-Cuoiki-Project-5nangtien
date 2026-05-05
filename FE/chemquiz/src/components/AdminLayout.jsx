import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/admin",           label: "Tổng quan",  icon: "📊", end: true },
  { path: "/admin/user",      label: "Người dùng", icon: "👥" },
  { path: "/admin/class",     label: "Lớp học",    icon: "🏫" },
  { path: "/admin/analytics", label: "Phân tích",  icon: "📈" },
  { path: "/admin/settings",  label: "Cài đặt",    icon: "⚙️" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const NavLinks = ({ onClose }) => (
    <nav className="flex flex-col gap-1 p-4 flex-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/10 transition-all text-sm mt-4"
      >
        <span>🚪</span>
        <span>Đăng xuất</span>
      </button>
    </nav>
  );

  const SidebarHeader = () => (
    <div className="p-4 border-b border-white/10">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xl shrink-0">🎓</span>
        <h1 className="text-sm font-bold text-blue-400 truncate">Admin</h1>
      </div>
      <p className="text-xs text-gray-500 mt-0.5">Hệ thống quản trị</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b1326] flex">

      {/* ── Sidebar desktop ──────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#111827] border-r border-white/10 min-h-screen shrink-0">
        <SidebarHeader />
        <NavLinks onClose={() => {}} />
      </aside>

      {/* ── Mobile overlay sidebar ───────────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 bg-[#111827] h-full shadow-2xl flex flex-col border-r border-white/10">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-blue-400">🎓 QuizAdmin</h1>
                <p className="text-xs text-gray-500">Hệ thống quản trị</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            <NavLinks onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#111827] border-b border-white/10 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white text-xl"
            aria-label="Mở menu"
          >
            ☰
          </button>
          <span className="font-semibold text-gray-200 text-sm">Admin</span>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}