import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeacherNavbar from "../components/TeacherNavbar";
export default function TeacherResult() {
  // DỮ LIỆU GIẢ: Danh sách kết quả học sinh làm bài
  const [results, setResults] = useState([
    { id: 1, name: "Nguyễn Văn An", class: "12B4", quiz: "Kiểm tra 15p - Hóa Vô Cơ", score: 9.0, time: "12:05", date: "29/04/2026", status: "Đã nộp" },
    { id: 2, name: "Trần Thị Bình", class: "12B4", quiz: "Kiểm tra 15p - Hóa Vô Cơ", score: 7.5, time: "14:20", date: "29/04/2026", status: "Đã nộp" },
    { id: 3, name: "Lê Tuấn Anh", class: "10A1", quiz: "Cấu tạo nguyên tử", score: 8.5, time: "08:15", date: "28/04/2026", status: "Đã nộp" },
    { id: 4, name: "Phạm Minh Hoàng", class: "12B4", quiz: "Kiểm tra 15p - Hóa Vô Cơ", score: 0, time: "--:--", date: "29/04/2026", status: "Đang làm" },
    { id: 5, name: "Vũ Thành Vinh", class: "12B4", quiz: "Kiểm tra 15p - Hóa Vô Cơ", score: 10, time: "10:30", date: "29/04/2026", status: "Đã nộp" },
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
          <span className="material-symbols-outlined text-indigo-400">assignment_turned_in</span>
          <h1 className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-wide">Kết quả thi</h1>
        </div>
        <div className="flex gap-2">
           <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all border border-white/10">
              Xuất Excel
           </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 mt-4">
        
        {/* Bộ lọc */}
        <div className="glass-card p-5 rounded-2xl mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Chọn đề thi</label>
            <select className="w-full bg-[#1c2438] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
              <option>Kiểm tra 15p - Hóa Vô Cơ</option>
              <option>Cấu tạo nguyên tử</option>
              <option>Giữa kỳ - Hóa Hữu Cơ</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
             <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Lớp học</label>
             <select className="w-full sm:w-32 bg-[#1c2438] border border-white/5 rounded-xl py-3 px-4 text-white focus:outline-none cursor-pointer">
              <option>Tất cả</option>
              <option>12B4</option>
              <option>10A1</option>
            </select>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex-none">
            Lọc kết quả
          </button>
        </div>

        {/* Bảng kết quả */}
        <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="bg-indigo-500/10 text-[10px] text-indigo-300 uppercase tracking-widest border-b border-indigo-500/20">
                <th className="px-6 py-5 font-black">Học sinh</th>
                <th className="px-6 py-5 font-black">Lớp</th>
                <th className="px-6 py-5 font-black">Thời gian nộp</th>
                <th className="px-6 py-5 font-black">Trạng thái</th>
                <th className="px-6 py-5 font-black text-center">Điểm số</th>
                <th className="px-6 py-5 font-black text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {results.map((res) => (
                <tr key={res.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full kinetic-gradient flex items-center justify-center text-[#0b1326] font-bold text-xs">
                        {res.name.split(' ').pop().charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{res.name}</p>
                        <p className="text-[10px] text-gray-500">{res.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-300">{res.class}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {res.time}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${res.status === 'Đã nộp' ? 'bg-teal-400 shadow-[0_0_8px_#4fdbc8]' : 'bg-yellow-400 animate-pulse'}`} />
                      <span className={`text-xs ${res.status === 'Đã nộp' ? 'text-teal-400' : 'text-yellow-400'}`}>{res.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-lg font-black font-['Space_Grotesk'] ${res.score >= 8 ? 'text-teal-300' : res.score >= 5 ? 'text-indigo-300' : 'text-red-400'}`}>
                      {res.status === 'Đã nộp' ? res.score.toFixed(1) : '--'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-500 hover:text-white">
                      <span className="material-symbols-outlined text-sm">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

      {/* Bottom NavBar */}
<TeacherNavbar />        <Link to="/teacher/dashboard" className="flex flex-col items-center text-slate-500">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] mt-1">Tổng quan</span>
        </Link>
        <Link to="/teacher/quiz" className="flex flex-col items-center text-slate-500">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-[10px] mt-1">Tạo Quiz</span>
        </Link>
        <Link to="/teacher/question" className="flex flex-col items-center text-slate-500">
          <span className="material-symbols-outlined">database</span>
          <span className="text-[10px] mt-1">Ngân hàng</span>
        </Link>
        <Link to="/teacher/result" className="flex flex-col items-center text-indigo-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>assignment_turned_in</span>
          <span className="text-[10px] mt-1">Kết quả</span>
        </Link>
  <TeacherNavbar />
    </div>
  );
}