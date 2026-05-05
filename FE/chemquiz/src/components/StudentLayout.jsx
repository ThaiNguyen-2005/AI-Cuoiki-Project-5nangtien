import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const bottomNav = [
  { to: "/student",          label: "Trang chủ", icon: "🏠", end: true },
  { to: "/student/quiz",     label: "Làm bài",   icon: "📝" },
  { to: "/student/history",  label: "Lịch sử",   icon: "🕐" },
  { to: "/student/analytics",label: "Cá nhân",   icon: "📊" },
];

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd]">
      {/* Page content */}
      <Outlet />

      {/* Bottom navbar — dùng chung cho tất cả trang student */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#111827]/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all text-xs font-medium ${
                  isActive
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-slate-500 hover:text-slate-300"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}