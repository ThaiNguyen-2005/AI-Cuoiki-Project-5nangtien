import React from "react";
import { Link } from "react-router-dom";

export default function AdminAnalytics() {
  return (
    <div className="flex bg-[#0b1326] min-h-screen text-[#dbe2fd]">
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #71f8e4 100%); }
        .glass-card { background: rgba(23, 31, 51, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Sidebar Navigation */}
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
          <Link to="/admin/analytics" className="px-6 py-3 flex items-center gap-3 rounded-lg bg-white/5 text-white font-medium transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>analytics</span>
            <span>Phân tích</span>
          </Link>
          <Link to="/admin/settings" className="px-6 py-3 flex items-center gap-3 transition-all text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
            <span className="material-symbols-outlined">settings</span>
            <span>Cài đặt</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <header className="sticky top-0 z-30 w-full flex justify-between items-center px-10 py-6 bg-[#131b2e]/70 backdrop-blur-xl border-b border-white/5">
          <h2 className="font-['Space_Grotesk'] font-bold text-lg text-white">Thống kê & Phân tích</h2>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white/5 rounded-lg text-xs font-bold border border-white/10">7 Ngày qua</button>
             <button className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-bold border border-indigo-500/30">Tải báo cáo</button>
          </div>
        </header>

        <div className="p-6 lg:p-10 space-y-8">
          {/* Top Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border-l-4 border-indigo-400">
               <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Tỷ lệ hoàn thành bài</p>
               <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black text-white">92.4%</h3>
                  <span className="text-teal-400 text-xs font-bold mb-1">↑ 2.1%</span>
               </div>
            </div>
            <div className="glass-card p-6 rounded-2xl border-l-4 border-purple-400">
               <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Điểm trung bình hệ thống</p>
               <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black text-white">7.82</h3>
                  <span className="text-red-400 text-xs font-bold mb-1">↓ 0.4%</span>
               </div>
            </div>
            <div className="glass-card p-6 rounded-2xl border-l-4 border-teal-400">
               <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Người dùng hoạt động</p>
               <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black text-white">856</h3>
                  <span className="text-teal-400 text-xs font-bold mb-1">↑ 12%</span>
               </div>
            </div>
          </div>

          {/* Activity Chart Mockup */}
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-lg font-bold text-white mb-8">Lượt tương tác hệ thống theo giờ</h3>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[30, 45, 25, 60, 85, 40, 95, 70, 50, 65, 80, 35].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-[#0b1326] text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 10} lượt
                  </div>
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${h > 70 ? 'kinetic-gradient' : 'bg-white/10 group-hover:bg-white/20'}`} 
                    style={{ height: `${h}%` }}
                  ></div>
                  <p className="text-[8px] text-slate-500 text-center mt-2 font-bold">{i*2}h</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Chapter Performance */}
             <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-6">Hiệu suất theo chuyên đề</h3>
                <div className="space-y-6">
                   {[
                     { name: "Este - Lipit", val: 85, color: "bg-teal-400" },
                     { name: "Cacbohidrat", val: 72, color: "bg-indigo-400" },
                     { name: "Amin - Amino Axit", val: 45, color: "bg-purple-400" },
                     { name: "Polime", val: 68, color: "bg-blue-400" }
                   ].map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-2">
                           <span className="text-slate-400">{item.name}</span>
                           <span className="text-white">{item.val}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                           <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.val}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Recent Logs */}
             <div className="glass-card p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-6">Nhật ký hệ thống</h3>
                <div className="space-y-4">
                   {[
                     { msg: "Server bảo trì định kỳ", time: "2 giờ trước", type: "system" },
                     { msg: "Phát hiện đăng nhập lạ: Admin_01", time: "5 giờ trước", type: "security" },
                     { msg: "Đã tối ưu hóa Database", time: "Hôm qua", type: "system" },
                     { msg: "Backup dữ liệu thành công", time: "2 ngày trước", type: "system" }
                   ].map((log, i) => (
                     <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${log.type === 'security' ? 'bg-red-500' : 'bg-teal-400'}`}></div>
                        <div>
                           <p className="text-sm font-medium text-white">{log.msg}</p>
                           <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{log.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}