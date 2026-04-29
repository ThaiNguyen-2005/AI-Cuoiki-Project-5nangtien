import React, { useEffect, useState } from "react";
// Đã bổ sung import Link
import { useNavigate, Link } from "react-router-dom"; 
import TeacherNavbar from "../components/TeacherNavbar";

export default function TeacherDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-32">
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%); }
        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(192, 193, 255, 0.1); }
      `}} />

      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-indigo-400">science</span>
          <h1 className="text-xl font-black font-['Space_Grotesk'] text-white">Kinetic Chemistry</h1>
        </div>
        
        {/* Đã bổ sung khu vực chứa Nút đăng xuất và Avatar có gắn Link */}
        <div className="flex items-center gap-4">
          <button onClick={handleLogout} className="text-red-400 p-2 hover:bg-red-500/10 rounded-full transition-all" title="Đăng xuất">
            <span className="material-symbols-outlined">logout</span>
          </button>
          
          <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-indigo-500/30 overflow-hidden hover:border-indigo-400 transition-all active:scale-95 shadow-md block">
            <img alt="Teacher Profile" className="w-full h-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" />
          </Link>
        </div>
      </header>

      <main className="pt-24 px-4 space-y-6">
        <h2 className="text-xl font-bold">Xin chào, thầy Minh</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl h-32 flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-400">LỚP ĐANG DẠY</span>
            <span className="text-4xl font-bold text-indigo-300">08</span>
          </div>
          <div className="glass-card p-4 rounded-xl h-32 flex flex-col justify-between">
            <span className="text-xs font-bold text-gray-400">QUIZ ĐÃ TẠO</span>
            <span className="text-4xl font-bold text-teal-300">42</span>
          </div>
        </div>
      </main>

      <TeacherNavbar />
    </div>
  );
}