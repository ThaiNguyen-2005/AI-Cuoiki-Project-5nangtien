import React from "react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex bg-[#0b1326] min-h-screen text-[#dbe2fd]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 w-full flex justify-between items-center px-10 py-6 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">Bảng điều khiển hệ thống</h2>
          <img alt="Avatar" className="w-10 h-10 rounded-full border-2 border-indigo-500" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
        </header>
        <div className="p-10">
           <div className="bg-slate-800/40 p-10 rounded-3xl text-center border border-white/5">
              <h3 className="text-2xl font-bold mb-4">Chào mừng Admin </h3>
              <p className="text-slate-400">Chọn một mục ở bên trái để bắt đầu quản lý hệ thống.</p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;