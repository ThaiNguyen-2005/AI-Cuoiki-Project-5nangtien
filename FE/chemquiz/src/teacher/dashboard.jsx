import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

export default function TeacherDashboard() {
  const { user, setToken } = useAuth();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách bài quiz khi component render
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      // Đảm bảo endpoint này tồn tại ở Backend
      const response = await axiosClient.get('/teacher/quizzes');
      setQuizzes(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài thi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null, null); // Xóa token
    navigate('/login');
  };

  return (
    <div className="p-6 min-h-screen bg-[#0b1326] text-white">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold">Xin chào, Thầy/Cô {user?.name} 👋</h1>
          <p className="text-gray-400 mt-1">Quản lý bài thi và học sinh của bạn</p>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Đăng xuất
        </button>
      </div>

      {/* Nút tạo bài thi mới */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/teacher/quiz')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Tạo bài thi mới
        </button>
      </div>

      {/* Danh sách bài thi */}
      <div className="glass-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Các bài thi gần đây</h2>
        
        {loading ? (
          <div className="text-gray-400 animate-pulse">Đang tải dữ liệu...</div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="material-symbols-outlined text-4xl block mb-2 opacity-50">inventory_2</span>
            Bạn chưa tạo bài thi nào. Hãy bắt đầu ngay!
          </div>
        ) : (
          <div className="grid gap-4">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="bg-black/20 border border-white/5 p-4 rounded-lg flex justify-between items-center hover:bg-white/5 transition-colors">
                <div>
                  <h3 className="font-bold text-lg text-blue-300">{quiz.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {quiz.questions_count} câu hỏi • Thời gian: {quiz.duration} phút
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20 transition" title="Chỉnh sửa">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button className="p-2 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20 transition" title="Xóa">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}