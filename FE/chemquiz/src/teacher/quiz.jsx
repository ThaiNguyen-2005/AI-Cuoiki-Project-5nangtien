import React, { useState } from "react";
import { Link } from "react-router-dom";
import TeacherNavbar from "../components/TeacherNavbar";
export default function TeacherQuiz() {
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: "Kiểm tra 15p - Hóa Vô Cơ", time: 15, questions: 5, status: "Đang mở" },
    { id: 2, title: "Giữa kỳ - Hóa Hữu Cơ", time: 45, questions: 25, status: "Đã đóng" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <span className="material-symbols-outlined text-purple-400">auto_awesome</span>
          <h1 className="font-['Space_Grotesk'] text-xl font-bold text-white">Quản lý Đề thi</h1>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="kinetic-gradient text-[#0b1326] px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Tạo đề mới
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="glass-card p-6 rounded-2xl border-l-4 border-purple-500 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{quiz.title}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${quiz.status === 'Đang mở' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {quiz.status}
                  </span>
                </div>
                <span className="material-symbols-outlined text-gray-600">more_vert</span>
              </div>
              
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-400 text-sm">timer</span>
                  <span className="text-sm font-medium">{quiz.time} phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-400 text-sm">quiz</span>
                  <span className="text-sm font-medium">{quiz.questions} câu hỏi</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg text-sm font-bold transition-all">Sửa đề</button>
                <button className="flex-1 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white py-2 rounded-lg text-sm font-bold transition-all">Kết quả</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cửa sổ tạo đề giả lập */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#131b2e] border border-white/10 rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk']">Thiết lập đề thi mới</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tên tiêu đề</label>
                <input type="text" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" placeholder="VD: Kiểm tra cuối kỳ" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Thời gian (phút)</label>
                  <input type="number" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" placeholder="15" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mật khẩu đề (nếu có)</label>
                  <input type="text" className="w-full bg-[#0b1326] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" placeholder="123456" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-gray-400 font-bold">Hủy</button>
              <button className="kinetic-gradient px-6 py-2 rounded-xl text-[#0b1326] font-bold">Tiếp tục chọn câu hỏi</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom NavBar */}
<TeacherNavbar />        <Link to="/teacher/dashboard" className="flex flex-col items-center text-slate-500">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] mt-1">Tổng quan</span>
        </Link>
        <Link to="/teacher/quiz" className="flex flex-col items-center text-indigo-300">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
          <span className="text-[10px] mt-1">Tạo Quiz</span>
        </Link>
        <Link to="/teacher/question" className="flex flex-col items-center text-slate-500">
          <span className="material-symbols-outlined">database</span>
          <span className="text-[10px] mt-1">Ngân hàng</span>
        </Link>
        <Link to="/teacher/result" className="flex flex-col items-center text-slate-500">
          <span className="material-symbols-outlined">assignment_turned_in</span>
          <span className="text-[10px] mt-1">Kết quả</span>
        </Link>
      <TeacherNavbar />
    </div>
  );
}