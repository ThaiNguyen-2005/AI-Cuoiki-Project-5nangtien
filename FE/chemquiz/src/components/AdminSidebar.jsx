import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate  = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Tổng quan",    icon: "dashboard" },
    { path: "/admin/class",     label: "Lớp học",      icon: "groups" },
    { path: "/admin/user",      label: "Người dùng",   icon: "person" },
    { path: "/admin/analytics", label: "Phân tích",    icon: "analytics" },
    { path: "/admin/settings",  label: "Cài đặt",      icon: "settings" },
  ];

  const NavLinks = ({ onClose }) => (
    <>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`px-4 py-3 flex items-center gap-3 transition-all rounded-xl font-medium ${
              isActive
                ? "bg-white/8 text-white"
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
    </>
  );

  return (
    <>
      <style>{`.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;}`}</style>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-[#0b1326] flex-col py-6 px-4 z-50 hidden lg:flex">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c0c1ff] to-[#71f8e4] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0b1326]">science</span>
            </div>
            <h1 className="text-base font-black text-white tracking-wider uppercase font-['Space_Grotesk']">Kinetic Admin</h1>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <NavLinks onClose={() => {}} />
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER + HAMBURGER ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#0b1326]/90 backdrop-blur-xl border-b border-white/5 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c0c1ff] to-[#71f8e4] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#0b1326] text-base">science</span>
          </div>
          <span className="font-['Space_Grotesk'] font-black text-white text-base">Kinetic Admin</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-[#0b1326] border-r border-white/5 flex flex-col py-6 px-4"
            style={{ animation: "slideIn .25s ease" }}
          >
            <style>{`@keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}`}</style>

            <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c0c1ff] to-[#71f8e4] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#0b1326] text-base">science</span>
                </div>
                <span className="font-['Space_Grotesk'] font-black text-white">Kinetic Admin</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white p-1">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              <NavLinks onClose={() => setOpen(false)} />
            </nav>

            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 flex items-center gap-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Đăng xuất</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}