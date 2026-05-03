import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentQuiz() {
  // State tạm thời để test UI (chưa ghép API)
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  // Khai báo biến navigate để chuyển trang
  const navigate = useNavigate();

  // Giả lập mảng 20 câu hỏi
  const totalQuestions = 20;

  // Hàm xử lý nộp bài
  const handleSubmitQuiz = () => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn nộp bài không?");
    if (isConfirm) {
      navigate('/student/result'); // Chuyển sang trang kết quả
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* === CỘT TRÁI: KHU VỰC CÂU HỎI VÀ ĐÁP ÁN === */}
      <div className="md:w-3/4 flex flex-col gap-6">
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-6 lg:p-8 shadow-[var(--shadow)]">
          
          {/* Header Câu hỏi & Thời gian */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border)]">
            <h2 className="text-xl lg:text-2xl font-bold text-[var(--text-h)] margin-0">
              Câu hỏi {activeQuestion}
            </h2>
            <span className="text-sm font-semibold text-[var(--danger-color)] bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
              ⏳ 45:00
            </span>
          </div>

          {/* Nội dung câu hỏi (chỗ này sau này render phương trình Hóa học) */}
          <p className="text-lg mb-8 text-[var(--text-h)] leading-relaxed">
            Cho 10 gam hỗn hợp X gồm Fe và Cu tác dụng với dung dịch H2SO4 loãng dư. Sau phản ứng thu được 2,24 lít khí H2 (đktc). Phần trăm khối lượng của Cu trong X là?
          </p>
          
          {/* Lưới 4 đáp án */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['A. 44%', 'B. 56%', 'C. 64%', 'D. 36%'].map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 text-[16px] ${
                  selectedOption === idx 
                    ? 'border-[var(--primary-color)] bg-blue-50 text-[var(--primary-color)] font-semibold shadow-sm' 
                    : 'border-[var(--border)] text-[var(--text)] hover:border-[var(--primary-color)] hover:bg-[var(--bg-light)]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        
        {/* Nút Chuyển câu */}
        <div className="flex justify-between">
          <button 
            onClick={() => setActiveQuestion(prev => Math.max(1, prev - 1))}
            className="px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-light)] font-medium transition-colors"
          >
            ← Câu trước
          </button>
          <button 
            onClick={() => setActiveQuestion(prev => Math.min(totalQuestions, prev + 1))}
            className="px-6 py-2.5 rounded-lg bg-[var(--primary-color)] text-white hover:opacity-90 font-medium transition-opacity shadow-sm"
          >
            Câu tiếp theo →
          </button>
        </div>
      </div>

      {/* === CỘT PHẢI: BẢNG ĐIỀU HƯỚNG === */}
      <div className="md:w-1/4">
        <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 shadow-[var(--shadow)] sticky top-24">
          <h3 className="font-bold text-[var(--text-h)] mb-4 text-center">Tiến độ làm bài</h3>
          
          {/* Lưới số thứ tự câu hỏi */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveQuestion(i + 1)}
                className={`w-full aspect-square rounded-md flex items-center justify-center font-medium border transition-colors ${
                  activeQuestion === i + 1
                    ? 'border-[var(--primary-color)] bg-[var(--primary-color)] text-white shadow-sm'
                    : 'border-[var(--border)] text-[var(--text)] hover:border-[var(--primary-color)] hover:bg-blue-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Trạng thái đếm số câu */}
          <div className="text-sm text-[var(--text)] text-center mb-4">
            Đã làm: <span className="font-bold text-[var(--success-color)]">0</span> / {totalQuestions}
          </div>

          {/* NÚT NỘP BÀI ĐÃ ĐƯỢC GẮN SỰ KIỆN */}
          <button 
            onClick={handleSubmitQuiz}
            className="w-full py-3 rounded-lg bg-[var(--danger-color)] text-white font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            Nộp bài thi
          </button>
        </div>
      </div>
    </div>
  );
}