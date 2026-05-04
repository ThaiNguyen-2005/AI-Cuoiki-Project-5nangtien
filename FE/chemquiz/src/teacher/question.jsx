import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate ở đây
import axiosClient from '../api/axiosClient';

export default function TeacherQuestions() {
  const navigate = useNavigate(); // 2. Khởi tạo biến navigate
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách câu hỏi từ Backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosClient.get('/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error("Lỗi lấy câu hỏi:", error);
        // Tạm thời Fake data nếu BE chưa viết API
        setQuestions([
          { id: 1, content: 'Công thức tổng quát của Ankan là gì?', chapter: 'Hydrocarbon', level: 'Dễ' },
          { id: 2, content: 'Chất nào sau đây làm mất màu dung dịch Brom?', chapter: 'Hydrocarbon', level: 'Trung bình' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 font-['Inter']">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
      `}} />

      <div className="max-w-6xl mx-auto pt-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Ngân hàng Câu hỏi</h1>
            <p className="text-gray-400">Quản lý và biên soạn câu hỏi Hóa học</p>
          </div>
          
          {/* 3. Sửa sự kiện onClick ở nút này thành navigate */}
          <button 
            onClick={() => navigate('/teacher/questions/create')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Thêm câu hỏi
          </button>
        </div>

        {/* Bảng danh sách */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-10 text-center text-indigo-300">Đang tải dữ liệu...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-indigo-200 uppercase text-xs tracking-widest font-bold">
                <tr>
                  <th className="px-6 py-4 w-16 text-center">ID</th>
                  <th className="px-6 py-4">Nội dung câu hỏi</th>
                  <th className="px-6 py-4 w-40">Chương</th>
                  <th className="px-6 py-4 w-32">Độ khó</th>
                  <th className="px-6 py-4 w-32 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-center text-gray-400">#{q.id}</td>
                    <td className="px-6 py-4 font-medium text-white line-clamp-2">{q.content}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                        {q.chapter}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        q.level === 'Dễ' ? 'bg-teal-500/20 text-teal-300' : 'bg-orange-500/20 text-orange-300'
                      }`}>
                        {q.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3 transition-colors">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}