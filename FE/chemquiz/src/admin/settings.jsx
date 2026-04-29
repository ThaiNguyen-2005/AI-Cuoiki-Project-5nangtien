import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminSettings() {
  const [isMaintenance, setIsMaintenance] = useState(false);

  return (
    <div className="flex bg-[#0b1326] min-h-screen text-[#dbe2fd]">
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #71f8e4 100%); }
        .glass-card { background: rgba(23, 31, 51, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Sidebar Navigation - Bản chuẩn không lệch */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-[#0b1326] flex flex-col py-6 px-4 z-50 hidden lg:flex">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl kinetic-gradient flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0b1326]">science</span>
            </div>
            <h1 className="text-lg font-black text-white tracking-widest uppercase font-['Space_Grotesk']">Kinetic Admin</h1>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <Link to="/admin/dashboard" className="px-6 py-3 flex items-center gap-3 transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Tổng quan</span>
          </Link>
          <Link to="/admin/class" className="px-6 py-3 flex items-center gap-3 transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
            <span className="material-symbols-outlined">groups</span>
            <span>Lớp học</span>
          </Link>
          <Link to="/admin/user" className="px-6 py-3 flex items-center gap-3 transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
            <span className="material-symbols-outlined">person</span>
            <span>Người dùng</span>
          </Link>
          <Link to="/admin/analytics" className="px-6 py-3 flex items-center gap-3 transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
            <span className="material-symbols-outlined">analytics</span>
            <span>Phân tích</span>
          </Link>
          <Link to="/admin/settings" className="px-6 py-3 flex items-center gap-3 rounded-lg bg-white/5 text-white font-medium transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>settings</span>
            <span>Cài đặt</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 w-full flex justify-between items-center px-10 py-6 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">Cấu hình hệ thống</h2>
          <button className="kinetic-gradient text-[#0b1326] px-6 py-2 rounded-xl font-bold active:scale-95 transition-all">Lưu thay đổi</button>
        </header>

        <div className="p-6 lg:p-10 space-y-8 max-w-4xl">
          
          {/* Cấu hình chung */}
          <section className="glass-card p-8 rounded-3xl">
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-6">Thông tin trường học</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-500 font-bold mb-2 uppercase">Tên trường</label>
                  <input type="text" defaultValue="Đại học Sư phạm TP.HCM" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:border-teal-400 outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 font-bold mb-2 uppercase">Niên khóa</label>
                  <input type="text" defaultValue="2023 - 2027" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:border-teal-400 outline-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Bảo trì hệ thống */}
          <section className="glass-card p-8 rounded-3xl">
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-6">Bảo mật & Bảo trì</h3>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
               <div>
                  <p className="font-bold text-white">Chế độ bảo trì</p>
                  <p className="text-xs text-slate-500">Ngắt kết nối người dùng để nâng cấp hệ thống.</p>
               </div>
               <button 
                onClick={() => setIsMaintenance(!isMaintenance)}
                className={`w-14 h-7 rounded-full transition-all relative ${isMaintenance ? 'bg-teal-500' : 'bg-slate-700'}`}
               >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isMaintenance ? 'left-8' : 'left-1'}`}></div>
               </button>
            </div>
          </section>

          {/* Tài khoản Admin */}
          <section className="glass-card p-8 rounded-3xl">
            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-6">Đổi mật khẩu Admin</h3>
            <div className="space-y-4">
               <input type="password" placeholder="Mật khẩu hiện tại" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:border-teal-400 outline-none" />
               <input type="password" placeholder="Mật khẩu mới" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:border-teal-400 outline-none" />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}