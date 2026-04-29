import React from "react";
import { Link, useLocation } from "react-router-dom"; // 1. Thêm useLocation
import StudentNavbar from "../components/StudentNavbar";

export default function StudentResult() {
  const location = useLocation();
  
  // 2. Lấy dữ liệu được ném sang. Nếu không có (do gõ URL trực tiếp) thì lấy số mặc định 0
  const { 
    score = "0.0", 
    correct = 0, 
    wrong = 0, 
    time = "00:00" 
  } = location.state || {};

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] pb-24">
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%); }
        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
      `}} />

      <main className="max-w-2xl mx-auto p-6 pt-16 text-center space-y-10">
        
        {/* Vòng tròn điểm số */}
        <div className="relative inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-500 shadow-[0_0_50px_rgba(79,219,200,0.2)]">
          <div className="bg-[#0b1326] rounded-full w-40 h-40 flex flex-col items-center justify-center">
            {/* 3. Thay 9.0 bằng biến score */}
            <span className="text-5xl font-black text-white font-['Space_Grotesk']">{score}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Điểm của bạn</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Chúc mừng bạn hoàn thành!</h1>
          <p className="text-slate-400 text-sm">Bài kiểm tra: 15p - Hoá Vô Cơ</p>
        </div>

        {/* Thống kê chi tiết */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-2xl">
            {/* Thay số bằng biến */}
            <p className="text-teal-400 text-lg font-bold">{correct}/{correct + wrong}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Câu đúng</p>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            {/* Thay số bằng biến */}
            <p className="text-red-400 text-lg font-bold">{wrong}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Câu sai</p>
          </div>
          <div className="glass-card p-4 rounded-2xl">
            {/* Thay số bằng biến */}
            <p className="text-indigo-400 text-lg font-bold">{time}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Thời gian</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Link to="/student/history" className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all border border-white/5">
            Xem lại bài làm
          </Link>
          <Link to="/student/dashboard" className="flex-1 py-4 kinetic-gradient text-[#0b1326] rounded-2xl font-black shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
            Về trang chủ
          </Link>
        </div>
      </main>

      <StudentNavbar />
    </div>
  );
}