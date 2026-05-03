import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function StudentNavbar() {
  const location = useLocation();

  const menuItems = [
    { path: "/student/dashboard", label: "Trang chủ", icon: "home" },
    { path: "/student/quiz", label: "Làm bài", icon: "quiz" },
    { path: "/student/history", label: "Lịch sử", icon: "history" },
    { path: "/student/analytics", label: "Cá nhân", icon: "insights" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-[#0b1326]/90 backdrop-blur-xl border-t border-teal-500/20 rounded-t-3xl shadow-t-2xl">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? "text-teal-300" : "text-slate-500"
            }`}
          >
            <span 
              className="material-symbols-outlined"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}