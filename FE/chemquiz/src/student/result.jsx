import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function StudentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy dữ liệu được truyền sang từ trang Quiz
  const { resultData, examTitle } = location.state || {};

  // Nếu truy cập trực tiếp mà không có dữ liệu thì đá về dashboard
  if (!resultData) {
    return (
      <div className="min-h-screen bg-[#0b1326] flex items-center justify-center">
        <button onClick={() => navigate('/student/dashboard')} className="text-indigo-400 underline">
          Quay lại Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 flex items-center justify-center font-['Inter']">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
        .score-glow { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      `}} />

      <div className="max-w-2xl w-full glass-card p-10 rounded-3xl shadow-2xl text-center relative overflow-hidden">
        {/* Hiệu ứng tia sáng phía sau */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        
        <span className="material-symbols-outlined text-7xl text-teal-400 mb-4">
          check_circle
        </span>
        
        <h1 className="text-3xl font-bold text-white mb-2">Hoàn thành bài thi!</h1>
        <p className="text-gray-400 mb-8">{examTitle}</p>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Điểm số</p>
            <h2 className="text-5xl font-black text-indigo-400 score-glow">{resultData.score}</h2>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Số câu đúng</p>
            <h2 className="text-5xl font-black text-teal-400">{resultData.correct_count}/{resultData.total_questions}</h2>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/student/quiz')} // Sau này sửa thành làm lại bài thi
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all active:scale-95"
          >
            Làm lại bài thi
          </button>
          
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all"
          >
            Quay về Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}