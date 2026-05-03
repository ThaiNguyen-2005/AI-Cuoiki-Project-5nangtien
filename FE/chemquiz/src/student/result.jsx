import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentResult() {
  const navigate = useNavigate();

  // Dữ liệu giả lập kết quả thi
  const mockResult = {
    score: 8.5,
    totalQuestions: 20,
    correct: 17,
    incorrect: 2,
    skipped: 1,
    timeSpent: '32:15'
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      {/* === PHẦN 1: TỔNG QUAN ĐIỂM SỐ === */}
      <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-8 shadow-[var(--shadow)] text-center relative overflow-hidden">
        {/* Hiệu ứng background nhẹ đằng sau */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--primary-color)]"></div>
        
        <h2 className="text-2xl font-bold text-[var(--text-h)] mb-6">Kết quả bài thi: Hóa học Hữu cơ 12</h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-8">
          {/* Vòng tròn điểm số */}
          <div className="w-40 h-40 rounded-full border-8 border-blue-100 flex flex-col items-center justify-center relative">
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
              <circle 
                cx="50%" cy="50%" r="46%" 
                className="fill-transparent stroke-[var(--primary-color)] stroke-[12px]" 
                strokeDasharray="100 100" /* Cần tính toán % thực tế nếu làm thật */
              />
            </svg>
            <span className="text-4xl font-black text-[var(--primary-color)]">{mockResult.score}</span>
            <span className="text-sm text-[var(--text-light)]">/ 10</span>
          </div>

          {/* Lưới thống kê chi tiết */}
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <p className="text-sm text-[var(--text-light)] mb-1">Trả lời đúng</p>
              <p className="text-xl font-bold text-[var(--success-color)]">{mockResult.correct} câu</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="text-sm text-[var(--text-light)] mb-1">Trả lời sai</p>
              <p className="text-xl font-bold text-[var(--danger-color)]">{mockResult.incorrect} câu</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-sm text-[var(--text-light)] mb-1">Bỏ qua</p>
              <p className="text-xl font-bold text-[var(--text-h)]">{mockResult.skipped} câu</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-sm text-[var(--text-light)] mb-1">Thời gian làm</p>
              <p className="text-xl font-bold text-[var(--primary-color)]">{mockResult.timeSpent}</p>
            </div>
          </div>
        </div>

        {/* Nút điều hướng */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="px-6 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-h)] hover:bg-[var(--bg-light)] font-medium transition-colors"
          >
            Về trang chủ
          </button>
          <button 
            onClick={() => navigate('/student/history')}
            className="px-6 py-2.5 rounded-lg bg-[var(--primary-color)] text-white hover:opacity-90 font-medium transition-opacity shadow-sm"
          >
            Xem lịch sử thi
          </button>
        </div>
      </div>

      {/* === PHẦN 2: XEM LẠI CHI TIẾT ĐÁP ÁN === */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-[var(--text-h)] pl-2 border-l-4 border-[var(--primary-color)]">
          Chi tiết bài làm
        </h3>

        {/* Thẻ xem lại 1 câu hỏi ví dụ (Câu Sai) */}
        <div className="bg-[var(--bg)] border border-red-200 rounded-xl p-6 shadow-sm relative">
          <div className="absolute top-4 right-6 px-3 py-1 rounded bg-red-100 text-[var(--danger-color)] text-sm font-bold">
            Sai
          </div>
          <h4 className="text-lg font-medium text-[var(--text-h)] mb-4 pr-12">
            <span className="font-bold mr-2">Câu 1:</span>
            Este nào sau đây có mùi chuối chín?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-red-300 bg-red-50 text-[var(--danger-color)]">
              A. Isoamyl axetat (Đáp án bạn chọn)
            </div>
            <div className="p-3 rounded-lg border border-[var(--border)] text-[var(--text)] opacity-70">
              B. Etyl butirat
            </div>
            <div className="p-3 rounded-lg border border-green-300 bg-green-50 text-[var(--success-color)] font-medium">
              C. Isoamyl butirat (Đáp án đúng)
            </div>
            <div className="p-3 rounded-lg border border-[var(--border)] text-[var(--text)] opacity-70">
              D. Etyl axetat
            </div>
          </div>
        </div>

        {/* Thẻ xem lại 1 câu hỏi ví dụ (Câu Đúng) */}
        <div className="bg-[var(--bg)] border border-green-200 rounded-xl p-6 shadow-sm relative">
          <div className="absolute top-4 right-6 px-3 py-1 rounded bg-green-100 text-[var(--success-color)] text-sm font-bold">
            Đúng
          </div>
          <h4 className="text-lg font-medium text-[var(--text-h)] mb-4 pr-12">
            <span className="font-bold mr-2">Câu 2:</span>
            Chất nào sau đây thuộc loại đisaccarit?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-[var(--border)] text-[var(--text)] opacity-70">
              A. Glucozơ
            </div>
            <div className="p-3 rounded-lg border border-green-300 bg-green-50 text-[var(--success-color)] font-medium">
              B. Saccarozơ (Bạn chọn đúng)
            </div>
            <div className="p-3 rounded-lg border border-[var(--border)] text-[var(--text)] opacity-70">
              C. Xenlulozơ
            </div>
            <div className="p-3 rounded-lg border border-[var(--border)] text-[var(--text)] opacity-70">
              D. Tinh bột
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}