import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function StudentQuiz() {
  const navigate = useNavigate();
  
  // 1. Các biến State (Kho lưu trữ dữ liệu của trang này)
  const [exam, setExam] = useState(null); // Ban đầu rỗng, chờ API đổ về
  const [loading, setLoading] = useState(true); // Trạng thái đang tải xoay xoay
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Lưu đáp án: { id_câu_hỏi: id_đáp_án }
  const [timeLeft, setTimeLeft] = useState(0);

  // 2. TỰ ĐỘNG GỌI API LẤY ĐỀ THI KHI VỪA VÀO TRANG
  useEffect(() => {
    const fetchExam = async () => {
      try {
        // Gọi xuống BE lấy đề thi số 1 (Sau này làm thật thì lấy ID từ URL)
        const response = await axiosClient.get('/exams/1');
        
        setExam(response.data); // Nhét data từ BE vào state exam
        setTimeLeft(response.data.duration * 60); // Đổi phút ra giây cho đồng hồ
        setLoading(false); // Tắt hiệu ứng loading
      } catch (error) {
        console.error("Lỗi lấy đề thi:", error);
        alert("Lấy đề thi thất bại, có thể Server BE chưa bật!");
        setLoading(false);
      }
    };

    fetchExam();
  }, []);

  // 3. Đồng hồ đếm ngược thời gian
  useEffect(() => {
    // Nếu chưa load xong đề, hoặc hết giờ thì ngừng đếm
    if (!exam || timeLeft <= 0) {
      if (timeLeft === 0 && exam) {
        handleSubmit(); // Hết giờ tự động nộp bài
      }
      return;
    }
    
    // Mỗi giây trừ đi 1
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, exam]);

  // Format giây thành dạng mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 4. Xử lý khi học sinh click chọn đáp án A, B, C, D
  const handleSelectOption = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // 5. NỘP BÀI - BẮN DỮ LIỆU LÊN BACKEND CHẤM ĐIỂM
const handleSubmit = async () => {
    const confirmSubmit = window.confirm("Bạn có chắc chắn muốn nộp bài không?");
    if (!confirmSubmit) return;

    try {
      const response = await axiosClient.post(`/exams/${exam.id}/submit`, {
        answers: answers 
      });

      // Chuyển sang trang kết quả và ĐÍNH KÈM DỮ LIỆU qua 'state'
      navigate('/student/result', { 
        state: { 
          resultData: response.data, 
          examTitle: exam.title 
        } 
      });

    } catch (error) {
      console.error("Lỗi nộp bài", error);
      alert("Có lỗi xảy ra khi nộp bài!");
    }
  };

  // Giao diện lúc đang chờ API chạy (xoay xoay)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-indigo-200">
        <span className="material-symbols-outlined animate-spin text-4xl mr-2">autorenew</span>
        Đang tải đề thi từ hệ thống...
      </div>
    );
  }

  // Nếu API bị lỗi không trả về đề thi
  if (!exam) {
    return <div className="text-white p-10 text-center">Không tìm thấy đề thi.</div>;
  }

  const currentQuestion = exam.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dbe2fd] p-6 font-['Inter'] relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card { background: rgba(19, 27, 46, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(192, 193, 255, 0.1); }
      `}} />

      {/* Hiệu ứng nền */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header bài thi */}
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-8 glass-card p-4 rounded-2xl shadow-lg relative z-10">
        <div>
          <h1 className="text-xl font-bold text-white">{exam.title}</h1>
          <p className="text-sm text-gray-400">Câu {currentQuestionIndex + 1} / {exam.questions.length}</p>
        </div>
        <div className={`text-xl font-bold px-4 py-2 rounded-lg transition-colors ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'}`}>
          {formatTime(timeLeft)}
        </div>
      </header>

      {/* Nội dung câu hỏi */}
      <main className="max-w-4xl mx-auto glass-card p-8 rounded-2xl shadow-2xl relative z-10">
        <h2 className="text-2xl font-semibold text-white mb-8">
          <span className="text-indigo-400 mr-2">Câu {currentQuestionIndex + 1}:</span>
          {currentQuestion.content}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            const labels = ['A', 'B', 'C', 'D'];
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4
                  ${isSelected 
                    ? 'bg-indigo-600/30 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'bg-[#1a233a] border-white/5 hover:border-indigo-400/50 hover:bg-[#222b45]'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors
                  ${isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  {labels[index]}
                </div>
                <span className={`text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Nút điều hướng */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Câu trước
          </button>

          {currentQuestionIndex === exam.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-lg bg-teal-500 text-white font-bold hover:bg-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all flex items-center gap-2"
            >
              Nộp bài
              <span className="material-symbols-outlined text-sm">check_circle</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(exam.questions.length - 1, prev + 1))}
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all flex items-center gap-2"
            >
              Câu tiếp theo
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}