import { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navItems = [
  { path: "/student/dashboard", label: "Tổng quan", icon: "dashboard" },
  { path: "/student/quiz", label: "Làm bài thi", icon: "quiz" },
  { path: "/student/history", label: "Lịch sử thi", icon: "history" },
  { path: "/student/analytics", label: "Thống kê", icon: "analytics" },
  { path: "/student/profile", label: "Hồ sơ", icon: "account_circle" },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavLinks = ({ onClose }) => (
    <nav className="flex flex-col gap-1.5 p-4 flex-1 overflow-y-auto scrollbar-hide">
      <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-4">Menu Học Viên</div>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all text-sm group ${isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );

  const SidebarHeader = () => (
    <div className="p-6 mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="material-symbols-outlined text-white text-2xl font-light">auto_stories</span>
        </div>
        <div className="flex flex-col" style={{ paddingTop: '10px' }}>
          <h1 className="text-xl font-black text-white leading-none tracking-tight">Kinetic</h1>
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mt-1">Student Portal</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050810] flex text-gray-200">
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-60 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] pointer-events-none" />

      {/* ── Sidebar Desktop ──────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0b1326]/50 backdrop-blur-xl border-r border-white/5 h-screen shrink-0 sticky top-0 overflow-hidden">
        <SidebarHeader />

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <NavLinks onClose={() => { }} />
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 cursor-pointer hover:bg-white/5 rounded-2xl transition-colors" onClick={() => navigate('/profile')}>
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white border border-white/10 shadow-lg shadow-blue-500/10">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Học viên'}</p>
              <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role || 'student'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-all text-sm group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">logout</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar ───────────────────────────── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 w-72 bg-[#0b1326] h-full shadow-2xl flex flex-col border-r border-white/10 animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <SidebarHeader />
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <NavLinks onClose={() => setSidebarOpen(false)} />

            <div className="p-4 border-t border-white/5 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-all text-sm"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden lg:p-4">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#0b1326]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">auto_stories</span>
            </div>
            <span className="font-bold text-white tracking-tight">Kinetic Student</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Content Area Container */}
        <div className="flex-1 bg-[#0b1326]/30 backdrop-blur-sm lg:rounded-[2.5rem] border border-white/5 flex flex-col overflow-hidden shadow-2xl relative">
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto scrollbar-hide">
            <div className="max-w-(--breakpoint-2xl) mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}