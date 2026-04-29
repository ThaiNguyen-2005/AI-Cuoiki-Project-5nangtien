import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminClass() {
  const [classes] = useState([
    { id: 1, name: "12B4", teacher: "Trần Thị Minh", students: 48, status: "Hoạt động" },
    { id: 2, name: "10A1", teacher: "Nguyễn Văn Hùng", students: 42, status: "Hoạt động" },
  ]);

  return (
    <div className="flex bg-[#0b1326] min-h-screen text-[#dbe2fd]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 w-full flex justify-between items-center px-10 py-6 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">Quản lý Lớp học</h2>
        </header>
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map(cls => (
              <div key={cls.id} className="bg-slate-800/40 p-6 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold text-white">{cls.name}</h3>
                <p className="text-slate-400 text-sm">GV: {cls.teacher}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}