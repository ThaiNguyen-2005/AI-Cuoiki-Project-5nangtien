import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminUser() {
  const [users] = useState([
    { id: 1, name: "Vũ Thành Vinh", email: "vinh.vtv@student.edu.vn", role: "student", status: "Active", joinDate: "20/03/2026" },
    { id: 2, name: "Trần Thị Minh", email: "minh.tt@teacher.edu.vn", role: "teacher", status: "Active", joinDate: "15/01/2026" },
  ]);

  return (
    <div className="flex bg-[#0b1326] min-h-screen text-[#dbe2fd]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 w-full flex justify-between items-center px-6 lg:px-10 py-6 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">Quản lý Người dùng</h2>
        </header>
        <div className="p-6 lg:p-10">
          <div className="bg-slate-800/40 rounded-2xl overflow-hidden border border-white/5">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] text-slate-500 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Người dùng</th>
                  <th className="px-8 py-5">Vai trò</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-4 text-sm font-bold">{user.name}</td>
                    <td className="px-8 py-4 text-xs">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}