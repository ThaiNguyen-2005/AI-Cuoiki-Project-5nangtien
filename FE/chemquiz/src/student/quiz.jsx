import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import StudentNavbar from "../components/StudentNavbar";
// DỮ LIỆU GIẢ (Mock Data) - Sau này sẽ thay bằng API lấy từ Backend
const mockQuestions = [
  {
    id: 1,
    question: "Kim loại nào sau đây có tính dẫn điện tốt nhất?",
    options: ["Đồng (Cu)", "Bạc (Ag)", "Vàng (Au)", "Nhôm (Al)"],
  },
  {
    id: 2,
    question: "Phản ứng đặc trưng của ankan là gì?",
    options: ["Phản ứng cộng", "Phản ứng thế", "Phản ứng tách", "Phản ứng oxi hóa"],
  },
  {
    id: 3,
    question: "Dung dịch nào sau đây làm quỳ tím chuyển sang màu xanh?",
    options: ["NaCl", "H2SO4", "NaOH", "KNO3"],
  },
  {
    id: 4,
    question: "Số oxi hóa của Lưu huỳnh (S) trong hợp chất H2SO4 là bao nhiêu?",
    options: ["+2", "+4", "+6", "-2"],
  },
  {
    id: 5,
    question: "Khí nào sau đây là nguyên nhân chính gây ra hiệu ứng nhà kính?",
    options: ["O2", "N2", "H2", "CO2"],
  }
];

export default function StudentQuiz() {
  const navigate = useNavigate();
  
  // Các State quản lý bài thi
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Lưu đáp án học sinh chọn: { 0: 1, 1: 3, ... }
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 phút (900 giây)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Xử lý đồng hồ đếm ngược
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // Hết giờ tự động nộp bài
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Đổi giây thành định dạng MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Chọn đáp án
  const handleSelectOption = (optionIndex) => {
    setAnswers({ ...answers, [currentQIndex]: optionIndex });
  };

  // Nộp bài
  // Nộp bài
// Nộp bài
  const handleSubmit = () => {
    if (window.confirm("Bạn có chắc chắn muốn nộp bài không?")) {
      setIsSubmitted(true);
      
      // --- LOGIC CHẤM ĐIỂM (Giả lập) ---
      const totalQuestions = mockQuestions.length; // Tổng số câu (ví dụ: 5)
      const answeredCount = Object.keys(answers).length; // Số câu đã làm
      
      // Giả sử cứ làm là đúng (Sau này có API backend sẽ chấm câu đúng/sai thật)
      const correctAnswers = answeredCount; 
      const wrongAnswers = totalQuestions - answeredCount;
      
      // Tính thang điểm 10
      const calculatedScore = (correctAnswers / totalQuestions) * 10;

      // Ném dữ liệu sang trang Kết quả
      navigate("/student/result", { 
        state: { 
          score: calculatedScore.toFixed(1), // Làm tròn 1 chữ số thập phân
          correct: correctAnswers,
          wrong: wrongAnswers,
          time: formatTime(15 * 60 - timeLeft) // Tính thời gian đã làm
        } 
      });
    }
  };
  const currentQuestion = mockQuestions[currentQIndex];

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1326] text-[#dbe2fd]">
      <style dangerouslySetInnerHTML={{ __html: `
        .kinetic-gradient { background: linear-gradient(135deg, #c0c1ff 0%, #4fdbc8 100%); }
        .glass-card { background: rgba(19, 27, 46, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(192, 193, 255, 0.1); }
        .option-card.selected { border-color: #4fdbc8; background: rgba(79, 219, 200, 0.1); }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* Header bài thi */}
      <header className="sticky top-0 z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-indigo-500/20 shadow-lg shadow-indigo-900/10">
        <div className="flex items-center gap-4">
          <Link to="/student/dashboard" className="p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-['Space_Grotesk'] text-lg font-bold text-white">Kiểm tra 15 phút - Hóa Vô Cơ</h1>
            <p className="text-xs text-indigo-300">Lớp 12A1 • 5 Câu hỏi</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Đồng hồ */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg border ${timeLeft < 60 ? 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse' : 'glass-card text-teal-300 border-teal-500/30'}`}>
            <span className="material-symbols-outlined text-xl">timer</span>
            {formatTime(timeLeft)}
          </div>
          
          <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold transition-all active:scale-95 shadow-[0_0_15px_rgba(79,70,229,0.4)] hidden sm:block">
            Nộp Bài
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        
        {/* Vùng hiển thị câu hỏi (Trái) */}
        <div className="lg:col-span-3 flex flex-col">
          <div className="glass-card rounded-2xl p-6 sm:p-10 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-bold text-indigo-400 tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
                Câu hỏi {currentQIndex + 1} / {mockQuestions.length}
              </span>
              <button className="text-slate-500 hover:text-yellow-400 transition-colors tooltip" title="Đánh dấu xem lại">
                <span className="material-symbols-outlined text-2xl">flag</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed mb-10">
              {currentQuestion.question}
            </h2>

            {/* Các đáp án */}
            <div className="space-y-4 flex-1">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQIndex] === index;
                const labels = ["A", "B", "C", "D"];
                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left option-card ${isSelected ? 'selected' : 'border-white/5 hover:border-indigo-500/50 hover:bg-white/5'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-['Space_Grotesk'] transition-colors ${isSelected ? 'bg-teal-400 text-[#0b1326]' : 'bg-slate-800 text-slate-400'}`}>
                      {labels[index]}
                    </div>
                    <span className={`text-base font-medium ${isSelected ? 'text-teal-300' : 'text-slate-300'}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Nút điều hướng */}
            <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
              <button
                onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${currentQIndex === 0 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Câu trước
              </button>
              
              <button
                onClick={() => setCurrentQIndex(prev => Math.min(mockQuestions.length - 1, prev + 1))}
                disabled={currentQIndex === mockQuestions.length - 1}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${currentQIndex === mockQuestions.length - 1 ? 'opacity-30 cursor-not-allowed text-slate-500' : 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/40'}`}
              >
                Câu tiếp
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bảng điều hướng câu hỏi (Phải) */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-6 sticky top-24">
            <h3 className="font-['Space_Grotesk'] font-bold text-white mb-4">Danh sách câu hỏi</h3>
            
            {/* Chú thích */}
            <div className="flex flex-wrap gap-3 mb-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-teal-400/20 border border-teal-400"></div> Đã làm</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-slate-800 border border-slate-600"></div> Chưa làm</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded border-2 border-indigo-400"></div> Đang xét</div>
            </div>

            {/* Grid các câu */}
            <div className="grid grid-cols-5 gap-2 mb-8">
              {mockQuestions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isCurrent = currentQIndex === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQIndex(index)}
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all
                      ${isCurrent ? 'border-2 border-indigo-400 scale-110 shadow-[0_0_10px_rgba(129,140,248,0.5)]' : 'border border-transparent'}
                      ${isAnswered && !isCurrent ? 'bg-teal-400/20 text-teal-300 border-teal-400/30' : ''}
                      ${!isAnswered && !isCurrent ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : ''}
                    `}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 sm:hidden mb-4">
              Nộp Bài Ngay
            </button>

            <div className="text-center text-sm text-slate-400 bg-black/20 p-4 rounded-xl border border-white/5">
              Đã hoàn thành: <span className="font-bold text-white">{Object.keys(answers).length}</span> / {mockQuestions.length}
            </div>
          </div>
        </div>

      </main>
      {/* 1. Thêm thẻ này vào đây để nó hiện thanh menu bên dưới */}
      <StudentNavbar />
    </div>
  );
}