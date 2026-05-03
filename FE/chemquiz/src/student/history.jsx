import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";

export default function StudentHistory() {
  // DỮ LIỆU GIẢ: Danh sách các bài đã làm
  const [history, setHistory] = useState([
    { id: 1, title: "Kiểm tra 15p - Hóa Vô Cơ", date: "29/04/2026", score: 9.0, time: "12 phút", status: "Hoàn thành" },
    { id: 2, title: "Giữa kỳ - Hóa Hữu Cơ", date: "25/04/2026", score: 7.5, time: "40 phút", status: "Hoàn thành" },
    { id: 3, title: "Cấu tạo nguyên tử", date: "20/04/2026", score: 8.5, time: "10 phút", status: "Hoàn thành" },
    { id: 4, title: "Este - Lipit", date: "15/04/2026", score: 6.0, time: "15 phút", status: "Hoàn thành" },
  ]);

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-24">
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%); }
        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(192, 193, 255, 0.1); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card px-6 py-4 border-b border-indigo-500/20 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-indigo-400">history</span>
          <h1 className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-wide">Lịch sử làm bài</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 mt-4">
        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass-card p-4 rounded-2xl border-t-2 border-indigo-500">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Bài đã làm</p>
                <p className="text-2xl font-bold text-white">{history.length}</p>
            </div>
            <div className="glass-card p-4 rounded-2xl border-t-2 border-teal-500">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Điểm TB</p>
                <p className="text-2xl font-bold text-teal-300">7.8</p>
            </div>
        </div>

        {/* Danh sách bài làm */}
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="glass-card p-5 rounded-2xl hover:bg-white/5 transition-all group border border-white/5">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_month</span>
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {item.time}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black font-['Space_Grotesk'] ${item.score >= 8 ? 'text-teal-400' : 'text-indigo-300'}`}>
                    {item.score.toFixed(1)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Điểm số</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-200 flex items-center gap-1 transition-colors">
                  XEM CHI TIẾT
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- ĐÃ DỌN DẸP SẠCH SẼ Ở ĐÂY --- */}
      <StudentNavbar />
      
    </div>
  );
}