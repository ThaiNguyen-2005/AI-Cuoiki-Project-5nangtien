import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TeacherNavbar() {
  const location = useLocation();

  const menuItems = [
    { path: "/teacher/dashboard", label: "Tổng quan", icon: "dashboard" },
    { path: "/teacher/quiz", label: "Tạo Quiz", icon: "auto_awesome" },
    { path: "/teacher/question", label: "Ngân hàng", icon: "database" },
    { path: "/teacher/result", label: "Kết quả", icon: "assignment_turned_in" },
    { path: "/teacher/analytics", label: "Phân tích", icon: "insights" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-[#0b1326]/95 backdrop-blur-xl border-t border-indigo-500/20 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] rounded-t-3xl lg:px-20">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all duration-300 ${
              isActive ? "text-teal-400 scale-110" : "text-slate-500 hover:text-indigo-200"
            }`}
          >
            <span 
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className={`font-['Space_Grotesk'] text-[10px] mt-1 font-bold tracking-tight ${isActive ? "opacity-100" : "opacity-60"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}